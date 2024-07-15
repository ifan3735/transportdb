"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneLocation = exports.updateLocation = exports.createLocation = exports.getLocationService = exports.locationsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const locationsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.locationsTable.findMany({
            limit: limit,
        });
    }
    return await db_1.db.query.locationsTable.findMany();
};
exports.locationsService = locationsService;
const getLocationService = async (id) => {
    return await db_1.db.query.locationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.locationsTable.id, id),
    });
};
exports.getLocationService = getLocationService;
const createLocation = async (location) => {
    await db_1.db.insert(schema_1.locationsTable).values(location);
    return 'Location created successfully';
};
exports.createLocation = createLocation;
const updateLocation = async (id, location) => {
    await db_1.db.update(schema_1.locationsTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.locationsTable.id, id));
    return 'Location updated successfully';
};
exports.updateLocation = updateLocation;
const deleteOneLocation = async (id) => {
    await db_1.db.delete(schema_1.locationsTable).where((0, drizzle_orm_1.eq)(schema_1.locationsTable.id, id));
    return 'Location deleted successfully';
};
exports.deleteOneLocation = deleteOneLocation;
