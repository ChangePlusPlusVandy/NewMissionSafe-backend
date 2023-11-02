import { Router } from "express";

import { eventRouter } from "./event.router";
import { formRouter } from "./form.router";
import { userRouter } from "./user.router";

export const router = Router();

router.use("/events", eventRouter);
router.use("/forms", formRouter);
router.use("/users", userRouter);

module.exports = { router };
