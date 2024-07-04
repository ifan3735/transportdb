import { Hono } from "hono";
import { listLocations, getLocation, createOneLocation, updateOneLocation, deleteLocation } from "./location.controller";
export const locationRouter = new Hono();

//get all locations      api/locations

locationRouter.get("/locations", listLocations);

//get a single location    api/locations/1
locationRouter.get("/locations/:id", getLocation)

locationRouter.post("/locations", createOneLocation)

locationRouter.put("/locations/:id", updateOneLocation)

locationRouter.delete("/locations/:id", deleteLocation)