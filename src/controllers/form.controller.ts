import {
  FormModel,
  type formType,
  ResponseModel,
  type responseType,
} from "../models/form";
import {
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3Client";
import { HttpError, HttpStatus, checkMongooseErrors } from "../utils/errors";
import { Readable } from "stream";
import { Response } from "express";

export const createForm = async (formFields: formType) => {
  try {
    const newForm = new FormModel(formFields);
    await newForm.save();
    return newForm;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Form creation failed",
        { cause: err },
      );
    }
  }
};

export const getAllForms = async () => {
  try {
    const allForms = await FormModel.find({});
    return allForms;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Form retrieval failed",
      { cause: err },
    );
  }
};

export const getFormByID = async (formId: string) => {
  try {
    const form = await FormModel.findOne({ formID: formId });
    console.log(form?.questions);
    return form;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Form retrieval failed",
      { cause: err },
    );
  }
};

const mimeToFileType = (mimeType: string): string => {
  const fileType = mimeType.split("/").pop();
  switch (fileType) {
    case "jpeg":
      return "jpg";
    case undefined:
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "File type could not be found from mime type",
      );
    default:
      return fileType;
  }
};

export const handleImageResponse = async (
  objectName: string,
  res: Response,
  prevEtag: string | undefined = undefined,
) => {
  try {
    const bucketName = process.env.IMAGE_BUCKET_NAME;
    if (!bucketName) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "No bucket name provided",
      );
    }

    const params = {
      Bucket: bucketName,
      Key: objectName,
    };

    let headResponse;
    try {
      // get bare minimum http-header information
      headResponse = await s3Client.send(new HeadObjectCommand(params));
    } catch (err) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "s3 object retrieval failed",
        { cause: err },
      );
    }

    //avoid resending images if browser's cached version is up to date
    if (prevEtag && prevEtag == headResponse.ETag) {
      res.status(304).end();
      return;
    }

    res.set({
      "Content-Length": headResponse.ContentLength,
      "Content-Type": headResponse.ContentType,
      ETag: headResponse.ETag,
    });

    // Prepare cache headers
    const cacheLength = 1000 * 60 * 60 * 24 * 30; // about a month
    res.setHeader("Cache-Control", `public, max-age=${cacheLength / 1000}`);
    res.setHeader("Expires", new Date(Date.now() + cacheLength).toUTCString());

    // get the object data and stream it
    const response = await s3Client.send(new GetObjectCommand(params));
    const stream = response.Body as Readable;

    if (stream == null) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "S3 get object response body is null",
      );
    }
    if (headResponse.ContentType) {
      res.type(headResponse.ContentType);
    }
    stream.on("data", (chunk) => res.write(chunk));
    stream.once("end", () => {
      res.end();
    });
    stream.once("error", () => {
      res.end();
    });
    return;
  } catch (err) {
    //rethrow HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "s3 object retrieval failed",
      { cause: err },
    );
  }
};

const generateKey = (
  responseId: string,
  imageNumber: number,
  mimeType: string,
): string => {
  return `${responseId}${imageNumber}.${mimeToFileType(mimeType)}`;
};

export const createAndAddResponseToForm = async (
  formID: string,
  responseFields: Omit<responseType, "images"> & {
    //need to temporarily allow images field to have data and mimeType since that is how it will be received from frontend. Frontend doesn't send key so that field must be added in the code
    images?: { data: string; mimeType: string; key: string }[];
  },
) => {
  try {
    const newResponse = new ResponseModel(responseFields);
    if (!newResponse) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Response creation failed",
      );
    }
    const updatedDocument = await FormModel.findOneAndUpdate(
      { formID: formID },
      { $addToSet: { responses: newResponse } },
      { new: true },
    );
    if (!updatedDocument) {
      throw new HttpError(HttpStatus.NOT_FOUND, "No Form with ID: " + formID);
    }
    if (
      !updatedDocument.responses?.find(
        ({ responseID }) => responseID === newResponse.responseID,
      )
    ) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Response addition failed",
      );
    }
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Update form failed",
      {
        cause: err,
      },
    );
  }
};

export const getFormResponse = async (
  formID: string,
  requestedResponseID: string,
) => {
  try {
    const form = await FormModel.findOne({ formID: formID });

    if (!form) {
      throw new HttpError(HttpStatus.NOT_FOUND, "No Form with ID: " + formID);
    } else {
      const response = form.responses?.find(
        ({ responseID }) => responseID === requestedResponseID,
      );
      if (!response) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "No Response with ID: " + requestedResponseID,
        );
      }
      return response;
    }
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Form retrieval failed",
      { cause: err },
    );
  }
};

// export const uploadImageToS3 = async (
//   data: Buffer,
//   objectKey: string,
//   mimeType: string,
// ) => {
//   const bucketName = process.env.PDF_BUCKET_NAME;
//   if (!bucketName) {
//     throw new HttpError(
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       "No bucket name provided",
//     );
//   }

//   try {
//     const uploadParams = {
//       Bucket: bucketName,
//       Key: objectKey,
//       Body: data,
//       ContentType: mimeType,
//     };

//     const result = await s3Client.send(new PutObjectCommand(uploadParams));
//     return result;
//   } catch (err) {
//     //rethrow HttpErrors
//     if (err instanceof HttpError) {
//       throw err;
//     }
//     throw new HttpError(
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       "s3 object upload failed",
//       { cause: err },
//     );
//   }
// };

// // Helper function to convert a ReadableStream (from S3) to a base64 string
// const streamToBase64 = async (stream: Readable): Promise<string> => {
//   const chunks: Buffer[] = [];
//   for await (const chunk of stream) {
//     chunks.push(Buffer.from(chunk));
//   }
//   const buffer = Buffer.concat(chunks);
//   return buffer.toString("base64");
// };

// export const getImageFromS3 = async (
//   objectKey: string,
// ): Promise<{ data: string; contentType: string | undefined }> => {
//   const bucketName = process.env.IMAGE_BUCKET_NAME;
//   if (!bucketName) {
//     throw new HttpError(
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       "No bucket name provided",
//     );
//   }

//   try {
//     const downloadParams = {
//       Bucket: bucketName,
//       Key: objectKey,
//     };

//     const { Body, ContentType } = await s3Client.send(
//       new GetObjectCommand(downloadParams),
//     );
//     if (Body instanceof Readable) {
//       const data = await streamToBase64(Body);
//       return { data, contentType: ContentType };
//     } else {
//       throw new HttpError(
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         "Failed to download image, invalid stream type",
//       );
//     }
//   } catch (err) {
//     // rethrow HttpErrors
//     if (err instanceof HttpError) {
//       throw err;
//     }
//     throw new HttpError(
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       "S3 object download failed",
//       { cause: err },
//     );
//   }
// };
