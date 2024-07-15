"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagement = exports.updateFleetManagement = exports.createFleetManagement = exports.getFleetManagement = exports.fleetManagementService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const fleetManagementService = async (limit) => {
    if (limit) {
        return await db_1.db.query.fleetManagementTable.findMany({
            limit: limit,
        });
    }
    return await db_1.db.query.fleetManagementTable.findMany();
};
exports.fleetManagementService = fleetManagementService;
const getFleetManagement = async (id) => {
    return await db_1.db.query.fleetManagementTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.id, id),
    });
};
exports.getFleetManagement = getFleetManagement;
const createFleetManagement = async (fleetManagement) => {
    await db_1.db.insert(schema_1.fleetManagementTable).values(fleetManagement);
    return 'Fleet Management created successfully';
};
exports.createFleetManagement = createFleetManagement;
const updateFleetManagement = async (id, fleetManagement) => {
    await db_1.db.update(schema_1.fleetManagementTable).set(fleetManagement).where((0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.id, id));
    return 'Fleet Management updated successfully';
};
exports.updateFleetManagement = updateFleetManagement;
const deleteFleetManagement = async (id) => {
    await db_1.db.delete(schema_1.fleetManagementTable).where((0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.id, id));
    return 'Fleet Management deleted successfully';
};
exports.deleteFleetManagement = deleteFleetManagement;
