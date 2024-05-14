import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface attendanceType {
  timestamp: Date;
  youthId: string;
  staffName: string;
  status: string;
  youthName: string;
  dropIn: string;
  modified: string;
}

const Attendance = new Schema<attendanceType>({
  timestamp: { type: Date, required: true },
  youthId: { type: String, required: true },
  staffName: { type: String, required: true },
  status: { type: String, required: true },
  youthName: { type: String, required: true },
  dropIn: { type: String, required: true },
  modified: { type: String, required: true },
});

export const AttendanceModel = mongoose.model("Attendance", Attendance);
