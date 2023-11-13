import { EventModel, eventType } from "../models/event";

//review: should I have some sort of upsert to ensure duplicate events aren't inserted?
export const createEvent = async (eventFields: eventType) => {
  const newEvent = new EventModel(eventFields); //review: in the old one they were generating some fields in this function such as code and date. Should any fields be generated here?
  await newEvent.save();
  return newEvent;
};

export const getAllEvents = async () => {
  const events = await EventModel.find();
  if (!events) throw new Error("Events not found");
  return events;
};

export const getEventByCode = async (eventCode: string) => {
  // this will find all events w/ eventCode
  const event = await EventModel.find({ code: eventCode });
  if (!event) throw new Error("Event not found");
  return event;
};

//review: it looks like we're using event as an id. Is there any reason to not just use mongo's _id field then show the event's name on the frontend?
export const addStaffToEvent = async (eventCode: string, firebaseUID: string) => {
  const updatedDocument = await EventModel.findOneAndUpdate(
    { code: eventCode }, // Filter to find the document
    { $addToSet: { staff: firebaseUID } }, // Update operation
    { new: true }, // Options: return the modified document
  );
  if (!updatedDocument) throw new Error("No event with code " + eventCode);
  return updatedDocument;
};

export const addYouthToEvent = async (eventCode: string, firebaseUID: string) => {
  const updatedDocument = await EventModel.findOneAndUpdate(
    { code: eventCode }, // Filter to find the document
    { $addToSet: { attended_youth: firebaseUID } }, // Update operation
    { new: true }, // Options: return the modified document
  );
  if (!updatedDocument) throw new Error("No event with code " + eventCode);
  return updatedDocument;
};
