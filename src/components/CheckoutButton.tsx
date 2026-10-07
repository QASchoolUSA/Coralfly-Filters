"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export function CheckoutButton() {
  const items = useCartStore((s) => s.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="inline-flex h-12 w-full items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting to Stripe…" : "Checkout with Stripe"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <p className="text-xs text-muted">
        You will complete payment on Stripe&apos;s secure hosted checkout page.
      </p>
    </div>
  );
}
