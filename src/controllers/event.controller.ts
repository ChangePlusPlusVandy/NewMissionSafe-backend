import { EventModel, eventType } from "../models/event";

//review: which fields should have defaults provided?
export async function createEvent(eventFields: eventType){ //review: should attended youth be involved in this function or are youth only added at a later date?
	const newEvent = new EventModel(eventFields); //review: in the old one they were generating some fields in this function such as code and date. Should any fields be generated here?
	await newEvent.save(); //review: should error handling be done here
	return newEvent;
}

export async function getAllEvents(){
	const events = await EventModel.find();
	if(!events) throw new Error("Events not found"); //review: this was from the old code but I'm having questions b/c should there actually be an error if there really are no events
	return events;
}

export async function getEventByCode(eventCode: string){
    // get all events with code of eventCode
    const events = await EventModel.find({ code: eventCode });
	if (!events) throw new Error("Event not found"); //review: same question as above
	return events;
};

export async function addStaffToEvent(eventCode: string){
	
}