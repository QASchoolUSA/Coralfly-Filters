const reviews = [
  {
    quote:
      "Ordered a full oil and fuel set for the shop. Specs were clear, cart was easy, filters arrived ready to install.",
    name: "Marcus T.",
    role: "Fleet maintenance lead",
  },
  {
    quote:
      "We switched our hydraulic line stock to CORALFLY. Consistent quality and checkout that just works.",
    name: "Elena R.",
    role: "Parts buyer",
  },
  {
    quote:
      "Finally an online filter store that feels built for pros — fast browse, solid pricing, secure Stripe pay.",
    name: "Jordan K.",
    role: "Independent tech",
  },
];

export function SocialProof() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 text-center">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
            Trusted by shops & fleets
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-foreground">
            Customers buy again
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="border-t-2 border-brand bg-white px-5 py-6"
            >
              <div className="mb-3 flex gap-0.5 text-brand" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                “{review.quote}”
              </p>
              <footer className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted">{review.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
