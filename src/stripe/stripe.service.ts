import { db } from "../drizzle/db";
import { bookingsTable, paymentsTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import dotenv from 'dotenv/config';


const stripe = new Stripe(process.env.STRIPE as string, {
    apiVersion: '2024-06-20',
});

export const createPaymentIntent = async (amount: number, currency: string, booking_id: number) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
    });

    const amountAsString = amount.toString();


    await db.insert(paymentsTable).values({
        booking_id,
        amount: amountAsString,
        payment_status: 'Pending',
        payment_method: 'card',
        transaction_id: paymentIntent.id,
    }).execute();

    return paymentIntent;
};

export const createCheckoutSession = async (amount: number, currency: string, booking_id: number) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: 'Nazarene Vehicle rental',
                    },
                    unit_amount: Math.round(amount),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/dashboard',
        cancel_url: 'http://localhost:5173/dashboard',
    });

    const amountAsString = amount.toString();
    await db.insert(paymentsTable).values({
        booking_id,
        amount: amountAsString,
        payment_status: 'Pending',
        payment_method: 'card',
        transaction_id: session.id,
    }).execute();

    return session;
};

export const handleWebhook = async (payload: string, sig: string, webhookSecret: string) => {
    try {
        const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            await db.update(paymentsTable).set({
                payment_status: 'Succeeded',
                payment_date: new Date(session.created * 1000).toISOString(),
            }).where(eq(paymentsTable.transaction_id, session.id)).execute();

            const payment = await db.query.paymentsTable.findFirst({
                where: eq(paymentsTable.transaction_id, session.id)});
            if (payment) {
                await db.update(bookingsTable).set({
                    booking_status: 'Succeeded',
                }).where(eq(bookingsTable.id, payment.booking_id)).execute();
            }
        }
        return event;

    } catch (err: any) {
        throw new Error(`Webhook Error: ${err.message}`);
 }
};