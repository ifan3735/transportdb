import { Context } from "hono";
import { paymentsService, getPaymentService, createPayment, updatePayment, deleteOnePayment } from "./payment.service";

export const listPayments = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await paymentsService(limit);
        if (data == null || data.length == 0) {
            return c.json('No payments found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getPayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await getPaymentService(id);
    if (payment == undefined) {
        return c.json("Payment not found", 404);
    }
    return c.json(payment, 200);
}

export const createOnePayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        await createPayment(payment);
        return c.json("Payment created successfully", 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOnePayment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const payment = await c.req.json();
        await updatePayment(id, payment);
        return c.json("Payment updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletePayment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteOnePayment(id);
        return c.json("Payment deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}