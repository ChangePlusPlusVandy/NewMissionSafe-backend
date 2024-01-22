import { StaffModel, type staffType } from "../models/staff";
import { HttpError, HttpStatus, checkMongooseErrors } from "../utils/errors";

export const createStaff = async (staffFields: staffType) => {
  try {
    const newStaff = new StaffModel(staffFields);
    await newStaff.save();
    return newStaff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Staff creation failed",
        { cause: err },
      );
    }
  }
};

export const updateStaff = async (
  firebaseUID: string,
  update: { key: string; value: string },
) => {
  try {
    const updateObj = { $set: { [update.key]: update.value } };
    const updatedStaff = await StaffModel.findOneAndUpdate(
      { firebaseUID },
      updateObj,
      { new: true },
    );

    if (!updatedStaff) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Staff not found");
    }
    return updatedStaff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Update staff failed",
      {
        cause: err,
      },
    );
  }
};

export const updateStaffActive = async (
  firebaseUID: string,
  update: { key: string; value: boolean },
) => {
  try {
    const updateObj = { $set: { [update.key]: update.value } };
    const updatedStaff = await StaffModel.findOneAndUpdate(
      { firebaseUID },
      updateObj,
      { new: true },
    );

    if (!updatedStaff) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Staff not found");
    }
    return updatedStaff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Update staff failed",
      {
        cause: err,
      },
    );
  }
};

export const getAllStaff = async () => {
  try {
    const allStaff = await StaffModel.find({});
    return allStaff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Staff retrieval failed",
      { cause: err },
    );
  }
};

export const getStaffByEmail = async (emailValue: string) => {
  try {
    const staff = await StaffModel.findOne({ email: emailValue });
    return staff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Staff retrieval failed",
      { cause: err },
    );
  }
};

export const getStaffByID = async (firebaseUIDValue: string) => {
  try {
    const staff = await StaffModel.findOne({ firebaseUID: firebaseUIDValue });
    if (!staff) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Staff not found");
    }
    return staff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Staff retrieval failed",
      { cause: err },
    );
  }
};

export const getStaffByActive = async (activeValue: boolean) => {
  try {
    const staff = await StaffModel.find({ active: activeValue });
    return staff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Staff retrieval failed",
      { cause: err },
    );
  }
};

export const getStaffByProgram = async (programValue: string) => {
  try {
    const staff = await StaffModel.find({ programs: programValue });
    return staff;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Staff retrieval failed",
      { cause: err },
    );
  }
};
