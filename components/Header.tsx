"use client"

import Link from 'next/link'
import { Search, Menu, X, Home, LayoutGrid, Droplet, Flame, Wind, Fan } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { CartSheet } from '@/components/CartSheet'
import { SearchBar } from '@/components/SearchBar'
import { useState } from 'react'

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
                </nav>

                <div className="flex flex-1 items-center justify-end gap-2 md:gap-8">
                    {/* Desktop Search */}
                    <div className="hidden md:block w-full max-w-[200px] md:w-auto">
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
