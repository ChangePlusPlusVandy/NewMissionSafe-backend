import {
  FormModel,
  type formType,
  ResponseModel,
  type responseType,
} from "../models/form";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3Client";
import { HttpError, HttpStatus, checkMongooseErrors } from "../utils/errors";
import { Readable } from "stream";

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
    let imageNumber = 0;
    if (responseFields.images != null) {
      for (const image of responseFields.images) {
        image.key = generateKey(
          responseFields.responseID,
          imageNumber++,
          image.mimeType,
        );
      }
    }
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
    try {
      if (responseFields.images != null) {
        const imageUploadPromises = responseFields.images.map(
          ({ data, key, mimeType }) => {
            const buf = Buffer.from(data ,'base64')
            return uploadImageToS3(buf, key, mimeType);
          },
        );
        await Promise.all(imageUploadPromises);
      }
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Image retrieval failed",
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
      let images: { data: string; contentType: string | undefined }[] = [];
      try {
        const imageFetchPromises = response.images.map(({ key }) =>
          getImageFromS3(key),
        );
        images = await Promise.all(imageFetchPromises);
      } catch (error) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Image retrieval failed",
        );
      }
      response.images = images as any; //not good but oh well
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

export const uploadImageToS3 = async (
  data: Buffer,
  objectKey: string,
  mimeType: string,
) => {
  const bucketName = process.env.PDF_BUCKET_NAME;
  if (!bucketName) {
    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "No bucket name provided",
    );
  }

  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: objectKey,
      Body: data,
      ContentType: mimeType,
    };

    const result = await s3Client.send(new PutObjectCommand(uploadParams));
    return result;
  } catch (err) {
    //rethrow HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "s3 object upload failed",
      { cause: err },
    );
  }
};

// Helper function to convert a ReadableStream (from S3) to a base64 string
const streamToBase64 = async (stream: Readable): Promise<string> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  const buffer = Buffer.concat(chunks);
  return buffer.toString("base64");
};

export const getImageFromS3 = async (
  objectKey: string,
): Promise<{ data: string; contentType: string | undefined }> => {
  const bucketName = process.env.IMAGE_BUCKET_NAME;
  if (!bucketName) {
    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "No bucket name provided",
    );
  }

  try {
    const downloadParams = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const { Body, ContentType } = await s3Client.send(
      new GetObjectCommand(downloadParams),
    );
    if (Body instanceof Readable) {
      const data = await streamToBase64(Body);
      return { data, contentType: ContentType };
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to download image, invalid stream type",
      );
    }
  } catch (err) {
    // rethrow HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "S3 object download failed",
      { cause: err },
    );
  }
};
