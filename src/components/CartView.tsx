"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "./CheckoutButton";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { useCartItems } from "@/lib/use-cart";

export function CartView() {
  const items = useCartItems();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <div className="rounded-md border border-dashed border-border bg-surface px-4 py-16 text-center">
        <p className="text-base text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center justify-center bg-brand px-6 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const currency = items[0]?.currency || "usd";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-5 sm:gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-surface sm:h-28 sm:w-28">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : null}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:justify-between">
              <div>
                <Link
                  href={`/product/${item.slug}`}
                  className="font-semibold text-foreground hover:text-brand"
                >
                  {item.name}
                </Link>
                {item.sku ? (
                  <p className="mt-1 text-xs text-muted">SKU: {item.sku}</p>
                ) : null}
                <p className="mt-2 text-sm text-muted">
                  {formatPrice(item.price, item.currency)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="sr-only" htmlFor={`qty-${item.id}`}>
                  Quantity for {item.name}
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    setQuantity(item.id, Number(e.target.value) || 1)
                  }
                  className="h-10 w-16 rounded-md border border-border px-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-muted hover:text-brand"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-border bg-surface p-6">
        <h2 className="font-display text-sm uppercase tracking-[0.16em] text-foreground">
          Order summary
        </h2>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold text-foreground">
            {formatPrice(subtotal, currency)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted">
          Shipping and taxes calculated on Stripe checkout when applicable.
        </p>
        <div className="mt-6">
          <CheckoutButton />
        </div>
      </aside>
    </div>
  );
}
