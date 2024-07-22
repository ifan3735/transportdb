"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updateOnePayment = exports.createOnePayment = exports.getPayment = exports.listPayments = void 0;
const payment_service_1 = require("./payment.service");
const listPayments = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, payment_service_1.paymentsService)(limit);
        if (data == null || data.length == 0) {
            return c.json('No payments found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listPayments = listPayments;
const getPayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const payment = await (0, payment_service_1.getPaymentService)(id);
    if (payment == undefined) {
        return c.json("Payment not found", 404);
    }
    return c.json(payment, 200);
};
exports.getPayment = getPayment;
const createOnePayment = async (c) => {
    try {
        const payment = await c.req.json();
        await (0, payment_service_1.createPayment)(payment);
        return c.json("Payment created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOnePayment = createOnePayment;
const updateOnePayment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const payment = await c.req.json();
        await (0, payment_service_1.updatePayment)(id, payment);
        return c.json("Payment updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOnePayment = updateOnePayment;
const deletePayment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        await (0, payment_service_1.deleteOnePayment)(id);
        return c.json("Payment deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletePayment = deletePayment;
