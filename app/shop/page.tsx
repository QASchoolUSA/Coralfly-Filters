import { client } from "@/sanity/lib/client"
import { PRODUCTS_QUERY } from "@/sanity/lib/queries"
import { ProductBrowser } from "@/components/ProductBrowser"

// Force dynamic to ensure we get fresh data
export const dynamic = 'force-dynamic'

export default async function ShopPage() {
    // Fetch ALL products from Sanity
    const products = await client.fetch(PRODUCTS_QUERY);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shop All Parts</h1>
            <ProductBrowser products={products} />
        </div>
    )
}
