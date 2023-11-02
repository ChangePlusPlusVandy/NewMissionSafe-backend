import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface youthType {
  firstName: string;
  lastName: string;
  birthDate: Date;
  ssn: string;
  email: string;
  firebaseUID: string;
  programs: string[];
  active: boolean;
  attached_forms?: string[];
  attended_events?: string[];
}

const Youth = new Schema<youthType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, index: { unique: true } },
  ssn: { type: String, required: true },
  firebaseUID: { type: String, required: true, index: { unique: true } },
  programs: { type: [String] },
  active: { type: Boolean, default: false },
  attached_forms: { type: [String], default: [] }, // by Form._id
  attended_events: { type: [String], default: [] }, // by Event.code
});

module.exports = {
  model: mongoose.models.Youth || mongoose.model("Youth", Youth),
  schema: Youth,
};
