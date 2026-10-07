import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/sanity/products";

const categoryVisuals: Record<string, string> = {
  "Oil Filters":
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  "Air Filters":
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
  "Fuel Filters":
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  "Cabin Filters":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "Hydraulic Filters":
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "Coolant Filters":
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
};

const fallbackVisual =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80";

export async function CategoryBrowse() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const tiles = (categories.length
    ? categories
    : [...new Set(products.map((p) => p.category).filter(Boolean))]
  ) as string[];

  if (!tiles.length) return null;

  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
              Shop by category
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-foreground">
              Find your filter fast
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-display text-sm uppercase tracking-[0.14em] text-brand hover:underline sm:inline"
          >
            Shop all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {tiles.slice(0, 6).map((category) => {
            const count = products.filter((p) => p.category === category).length;
            const image = categoryVisuals[category] || fallbackVisual;
            return (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="group relative aspect-[3/4] overflow-hidden bg-surface"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <p className="font-display text-sm uppercase leading-tight tracking-[0.08em]">
                    {category}
                  </p>
                  <p className="mt-1 text-[11px] text-white/75">
                    {count} product{count === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
