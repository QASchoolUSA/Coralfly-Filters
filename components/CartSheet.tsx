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
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Your Cart ({items.length})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingCart className="h-16 w-16 opacity-20" />
                            <p>Your cart is empty.</p>
                            <Button variant="outline" onClick={toggleCart}>Continue Shopping</Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item._id} className="flex gap-4">
                                    <div className="relative h-20 w-20 rounded border bg-slate-50 overflow-hidden shrink-0">
                                        {item.imageUrl ? (
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="h-full w-full bg-slate-100" />
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                        <div className="flex items-center justify-between mt-auto">
                                            <p className="font-bold">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => removeItem(item._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t pt-6 space-y-4">
                        <div className="flex items-center justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button size="lg" className="w-full" onClick={handleCheckout}>
                            Checkout
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
