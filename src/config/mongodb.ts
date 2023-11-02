import { connect, connection, set } from "mongoose";

const connectDB = async () => {
  set("strictQuery", false);

  try {
    if (process.env.MONGODB) {
      await connect(process.env.MONGODB);
      connection.on("open", () => console.log("Connected to MongoDB"));
      connection.on("error", (error: Error) => console.log(error));
    } else {
      console.error("MONGODB environment variable is not defined.");
    }
  } catch (err) {
    console.error((err as Error).message);
  }
};

export { connectDB };
