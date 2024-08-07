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
    return await db.query.bookingsTable.findMany();
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