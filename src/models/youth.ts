import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface youthType {
  firstName: string;
  lastName: string;
  birthDate: Date;
  ssn: string;
  email: string;
  firebaseUID: string;
  program: string;
  active: boolean;
  attached_forms?: string[];
  attended_events?: string[];
}

export const Youth = new Schema<youthType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, index: { unique: true } },
  ssn: { type: String, required: true },
  firebaseUID: { type: String, required: true, index: { unique: true } },
  program: { type: String, required: true },
  active: { type: Boolean, default: false },
  attached_forms: { type: [String], default: [] }, // by Form._id
  attended_events: { type: [String], default: [] }, // by Event.code
});

export const YouthModel = mongoose.model("Youth", Youth);
