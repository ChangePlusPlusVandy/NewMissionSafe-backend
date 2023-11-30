import { Router, json } from "express";

const {
  createStaff,
  updateStaff,
  updateStaffActive,
  getAllStaff,
  getStaffByEmail,
  getStaffByID,
  getStaffByActive,
  getStaffByProgram,
} = require("../controllers/staff.controller");

export const staffRouter = Router();
staffRouter.use(json());

// POST add new Staff document
staffRouter.post("/", async (req, res) => {
  try {
    let newStaff = await createStaff(req.body);
    res.status(201).send(newStaff);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET all Staff documents
staffRouter.get("/", async (_req, res) => {
  try {
    let allStaff = await getAllStaff();
    res.status(200).send(allStaff);
  } catch (err) {
    res.status(404).send(err);
  }
});

// GET staff by email
staffRouter.get("/byEmail/:email", async (req, res) => {
  try {
    let staff = await getStaffByEmail(req.params.email);
    res.status(200).send(staff);
  } catch (err) {
    res.status(404).send(err);
  }
});

// GET Staff document matching param fireID
staffRouter.get("/byID/:firebaseUID", async (req, res) => {
  try {
    let staff = await getStaffByID(req.params.firebaseUID);
    res.status(200).send(staff);
  } catch (err) {
    res.status(404).send(err);
  }
});

// GET active Staff
staffRouter.get("/active", async (_req, res) => {
  try {
    let activeStaff = await getStaffByActive(true);
    res.status(200).send(activeStaff);
  } catch (err) {
    res.status(404).send(err);
  }
});

// GET inactive Staff
staffRouter.get("/inactive", async (_req, res) => {
  try {
    let inactiveStaff = await getStaffByActive(false);
    res.status(200).send(inactiveStaff);
  } catch (err) {
    res.status(404).send(err);
  }
});

// GET staff by email
staffRouter.get("/byPrograms/:programs", async (req, res) => {
  try {
    let staff = await getStaffByProgram(req.params.programs);
    res.status(200).send(staff);
  } catch (err) {
    res.status(404).send(err);
  }
});

// PUT active to true for Staff document matching
//     param fireID
staffRouter.put("/activate/:firebaseUID", async (req, res) => {
  try {
    await updateStaff(req.params.firebaseUID, { key: "active", value: false });
    res.status(200).send("Staff activated");
  } catch (err) {
    res.status(500).send(err);
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
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT new firstName
//     param firebaseUID
staffRouter.put("/updateFirstName/:firebaseUID", async (req, res) => {
  try {
    await updateStaff(req.params.firebaseUID, {
      key: "firstName",
      value: req.body.firstName,
    });
    res.status(200).send("Staff first name updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT new lastName
//     param firebaseUID
staffRouter.put("/updateLastName/:firebaseUID", async (req, res) => {
  try {
    await updateStaff(req.params.firebaseUID, {
      key: "lastName",
      value: req.body.lastName,
    });
    res.status(200).send("Staff last name updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT new email
//     param firebaseUID
staffRouter.put("/updateEmail/:firebaseUID", async (req, res) => {
  try {
    await updateStaff(req.params.firebaseUID, {
      key: "email",
      value: req.body.email,
    });
    res.status(200).send("Staff email updated");
  } catch (err) {
    res.status(500).send(err);
  }
});
