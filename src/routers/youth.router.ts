import { Router, type Request, type Response } from "express";
import {
  getAllYouth,
  getYouthByID,
  getYouthByEmail,
  getYouthByProgram,
  getActiveYouth,
  getInactiveYouth,
  createYouth,
  updateYouth,
  activateYouth,
  deactivateYouth,
} from "../controllers/youth.controller";
import { HttpError } from "../utils/errors";
import { type youthType } from "../models/youth";

export const youthRouter = Router();

//#region GET Methods

//Get all youth
youthRouter.get("/", async (req: Request, res: Response) => {
  try {
    const youth = await getAllYouth();
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while getting all youth" });
    }
  }
});

//Get youth by ID
youthRouter.get("/byID/:firebaseUID", async (req: Request, res: Response) => {
  try {
    const youth = await getYouthByID(req.params.firebaseUID);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while getting youth by ID" });
    }
  }
});

//Get youth by email
youthRouter.get("/byEmail/:email", async (req: Request, res: Response) => {
  try {
    const youth = await getYouthByEmail(req.params.email);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred while getting youth by email",
      });
    }
  }
});

//Get youth by program
youthRouter.get("/byProgram/:program", async (req: Request, res: Response) => {
  try {
    const youth = await getYouthByProgram(req.params.program);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred while getting youth by program",
      });
    }
  }
});

//Get all active youth
youthRouter.get("/active", async (req: Request, res: Response) => {
  try {
    const youth = await getActiveYouth();
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred while getting active youth",
      });
    }
  }
});

//Get all inactive youth
youthRouter.get("/inactive", async (req: Request, res: Response) => {
  try {
    const youth = await getInactiveYouth();
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({
        error: "An unknown error occurred while getting inactive youth",
      });
    }
  }
});
//#endregion GET Methods

//#region POST Methods

//Create new youth
youthRouter.post("/", async (req: Request, res: Response) => {
  try {
    const youthData = req.body
    const youth = await createYouth(youthData);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while creating youth" });
    }
  }
});

//#endregion POST Methods

//#region PUT Methods

//Update Youth
youthRouter.put("/:firebaseUID", async (req: Request, res: Response) => {
  try {
    const youthData = req.body as youthType;
    const youth = await updateYouth(req.params.firebaseUID, youthData);
    res.status(200).json(youth);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while updating youth" });
    }
  }
});

//Activate youth
youthRouter.put(
  "/activate/:firebaseUID",
  async (req: Request, res: Response) => {
    try {
      const youth = await activateYouth(req.params.firebaseUID);
      res.status(200).json(youth);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res
          .status(500)
          .json({ error: "An unknown error occurred while activating youth" });
      }
    }
  },
);

//Deactivate youth
youthRouter.put(
  "/deactivate/:firebaseUID",
  async (req: Request, res: Response) => {
    try {
      const youth = await deactivateYouth(req.params.firebaseUID);
      res.status(200).json(youth);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.status(err.errorCode).json({ error: err.message });
      } else {
        res.status(500).json({
          error: "An unknown error occurred while deactivating youth",
        });
      }
    }
  },
);
//#endregion PUT Methods
