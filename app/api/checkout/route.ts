import { getStripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    try {
        const { items } = await req.json()

        if (!items || items.length === 0) {
            return new NextResponse("No items in cart", { status: 400 })
        }

        // Security: Fetch prices from Sanity to prevent client-side manipulation
        // We get all product IDs from the cart items
        const productIds = items.map((item: any) => item._id)

        // Query Sanity for these products
        const products = await client.fetch(`*[_type == "product" && _id in $ids] {
        _id,
        name,
        price,
        "image": images[0].asset->url
    }`, { ids: productIds })

        // Create line items
        const line_items = items.map((item: any) => {
            const product = products.find((p: any) => p._id === item._id)

            if (!product) {
                throw new Error(`Product not found: ${item.name}`)
            }

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: product.image ? [product.image] : [],
                    },
                    unit_amount: Math.round(product.price * 100), // Stripe expects cents
                },
                quantity: item.quantity,
            }
        })

        // Calculate shipping cost based on the total number of items
        const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
        const shippingCostInCents = totalItems > 0 ? Math.round((9.99 + (totalItems - 1) * 1.00) * 100) : 0

        const stripe = getStripe()
        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_URL || 'https://lynxandparts.com'

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?cart=open`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            shipping_options: shippingCostInCents > 0 ? [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: shippingCostInCents,
                            currency: 'usd',
                        },
                        display_name: 'Flat Rate Shipping',
                    },
                },
            ] : undefined,
            billing_address_collection: 'required',
            allow_promotion_codes: true,
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        // Advanced logging to help diagnose Vercel Environment Variable issues
        console.error('[STRIPE_ERROR_MESSAGE]', error.message || error)

        const stripeKey = process.env.STRIPE_SECRET_KEY
        console.error('[STRIPE_DEBUG] STRIPE_SECRET_KEY is defined:', !!stripeKey)
        console.error('[STRIPE_DEBUG] STRIPE_SECRET_KEY starts with sk_test_:', stripeKey?.startsWith('sk_test_'))
        console.error('[STRIPE_DEBUG] STRIPE_SECRET_KEY starts with sk_live_:', stripeKey?.startsWith('sk_live_'))
        console.error('[STRIPE_DEBUG] STRIPE_SECRET_KEY length:', stripeKey?.length)

        console.error('[STRIPE_DEBUG] NEXT_PUBLIC_URL:', process.env.NEXT_PUBLIC_URL)

        return new NextResponse("Internal Error", { status: 500 })
    }
}
