"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneBooking = exports.updateBooking = exports.createBooking = exports.getBookingService = exports.bookingsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const bookingsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.bookingsTable.findMany({
            with: {
                vehicle: true,
                user: true,
            },
            limit: limit,
        });
    }
    return await db_1.db.query.bookingsTable.findMany();
};
exports.bookingsService = bookingsService;
const getBookingService = async (id) => {
    return await db_1.db.query.bookingsTable.findFirst({
        with: {
            vehicle: true,
            user: true,
        },
        where: (0, drizzle_orm_1.eq)(schema_1.bookingsTable.id, id),
    });
};
exports.getBookingService = getBookingService;
const createBooking = async (booking) => {
    await db_1.db.insert(schema_1.bookingsTable).values(booking);
    return 'Booking created successfully';
};
exports.createBooking = createBooking;
const updateBooking = async (id, booking) => {
    await db_1.db.update(schema_1.bookingsTable).set(booking).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.id, id));
    return 'Booking updated successfully';
};
exports.updateBooking = updateBooking;
const deleteOneBooking = async (id) => {
    await db_1.db.delete(schema_1.bookingsTable).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.id, id));
    return 'Booking deleted successfully';
};
exports.deleteOneBooking = deleteOneBooking;
