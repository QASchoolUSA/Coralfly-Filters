"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/sanity/types";

export type CompareItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  sku?: string;
  image?: string;
  category?: string;
  specs?: { label: string; value: string }[];
  compatibleMakes?: string[];
  inStock?: boolean;
};

type CompareState = {
  items: CompareItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clear: () => void;
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.some((i) => i.id === product._id)) return state;
          if (state.items.length >= 4) {
            // max 4 items
            const sliced = state.items.slice(0, 3);
            return {
              items: [
                ...sliced,
                {
                  id: product._id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  currency: product.currency || "usd",
                  sku: product.sku,
                  image: product.images[0]?.url,
                  category: product.category,
                  specs: product.specs,
                  compatibleMakes: product.compatibleMakes,
                  inStock: true,
                },
              ],
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product._id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                currency: product.currency || "usd",
                sku: product.sku,
                image: product.images[0]?.url,
                category: product.category,
                specs: product.specs,
                compatibleMakes: product.compatibleMakes,
                inStock: true,
              },
            ],
          };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      isInCompare: (id) => get().items.some((i) => i.id === id),
      clear: () => set({ items: [] }),
    }),
    {
      name: "coralfly_compare_storage",
    }
  )
);
