"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpec = exports.updateOneVehicleSpec = exports.createOneVehicleSpec = exports.getVehicleSpec = exports.listVehicleSpecs = void 0;
const vehiclespec_service_1 = require("./vehiclespec.service");
const listVehicleSpecs = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehiclespec_service_1.vehicleSpecsService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No vehicle specs found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listVehicleSpecs = listVehicleSpecs;
const getVehicleSpec = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpec = await (0, vehiclespec_service_1.getVehicleSpecService)(id);
    if (vehicleSpec == undefined) {
        return c.text("Vehicle Spec not found", 404);
    }
    return c.json(vehicleSpec, 200);
};
exports.getVehicleSpec = getVehicleSpec;
const createOneVehicleSpec = async (c) => {
    try {
        const vehicleSpec = await c.req.json();
        await (0, vehiclespec_service_1.createVehicleSpec)(vehicleSpec);
        return c.text("Vehicle Spec created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneVehicleSpec = createOneVehicleSpec;
const updateOneVehicleSpec = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const vehicleSpec = await c.req.json();
        await (0, vehiclespec_service_1.updateVehicleSpec)(id, vehicleSpec);
        return c.text("Vehicle Spec updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneVehicleSpec = updateOneVehicleSpec;
const deleteVehicleSpec = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        await (0, vehiclespec_service_1.deleteOneVehicleSpec)(id);
        return c.text("Vehicle Spec deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicleSpec = deleteVehicleSpec;
