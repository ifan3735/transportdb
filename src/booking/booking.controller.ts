import { Context } from "hono";
import { bookingsService, getBookingService, createBooking, updateBooking, deleteOneBooking } from "./booking.service";

export const listBookings = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await bookingsService(limit);
        if (data == null || data.length == 0) {
            return c.json('No bookings found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.json("Invalid ID", 400);

    const booking = await getBookingService(id);
    if (booking == undefined) {
        return c.json("Booking not found", 404);
    }
    return c.json(booking, 200);
}

export const createOneBooking = async (c: Context) => {
    try {
        const booking = await c.req.json();
        const newBooking =await createBooking(booking);
        return c.json(newBooking);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOneBooking = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const booking = await c.req.json();
        await updateBooking(id, booking);
        return c.json("Booking updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBooking = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteOneBooking(id);
        return c.json("Booking deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}