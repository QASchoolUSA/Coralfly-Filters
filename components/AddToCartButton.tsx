'use client'

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartProvider"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddToCartButton({ product }: { product: any }) {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'AddToCart', {
                content_ids: [product.partNumber],
                content_type: 'product'
            })
        }

        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            slug: product.slug.current,
            imageUrl: product.images?.[0],
            partNumber: product.partNumber,
            quantity: 1
        })
    }

    return (
        <Button size="lg" className="w-full text-lg h-12" onClick={handleAddToCart}>
            Add to Cart
        </Button>
    )
}
