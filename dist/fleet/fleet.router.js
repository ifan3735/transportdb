"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetRouter = void 0;
const hono_1 = require("hono");
const fleet_controller_1 = require("./fleet.controller");
exports.fleetRouter = new hono_1.Hono();
//get all fleet management      api/fleet
exports.fleetRouter.get("/fleet", fleet_controller_1.listFleetManagement);
//get a single fleet management    api/fleet/1
exports.fleetRouter.get("/fleet/:id", fleet_controller_1.getFleetManagementOne);
exports.fleetRouter.post("/fleet", fleet_controller_1.createOneFleetManagement);
exports.fleetRouter.put("/fleet/:id", fleet_controller_1.updateOneFleetManagement);
exports.fleetRouter.delete("/fleet/:id", fleet_controller_1.deleteFleetManagementOne);
