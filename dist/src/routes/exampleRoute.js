"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleRoute = void 0;
const express_1 = __importDefault(require("express"));
const exampleRoute = express_1.default.Router(); // Creates a new router object
exports.exampleRoute = exampleRoute;
exampleRoute.get("/", (req, res) => {
    res.send(' "93% of people don\'t check facts they read on the internet" - Abraham Lincoln');
});
//# sourceMappingURL=exampleRoute.js.map