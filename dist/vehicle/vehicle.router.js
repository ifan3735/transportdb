"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const hono_1 = require("hono");
const vehicle_controller_1 = require("./vehicle.controller");
exports.vehicleRouter = new hono_1.Hono();
//get all vehicles      api/vehicles
exports.vehicleRouter.get("/vehicles", vehicle_controller_1.listVehicles);
//get a single vehicle    api/vehicles/1
exports.vehicleRouter.get("/vehicles/:id", vehicle_controller_1.getVehicle);
exports.vehicleRouter.post("/vehicles", vehicle_controller_1.createOneVehicle);
exports.vehicleRouter.put("/vehicles/:id", vehicle_controller_1.updateOneVehicle);
exports.vehicleRouter.delete("/vehicles/:id", vehicle_controller_1.deleteVehicle);
