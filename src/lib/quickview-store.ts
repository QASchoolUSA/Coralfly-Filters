"use client";

import { create } from "zustand";
import type { Product } from "@/sanity/types";

type QuickviewState = {
  activeProduct: Product | null;
  isOpen: boolean;
  openQuickview: (product: Product) => void;
  closeQuickview: () => void;
};

export const useQuickviewStore = create<QuickviewState>((set) => ({
  activeProduct: null,
  isOpen: false,
  openQuickview: (product) => set({ activeProduct: product, isOpen: true }),
  closeQuickview: () => set({ isOpen: false, activeProduct: null }),
}));
