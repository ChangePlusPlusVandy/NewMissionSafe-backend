import { response } from "express";
import { FormModel, formType, ResponseModel, responseType } from "../models/form";
import { HttpError, HttpStatus, checkMongooseErrors } from "../utils/errors";

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
}

export const createAndAddResponseToForm = async (
    formID: string,
    responseFields: responseType
) => {
    try {
        const newResponse = new ResponseModel(responseFields);
        if (!newResponse) {
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Response creation failed"
            );
        }
        const updatedDocument = await FormModel.findOneAndUpdate(
            { code: formID },
            { $addToSet: { responses: newResponse } },
            { new: true }

        )
        if (!updatedDocument) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No Form with ID: " + formID
            );
        }
        if (!updatedDocument.responses?.find(({responseID}) => responseID === newResponse.responseID)){
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Response addition failed"
            );
        }

    } catch (err: unknown) {
        //rethrow any errors as HttpErrors
        if (err instanceof HttpError) {
            throw err;
        }
        //checks if mongoose threw and will rethrow with appropriate status code and message
        checkMongooseErrors(err);

        throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, "Update form failed", {
            cause: err,
        });
    }
};

export const getFormResponse = async (formID: string, requestedResponseID: string) => {
    try {
        const form = await FormModel.findOne({ formID: formID });
        
        if (!form) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No Form with ID: " + formID
            );
        }else{
            const response = form.responses?.find(({responseID}) => responseID === requestedResponseID)
            if (!response){
                throw new HttpError(
                    HttpStatus.NOT_FOUND,
                    "No Response with ID: " + requestedResponseID
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
