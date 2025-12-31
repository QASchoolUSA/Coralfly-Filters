"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/components/CartProvider"

interface ProductCardProps {
    product: {
        _id: string
        name: string
        slug: { current: string }
        partNumber: string
        price: number
        productType: string
        imageUrl?: string
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
                {product.imageUrl ? (
                    <>
                        {!isImageLoaded && (
                            <Skeleton className="absolute inset-0 w-full h-full z-10" />
                        )}
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            onLoad={() => setIsImageLoaded(true)}
                            className={`object-contain p-2 transition-all duration-300 hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-slate-50 dark:bg-slate-900">
                        No Image
                    </div>
                )}
                <Badge className="absolute top-2 right-2 z-20" variant="secondary">
                    {product.productType.replace('-', ' ')}
                </Badge>
            </div>
            <CardContent className="p-4 flex-1">
                <p className="text-sm text-muted-foreground mb-1">Part #: {product.partNumber}</p>
                <Link href={`/product/${product.slug.current}`} className="hover:underline">
                    <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">{product.name}</h3>
                </Link>
                <div className="text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" asChild>
                    <Link href={`/product/${product.slug.current}`}>Details</Link>
                </Button>
                <Button className="w-full" onClick={() => addItem({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    slug: product.slug.current,
                    imageUrl: product.imageUrl,
                    partNumber: product.partNumber,
                    quantity: 1
                })}>
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
