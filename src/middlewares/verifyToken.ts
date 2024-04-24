// Imports the Firebase auth
// Splits the authorization header ("Bearer <token>")
// into an array and takes the second element, which is the token
import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../config/firebase";

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Token not found");
    }

    // Verifies the token and decodes it to get associated user data
    // and stores it in req.body.user to be accessed by other routes
    const decodeValue = await auth.verifyIdToken(token);

    if (!decodeValue) {
      throw new Error("Token verification failed");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.user = decodeValue;
    next();
  } catch (e) {
    next(e); // Pass the error to Express error-handling middleware
  }
};
