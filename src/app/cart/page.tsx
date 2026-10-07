import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your CORALFLY cart and checkout with Stripe.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
          Cart
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
          Your filters
        </h1>
      </div>
      <CartView />
    </div>
  );
}
