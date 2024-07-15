"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateOneVehicle = exports.createOneVehicle = exports.getVehicle = exports.listVehicles = void 0;
const vehicle_service_1 = require("./vehicle.service");
const listVehicles = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehicle_service_1.vehiclesService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No vehicles found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listVehicles = listVehicles;
const getVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicle = await (0, vehicle_service_1.getVehicleService)(id);
    if (vehicle == undefined) {
        return c.text("Vehicle not found", 404);
    }
    return c.json(vehicle, 200);
};
exports.getVehicle = getVehicle;
const createOneVehicle = async (c) => {
    try {
        const vehicle = await c.req.json();
        await (0, vehicle_service_1.createVehicle)(vehicle);
        return c.text("Vehicle created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneVehicle = createOneVehicle;
const updateOneVehicle = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const vehicle = await c.req.json();
        await (0, vehicle_service_1.updateVehicle)(id, vehicle);
        return c.text("Vehicle updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneVehicle = updateOneVehicle;
const deleteVehicle = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        await (0, vehicle_service_1.deleteOneVehicle)(id);
        return c.text("Vehicle deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicle = deleteVehicle;
