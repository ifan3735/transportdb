import { Context } from "hono"
import { vehicleSpecsService, getVehicleSpecService, createVehicleSpec, updateVehicleSpec, deleteOneVehicleSpec } from "./vehiclespec.service"

export const listVehicleSpecs = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await vehicleSpecsService(limit);
        if (data == null || data.length == 0) {
            return c.json('No vehicle specs found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getVehicleSpec = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.json("Invalid ID", 400);

    const vehicleSpec = await getVehicleSpecService(id);
    if (vehicleSpec == undefined) {
        return c.json("Vehicle Spec not found", 404);
    }
    return c.json(vehicleSpec, 200);
}

export const createOneVehicleSpec = async (c: Context) => {
    try {
        const vehicleSpec = await c.req.json();
        await createVehicleSpec(vehicleSpec);
        return c.json("Vehicle Spec created successfully", 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOneVehicleSpec = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const vehicleSpec = await c.req.json();
        await updateVehicleSpec(id, vehicleSpec);
        return c.json("Vehicle Spec updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicleSpec = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteOneVehicleSpec(id);
        return c.json("Vehicle Spec deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}