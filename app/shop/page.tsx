import { client } from "@/sanity/lib/client"
import { PRODUCTS_FILTERED_QUERY } from "@/sanity/lib/queries"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"
import Link from "next/link"

// Force dynamic to ensure we get fresh data
export const dynamic = 'force-dynamic'

export default async function ShopPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams
    const typeFilter = typeof searchParams.type === 'string' ? searchParams.type : undefined;
    const searchQuery = typeof searchParams.search === 'string' ? searchParams.search.toLowerCase() : undefined;

    // Use GROQ for filtering Vehicle & Type
    let products = await client.fetch(PRODUCTS_FILTERED_QUERY, {
        type: typeFilter || null,
        // Removed make/model filtering params
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
                Shop All Parts
            </h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-4 md:space-y-8 shrink-0">
                    <div className="hidden md:block">
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
                                {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
                            </form>
                        </div>
                    </div>
                    <Separator />
                    <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        <div className="flex space-x-2">
                            {[
                                { label: 'Oil Filters', value: 'oil-filter' },
                                { label: 'Fuel Filters', value: 'fuel-filter' },
                                { label: 'Air Filters', value: 'air-filter' },
                                { label: 'Cabin Filters', value: 'cabin-air-filter' },
                                { label: 'Water Separators', value: 'fuel-water-separator' },
                                { label: 'Filter Kits', value: 'multi-system-filter-kit' },
                                { label: 'Lamps', value: 'lamp' },
                            ].map((cat) => {
                                const params = new URLSearchParams()
                                if (searchQuery) params.set('search', searchQuery)
                                params.set('type', cat.value)

                                const isActive = typeFilter === cat.value

                                return (
                                    <Link
                                        key={cat.value}
                                        href={`/shop?${params.toString()}`}
                                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${isActive
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-background hover:bg-muted border-input'
                                            }`}
                                    >
                                        {cat.label}
                                    </Link>
                                )
                            })}
                            {(typeFilter || searchQuery) && (
                                <Link
                                    href="/shop"
                                    className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-dashed hover:bg-muted text-muted-foreground"
                                >
                                    Clear
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Oil Filters', value: 'oil-filter' },
                                { label: 'Fuel Filters', value: 'fuel-filter' },
                                { label: 'Air Filters', value: 'air-filter' },
                                { label: 'Cabin Filters', value: 'cabin-air-filter' },
                                { label: 'Water Separators', value: 'fuel-water-separator' },
                                { label: 'Filter Kits', value: 'multi-system-filter-kit' },
                                { label: 'Lamps', value: 'lamp' },
                            ].map((cat) => {
                                // Build URL keeping existing params
                                const params = new URLSearchParams()
                                if (searchQuery) params.set('search', searchQuery)
                                params.set('type', cat.value)

                                return (
                                    <div key={cat.value} className="flex items-center space-x-2">
                                        <Link href={`/shop?${params.toString()}`} className={`text-sm hover:underline ${typeFilter === cat.value ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                                            {cat.label}
                                        </Link>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
