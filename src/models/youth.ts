import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface youthType {
  firstName: string;
  lastName: string;
  middleInitial: string;

  birthDate: Date;
  ageJoined: number;
  gender: string;
  pronouns: string;
  race: string;
  ethnicity: string;

  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;

  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  schoolName: string;
  grade: string;
  schoolId: string;
  educationalStatus: string;
  schoolDepartureTime: string;
  programArrivalTime: string;

  program: string;
  attached_forms: object[];
  attended_events: string[];
  active: boolean;
  uuid: string;

  medicalConditions: string;
  allergies: string;
  specialInstructions: string;
  healthInsurance: string;
  nameOfDoctor: string;
  doctorPhoneNumber: string;
  hospitalName: string;
}

export const Youth = new Schema<youthType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleInitial: { type: String, required: true },

  birthDate: { type: Date, required: true },
  ageJoined: { type: Number, required: true },
  gender: { type: String, required: true },
  pronouns: { type: String, required: true },
  race: { type: String, required: true },
  ethnicity: { type: String, required: true },

  guardianName: { type: String, required: true },
  guardianEmail: { type: String, required: true },
  guardianPhone: { type: String, required: true },

  ssn: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },

  schoolName: { type: String, required: true },
  grade: { type: String, required: true },
  schoolId: { type: String, required: true },
  educationalStatus: { type: String, required: true },
  programArrivalTime: { type: String, required: true },
  schoolDepartureTime: { type: String, required: true },

  program: { type: String, required: true },
  attached_forms: { type: [Object], default: [] }, // by Form._id
  attended_events: { type: [String], default: [] }, // by Event.code
  active: { type: Boolean, default: false },
  uuid: { type: String, required: true, index: { unique: true } },

  medicalConditions: { type: String, required: true },
  allergies: { type: String, required: true },
  specialInstructions: { type: String, required: true },
  healthInsurance: { type: String, required: true },
  nameOfDoctor: { type: String, required: true },
  doctorPhoneNumber: { type: String, required: true },
  hospitalName: { type: String, required: true },
});

export const YouthModel = mongoose.model("Youth", Youth);
