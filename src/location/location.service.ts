import { db } from "../drizzle/db";
import { locationsTable, LocationSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const locationsService = async (limit?: number) => {
    if (limit) {
        return await db.query.locationsTable.findMany({
            with: {
                bookings: true,  
            },
            limit: limit,
        });
    }
    return await db.query.locationsTable.findMany();
};

export const getLocationService = async (id: number) => {
    return await db.query.locationsTable.findFirst({
        with: {
            bookings: true,
        },
        where: eq(locationsTable.id, id),
    });
}

export const createLocation = async (location: LocationSelect) => {
    await db.insert(locationsTable).values(location);
    return 'Location created successfully';
};

export const updateLocation = async (id: number, location: LocationSelect) => {
    await db.update(locationsTable).set(location).where(eq(locationsTable.id, id));
    return 'Location updated successfully';
};

export const deleteOneLocation = async (id: number) => {
    await db.delete(locationsTable).where(eq(locationsTable.id, id));
    return 'Location deleted successfully';
};