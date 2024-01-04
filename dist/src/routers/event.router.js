"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const errors_1 = require("../utils/errors");
exports.eventRouter = (0, express_1.Router)();
//gets list of all events
exports.eventRouter.get("/", async (_req, res) => {
    try {
        const allEvents = await (0, event_controller_1.getAllEvents)();
        res.status(200).json(allEvents);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
//gets event with a provided code
exports.eventRouter.get("/:eventCode", async (req, res) => {
    try {
        //technically an array of events could be returned
        const event = await (0, event_controller_1.getEventByCode)(req.params.eventCode);
        res.status(200).json(event);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
//adds event
exports.eventRouter.post("/", async (req, res) => {
    try {
        let event = await (0, event_controller_1.createEvent)(req.body);
        res.status(200).json(event);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
//adds a staff member to an event
exports.eventRouter.put("/addStaff/:eventCode", async (req, res) => {
    try {
        let event = await (0, event_controller_1.addStaffToEvent)(req.params.eventCode, req.body.firebaseUID);
        res.status(200).json(event);
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
//adds a youth to an event
exports.eventRouter.put("/attend/:eventCode", async (req, res) => {
    try {
        await (0, event_controller_1.addYouthToEvent)(req.params.eventCode, req.body.firebaseUID);
        res.status(200).send("Youth marked as present"); //review: would it be more useful to just return the updated document
    }
    catch (err) {
        if (err instanceof errors_1.HttpError) {
            res.status(err.errorCode).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
//# sourceMappingURL=event.router.js.map