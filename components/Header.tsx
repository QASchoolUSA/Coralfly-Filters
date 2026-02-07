"use client"

import Link from 'next/link'
import { Search, Menu, X, Home, LayoutGrid, Droplet, Flame, Wind, Fan, Package, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { CartSheet } from '@/components/CartSheet'
import { SearchBar } from '@/components/SearchBar'
import { useState } from 'react'

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    )
}

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4">
                {/* Mobile Menu */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden mr-2">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <SheetDescription className="sr-only">Main Navigation</SheetDescription>

                        <div className="flex flex-col h-full">
                            <div className="px-1 py-4">
                                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                                    <span className="font-bold text-2xl tracking-tight">CoralFly</span>
                                </Link>
                            </div>

                            <Separator className="my-2" />

                            <nav className="flex flex-col space-y-1">
                                <Button variant="ghost" className="w-full justify-start text-lg font-medium" asChild>
                                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                        <Home className="mr-3 h-5 w-5" />
                                        Home
                                    </Link>
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-lg font-medium" asChild>
                                    <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
                                        <LayoutGrid className="mr-3 h-5 w-5" />
                                        Shop All
                                    </Link>
                                </Button>

                                <div className="py-2">
                                    <h4 className="px-4 text-sm font-semibold text-muted-foreground mb-2">Categories</h4>
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href="/shop?type=oil-filter" onClick={() => setIsMenuOpen(false)}>
                                            <Droplet className="mr-3 h-4 w-4" />
                                            Oil Filters
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href="/shop?type=fuel-filter" onClick={() => setIsMenuOpen(false)}>
                                            <Flame className="mr-3 h-4 w-4" />
                                            Fuel Filters
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href="/shop?type=air-filter" onClick={() => setIsMenuOpen(false)}>
                                            <Wind className="mr-3 h-4 w-4" />
                                            Air Filters
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href="/shop?type=cabin-air-filter" onClick={() => setIsMenuOpen(false)}>
                                            <Fan className="mr-3 h-4 w-4" />
                                            Cabin Filters
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href="/shop?type=multi-system-filter-kit" onClick={() => setIsMenuOpen(false)}>
                                            <Package className="mr-3 h-4 w-4" />
                                            Filter Kits
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href="/shop?type=lamp" onClick={() => setIsMenuOpen(false)}>
                                            <Lightbulb className="mr-3 h-4 w-4" />
                                            Lamps
                                        </Link>
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>

                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-xl tracking-tight">CoralFly</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">Shop</Link>
                    <Link href="/shop?type=oil-filter" className="transition-colors hover:text-foreground/80 text-foreground/60">Oil Filters</Link>
                    <Link href="/shop?type=fuel-filter" className="transition-colors hover:text-foreground/80 text-foreground/60">Fuel Filters</Link>
                    <Link href="/shop?type=air-filter" className="transition-colors hover:text-foreground/80 text-foreground/60">Air Filters</Link>
                    <Link href="/shop?type=multi-system-filter-kit" className="transition-colors hover:text-foreground/80 text-foreground/60">Filter Kits</Link>
                    <Link href="/shop?type=lamp" className="transition-colors hover:text-foreground/80 text-foreground/60">Lamps</Link>
                </nav>

                <div className="flex flex-1 items-center justify-end gap-2 md:gap-8">
                    {/* Desktop Search */}
                    <div className="hidden md:block md:w-60 lg:w-80">
                        <SearchBar />
                    </div>

                    {/* Mobile Search Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://web.whatsapp.com/send?phone=+14078853831" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="h-5 w-5" />
                            <span className="sr-only">Contact on WhatsApp</span>
                        </Link>
                    </Button>

                    <CartSheet />
                </div>
            </div>

            {/* Mobile Search Bar Expand */}
            {isSearchOpen && (
                <div className="md:hidden border-t p-4 bg-background animate-in slide-in-from-top-2">
                    <SearchBar />
                </div>
            )}
        </header>
    )
}
