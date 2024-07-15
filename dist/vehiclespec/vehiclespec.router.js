"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecRouter = void 0;
const hono_1 = require("hono");
const vehiclespec_controller_1 = require("./vehiclespec.controller");
exports.vehicleSpecRouter = new hono_1.Hono();
//get all vehicle specs      api/vehiclespecs
exports.vehicleSpecRouter.get("/vehiclespecs", vehiclespec_controller_1.listVehicleSpecs);
//get a single vehicle spec    api/vehiclespecs/1
exports.vehicleSpecRouter.get("/vehiclespecs/:id", vehiclespec_controller_1.getVehicleSpec);
exports.vehicleSpecRouter.post("/vehiclespecs", vehiclespec_controller_1.createOneVehicleSpec);
exports.vehicleSpecRouter.put("/vehiclespecs/:id", vehiclespec_controller_1.updateOneVehicleSpec);
exports.vehicleSpecRouter.delete("/vehiclespecs/:id", vehiclespec_controller_1.deleteVehicleSpec);
