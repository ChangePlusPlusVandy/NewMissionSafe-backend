import { Router } from "express";
import { eventRouter } from "./event.router";
import { formRouter } from "./form.router";
import { staffRouter } from "./staff.router";
import { youthRouter } from "./youth.router";

export const router = Router();

router.use("/events", eventRouter);
router.use("/forms", formRouter);
router.use("/staff", staffRouter);
router.use("/youth", youthRouter);

export default router;
