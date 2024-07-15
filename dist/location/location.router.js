"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const location_controller_1 = require("./location.controller");
exports.locationRouter = new hono_1.Hono();
//get all locations      api/locations
exports.locationRouter.get("/locations", location_controller_1.listLocations);
//get a single location    api/locations/1
exports.locationRouter.get("/locations/:id", location_controller_1.getLocation);
exports.locationRouter.post("/locations", location_controller_1.createOneLocation);
exports.locationRouter.put("/locations/:id", location_controller_1.updateOneLocation);
exports.locationRouter.delete("/locations/:id", location_controller_1.deleteLocation);
