"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "./cart-store";
import type { CartItem } from "@/sanity/types";

function subscribe(onStoreChange: () => void) {
  return useCartStore.subscribe(onStoreChange);
}

export function useCartItems(): CartItem[] {
  return useSyncExternalStore(
    subscribe,
    () => useCartStore.getState().items,
    () => [],
  );
}

export function useCartItemCount(): number {
  return useSyncExternalStore(
    subscribe,
    () =>
      useCartStore.getState().items.reduce((sum, item) => sum + item.quantity, 0),
    () => 0,
  );
}
