import { Router, json } from "express";
import { HttpError } from "../utils/errors";
import {
  createAndAddResponseToForm,
  createForm,
  getAllForms,
  getFormByID,
  getFormResponse,
} from "../controllers/form.controller";

export const formRouter = Router();
formRouter.use(json());

//POST new form
formRouter.post("/", async (req, res) => {
  try {
    const newForm = await createForm(req.body);
    res.status(201).json(newForm);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while creating form" });
    }
  }
});

//GET all forms
formRouter.get("/", async (req, res) => {
  try {
    const allForms = await getAllForms();
    res.status(200).json(allForms);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while getting all forms" });
    }
  }
});

//GET a form
formRouter.get("/:formID", async (req, res) => {
  try {
    const form = await getFormByID(req.params.formID);
    res.status(200).json(form);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while getting all forms" });
    }
  }
});

//PUT new response
formRouter.put("/:formID", async (req, res) => {
  try {
    const form = await createAndAddResponseToForm(req.params.formID, req.body);
    res.status(200).json(form);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while adding response" });
    }
  }
});

//GET response
formRouter.get("/:formID/:responseID", async (req, res) => {
  try {
    const formResponse = await getFormResponse(
      req.params.formID,
      req.params.responseID,
    );
    res.status(200).json(formResponse);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while getting response" });
    }
  }
});
