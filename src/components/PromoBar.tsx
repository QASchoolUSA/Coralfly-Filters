import Link from "next/link";

export function PromoBar() {
  return (
    <div className="bg-brand text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-xs sm:flex-row sm:gap-3 sm:px-6 sm:text-sm lg:px-8">
        <p className="font-display uppercase tracking-[0.12em]">
          Free shipping on orders $75+
        </p>
        <span className="hidden text-white/50 sm:inline" aria-hidden="true">
          ·
        </span>
        <p className="text-white/90">
          Same-day processing before 2pm{" "}
          <Link href="/shop" className="underline underline-offset-2 hover:text-white">
            Shop now
          </Link>
        </p>
      </div>
    </div>
  );
}
