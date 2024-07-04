import { db } from "../drizzle/db";
import { vehiclesTable, VehicleSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const vehiclesService = async (limit?: number) => {
    if (limit) {
        return await db.query.vehiclesTable.findMany({
            limit: limit,
        });
    }
    return await db.query.vehiclesTable.findMany();
};

export const getVehicleService = async (id: number) => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.id, id),
    });
};

export const createVehicle = async (vehicle: VehicleSelect) => {
    await db.insert(vehiclesTable).values(vehicle);
    return 'Vehicle created successfully';
};

export const updateVehicle = async (id: number, vehicle: VehicleSelect) => {
    await db.update(vehiclesTable).set(vehicle).where(eq(vehiclesTable.id, id));
    return 'Vehicle updated successfully';
};

export const deleteOneVehicle = async (id: number) => {
    await db.delete(vehiclesTable).where(eq(vehiclesTable.id, id));
    return 'Vehicle deleted successfully';
};