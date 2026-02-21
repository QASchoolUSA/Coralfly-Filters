import Stripe from 'stripe'

export const getStripe = () => {
    const stripeKey = process.env.STRIPE_SECRET_KEY || ""

    if (!stripeKey && process.env.NODE_ENV !== 'production') {
        console.warn("Missing STRIPE_SECRET_KEY env var")
    }

    return new Stripe(stripeKey, {
        apiVersion: '2024-12-18.acacia' as any,
        typescript: true,
    })
}
