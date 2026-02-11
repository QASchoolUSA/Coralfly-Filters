import { client } from "@/sanity/lib/client"
import { PRODUCTS_FILTERED_QUERY } from "@/sanity/lib/queries"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Search, Droplet, Flame, Wind, Fan, Package, Lightbulb, Filter, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    });

    if (searchQuery) {
        products = products.filter((p: any) =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.partNumber.toLowerCase().includes(searchQuery)
        );
    }

    const categories = [
        { label: 'Oil Filters', value: 'oil-filter', icon: Droplet },
        { label: 'Fuel Filters', value: 'fuel-filter', icon: Flame },
        { label: 'Air Filters', value: 'air-filter', icon: Wind },
        { label: 'Cabin Filters', value: 'cabin-air-filter', icon: Fan },
        { label: 'Water Separators', value: 'fuel-water-separator', icon: Filter },
        { label: 'Filter Kits', value: 'multi-system-filter-kit', icon: Package },
        { label: 'Lamps', value: 'lamp', icon: Lightbulb },
    ]

    return (
        <div className="min-h-screen bg-muted/10">
            <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Shop All Parts
                    </h1>
                    <p className="text-muted-foreground max-w-[600px]">
                        Find premium quality filters and parts for your semi truck.
                    </p>
                </div>

                {/* Category Pills - Wrapped */}
                <div className="w-full">
                    <div className="flex flex-wrap justify-center gap-3">
                        {/* Clear Filter Pill */}
                        {(typeFilter || searchQuery) && (
                            <Link
                                href="/shop"
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-dashed bg-background hover:bg-muted text-muted-foreground transition-colors"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Clear Filters
                            </Link>
                        )}

                        {categories.map((cat) => {
                            const params = new URLSearchParams()
                            if (searchQuery) params.set('search', searchQuery)
                            params.set('type', cat.value)

                            const isActive = typeFilter === cat.value
                            const Icon = cat.icon

                            return (
                                <Link
                                    key={cat.value}
                                    href={`/shop?${params.toString()}`}
                                    className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium border transition-all shadow-sm hover:shadow-md ${isActive
                                        ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20'
                                        : 'bg-background hover:bg-muted border-input text-foreground hover:border-primary/30'
                                        }`}
                                >
                                    <Icon className={`mr-2 h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                                    {cat.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">
                            {typeFilter ? categories.find(c => c.value === typeFilter)?.label : 'All Products'}
                        </h2>
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground">{products.length}</span> results
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed rounded-xl bg-slate-50/50">
                            <div className="p-4 bg-muted rounded-full mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">No products found</h3>
                            <p className="text-muted-foreground max-w-sm mt-2">
                                We couldn't find any products matching your selection. Try adjusting your filters or search terms.
                            </p>
                            <Button asChild className="mt-6" variant="outline">
                                <Link href="/shop">Clear All Filters</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
