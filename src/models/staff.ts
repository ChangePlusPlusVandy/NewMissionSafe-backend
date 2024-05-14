import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface staffType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  firebaseUID: string;
  program: string;
  active: boolean;
  role: number;
}

const Staff = new Schema<staffType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  phone: { type: String, required: true },
  firebaseUID: { type: String, required: true, index: { unique: true } },
  program: { type: String, required: true },
  active: { type: Boolean, default: false },
  role: { type: Number, required: true },
});

export const StaffModel = mongoose.model("Staff", Staff);
