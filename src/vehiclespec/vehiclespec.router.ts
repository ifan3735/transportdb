import { Hono } from "hono";
import { listVehicleSpecs, getVehicleSpec, createOneVehicleSpec, updateOneVehicleSpec, deleteVehicleSpec} from "./vehiclespec.controller"
export const vehicleSpecRouter = new Hono();

//get all vehicle specs      api/vehiclespecs

vehicleSpecRouter.get("/vehiclespecs", listVehicleSpecs);

//get a single vehicle spec    api/vehiclespecs/1
vehicleSpecRouter.get("/vehiclespecs/:id", getVehicleSpec)

vehicleSpecRouter.post("/vehiclespecs", createOneVehicleSpec)

vehicleSpecRouter.put("/vehiclespecs/:id", updateOneVehicleSpec)

vehicleSpecRouter.delete("/vehiclespecs/:id", deleteVehicleSpec)