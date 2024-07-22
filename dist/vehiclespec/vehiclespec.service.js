"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneVehicleSpec = exports.updateVehicleSpec = exports.createVehicleSpec = exports.getVehicleSpecService = exports.vehicleSpecsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const vehicleSpecsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.vehicleSpecsTable.findMany({
            with: {
                vehicles: true,
            },
            limit: limit,
        });
    }
    return await db_1.db.query.vehicleSpecsTable.findMany();
};
exports.vehicleSpecsService = vehicleSpecsService;
const getVehicleSpecService = async (id) => {
    return await db_1.db.query.vehicleSpecsTable.findFirst({
        with: {
            vehicles: true,
        },
        where: (0, drizzle_orm_1.eq)(schema_1.vehicleSpecsTable.id, id),
    });
};
exports.getVehicleSpecService = getVehicleSpecService;
const createVehicleSpec = async (vehicleSpec) => {
    await db_1.db.insert(schema_1.vehicleSpecsTable).values(vehicleSpec);
    return 'Vehicle Spec created successfully';
};
exports.createVehicleSpec = createVehicleSpec;
const updateVehicleSpec = async (id, vehicleSpec) => {
    await db_1.db.update(schema_1.vehicleSpecsTable).set(vehicleSpec).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecsTable.id, id));
    return 'Vehicle Spec updated successfully';
};
exports.updateVehicleSpec = updateVehicleSpec;
const deleteOneVehicleSpec = async (id) => {
    await db_1.db.delete(schema_1.vehicleSpecsTable).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecsTable.id, id));
    return 'Vehicle Spec deleted successfully';
};
exports.deleteOneVehicleSpec = deleteOneVehicleSpec;
