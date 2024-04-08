import { YouthModel, type youthType } from "../models/youth";
import { HttpError, HttpStatus } from "../utils/errors";

//#region GET Methods

//Get all youth
export const getAllYouth = async () => {
  try {
    const youth = await YouthModel.find();
    if (!youth) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Youth not found");
    }
    return youth;
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Youth retrevial failed",
        { cause: err },
      );
    }
  }
};

//Get youth by firebase ID
export const getYouthByID = async (firebaseUID: string) => {
  try {
    const youth = await YouthModel.find({ firebaseUID: firebaseUID });
    if (!youth) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No youth with id " + firebaseUID,
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
    const youth = await YouthModel.find({ email: email });
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
};

//Get youth by program
export const getYouthByProgram = async (program: string) => {
  try {
    const youth = await YouthModel.find({ program: program });
    if (!youth) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No youth with program: " + program,
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
        "Youth retrieval by program failed",
        { cause: err },
      );
    }
  }
};

//Get youth by active
export const getActiveYouth = async () => {
  try {
    const youth = await YouthModel.find({ active: true });
    if (!youth) {
      throw new HttpError(HttpStatus.NOT_FOUND, "No active youth");
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
};

//Get youth by inactive
export const getInactiveYouth = async () => {
  try {
    const youth = await YouthModel.find({ active: false });
    if (!youth) {
      throw new HttpError(HttpStatus.NOT_FOUND, "No inactive youth");
    }
    return youth;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Youth retrieval by inactive failed",
        { cause: err },
      );
    }
  }
};

//#endregion GET Methods

//#region POST Methods
export const createYouth = async (youthFields: youthType) => {
  try {
    youthFields = {
      ...youthFields,
      birthDate: new Date(youthFields.birthDate),
    };
    console.log(youthFields.middleInitial === null);

    const newYouth = new YouthModel(youthFields);
    await newYouth.save();
    return newYouth;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors

    console.log(err);
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Youth creation failed",
        { cause: err },
      );
    }
  }
};
//#endregion POST Methods

//#region PUT Methods
export const updateYouth = async (
  firebaseUID: string,
  youthFields: youthType,
) => {
  try {
    const updatedYouth = await YouthModel.findOneAndUpdate(
      { firebaseUID: firebaseUID }, //filter by ID
      { $set: youthFields }, //update youth
      { new: true }, // return new obj
    );
    if (!updatedYouth) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No youth with id: " + firebaseUID,
      );
    }
    return updatedYouth;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Update youth failed",
        {
          cause: err,
        },
      );
    }
  }
};

//Activate youth with given ID
export const activateYouth = async (firebaseUID: string) => {
  try {
    const updatedYouth = await YouthModel.findOneAndUpdate(
      { firebaseUID: firebaseUID }, //filter by ID
      { $set: { active: true } }, //activate youth
      { new: true }, // return new obj
    );
    if (!updatedYouth) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No youth with id: " + firebaseUID,
      );
    } else if (!updatedYouth.get("active")) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Youth was not activated",
      );
    }
    return updatedYouth;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Activate youth failed",
        {
          cause: err,
        },
      );
    }
  }
};

//Deactivate youth with given ID
export const deactivateYouth = async (firebaseUID: string) => {
  try {
    const updatedYouth = await YouthModel.findOneAndUpdate(
      { firebaseUID: firebaseUID }, //filter by ID
      { $set: { active: false } }, //deactivate youth
      { new: true }, // return new obj
    );
    if (!updatedYouth) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No youth with id: " + firebaseUID,
      );
    } else if (updatedYouth.get("active")) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Youth was not deactivated",
      );
    }
    return updatedYouth;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    } else {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Deactivate youth failed",
        {
          cause: err,
        },
      );
    }
  }
};

//#endregion PUT METHODS
