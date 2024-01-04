"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const event_router_1 = require("./event.router");
const form_router_1 = require("./form.router");
const staff_router_1 = require("./staff.router");
const youth_router_1 = require("./youth.router");
exports.router = (0, express_1.Router)();
exports.router.use("/events", event_router_1.eventRouter);
exports.router.use("/forms", form_router_1.formRouter);
exports.router.use("/staff", staff_router_1.staffRouter);
exports.router.use("/youth", youth_router_1.youthRouter);
//# sourceMappingURL=root.Router.js.map