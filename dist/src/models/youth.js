"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouthModel = exports.Youth = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.Youth = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true, index: { unique: true } },
    ssn: { type: String, required: true },
    firebaseUID: { type: String, required: true, index: { unique: true } },
    program: { type: String, required: true },
    active: { type: Boolean, default: false },
    attached_forms: { type: [String], default: [] },
    attended_events: { type: [String], default: [] }, // by Event.code
});
exports.YouthModel = mongoose_1.default.model("Youth", exports.Youth);
//# sourceMappingURL=youth.js.map