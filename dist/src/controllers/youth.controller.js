"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateYouth = exports.activateYouth = exports.updateYouth = exports.createYouth = exports.getInactiveYouth = exports.getActiveYouth = exports.getYouthByProgram = exports.getYouthByEmail = exports.getYouthByID = exports.getAllYouth = void 0;
const youth_1 = require("../models/youth");
const errors_1 = require("../utils/errors");
//#region GET Methods
//Get all youth
const getAllYouth = async () => {
    try {
        const youth = await youth_1.YouthModel.find();
        if (!youth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "Youth not found");
        }
        return youth;
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth retrevial failed", { cause: err });
        }
    }
};
exports.getAllYouth = getAllYouth;
//Get youth by firebase ID
const getYouthByID = async (firebaseUID) => {
    try {
        const youth = await youth_1.YouthModel.find({ firebaseUID: firebaseUID });
        if (!youth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No youth with id " + firebaseUID);
        }
        return youth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth retrieval by ID failed", { cause: err });
        }
    }
};
exports.getYouthByID = getYouthByID;
//Get youth by Email
const getYouthByEmail = async (email) => {
    try {
        const youth = await youth_1.YouthModel.find({ email: email });
        if (!youth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No youth with email: " + email);
        }
        return youth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth retrieval by email failed", { cause: err });
        }
    }
};
exports.getYouthByEmail = getYouthByEmail;
//Get youth by program
const getYouthByProgram = async (program) => {
    try {
        const youth = await youth_1.YouthModel.find({ program: program });
        if (!youth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No youth with program: " + program);
        }
        return youth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth retrieval by program failed", { cause: err });
        }
    }
};
exports.getYouthByProgram = getYouthByProgram;
//Get youth by active
const getActiveYouth = async () => {
    try {
        const youth = await youth_1.YouthModel.find({ active: true });
        if (!youth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No active youth");
        }
        return youth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth retrieval by active failed", { cause: err });
        }
    }
};
exports.getActiveYouth = getActiveYouth;
//Get youth by inactive
const getInactiveYouth = async () => {
    try {
        const youth = await youth_1.YouthModel.find({ active: false });
        if (!youth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No inactive youth");
        }
        return youth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth retrieval by inactive failed", { cause: err });
        }
    }
};
exports.getInactiveYouth = getInactiveYouth;
//#endregion GET Methods
//#region POST Methods
const createYouth = async (youthFields) => {
    try {
        const newYouth = new youth_1.YouthModel(youthFields);
        await newYouth.save();
        return newYouth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth creation failed", { cause: err });
        }
    }
};
exports.createYouth = createYouth;
//#endregion POST Methods
//#region PUT Methods
const updateYouth = async (firebaseUID, youthFields) => {
    try {
        const updatedYouth = await youth_1.YouthModel.findOneAndUpdate({ firebaseUID: firebaseUID }, //filter by ID
        { $set: youthFields }, //update youth
        { new: true });
        if (!updatedYouth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No youth with id: " + firebaseUID);
        }
        return updatedYouth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Update youth failed", {
                cause: err,
            });
        }
    }
};
exports.updateYouth = updateYouth;
//Activate youth with given ID
const activateYouth = async (firebaseUID) => {
    try {
        const updatedYouth = await youth_1.YouthModel.findOneAndUpdate({ firebaseUID: firebaseUID }, //filter by ID
        { $set: { active: true } }, //activate youth
        { new: true });
        if (!updatedYouth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No youth with id: " + firebaseUID);
        }
        else if (!updatedYouth.get("active")) {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth was not activated");
        }
        return updatedYouth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Activate youth failed", {
                cause: err,
            });
        }
    }
};
exports.activateYouth = activateYouth;
//Deactivate youth with given ID
const deactivateYouth = async (firebaseUID) => {
    try {
        const updatedYouth = await youth_1.YouthModel.findOneAndUpdate({ firebaseUID: firebaseUID }, //filter by ID
        { $set: { active: false } }, //deactivate youth
        { new: true });
        if (!updatedYouth) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No youth with id: " + firebaseUID);
        }
        else if (updatedYouth.get("active")) {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Youth was not deactivated");
        }
        return updatedYouth;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Deactivate youth failed", {
                cause: err,
            });
        }
    }
};
exports.deactivateYouth = deactivateYouth;
//#endregion PUT METHODS
//# sourceMappingURL=youth.controller.js.map