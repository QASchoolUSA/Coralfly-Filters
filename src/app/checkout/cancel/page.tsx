import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  description: "Your Stripe checkout was cancelled. Your cart is still available.",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
        Checkout
      </p>
      <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
        Checkout cancelled
      </h1>
      <p className="mt-4 text-base text-muted">
        No charge was made. Your cart is still saved if you want to try again.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/cart"
          className="inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
        >
          Return to cart
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-12 items-center justify-center border border-border px-7 font-display text-sm uppercase tracking-[0.14em] text-foreground hover:border-brand hover:text-brand"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
