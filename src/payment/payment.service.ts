import { db } from "../drizzle/db";
import { paymentsTable, PaymentSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const paymentsService = async (limit?: number) => {
    if (limit) {
        return await db.query.paymentsTable.findMany({
            limit: limit,
        });
    }
    return await db.query.paymentsTable.findMany();
};

export const getPaymentService = async (id: number) => {
    return await db.query.paymentsTable.findFirst({
        where: eq(paymentsTable.id, id),
    });
}

export const createPayment = async (payment: PaymentSelect) => {
    await db.insert(paymentsTable).values(payment);
    return 'Payment created successfully';
};

export const updatePayment = async (id: number, payment: PaymentSelect) => {
    await db.update(paymentsTable).set(payment).where(eq(paymentsTable.id, id));
    return 'Payment updated successfully';
};

export const deleteOnePayment = async (id: number) => {
    await db.delete(paymentsTable).where(eq(paymentsTable.id, id));
    return 'Payment deleted successfully';
};