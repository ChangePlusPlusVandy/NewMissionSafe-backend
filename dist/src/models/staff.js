"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Staff = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    firebaseUID: { type: String, required: true, index: { unique: true } },
    programs: { type: [String] },
    active: { type: Boolean, default: false },
    counselor: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
});
exports.StaffModel = mongoose_1.default.model("Staff", Staff);
//# sourceMappingURL=staff.js.map