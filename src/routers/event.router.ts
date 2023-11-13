import { Router, type Request, type Response } from "express";
import {
  createEvent,
  getAllEvents,
  getEventByCode,
  addStaffToEvent,
  addYouthToEvent,
} from "../controllers/event.controller";
export const eventRouter = Router();

//review: is it good to return raw errors to the frontend?
eventRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const allEvents = await getAllEvents();
    res.status(200).json(allEvents);
  } catch (err) {
    //typescript makes us do this
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(404).json({ error: "An unknown error occurred" });
    }
  }
});

eventRouter.get("/:eventCode", async (req, res) => {
  try {
    //technically an array of events could be returned
    const event = await getEventByCode(req.params.eventCode);
    res.status(200).json(event);
  } catch (err) {
    //typescript makes us do this
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(404).json({ error: "An unknown error occurred" });
    }
  }
});

eventRouter.post("/", async (req: Request, res: Response) => {
  try {
    let event = await createEvent(req.body);
    res.status(200).json(event);
  } catch (err) {
    //typescript makes us do this
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

eventRouter.put("/addStaff/:eventCode", async (req, res) => {
  try {
    let event = await addStaffToEvent(
      req.params.eventCode,
      req.body.firebaseUID,
    );
    res.status(200).json(event);
  } catch (err) {
    //typescript makes us do this
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

eventRouter.put("/attend/:eventCode", async (req, res) => {
  try {
    await addYouthToEvent(req.params.eventCode, req.body.firebaseUID);
    res.status(200).send("Youth marked as present"); //review: would it be more useful to just return the updated document
  } catch (err) {
    //typescript makes us do this
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});