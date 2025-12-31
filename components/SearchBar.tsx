"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SearchResult {
    _id: string
    name: string
    slug: string
    partNumber: string
    imageUrl: string
    price: number
}

export function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.length < 2) {
                setResults([])
                setIsOpen(false)
                return
            }

            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                const data = await response.json()
                setResults(data)
                setIsOpen(true)
            } catch (error) {
                console.error("Search failed", error)
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsOpen(false)
        router.push(`/shop?search=${encodeURIComponent(query)}`)
    }

    return (
        <div className="relative w-full lg:w-80" ref={containerRef}>
            <form onSubmit={handleSubmit} className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by part number..."
                    className="w-full bg-background pl-8"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0) setIsOpen(true)
                    }}
                />
            </form>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto p-1">
                        {results.map((product) => (
                            <Link
                                key={product._id}
                                href={`/product/${product.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 rounded-sm px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                            >
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-secondary/20">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-muted text-xs">
                                            Img
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-medium truncate">{product.name}</span>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Part #: {product.partNumber}</span>
                                        <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
