"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Event = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    date: { type: Date, required: true },
    programs: { type: [String], required: true },
    staff: { type: [String], required: true },
    attended_youth: { type: [String], default: [] },
    attached_forms: { type: [String], default: [] }, // by Note._id
});
exports.EventModel = mongoose_1.default.model("Event", Event);
//# sourceMappingURL=event.js.map