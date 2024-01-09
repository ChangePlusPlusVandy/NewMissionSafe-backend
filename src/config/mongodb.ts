import { connect, connection, set } from "mongoose";

export const connectDB = () => {
  try {
    if (process.env.MONGODB) {
      set("strictQuery", false);
      set("strictQuery", false);

      void connect(process.env.MONGODB);
      connection.on("open", () => console.log("Connected to MongoDB"));
      connection.on("error", (error: Error) => console.log(error));
    } else {
      console.error("MONGODB environment variable is not defined.");
    }
  } catch (err) {
    console.error((err as Error).message);
  }
};
