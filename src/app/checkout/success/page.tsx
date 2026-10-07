import type { Metadata } from "next";
import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your CORALFLY Stripe checkout completed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <ClearCartOnSuccess />
      <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
        Checkout
      </p>
      <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
        Payment received
      </h1>
      <p className="mt-4 text-base text-muted">
        Thanks for ordering with CORALFLY. Stripe has confirmed your payment.
        A receipt will arrive from Stripe if email receipts are enabled on your
        account.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
      >
        Continue shopping
      </Link>
    </div>
  );
}
