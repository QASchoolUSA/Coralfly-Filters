import type { CartItem } from "@/sanity/types";

export type ShippingCategory = "air" | "oil_fuel" | "cabin" | "standard";

export interface ItemShippingInfo {
  rate: number;
  category: ShippingCategory;
  categoryLabel: string;
}

/**
 * Determine the per-piece delivery rate for a given item based on its category and name.
 * - Cabin Air Filters: $3.00 / piece
 * - Air Filters: $10.00 / piece
 * - Oil Filters & Fuel Separators / Fuel Filters: $5.00 / piece
 * - Standard Parts & Accessories (Kits, lamps, etc.): $5.00 / piece
 */
export function getItemShippingRate(item: {
  name: string;
  category?: string;
}): ItemShippingInfo {
  const cat = (item.category || "").toLowerCase();
  const name = (item.name || "").toLowerCase();

  // 1. Cabin Filters ($3/pc) — check cabin first before general "air"
  if (cat.includes("cabin") || name.includes("cabin")) {
    return {
      rate: 3,
      category: "cabin",
      categoryLabel: "Cabin Air Filter",
    };
  }

  // 2. Air Filters ($10/pc)
  if (
    cat.includes("air") ||
    name.includes("air filter") ||
    name.includes("air cleaner")
  ) {
    return {
      rate: 10,
      category: "air",
      categoryLabel: "Air Filter",
    };
  }

  // 3. Oil & Fuel Filters / Water Separators ($5/pc)
  if (
    cat.includes("oil") ||
    cat.includes("fuel") ||
    name.includes("oil") ||
    name.includes("fuel") ||
    name.includes("separator") ||
    name.includes("coolant")
  ) {
    return {
      rate: 5,
      category: "oil_fuel",
      categoryLabel: "Oil / Fuel Filter",
    };
  }

  // 4. Standard Parts, Accessories & Kits ($5/pc)
  return {
    rate: 5,
    category: "standard",
    categoryLabel: "Commercial Part",
  };
}

/**
 * Calculate the total shipping amount for a list of cart items.
 * Each item quantity is multiplied by its category's per-piece rate.
 */
export function calculateCartShipping(items: CartItem[]): number {
  if (!items || items.length === 0) return 0;

  return items.reduce((total, item) => {
    const { rate } = getItemShippingRate(item);
    const qty = Math.max(0, item.quantity || 0);
    return total + rate * qty;
  }, 0);
}

export interface ShippingBreakdownTier {
  category: ShippingCategory;
  label: string;
  unitRate: number;
  totalQuantity: number;
  subtotalShipping: number;
}

/**
 * Breakdown of shipping costs by tier for transparent customer review.
 */
export function getCartShippingBreakdown(
  items: CartItem[],
): ShippingBreakdownTier[] {
  const tiers: Record<ShippingCategory, ShippingBreakdownTier> = {
    air: {
      category: "air",
      label: "Air Filters ($10/ea)",
      unitRate: 10,
      totalQuantity: 0,
      subtotalShipping: 0,
    },
    oil_fuel: {
      category: "oil_fuel",
      label: "Oil & Fuel Separators ($5/ea)",
      unitRate: 5,
      totalQuantity: 0,
      subtotalShipping: 0,
    },
    cabin: {
      category: "cabin",
      label: "Cabin Air Filters ($3/ea)",
      unitRate: 3,
      totalQuantity: 0,
      subtotalShipping: 0,
    },
    standard: {
      category: "standard",
      label: "Standard Parts & Kits ($5/ea)",
      unitRate: 5,
      totalQuantity: 0,
      subtotalShipping: 0,
    },
  };

  for (const item of items) {
    const { category, rate } = getItemShippingRate(item);
    const qty = Math.max(0, item.quantity || 0);
    tiers[category].totalQuantity += qty;
    tiers[category].subtotalShipping += qty * rate;
  }

  return Object.values(tiers).filter((t) => t.totalQuantity > 0);
}
