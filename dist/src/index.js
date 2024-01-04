"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = require("mongoose");
const root_Router_1 = require("./routers/root.Router");
const exampleRoute_1 = require("./routes/exampleRoute");
const verifyToken_1 = require("./middlewares/verifyToken");
const errors_1 = require("./middlewares/errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)()); // Allow cross-origin requests (for frontend to communicate with backend on different ports/address)
app.use(express_1.default.json()); // Parses incoming JSON requests and uts the parsed data in req
app.use(express_1.default.urlencoded({ extended: true })); // Parses incoming requests with urlenconded payloads
// error handling and better logging
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
/**
 * Uses the verifyToken middleware to protect the "/data" route
 * Use the verifyToken to protect all the routes that require authentication
 */
app.use("/api", verifyToken_1.verifyToken, root_Router_1.router);
app.use("/example", verifyToken_1.verifyToken, exampleRoute_1.exampleRoute);
// Default route: Unprotected
app.get("/", (_req, res) => {
    res.send("Express + Typescript Auth Server Temp!");
});
// error handling route
app.use(errors_1.notFound);
app.use(errors_1.errorHandler);
app.listen(PORT, () => {
    try {
        if (process.env.MONGODB) {
            (0, mongoose_1.set)("strictQuery", false);
            void (0, mongoose_1.connect)(process.env.MONGODB);
            mongoose_1.connection.on("open", () => console.log("Connected to MongoDB"));
            mongoose_1.connection.on("error", (error) => console.log(error));
        }
        else {
            console.error("MONGODB environment variable is not defined.");
        }
    }
    catch (err) {
        console.error(err.message);
    }
    console.log(`Server starting @ PORT ${PORT}`);
});
//# sourceMappingURL=index.js.map