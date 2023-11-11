import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connect, connection, set } from "mongoose";
import { router } from "./routers/root.Router";
import { exampleRoute } from "./routes/exampleRoute";
import { verifyToken } from "./middlewares/verifyToken";
import { notFound, errorHandler } from "./middlewares/errors";
import { addStaffToEvent } from "./controllers/event.controller";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow cross-origin requests (for frontend to communicate with backend on different ports/address)
app.use(express.json()); // Parses incoming JSON requests and uts the parsed data in req
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlenconded payloads
// error handling and better logging
app.use(morgan("dev"));
app.use(helmet());

/**
 * Uses the verifyToken middleware to protect the "/data" route
 * Use the verifyToken to protect all the routes that require authentication
 */
app.use("/api", verifyToken, router);
app.use("/example", verifyToken, exampleRoute);

// Default route: Unprotected
app.get("/", (_req: Request, res: Response) => {
  res.send("Express + Typescript Auth Server Temp!");
});

// error handling route
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  try {
    if (process.env.MONGODB) {
      set("strictQuery", false);
      connect(process.env.MONGODB);
    //   connection.on("open", () => console.log("Connected to MongoDB"));
	  connection.on("open", () => {
		console.log("Connected to MongoDB");
		addStaffToEvent('1234', 'trevor')
			.then(res => console.log("updated event: ", res));
	});
      connection.on("error", (error: Error) => console.log(error));
    } else {
      console.error("MONGODB environment variable is not defined.");
    }
  } catch (err) {
    console.error((err as Error).message);
  }
  console.log(`Server starting @ PORT ${PORT}`);
});