"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicleService = exports.vehiclesService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const vehiclesService = async (limit) => {
    if (limit) {
        return await db_1.db.query.vehiclesTable.findMany({
            with: {
                bookings: true,
                fleet_management: true,
                vehicle_specs: true,
            },
            limit: limit,
        });
    }
    return await db_1.db.query.vehiclesTable.findMany({
        columns: {
            availability: true,
            id: true,
            rental_rate: true,
            created_at: true,
            updated_at: true,
        },
        with: {
            vehicle_specs: {
                columns: {
                    id: true,
                    manufacturer: true,
                    seating_capacity: true,
                    model: true,
                }
            },
        }
    });
};
exports.vehiclesService = vehiclesService;
const getVehicleService = async (id) => {
    return await db_1.db.query.vehiclesTable.findFirst({
        columns: {
            availability: true,
            id: true,
            rental_rate: true,
        },
        with: {
            vehicle_specs: {
                columns: {
                    manufacturer: true,
                    seating_capacity: true,
                    model: true,
                    engine_capacity: true,
                    year: true,
                    fuel_type: true,
                    features: true,
                }
            }
        },
        where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.id, id),
    });
};
exports.getVehicleService = getVehicleService;
const createVehicle = async (vehicle) => {
    await db_1.db.insert(schema_1.vehiclesTable).values(vehicle);
    return 'Vehicle created successfully';
};
exports.createVehicle = createVehicle;
const updateVehicle = async (id, vehicle) => {
    await db_1.db.update(schema_1.vehiclesTable).set(vehicle).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.id, id));
    return 'Vehicle updated successfully';
};
exports.updateVehicle = updateVehicle;
const deleteOneVehicle = async (id) => {
    await db_1.db.delete(schema_1.vehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.id, id));
    return 'Vehicle deleted successfully';
};
exports.deleteOneVehicle = deleteOneVehicle;
