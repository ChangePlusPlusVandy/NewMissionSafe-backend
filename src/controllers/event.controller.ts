import { EventModel, type eventType } from "../models/event";
import { HttpError, HttpStatus, checkMongooseErrors } from "../utils/errors";

//gets list of all events
export const getAllEvents = async () => {
  try {
    const events = await EventModel.find();
    if (events.length === 0) {
      throw new HttpError(HttpStatus.NOT_FOUND, "Events not found");
    }
    return events;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Event retrieval failed",
      { cause: err },
    );
  }
};

//gets one event (or possibly multiple) with provided event code
export const getEventByCode = async (eventCode: string) => {
  try {
    // this will find all events w/ eventCode
    const event = await EventModel.find({ code: eventCode });
    if (event.length === 0) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No event with code " + eventCode,
      );
    }
    return event;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Event retrieval failed",
      { cause: err },
    );
  }
};

//review: should I have some sort of upsert to ensure duplicate events aren't inserted?

//creates event
export const createEvent = async (eventFields: eventType) => {
  try {
    const newEvent = new EventModel(eventFields);
    await newEvent.save();
    return newEvent;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Event creation failed",
      { cause: err },
    );
  }
};

//adds a staff member to event with provided event code
export const addStaffToEvent = async (
  eventCode: string,
  firebaseUID: string,
) => {
  try {
    const updatedDocument = await EventModel.findOneAndUpdate(
      { code: eventCode }, // Filter to find the document
      { $addToSet: { staff: firebaseUID } }, // Update operation
      { new: true }, // Options: return the modified document
    );
    if (!updatedDocument) {
      throw new HttpError(
        HttpStatus.NOT_FOUND,
        "No event with code " + eventCode,
      );
    }
    return updatedDocument;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, "Add staff failed", {
      cause: err,
    });
  }
};

//adds a youth to an event with provided event code
export const addYouthToEvent = async (
  eventCode: string,
  firebaseUID: string,
) => {
  try {
    const updatedDocument = await EventModel.findOneAndUpdate(
      { code: eventCode }, // Filter to find the document
      { $addToSet: { attended_youth: firebaseUID } }, // Update operation
      { new: true }, // Options: return the modified document
    );
    if (!updatedDocument) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "No event with code " + eventCode,
      );
    }
    return updatedDocument;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, "Add youth failed", {
      cause: err,
    });
  }
};
