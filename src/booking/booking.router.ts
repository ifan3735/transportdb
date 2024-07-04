import { Hono } from "hono";
import { listBookings, getBooking, createOneBooking, updateOneBooking, deleteBooking } from "./booking.controller";
export const bookingRouter = new Hono();

//get all bookings      api/bookings

bookingRouter.get("/bookings", listBookings);

//get a single booking    api/bookings/1
bookingRouter.get("/bookings/:id", getBooking)

bookingRouter.post("/bookings", createOneBooking)

bookingRouter.put("/bookings/:id", updateOneBooking)

bookingRouter.delete("/bookings/:id", deleteBooking)