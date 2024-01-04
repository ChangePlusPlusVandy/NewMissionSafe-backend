"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const firebase_1 = require("../config/firebase");
const verifyToken = async (req, _res, next) => {
    try {
        console.log("header: ", req);
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Token not found");
        }
        // Verifies the token and decodes it to get associated user data
        // and stores it in req.body.user to be accessed by other routes
        const decodeValue = await firebase_1.auth.verifyIdToken(token);
        if (!decodeValue) {
            throw new Error("Token verification failed");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.body.user = decodeValue;
        next();
    }
    catch (e) {
        next(e); // Pass the error to Express error-handling middleware
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map