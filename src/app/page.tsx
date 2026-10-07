import Link from "next/link";
import { Suspense } from "react";
import { CategoryBrowse } from "@/components/CategoryBrowse";
import { Hero } from "@/components/Hero";
import { HomeCatalog } from "@/components/HomeCatalog";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { PromoBanner } from "@/components/PromoBanner";
import { SocialProof } from "@/components/SocialProof";
import { TrustStrip } from "@/components/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <Suspense
        fallback={
          <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-8 h-12 max-w-xs animate-pulse rounded bg-surface" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse bg-surface" />
              ))}
            </div>
          </section>
        }
      >
        <CategoryBrowse />
      </Suspense>

      <Suspense
        fallback={
          <section className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-10 h-16 max-w-sm animate-pulse rounded bg-surface" />
            <ProductGridSkeleton count={4} />
          </section>
        }
      >
        <HomeCatalog />
      </Suspense>

      <PromoBanner />
      <SocialProof />

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-[0.04em]">
              Ready to order?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/90 sm:text-base">
              Build your cart now — CORALFLY filters with reliable service and
              Stripe-secure checkout.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-white px-7 font-display text-sm uppercase tracking-[0.14em] text-brand hover:bg-brand-light"
            >
              Start shopping
            </Link>
            <Link
              href="/cart"
              className="inline-flex h-12 items-center justify-center border border-white/50 px-7 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              View cart
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
