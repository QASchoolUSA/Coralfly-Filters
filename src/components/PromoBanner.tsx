import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="bg-[#0b1e2d] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8 lg:py-12">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
            Fleet & workshop special
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] sm:text-4xl">
            Stock up. Save downtime.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Order CORALFLY filters online with secure Stripe checkout. Build your
            cart for oil, air, fuel, cabin, and hydraulic lines in one go.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex h-12 shrink-0 items-center justify-center bg-brand px-8 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark"
        >
          Shop the sale aisle
        </Link>
      </div>
    </section>
  );
}
