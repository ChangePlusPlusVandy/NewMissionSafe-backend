import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface formType {
  name: string;
  description: string;
  date: Date;
  content: string;
  programs: string[];
  staff: string[];
  associated_youth_id?: string;
  associated_event_id?: string;
}

const Form = new Schema<formType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  programs: { type: [String], required: true },
  associated_youth_id: { type: String, default: null },
  associated_event_id: { type: String, default: null },
});

module.exports = {
  model: mongoose.models.Form || mongoose.model("Form", Form),
  schema: Form,
};
