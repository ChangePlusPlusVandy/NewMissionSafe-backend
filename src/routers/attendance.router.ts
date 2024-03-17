import { Router, type Request, type Response } from "express";
import {
  getYouthAttendanceDay,
  getAttendanceInRange,
  updateStatus,
  addAttendanceEntry,
} from "../controllers/attendance.controller";
import { HttpError } from "../utils/errors";
import { type attendanceType } from "../models/attendance";
export const attendanceRouter = Router();

attendanceRouter.get("/:uid/:date", async (req: Request, res: Response) => {
  try {
    const date = new Date(req.params.date);
    const youth = await getYouthAttendanceDay(date, req.params.uid);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

attendanceRouter.get("/getAttendances", async (req: Request, res: Response) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const youth = await getAttendanceInRange(startDate, endDate);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

attendanceRouter.post(
  "/",
  async (req: Request<any, any, attendanceType>, res: Response) => {
    try {
      const entry = await addAttendanceEntry(req.body);
      res.status(200).json(entry);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
);

attendanceRouter.put(
  "/:uid/:date/:status",
  async (req: Request, res: Response) => {
    try {
      const date = new Date(req.params.date);
      const youth = await updateStatus(date, req.params.uid, req.params.status);
      res.status(200).json(youth);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
);
