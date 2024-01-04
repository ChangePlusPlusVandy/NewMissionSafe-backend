"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    (0, mongoose_1.set)("strictQuery", false);
    try {
        if (process.env.MONGODB) {
            await (0, mongoose_1.connect)(process.env.MONGODB);
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
};
exports.connectDB = connectDB;
//# sourceMappingURL=mongodb.js.map