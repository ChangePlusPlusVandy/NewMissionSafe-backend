import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface staffType {
  firstName: string;
  lastName: string;
  email: string;
  firebaseUID: string;
  programs: string[];
  active: boolean;
  counselor: boolean;
  admin: boolean;
}

const Staff = new Schema<staffType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  firebaseUID: { type: String, required: true, index: { unique: true } },
  programs: { type: [String] },
  active: { type: Boolean, default: false },
  counselor: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

export const StaffModel = mongoose.model("Staff", Staff);
