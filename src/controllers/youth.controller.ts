import { YouthModel, youthType } from "../models/youth";
import {HttpError, HttpStatus} from "../utils/errors";

//Get all youth
export const getAllYouth = async() => {
    try {
        const youth = await YouthModel.find();
        if (!youth){
            throw new HttpError(HttpStatus.NOT_FOUND, "Youth not found");
        }
        return youth
    } catch (err: unknown) {
        if (err instanceof HttpError){
            throw err
        } else{
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Youth retrevial failed",
                {cause: err},
            );
        }
    }
}

//Get youth by firebase ID
export const getYouthByID = async (userID: string) => {
    try {
        const youth = await YouthModel.find({ firebaseUID: userID });
        if (!youth) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No youth with id " + userID,
            );
        }
        return youth;
    } catch (err: unknown) {
        //rethrow any errors as HttpErrors
        if (err instanceof HttpError) {
            throw err;
        } else {
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Youth retrieval by ID failed",
                { cause: err },
            );
        }
    }
};

//Get youth by Email
export const getYouthByEmail = async (email: string) => {
    try {
        const youth = await YouthModel.find({ email: email })
        if (!youth) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No youth with email: " + email,
            );
        }
        return youth;
    } catch (err: unknown) {
        //rethrow any errors as HttpErrors
        if (err instanceof HttpError) {
            throw err;
        } else {
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Youth retrieval by email failed",
                { cause: err },
            );
        }
    }
}

//Get youth by active
export const getActiveYouth = async () => {
    try {
        const youth = await YouthModel.find({ active: true })
        if (!youth) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No active youth",
            );
        }
        return youth;
    } catch (err: unknown) {
        //rethrow any errors as HttpErrors
        if (err instanceof HttpError) {
            throw err;
        } else {
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Youth retrieval by active failed",
                { cause: err },
            );
        }
    }
}

//Get youth by active
export const getInactiveYouth = async () => {
    try {
        const youth = await YouthModel.find({ active: true })
        if (!youth) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "No active youth",
            );
        }
        return youth;
    } catch (err: unknown) {
        //rethrow any errors as HttpErrors
        if (err instanceof HttpError) {
            throw err;
        } else {
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Youth retrieval by active failed",
                { cause: err },
            );
        }
    }
}