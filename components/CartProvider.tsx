'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type CartItem = {
    _id: string
    name: string
    price: number
    imageUrl?: string
    slug: string
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    isOpen: boolean
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    toggleCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const saved = localStorage.getItem('cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, isMounted])

    const addItem = (newItem: CartItem) => {
        setItems(current => {
            const existing = current.find(item => item._id === newItem._id)
            if (existing) {
                return current.map(item =>
                    item._id === newItem._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...current, { ...newItem, quantity: 1 }]
        })
        setIsOpen(true)
    }

    const removeItem = (id: string) => {
        setItems(current => current.filter(item => item._id !== id))
    }

    const toggleCart = () => setIsOpen(prev => !prev)

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{ items, isOpen, addItem, removeItem, toggleCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}
