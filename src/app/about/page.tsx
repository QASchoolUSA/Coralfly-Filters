import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "CORALFLY — Reliable Filter Reliable service. Industrial filtration built for uptime.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
            About CORALFLY
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl uppercase tracking-[0.04em] text-foreground sm:text-5xl">
            Reliable Filter Reliable service
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            CORALFLY builds filtration products for operators who cannot afford
            downtime — clear specs, consistent media quality, and service that
            matches the hardware.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80"
            alt="Technician working with industrial equipment"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-foreground">
            Engineered for real duty cycles
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            From oil and air to fuel, cabin, and hydraulic lines, our catalog is
            organized for fast matching and fleet replenishment. When you are
            ready to buy, checkout happens on Stripe&apos;s secure hosted page —
            no card details ever touch our servers.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
          >
            Explore products
          </Link>
        </div>
      </section>
    </div>
  );
}
