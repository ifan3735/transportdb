import { db } from "../drizzle/db";
import { fleetManagementTable, FleetManagementSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const fleetManagementService = async (limit?: number) => {
    if (limit) {
        return await db.query.fleetManagementTable.findMany({
            limit: limit,
        });
    }
    return await db.query.fleetManagementTable.findMany();
};

export const getFleetManagement = async (id: number) => {
    return await db.query.fleetManagementTable.findFirst({
        where: eq(fleetManagementTable.id, id),
    });
}

export const createFleetManagement = async (fleetManagement: FleetManagementSelect) => {
    await db.insert(fleetManagementTable).values(fleetManagement);
    return 'Fleet Management created successfully';
};

export const updateFleetManagement = async (id: number, fleetManagement: FleetManagementSelect) => {
    await db.update(fleetManagementTable).set(fleetManagement).where(eq(fleetManagementTable.id, id));
    return 'Fleet Management updated successfully';
};

export const deleteFleetManagement = async (id: number) => {
    await db.delete(fleetManagementTable).where(eq(fleetManagementTable.id, id));
    return 'Fleet Management deleted successfully';
};