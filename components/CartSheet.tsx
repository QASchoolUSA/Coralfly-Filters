'use client'

import { useCart } from "@/components/CartProvider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Plus, Minus, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function CartSheet() {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, total, shipping } = useCart()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Handle BFCache page restore to reset loading state
        const onPageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                setIsLoading(false)
            }
        }
        window.addEventListener('pageshow', onPageShow)

        if (searchParams.get('cart') === 'open') {
            if (!isOpen) {
                toggleCart()
            }
            // Remove the query param so it doesn't re-trigger or persist
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.delete('cart')
            window.history.replaceState({}, '', newUrl.toString())

            // Also ensure loading state is reset if returning via redirect
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(false)
        }

        return () => {
            window.removeEventListener('pageshow', onPageShow)
        }
    }, [searchParams, isOpen, toggleCart])

    const handleCheckout = async () => {
        try {
            setIsLoading(true)

            if (typeof window !== 'undefined' && typeof window.fbq === 'function' && items.length > 0) {
                const productIds = items.map((item: { partNumber: string }) => item.partNumber)
                window.fbq('track', 'InitiateCheckout', {
                    content_ids: productIds,
                    content_type: 'product'
                })
            }

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Server API Error:", errorText)
                alert("Checkout system is currently configuring. Please try again later.")
                setIsLoading(false)
                return
            }

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                console.error("No URL returned")
                alert("Checkout failed. Please try again.")
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Checkout error:", error)
            alert("Checkout system is currently configuring. Please try again later.")
            setIsLoading(false)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetTrigger asChild>
                <div className="relative cursor-pointer">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {items.reduce((acc, i) => acc + i.quantity, 0)}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-[480px] p-0 gap-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-xl">Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <div className="bg-muted p-4 rounded-full">
                                <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <p className="font-medium">Your cart is empty.</p>
                            <Button variant="outline" onClick={toggleCart} className="mt-2">
                                Browse Products
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item._id} className="flex gap-4 group">
                                    <div className="relative h-24 w-24 rounded-lg border bg-secondary/20 overflow-hidden shrink-0">
                                        {item.imageUrl ? (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-sm leading-tight text-foreground/90 line-clamp-2">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">Part #: {item.partNumber}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="font-bold text-primary">${item.price.toFixed(2)}</p>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 bg-muted rounded-md border">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-none rounded-l-md"
                                                        onClick={() => updateQuantity(item._id, -1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-xs font-medium w-6 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-none rounded-r-md"
                                                        onClick={() => updateQuantity(item._id, 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t bg-muted/30 p-6 space-y-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between font-bold text-xl pt-2 text-foreground">
                                <span>Total</span>
                                <span>${(total + shipping).toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            className="w-full text-base font-semibold shadow-lg"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Checkout"
                            )}
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
