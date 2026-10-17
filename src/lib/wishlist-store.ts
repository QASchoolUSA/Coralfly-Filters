"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/sanity/types";

export type WishlistItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  sku?: string;
  image?: string;
  inStock?: boolean;
  rating?: number;
  reviewsCount?: number;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.some((i) => i.id === product._id)) return state;
          const item: WishlistItem = {
            id: product._id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            currency: product.currency || "usd",
            sku: product.sku,
            image: product.images[0]?.url,
            inStock: true,
            rating: 5,
            reviewsCount: 3,
          };
          return { items: [item, ...state.items] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      isInWishlist: (id) => get().items.some((i) => i.id === id),
      clear: () => set({ items: [] }),
    }),
    {
      name: "coralfly_wishlist_storage",
    }
  )
);
