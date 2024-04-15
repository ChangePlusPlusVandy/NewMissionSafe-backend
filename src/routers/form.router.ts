import { Router, json } from "express";
import { HttpError } from "../utils/errors";
import {
  createAndAddResponseToForm,
  createForm,
  getAllForms,
  getFormByID,
  getFormResponse,
  handleImageResponse,
} from "../controllers/form.controller";
import { uploadS3 } from "../config/multer";
import multer from "multer";

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
formRouter.put("/:formID", uploadS3.array("images"), async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
    if ((req.headers["content-type"] || "").startsWith("multipart/form-data")) {
      for (let i = 0; i < req.body.responses.length; ++i) {
        if (req.body.responses[i] == "image") {
          const files = req.files as any;
          req.body.responses[i] = `image:${files.shift().key}`; //shows as image:key for decoding later
        }
      }
    }

    const form = await createAndAddResponseToForm(req.params.formID, req.body);
    res.status(200).json(form);
  } catch (err: unknown) {
    console.log("PUT RESPONSE ERR:", err);
    if (err instanceof HttpError) {
      res.status(err.errorCode).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An unknown error occurred while adding response" });
    }
  }
});

//GET image
formRouter.get("/images/:key", async (req, res) => {
  try {
    const clientETag = req.headers["if-none-match"];
	await handleImageResponse(
      req.params.key,
      res,
      clientETag,
    );
	//handleImageResponse function shouldn't return without either throwing an error or ending the response
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
