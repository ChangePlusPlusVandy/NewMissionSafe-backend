"use strict";
//firebase-config.ts
// Description: Imports the Firebase configurations and uses it to initialize the Firebase SDK.
// Exports auth to be used in other files.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const serviceAccountKey_json_1 = __importDefault(require("../../serviceAccountKey.json"));
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccountKey_json_1.default),
});
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
//# sourceMappingURL=firebase.js.map