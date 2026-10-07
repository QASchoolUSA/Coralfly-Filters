import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
        Page not found
      </h1>
      <p className="mt-4 text-base text-muted">
        The page you requested is not in the CORALFLY catalog.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
      >
        Browse filters
      </Link>
    </div>
  );
}
