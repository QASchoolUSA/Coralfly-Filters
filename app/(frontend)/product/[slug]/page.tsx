import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/ProductGallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ShieldCheck, Truck } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { ProductViewTracker } from "@/components/ProductViewTracker"

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
    if (!product) return {}

    return {
        title: product.seoTitle || `${product.name} | CoralFly`,
        description: product.seoDescription || `Buy ${product.name} at CoralFly. High quality ${product.productType}. Part Number: ${product.partNumber}`,
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });

    if (!product) {
        return notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <ProductViewTracker partNumber={product.partNumber} />
                {/* Image Gallery */}
                <ProductGallery
                    images={product.images || (product.imageUrl ? [product.imageUrl] : [])}
                    productName={product.name}
                />

                {/* Product Info */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
                        <p className="text-lg text-muted-foreground mb-4">Part #: <span className="font-mono font-medium text-foreground">{product.partNumber}</span></p>
                        <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 font-medium">
                            In Stock
                        </div>
                    </div>

                    <div className="flex items-end gap-4 border-b pb-6">
                        <div className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <AddToCartButton product={product} />
                        <p className="text-xs text-muted-foreground text-center">
                            Free shipping on orders over $50. Secure checkout.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Truck className="h-5 w-5 text-primary" /> <span>Fast Delivery</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ShieldCheck className="h-5 w-5 text-primary" /> <span>Quality Guarantee</span>
                        </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full" defaultValue="description">
                        <AccordionItem value="description">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
                                {product.description ? (
                                    <div className="prose prose-sm max-w-none text-muted-foreground">
                                        <PortableText value={product.description} />
                                    </div>
                                ) : (
                                    <p>No description available.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
