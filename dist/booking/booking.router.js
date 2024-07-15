"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const hono_1 = require("hono");
const booking_controller_1 = require("./booking.controller");
exports.bookingRouter = new hono_1.Hono();
//get all bookings      api/bookings
exports.bookingRouter.get("/bookings", booking_controller_1.listBookings);
//get a single booking    api/bookings/1
exports.bookingRouter.get("/bookings/:id", booking_controller_1.getBooking);
exports.bookingRouter.post("/bookings", booking_controller_1.createOneBooking);
exports.bookingRouter.put("/bookings/:id", booking_controller_1.updateOneBooking);
exports.bookingRouter.delete("/bookings/:id", booking_controller_1.deleteBooking);
