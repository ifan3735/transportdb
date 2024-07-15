"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const users_router_1 = require("./users/users.router");
const vehiclespec_router_1 = require("./vehiclespec/vehiclespec.router");
const vehicle_router_1 = require("./vehicle/vehicle.router");
const location_router_1 = require("./location/location.router");
const booking_router_1 = require("./booking/booking.router");
const payment_router_1 = require("./payment/payment.router");
const custSupp_router_1 = require("./custsupp/custSupp.router");
const fleet_router_1 = require("./fleet/fleet.router");
const auth_router_1 = require("./auth/auth.router");
const cors_1 = require("hono/cors");
require("dotenv/config");
const app = new hono_1.Hono();
app.use('/*', (0, cors_1.cors)());
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.route('/', users_router_1.userRouter);
app.route('/', vehiclespec_router_1.vehicleSpecRouter);
app.route('/', vehicle_router_1.vehicleRouter);
app.route('/', location_router_1.locationRouter);
app.route('/', booking_router_1.bookingRouter);
app.route('/', payment_router_1.paymentRouter);
app.route('/', custSupp_router_1.customerSupportTicketRouter);
app.route('/', fleet_router_1.fleetRouter);
app.route('/', auth_router_1.authRouter);
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
