'use client'

import { useCart } from "@/components/CartProvider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartSheet() {
    const { items, isOpen, toggleCart, removeItem, total } = useCart()

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                console.error("No URL returned")
                alert("Checkout failed. Please try again.")
            }
        } catch (error) {
            console.error("Checkout error:", error)
            alert("Checkout system is currently configuring. Please try again later.")
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
                                                <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                                    Qty: {item.quantity}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-1 -mr-1"
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
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="flex items-center justify-between font-bold text-xl pt-2 text-foreground">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button size="lg" className="w-full text-base font-semibold shadow-lg" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
