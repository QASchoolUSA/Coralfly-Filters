import Stripe from 'stripe'

export const getStripe = () => {
    const stripeKey = process.env.STRIPE_SECRET_KEY

    if (!stripeKey) {
        throw new Error(
            'STRIPE_SECRET_KEY is not set. Please configure it in your environment variables.'
        )
    }

    return new Stripe(stripeKey, {
        apiVersion: '2024-12-18.acacia' as any,
        typescript: true,
    })
}
