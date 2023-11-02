import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface eventType {
  name: string;
  description: string;
  code: string;
  date: Date;
  programs: string[];
  staff: string[];
  attended_youth?: string[];
  attached_forms?: string[];
}

const Event = new Schema<eventType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, required: true },
  programs: { type: [String], required: true },
  staff: { type: [String], required: true }, // by Staff.fireID
  attended_youth: { type: [String], default: [] }, // by Youth.fireID
  attached_forms: { type: [String], default: [] }, // by Note._id
});

export const EventModel = mongoose.model("Event", Event);
