import { client } from "@/sanity/lib/client"
import { PRODUCTS_FILTERED_QUERY } from "@/sanity/lib/queries"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"

// Force dynamic to ensure we get fresh data
export const dynamic = 'force-dynamic'

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const typeFilter = typeof params.type === 'string' ? params.type : undefined;
    const makeFilter = typeof params.make === 'string' ? params.make : null;
    const modelFilter = typeof params.model === 'string' ? params.model : null;
    const searchQuery = typeof params.search === 'string' ? params.search.toLowerCase() : undefined;

    // Use GROQ for filtering Vehicle & Type
    let products = await client.fetch(PRODUCTS_FILTERED_QUERY, {
        type: typeFilter || null,
        make: makeFilter,
        model: modelFilter
    });

    if (searchQuery) {
        products = products.filter((p: any) =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.partNumber.toLowerCase().includes(searchQuery)
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                {makeFilter ? `Parts for ${makeFilter} ${modelFilter || ''}` : 'Shop All Parts'}
            </h1>

            {(makeFilter) && (
                <div className="mb-6 p-4 bg-muted/30 rounded-lg border flex items-center justify-between">
                    <div>
                        <span className="font-semibold">Filtering by vehicle:</span> {makeFilter} {modelFilter}
                    </div>
                    <a href="/shop" className="text-sm text-primary hover:underline">Clear Vehicle</a>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-6 shrink-0">
                    <div>
                        <h3 className="font-semibold mb-4">Search</h3>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <form>
                                <Input
                                    name="search"
                                    placeholder="Part Number..."
                                    defaultValue={searchQuery}
                                    className="pl-8"
                                />
                                {makeFilter && <input type="hidden" name="make" value={makeFilter} />}
                                {modelFilter && <input type="hidden" name="model" value={modelFilter} />}
                                {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
                            </form>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Oil Filters', value: 'oil-filter' },
                                { label: 'Fuel Filters', value: 'fuel-filter' },
                                { label: 'Air Filters', value: 'air-filter' },
                                { label: 'Cabin Filters', value: 'cabin-air-filter' },
                                { label: 'Water Separators', value: 'fuel-water-separator' },
                            ].map((cat) => {
                                // Build URL keeping existing params
                                const href = `/shop?type=${cat.value}${makeFilter ? `&make=${makeFilter}` : ''}${modelFilter ? `&model=${modelFilter}` : ''}`;
                                return (
                                    <div key={cat.value} className="flex items-center space-x-2">
                                        <a href={href} className={`text-sm hover:underline ${typeFilter === cat.value ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                                            {cat.label}
                                        </a>
                                    </div>
                                )
                            })}
                            <div className="pt-2">
                                <a href="/shop" className="text-xs text-primary underline">Clear Filter</a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-4 text-sm text-muted-foreground">
                        Showing {products.length} results
                    </div>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border rounded-lg bg-slate-50">
                            <p className="text-muted-foreground">No products found for this selection.</p>
                            {makeFilter && <p className="text-sm mt-2 text-muted-foreground">Try clearing the vehicle filter.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
