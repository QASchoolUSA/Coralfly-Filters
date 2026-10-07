const items = [
  {
    title: "Free shipping $75+",
    copy: "On qualifying continental orders",
  },
  {
    title: "In-stock SKUs",
    copy: "Oil, air, fuel, cabin & hydraulic",
  },
  {
    title: "Secure Stripe pay",
    copy: "Hosted checkout — cards never hit our servers",
  },
  {
    title: "Pro-ready specs",
    copy: "Clear fitment details on every product",
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="border-l-2 border-brand pl-4">
            <h2 className="font-display text-sm uppercase tracking-[0.14em] text-foreground">
              {item.title}
            </h2>
            <p className="mt-1.5 text-sm text-muted">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
