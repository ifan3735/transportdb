import { db } from "../drizzle/db";
import { bookingsTable, BookingSelect } from "../drizzle/schema";
import { Column, eq } from "drizzle-orm";

export const bookingsService = async (limit?: number) => {
    if (limit) {
        return await db.query.bookingsTable.findMany({
            with: {
                vehicle: true,
                user: true,
            },
            limit: limit,
        });
    }
    return await db.query.bookingsTable.findMany(
        {
            columns: {
                id: true,
                vehicle_id: true,
                user_id: true,
                location_id: true,
                booking_date: true,
                return_date: true,
                booking_status: true,
                total_amount: true,
                created_at: true,
                updated_at: true,
            },
            with: {
                vehicle: {
                    columns: {
                        availability: true,
                        id: true,
                        rental_rate: true,
                        created_at: true,
                        updated_at: true,
                        image: true,
                        image2: true,
                        image3: true,
                        image4: true,
                        price: true,
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
                                date: true,
                                milage: true,
                                location: true,
                                speed: true,
                                transmission: true,
                                features: true,
                            }
                        },
                    }
                }
            }
        }
    );
};

export const getBookingService = async (id: number) => {
    return await db.query.bookingsTable.findFirst({
        with: {
            vehicle: true,
            user: true,
        },
        where: eq(bookingsTable.id, id),
    });
}

export const createBooking = async (booking: BookingSelect) => {
    const [newBooking] = await db.insert(bookingsTable).values(booking).returning({id: bookingsTable.id}).execute();
    return newBooking
};

export const updateBooking = async (id: number, booking: BookingSelect) => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.id, id));
    return 'Booking updated successfully';
};

export const deleteOneBooking = async (id: number) => {
    await db.delete(bookingsTable).where(eq(bookingsTable.id, id));
    return 'Booking deleted successfully';
};