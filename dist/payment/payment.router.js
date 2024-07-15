"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const hono_1 = require("hono");
const payment_controller_1 = require("./payment.controller");
exports.paymentRouter = new hono_1.Hono();
//get all payments      api/payments
exports.paymentRouter.get("/payments", payment_controller_1.listPayments);
//get a single payment    api/payments/1
exports.paymentRouter.get("/payments/:id", payment_controller_1.getPayment);
exports.paymentRouter.post("/payments", payment_controller_1.createOnePayment);
exports.paymentRouter.put("/payments/:id", payment_controller_1.updateOnePayment);
exports.paymentRouter.delete("/payments/:id", payment_controller_1.deletePayment);
