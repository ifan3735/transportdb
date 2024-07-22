import { Hono } from "hono";
import { createCheckoutSessionHandler, createPaymentIntentHandler } from "./stripe.controller";

export const stripeRouter = new Hono();


stripeRouter.post('/create-payment-intent', createPaymentIntentHandler);
stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);