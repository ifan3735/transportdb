import { Context } from 'hono';
import { createCheckoutSession, createPaymentIntent, handleWebhook } from './stripe.service';


export const createPaymentIntentHandler = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { amount, currency, booking_id } = body;

        if (!amount || !currency || !booking_id) {
            return c.json({ error: 'Amount, currency, and booking ID are required' }, 400);
        }

        const paymentIntent = await createPaymentIntent(amount, currency, booking_id);
        return c.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error('Error creating payment intent:', error.message);
        return c.json({ error: error.message }, 400);
    }
};

export const createCheckoutSessionHandler = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { amount, currency, booking_id } = body;

        if (!amount || !currency || !booking_id) {
            return c.json({ error: 'Amount, currency, and booking ID are required' }, 400);
        }

        const session = await createCheckoutSession(amount, currency, booking_id);
        const checkoutUrl = session.url;

        return c.json({ sessionId: session.id, checkoutUrl: checkoutUrl });
    } catch (error: any) {
        console.error('Error creating checkout session:', error.message);
        return c.json({ error: error.message }, 400);
    }
};


export const webhookHandler = async (c: Context) => {
    const payload = await c.req.text();
    const sig = c.req.header('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (!sig) {
        console.error('Error: Missing Stripe signature');
        return c.text('Missing Stripe signature', 400);
    }

    try {
        const event = await handleWebhook(payload, sig, webhookSecret);
        return c.text('Received');
    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`);
        return c.text(error.message, 400);
    }
};

