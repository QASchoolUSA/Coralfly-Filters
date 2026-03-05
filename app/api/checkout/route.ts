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
            automatic_tax: { enabled: true },
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?cart=open`,
            metadata: {
                product_ids: JSON.stringify(items.map((i: { partNumber: string }) => i.partNumber))
            },
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
                        tax_behavior: 'exclusive',
                    },
                },
            ] : undefined,
            billing_address_collection: 'required',
            allow_promotion_codes: true,
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        const stripeKey = process.env.STRIPE_SECRET_KEY
        const errorDetails = {
            error: error.message || 'Unknown error',
            type: error.type || error.constructor?.name || 'Unknown',
            stripeKeyPresent: !!stripeKey,
            stripeKeyPrefix: stripeKey?.substring(0, 8) || 'N/A',
            stripeKeyLength: stripeKey?.length || 0,
        }

        console.error('[CHECKOUT_ERROR]', JSON.stringify(errorDetails, null, 2))

        return NextResponse.json(
            { error: error.message || 'Checkout failed', details: errorDetails },
            { status: 500 }
        )
    }
}
