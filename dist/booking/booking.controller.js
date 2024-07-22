"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateOneBooking = exports.createOneBooking = exports.getBooking = exports.listBookings = void 0;
const booking_service_1 = require("./booking.service");
const listBookings = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, booking_service_1.bookingsService)(limit);
        if (data == null || data.length == 0) {
            return c.json('No bookings found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listBookings = listBookings;
const getBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.json("Invalid ID", 400);
    const booking = await (0, booking_service_1.getBookingService)(id);
    if (booking == undefined) {
        return c.json("Booking not found", 404);
    }
    return c.json(booking, 200);
};
exports.getBooking = getBooking;
const createOneBooking = async (c) => {
    try {
        const booking = await c.req.json();
        await (0, booking_service_1.createBooking)(booking);
        return c.json("Booking created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneBooking = createOneBooking;
const updateOneBooking = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const booking = await c.req.json();
        await (0, booking_service_1.updateBooking)(id, booking);
        return c.json("Booking updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneBooking = updateOneBooking;
const deleteBooking = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        await (0, booking_service_1.deleteOneBooking)(id);
        return c.json("Booking deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBooking = deleteBooking;
