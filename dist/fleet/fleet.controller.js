"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementOne = exports.updateOneFleetManagement = exports.createOneFleetManagement = exports.getFleetManagementOne = exports.listFleetManagement = void 0;
const fleet_service_1 = require("./fleet.service");
const listFleetManagement = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, fleet_service_1.fleetManagementService)(limit);
        if (data == null || data.length == 0) {
            return c.json('No fleet management found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listFleetManagement = listFleetManagement;
const getFleetManagementOne = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const fleetManagement = await (0, fleet_service_1.getFleetManagement)(id);
    if (fleetManagement == undefined) {
        return c.json("Fleet Management not found", 404);
    }
    return c.json(fleetManagement, 200);
};
exports.getFleetManagementOne = getFleetManagementOne;
const createOneFleetManagement = async (c) => {
    try {
        const fleetManagement = await c.req.json();
        await (0, fleet_service_1.createFleetManagement)(fleetManagement);
        return c.json("Fleet Management created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneFleetManagement = createOneFleetManagement;
const updateOneFleetManagement = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.json("Invalid ID", 400);
        const fleetManagement = await c.req.json();
        await (0, fleet_service_1.updateFleetManagement)(id, fleetManagement);
        return c.json("Fleet Management updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneFleetManagement = updateOneFleetManagement;
const deleteFleetManagementOne = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        await (0, fleet_service_1.deleteFleetManagement)(id);
        return c.json("Fleet Management deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteFleetManagementOne = deleteFleetManagementOne;
