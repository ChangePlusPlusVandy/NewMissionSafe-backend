import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface youthType {
  firstName: string;
  lastName: string;
  middleInitial: string;
  birthDate: Date;
  ageJoined: number;
  schoolDepartureTime: string;
  programArrivalTime: string;
  gender: string;
  pronouns: string;
  race: string;
  ethnicity: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  ssn: string;
  program: string;
  attached_forms: object[];
  attended_events: string[];
  active: boolean;
  uuid: string;
}

export const Youth = new Schema<youthType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleInitial: { type: String, required: true },
  birthDate: { type: Date, required: true },
  ageJoined: { type: Number, required: true },
  schoolDepartureTime: { type: String, required: true },
  programArrivalTime: { type: String, required: true },
  gender: { type: String, required: true },
  pronouns: { type: String, required: true },
  ethnicity: { type: String, required: true },
  race: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianEmail: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  ssn: { type: String, required: true },
  program: { type: String, required: true },
  attached_forms: { type: [Object], default: [] }, // by Form._id
  attended_events: { type: [String], default: [] }, // by Event.code
  active: { type: Boolean, default: false },
  uuid: { type: String, required: true, index: { unique: true } },
});

export const YouthModel = mongoose.model("Youth", Youth);
