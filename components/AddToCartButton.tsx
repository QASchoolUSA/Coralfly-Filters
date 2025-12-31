'use client'

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartProvider"

export function AddToCartButton({ product }: { product: any }) {
    const { addItem } = useCart()

    return (
        <Button size="lg" className="w-full text-lg h-12" onClick={() => addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            slug: product.slug.current,
            imageUrl: product.images?.[0],
            partNumber: product.partNumber,
            quantity: 1
        })}>
            Add to Cart
        </Button>
    )
}
