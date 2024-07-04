import { db } from "../drizzle/db";
import { bookingsTable, BookingSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const bookingsService = async (limit?: number) => {
    if (limit) {
        return await db.query.bookingsTable.findMany({
            limit: limit,
        });
    }
    return await db.query.bookingsTable.findMany();
};

export const getBookingService = async (id: number) => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.id, id),
    });
}

export const createBooking = async (booking: BookingSelect) => {
    await db.insert(bookingsTable).values(booking);
    return 'Booking created successfully';
};

export const updateBooking = async (id: number, booking: BookingSelect) => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.id, id));
    return 'Booking updated successfully';
};

export const deleteOneBooking = async (id: number) => {
    await db.delete(bookingsTable).where(eq(bookingsTable.id, id));
    return 'Booking deleted successfully';
};