"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youthRouter = void 0;
const express_1 = require("express");
const youth_controller_1 = require("../controllers/youth.controller");
const errors_1 = require("../utils/errors");
exports.youthRouter = (0, express_1.Router)();
//#region GET Methods
//Get all youth
exports.youthRouter.get("/", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.getAllYouth)();
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res
                .status(500)
                .json({ error: "An unknown error occurred while getting all youth" });
        }
    }
});
//Get youth by ID
exports.youthRouter.get("/byID/:firebaseUID", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.getYouthByID)(req.params.firebaseUID);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res
                .status(500)
                .json({ error: "An unknown error occurred while getting youth by ID" });
        }
    }
});
//Get youth by email
exports.youthRouter.get("/byEmail/:email", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.getYouthByEmail)(req.params.email);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({
                error: "An unknown error occurred while getting youth by email",
            });
        }
    }
});
//Get youth by program
exports.youthRouter.get("/byProgram/:program", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.getYouthByProgram)(req.params.program);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({
                error: "An unknown error occurred while getting youth by program",
            });
        }
    }
});
//Get all active youth
exports.youthRouter.get("/active", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.getActiveYouth)();
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({
                error: "An unknown error occurred while getting active youth",
            });
        }
    }
});
//Get all inactive youth
exports.youthRouter.get("/inactive", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.getInactiveYouth)();
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({
                error: "An unknown error occurred while getting inactive youth",
            });
        }
    }
});
//#endregion GET Methods
//#region POST Methods
//Create new youth
exports.youthRouter.post("/", async (req, res) => {
    try {
        const youthData = req.body;
        const youth = await (0, youth_controller_1.createYouth)(youthData);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res
                .status(500)
                .json({ error: "An unknown error occurred while creating youth" });
        }
    }
});
//#endregion POST Methods
//#region PUT Methods
//Update Youth
exports.youthRouter.put("/:firebaseUID", async (req, res) => {
    try {
        const youthData = req.body;
        const youth = await (0, youth_controller_1.updateYouth)(req.params.firebaseUID, youthData);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res
                .status(500)
                .json({ error: "An unknown error occurred while updating youth" });
        }
    }
});
//Activate youth
exports.youthRouter.put("/activate/:firebaseUID", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.activateYouth)(req.params.firebaseUID);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res
                .status(500)
                .json({ error: "An unknown error occurred while activating youth" });
        }
    }
});
//Deactivate youth
exports.youthRouter.put("/deactivate/:firebaseUID", async (req, res) => {
    try {
        const youth = await (0, youth_controller_1.deactivateYouth)(req.params.firebaseUID);
        res.status(200).json(youth);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({
                error: "An unknown error occurred while deactivating youth",
            });
        }
    }
});
//#endregion PUT Methods
//# sourceMappingURL=youth.router.js.map