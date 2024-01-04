"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Form = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    programs: { type: [String], required: true },
    associated_youth_id: { type: String, default: null },
    associated_event_id: { type: String, default: null },
});
exports.FormModel = mongoose_1.default.model("Form", Form);
//# sourceMappingURL=form.js.map