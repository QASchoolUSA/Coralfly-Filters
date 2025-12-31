import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-2 transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                    </div>
                )}
                <Badge className="absolute top-2 right-2" variant="secondary">
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
            <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full" asChild>
                    <Link href={`/product/${product.slug.current}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
