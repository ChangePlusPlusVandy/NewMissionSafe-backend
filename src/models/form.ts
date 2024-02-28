import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface responseType {
  responseID: string;
  creatorID: string;
  associatedYouthID: string;
  timestamp: Date;
  responses: string[];
}

const Response = new Schema<responseType>({
  responseID: { type: String, required: true },
  creatorID: { type: String, required: true },
  timestamp: { type: Date, requried: true },
  associatedYouthID: { type: String, required: true },
  responses: { type: [String], required: true },
});
export interface formType {
  formID: string;
  name: string;
  description: string;
  dateCreated: Date;
  creatorID: string;
  questions: string[];
  responses?: responseType[];
  isCounselorForm: boolean;
}

const Form = new Schema<formType>({
  formID: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  creatorID: { type: String, required: true },
  questions: { type: [String], required: true },
  responses: { type: [Response] },
  isCounselorForm: { type: Boolean },
});

export const FormModel = mongoose.model("Form", Form);
export const ResponseModel = mongoose.model("Response", Response);
