import { Hono } from "hono";
import { listPayments, getPayment, createOnePayment, updateOnePayment, deletePayment } from "./payment.controller";
export const paymentRouter = new Hono();

//get all payments      api/payments
paymentRouter.get("/payments", listPayments);

//get a single payment    api/payments/1
paymentRouter.get("/payments/:id", getPayment)

paymentRouter.post("/payments", createOnePayment)

paymentRouter.put("/payments/:id", updateOnePayment)

paymentRouter.delete("/payments/:id", deletePayment)