import { db } from "../drizzle/db";
import { paymentsTable, PaymentSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const paymentsService = async (limit?: number) => {
    if (limit) {
        return await db.query.paymentsTable.findMany({
            with: {
                booking: true,
            },
            limit: limit,
        });
    }
    return await db.query.paymentsTable.findMany(
        {
            columns: {
                id: true,
                amount: true,
                payment_method: true,
                payment_status: true,
                transaction_id: true,
                created_at: true,
                updated_at: true,
                payment_date: true,
            },
            with: {
                booking: {
                    columns: {
                        id: true,
                    }
                },
            }
        }
    );
};

export const getPaymentService = async (id: number) => {
    return await db.query.paymentsTable.findFirst({
        with: {
            booking: true,
        },
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