import { Router, type Request, type Response } from "express";
import {
  createEvent,
  getAllEvents,
  getEventByCode,
  addStaffToEvent,
  addYouthToEvent,
} from "../controllers/event.controller";
import { HttpError } from "../utils/errors";
import { type eventType } from "../models/event";
export const eventRouter = Router();

//gets list of all events
eventRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const allEvents = await getAllEvents();
    res.status(200).json(allEvents);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

//gets event with a provided code
eventRouter.get("/:eventCode", async (req, res) => {
  try {
    //technically an array of events could be returned
    const event = await getEventByCode(req.params.eventCode);
    res.status(200).json(event);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

//adds event
eventRouter.post(
  "/",
  async (req: Request<any, any, eventType>, res: Response) => {
    try {
      const event = await createEvent(req.body);
      res.status(200).json(event);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
);

//adds a staff member to an event
eventRouter.put(
  "/addStaff/:eventCode",
  async (
    req: Request<
      {
        eventCode: string;
      },
      any,
      {
        firebaseUID: string;
      }
    >,
    res,
  ) => {
    try {
      const event = await addStaffToEvent(
        req.params.eventCode,
        req.body.firebaseUID,
      );
      res.status(200).json(event);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
);

//adds a youth to an event
eventRouter.put(
  "/attend/:eventCode",
  async (
    req: Request<
      {
        eventCode: string;
      },
      any,
      {
        firebaseUID: string;
      }
    >,
    res,
  ) => {
    try {
      await addYouthToEvent(req.params.eventCode, req.body.firebaseUID);
      res.status(200).send("Youth marked as present");
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
);
