import { Router } from "express";
import { staffRouter } from "./staff.router";
import { youthRouter } from "./youth.router";

export const userRouter = Router();

userRouter.use("/staff", staffRouter);
userRouter.use("/youth", youthRouter);

module.exports = { userRouter };
