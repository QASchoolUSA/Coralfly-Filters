"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"

interface Product {
    _id: string
    name: string
    slug: { current: string }
    partNumber: string
    price: number
    productType: string
    brand: string
    imageUrl: string
}

interface ProductBrowserProps {
    products: Product[]
}

const CATEGORIES = [
    { label: 'Oil Filters', value: 'oil-filter' },
    { label: 'Fuel Filters', value: 'fuel-filter' },
    { label: 'Air Filters', value: 'air-filter' },
    { label: 'Cabin Filters', value: 'cabin-air-filter' },
    { label: 'Water Separators', value: 'fuel-water-separator' },
]

export function ProductBrowser({ products }: ProductBrowserProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Initialize state from URL params
    const initialSearch = searchParams.get('search') || ""
    const initialType = searchParams.get('type') || ""
    // Helper to verify price params are valid numbers
    const initialMinPrice = Number(searchParams.get('minPrice')) || 0
    const initialMaxPrice = Number(searchParams.get('maxPrice')) || 200

    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const [selectedType, setSelectedType] = useState(initialType)
    const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice])


    // Effect to update URL without reloading when filters change
    // Using simple debounce logic or just updating on effect could be spammy, 
    // but for "smoothness" let's just shallow replace.
    useEffect(() => {
        const params = new URLSearchParams()
        if (searchQuery) params.set('search', searchQuery)
        if (selectedType) params.set('type', selectedType)
        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString())
        if (priceRange[1] < 200) params.set('maxPrice', priceRange[1].toString())

        // Use replace to avoid cluttering history stack too much, or push if we want back button to work for every change
        // Replace is usually better for sliders
        router.replace(`?${params.toString()}`, { scroll: false })
    }, [searchQuery, selectedType, priceRange, router])


    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Type Filter
            if (selectedType && product.productType !== selectedType) {
                return false
            }

            // Search Filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const matchesName = product.name.toLowerCase().includes(query)
                const matchesPart = product.partNumber.toLowerCase().includes(query)
                if (!matchesName && !matchesPart) return false
            }

            // Price Filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) {
                return false
            }

            return true
        })
    }, [products, selectedType, searchQuery, priceRange])

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 space-y-6 shrink-0">
                {/* Search */}
                <div>
                    <h3 className="font-semibold mb-4">Search</h3>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Part Number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>

                <Separator />

                {/* Categories */}
                <div>
                    <h3 className="font-semibold mb-4">Categories</h3>
                    <div className="space-y-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedType(selectedType === cat.value ? "" : cat.value)}
                                className={`block text-sm hover:underline text-left ${selectedType === cat.value ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                        {selectedType && (
                            <div className="pt-2">
                                <button onClick={() => setSelectedType("")} className="text-xs text-primary underline">
                                    Clear Category
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Price Filter */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Price Range</h3>
                        <span className="text-sm text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</span>
                    </div>
                    <Slider
                        defaultValue={[0, 200]}
                        value={priceRange}
                        min={0}
                        max={200}
                        step={1}
                        onValueChange={setPriceRange}
                        className="py-4"
                    />
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="mb-4 text-sm text-muted-foreground">
                    Showing {filteredProducts.length} results
                </div>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border rounded-lg bg-slate-50">
                        <p className="text-muted-foreground">No products found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedType("")
                                setPriceRange([0, 200])
                            }}
                            className="mt-4 text-primary underline"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
