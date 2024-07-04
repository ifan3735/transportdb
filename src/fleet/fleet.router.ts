import { Hono } from "hono";
import { listFleetManagement, getFleetManagementOne, createOneFleetManagement, updateOneFleetManagement, deleteFleetManagementOne } from "./fleet.controller"

export const fleetRouter = new Hono();

//get all fleet management      api/fleet
fleetRouter.get("/fleet", listFleetManagement);

//get a single fleet management    api/fleet/1
fleetRouter.get("/fleet/:id", getFleetManagementOne)

fleetRouter.post("/fleet", createOneFleetManagement)

fleetRouter.put("/fleet/:id", updateOneFleetManagement)

fleetRouter.delete("/fleet/:id", deleteFleetManagementOne)