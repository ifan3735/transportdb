import { db } from "../drizzle/db";
import { vehiclesTable, VehicleSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const vehiclesService = async (limit?: number) => {
    if (limit) {
        return await db.query.vehiclesTable.findMany({
            with: {
                bookings: true,
                fleet_management: true,
                vehicle_specs: true,
            },
            limit: limit,
        });
    }
    return await db.query.vehiclesTable.findMany(
       {
        columns: {
            availability: true,
            id: true,
            rental_rate: true,
            created_at: true,
            updated_at: true,
            image: true,
        },
        with: {
            vehicle_specs: {
                columns: {
                    id: true,
                    manufacturer: true,
                    seating_capacity: true,
                    model: true,
                    fuel_type: true,
                    color: true,
                    owner_image: true,
                    owner_name: true,
                }
            },
            
        }
       }
    );
};

export const getVehicleService = async (id: number) => {
    return await db.query.vehiclesTable.findFirst({
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