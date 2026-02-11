import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

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

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://lynxandparts.com'}/?cart=open`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            billing_address_collection: 'required',
            allow_promotion_codes: true,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('[STRIPE_ERROR]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
