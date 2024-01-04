"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addYouthToEvent = exports.addStaffToEvent = exports.createEvent = exports.getEventByCode = exports.getAllEvents = void 0;
const event_1 = require("../models/event");
const errors_1 = require("../utils/errors");
//gets list of all events
const getAllEvents = async () => {
    try {
        const events = await event_1.EventModel.find();
        if (!events) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "Events not found");
        }
        return events;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Event retrieval failed", { cause: err });
        }
    }
};
exports.getAllEvents = getAllEvents;
//gets one event (or possibly multiple) with provided event code
const getEventByCode = async (eventCode) => {
    try {
        // this will find all events w/ eventCode
        const event = await event_1.EventModel.find({ code: eventCode });
        if (!event) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No event with code " + eventCode);
        }
        return event;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Event retrieval failed", { cause: err });
        }
    }
};
exports.getEventByCode = getEventByCode;
//review: should I have some sort of upsert to ensure duplicate events aren't inserted?
//creates event
const createEvent = async (eventFields) => {
    try {
        const newEvent = new event_1.EventModel(eventFields);
        await newEvent.save();
        return newEvent;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Event creation failed", { cause: err });
        }
    }
};
exports.createEvent = createEvent;
//adds a staff member to event with provided event code
const addStaffToEvent = async (eventCode, firebaseUID) => {
    try {
        const updatedDocument = await event_1.EventModel.findOneAndUpdate({ code: eventCode }, // Filter to find the document
        { $addToSet: { staff: firebaseUID } }, // Update operation
        { new: true });
        if (!updatedDocument) {
            throw new errors_1.HttpError(errors_1.HttpStatus.NOT_FOUND, "No event with code " + eventCode);
        }
        return updatedDocument;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Add staff failed", {
                cause: err,
            });
        }
    }
};
exports.addStaffToEvent = addStaffToEvent;
//adds a youth to an event with provided event code
const addYouthToEvent = async (eventCode, firebaseUID) => {
    try {
        const updatedDocument = await event_1.EventModel.findOneAndUpdate({ code: eventCode }, // Filter to find the document
        { $addToSet: { attended_youth: firebaseUID } }, // Update operation
        { new: true });
        if (!updatedDocument) {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "No event with code " + eventCode);
        }
        return updatedDocument;
    }
    catch (err) {
        //rethrow any errors as HttpErrors
        if (err instanceof errors_1.HttpError) {
            throw err;
        }
        else {
            throw new errors_1.HttpError(errors_1.HttpStatus.INTERNAL_SERVER_ERROR, "Add youth failed", {
                cause: err,
            });
        }
    }
};
exports.addYouthToEvent = addYouthToEvent;
//# sourceMappingURL=event.controller.js.map