import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface attendanceType {
  timestamp: Date;
  youthId: string;
  staffId: string;
  status: string;
}

const Attendance = new Schema<attendanceType>({
  timestamp: { type: Date, required: true },
  youthId: { type: String, requried: true },
  staffId: { type: String, requried: true },
  status: { type: String, requried: true },
});

export const AttendanceModel = mongoose.model("Attendance", Attendance);
