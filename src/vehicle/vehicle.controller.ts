import { Context } from "hono"
import { vehiclesService, getVehicleService, createVehicle, updateVehicle, deleteOneVehicle } from "./vehicle.service"
import { VehicleSelect } from "../drizzle/schema"
import { serial } from "drizzle-orm/mysql-core";

export const listVehicles = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await vehiclesService(limit);
        if (data == null || data.length == 0) {
            return c.text('No vehicles found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicle = await getVehicleService(id);
    if (vehicle == undefined) {
        return c.text("Vehicle not found", 404);
    }
    return c.json(vehicle, 200);
}

export const createOneVehicle = async (c: Context) => {
    try {
        const vehicle = await c.req.json();
        await createVehicle(vehicle);
        return c.text("Vehicle created successfully", 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOneVehicle = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const vehicle = await c.req.json();
        await updateVehicle(id, vehicle);
        return c.text("Vehicle updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicle = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteOneVehicle(id);
        return c.text("Vehicle deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}