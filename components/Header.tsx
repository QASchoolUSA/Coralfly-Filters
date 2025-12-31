import Link from 'next/link'
import { Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CartSheet } from '@/components/CartSheet'
import { SearchBar } from '@/components/SearchBar'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4">
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden mr-2">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col space-y-4 mt-6">
                            <Link href="/" className="font-bold text-lg">Home</Link>
                            <Link href="/shop" className="text-lg">Shop All</Link>
                            <Link href="/shop?type=oil-filter" className="text-lg">Oil Filters</Link>
                            <Link href="/shop?type=fuel-filter" className="text-lg">Fuel Filters</Link>
                            <Link href="/shop?type=air-filter" className="text-lg">Air Filters</Link>
                        </nav>
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

                <div className="flex flex-1 items-center justify-end gap-8">
                    <div className="hidden lg:block">
                        <SearchBar />
                    </div>
                    <CartSheet />
                </div>
            </div>
        </header>
    )
}
