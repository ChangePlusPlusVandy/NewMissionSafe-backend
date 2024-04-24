import { Router, json } from "express";
import {
  createStaff,
  updateStaff,
  updateStaffActive,
  getAllStaff,
  getStaffByEmail,
  getStaffByID,
  getStaffByActive,
  getStaffByProgram,
} from "../controllers/staff.controller";
import { HttpError, HttpStatus } from "../utils/errors";

export const staffRouter = Router();
staffRouter.use(json());

// POST add new Staff document
staffRouter.post("/", async (req, res) => {
  try {
    const newStaff = await createStaff(req.body);
    res.status(201).send(newStaff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET all Staff documents
staffRouter.get("/", async (_req, res) => {
  try {
    const allStaff = await getAllStaff();
    res.status(200).send(allStaff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET staff by email
staffRouter.get("/byEmail/:email", async (req, res) => {
  try {
    const staff = await getStaffByEmail(req.params.email);
    res.status(200).send(staff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET Staff document matching param fireID
staffRouter.get("/byID/:firebaseUID", async (req, res) => {
  try {
    const staff = await getStaffByID(req.params.firebaseUID);
    res.status(200).send(staff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET active Staff
staffRouter.get("/active", async (_req, res) => {
  try {
    const activeStaff = await getStaffByActive(true);
    res.status(200).send(activeStaff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET inactive Staff
staffRouter.get("/inactive", async (_req, res) => {
  try {
    const inactiveStaff = await getStaffByActive(false);
    res.status(200).send(inactiveStaff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET staff by program
staffRouter.get("/byProgram/:program", async (req, res) => {
  try {
    const staff = await getStaffByProgram(req.params.program);
    res.status(200).send(staff);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// PUT active to true for Staff document matching
//     param fireID
staffRouter.put("/activate/:firebaseUID", async (req, res) => {
  try {
    await updateStaffActive(req.params.firebaseUID, {
      key: "active",
      value: true,
    });
    res.status(200).send("Staff activated");
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// PUT active to false for Staff document matching
//     param fireID
staffRouter.put("/deactivate/:firebaseUID", async (req, res) => {
  try {
    await updateStaffActive(req.params.firebaseUID, {
      key: "active",
      value: false,
    });
    res.status(200).send("Staff deactivated");
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// PUT update staff attribute
//     param firebaseUID
//     body should include key and value
staffRouter.put("/updateStaffAttribute/:firebaseUID", async (req, res) => {
  try {
    const { key, value } = req.body;

    // Validate the key to ensure it's one of the allowed fields
    const validKeys = ["firstName", "lastName", "email"];
    if (!validKeys.includes(key)) {
      return res.status(400).json({ error: "Invalid key provided" });
    }

    const updatedStaff = await updateStaff(req.params.firebaseUID, {
      key,
      value,
    });

    res.status(200).send(`Staff ${key} updated`);
    return updatedStaff;
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
