import { Context } from "hono";
import { fleetManagementService, getFleetManagement, createFleetManagement, updateFleetManagement, deleteFleetManagement } from "./fleet.service"

export const listFleetManagement = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await fleetManagementService(limit);
        if (data == null || data.length == 0) {
            return c.json('No fleet management found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getFleetManagementOne = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const fleetManagement = await getFleetManagement(id);
    if (fleetManagement == undefined) {
        return c.json("Fleet Management not found", 404);
    }
    return c.json(fleetManagement, 200);
}

export const createOneFleetManagement = async (c: Context) => {
    try {
        const fleetManagement = await c.req.json();
        await createFleetManagement(fleetManagement);
        return c.json("Fleet Management created successfully", 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOneFleetManagement = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.json("Invalid ID", 400);

        const fleetManagement = await c.req.json();
        await updateFleetManagement(id, fleetManagement);
        return c.json("Fleet Management updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteFleetManagementOne = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteFleetManagement(id);
        return c.json("Fleet Management deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}