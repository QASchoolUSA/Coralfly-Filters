const items = [
  { title: "OEM-grade media", copy: "Built for sustained filtration efficiency" },
  { title: "Fleet-ready SKUs", copy: "Oil, air, fuel, cabin, and hydraulic lines" },
  { title: "Secure checkout", copy: "Stripe-hosted payments you can trust" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="border-l-2 border-brand pl-4">
            <h2 className="font-display text-sm uppercase tracking-[0.14em] text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
