import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY || ""

if (!stripeKey && process.env.NODE_ENV !== 'production') {
    console.warn("Missing STRIPE_SECRET_KEY env var")
}

export const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-12-18.acacia' as any,
    typescript: true,
})
