import { Hono } from "hono";
import { listVehicles, getVehicle, createOneVehicle, updateOneVehicle, deleteVehicle} from "./vehicle.controller"
export const vehicleRouter = new Hono();

//get all vehicles      api/vehicles
vehicleRouter.get("/vehicles", listVehicles);

//get a single vehicle    api/vehicles/1
vehicleRouter.get("/vehicles/:id", getVehicle)

vehicleRouter.post("/vehicles", createOneVehicle)

vehicleRouter.put("/vehicles/:id", updateOneVehicle)

vehicleRouter.delete("/vehicles/:id", deleteVehicle)