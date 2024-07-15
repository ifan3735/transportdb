import { Context } from "hono";
import { locationsService, getLocationService, createLocation, updateLocation, deleteOneLocation } from "./location.service";

export const listLocations = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await locationsService(limit);
        if (data == null || data.length == 0) {
            return c.json('No locations found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.json("Invalid ID", 400);

    const location = await getLocationService(id);
    if (location == undefined) {
        return c.json("Location not found", 404);
    }
    return c.json(location, 200);
}

export const createOneLocation = async (c: Context) => {
    try {
        const location = await c.req.json();
        await createLocation(location);
        return c.json("Location created successfully", 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOneLocation = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const location = await c.req.json();
        await updateLocation(id, location);
        return c.json("Location updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteLocation = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteOneLocation(id);
        return c.json("Location deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}