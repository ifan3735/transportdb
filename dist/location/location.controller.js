"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateOneLocation = exports.createOneLocation = exports.getLocation = exports.listLocations = void 0;
const location_service_1 = require("./location.service");
const listLocations = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, location_service_1.locationsService)(limit);
        if (data == null || data.length == 0) {
            return c.json('No locations found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listLocations = listLocations;
const getLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.json("Invalid ID", 400);
    const location = await (0, location_service_1.getLocationService)(id);
    if (location == undefined) {
        return c.json("Location not found", 404);
    }
    return c.json(location, 200);
};
exports.getLocation = getLocation;
const createOneLocation = async (c) => {
    try {
        const location = await c.req.json();
        await (0, location_service_1.createLocation)(location);
        return c.json("Location created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneLocation = createOneLocation;
const updateOneLocation = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.json("Invalid ID", 400);
        const location = await c.req.json();
        await (0, location_service_1.updateLocation)(id, location);
        return c.json("Location updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneLocation = updateOneLocation;
const deleteLocation = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        await (0, location_service_1.deleteOneLocation)(id);
        return c.json("Location deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLocation = deleteLocation;
