import { db } from "../drizzle/db";
import { vehicleSpecsTable, VehicleSpecsSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const vehicleSpecsService = async (limit?: number) => {
    if (limit) {
        return await db.query.vehicleSpecsTable.findMany({
            limit: limit,
        });
    }
    return await db.query.vehicleSpecsTable.findMany();
};

export const getVehicleSpecService = async (id: number) => {
    return await db.query.vehicleSpecsTable.findFirst({
        where: eq(vehicleSpecsTable.id, id),
    });
};

export const createVehicleSpec = async (vehicleSpec: VehicleSpecsSelect) => {
    await db.insert(vehicleSpecsTable).values(vehicleSpec);
    return 'Vehicle Spec created successfully';
};

export const updateVehicleSpec = async (id: number, vehicleSpec: VehicleSpecsSelect) => {
    await db.update(vehicleSpecsTable).set(vehicleSpec).where(eq(vehicleSpecsTable.id, id));
    return 'Vehicle Spec updated successfully';
};

export const deleteOneVehicleSpec = async (id: number) => {
    await db.delete(vehicleSpecsTable).where(eq(vehicleSpecsTable.id, id));
    return 'Vehicle Spec deleted successfully';
};