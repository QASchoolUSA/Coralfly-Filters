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
    <div className="checkout-button-wrap">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="btn btn-primary btn-lg checkout-button"
      >
        {loading ? "Redirecting to Stripe…" : "Checkout with Stripe"}
      </button>
      {error ? <p className="checkout-error" role="alert">{error}</p> : null}
      <p className="checkout-note">
        You will complete payment on Stripe&apos;s secure hosted checkout page.
      </p>
    </div>
  );
}
