import Link from "next/link";
import type { CSSProperties } from "react";
import { getCategoryIcon } from "@/components/CategoryIcons";
import { ProductGrid } from "@/components/ProductGrid";
import { getCatalogMakes } from "@/lib/catalog";
import type { Product } from "@/sanity/types";

const makerColors: Record<string, string> = {
  volvo: "#1e5ba8",
  kenworth: "#e31837",
  freightliner: "#0066b2",
  peterbilt: "#b31b34",
  mack: "#1565a8",
  international: "#b5232f",
  "western star": "#283b63",
  daf: "#d32030",
};

export function HomeClient({ products, featured }: { products: Product[]; featured: Product[] }) {
  const makes = getCatalogMakes(products).map((item) => item.name);
  const features = [
    { icon: <ShieldIcon />, title: "Quality Filters", description: "Clear product specifications and catalog details help you choose the right filter for your application." },
    { icon: <TruckIcon />, title: "Fast Shipping", description: "Same-day processing before 2pm and free shipping on orders of $75 or more." },
    { icon: <FilterIcon />, title: "Built for the Long Haul", description: "Find oil, air, fuel, cabin, hydraulic, and coolant filters in one place." },
    { icon: <SupportIcon />, title: "Expert Support", description: "Need help with a filter match? Send our team the part number and truck details." },
  ];

  return <>
    <section className="section maker-filters-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Shop By Truck</span>
          <h2 className="section-title">Find Filters For Your Rig</h2>
          <p className="section-subtitle">Choose a truck make and jump to filters with matching fitment in the catalog.</p>
        </div>
        {makes.length ? <div className="maker-grid">
          {makes.map((make) => {
            const compatible = products.filter((product) => product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === make.toLocaleLowerCase()));
            const categories = [...new Set(compatible.map((product) => product.category).filter(Boolean))] as string[];
            return <article key={make} className="maker-card" style={{ "--maker-accent": makerColors[make.toLocaleLowerCase()] || "var(--color-accent)" } as CSSProperties}>
              <div className="maker-card__head"><span className="maker-card__dot" /><div className="maker-card__head-text"><span className="maker-card__tagline">{compatible.length} tagged product{compatible.length === 1 ? "" : "s"}</span><h3 className="maker-card__brand">{make}</h3></div></div>
              <p className="maker-card__desc">Browse catalog products explicitly marked as compatible with {make}.</p>
              <ul className="maker-card__cats">
                {categories.map((category) => <li key={category}><Link className="maker-cat" href={`/shop?make=${encodeURIComponent(make)}&category=${encodeURIComponent(category)}`}><span className="maker-cat__icon">{getCategoryIcon(category.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), 22)}</span><span className="maker-cat__name">{category.replace(/ Filters$/i, "")}</span><span className="maker-cat__arrow" aria-hidden="true">→</span></Link></li>)}
              </ul>
              <Link href={`/shop?make=${encodeURIComponent(make)}`} className="maker-card__cta"><span>View all {make} filters</span><span aria-hidden="true">→</span></Link>
            </article>;
          })}
        </div> : <p className="maker-empty-state">Truck fitment will appear here when products are tagged with verified compatible makes. <Link href="/shop">Browse all filters</Link> or <Link href="/contact">ask us about a match</Link>.</p>}
      </div>
    </section>

    <section className="section featured-section">
      <div className="container">
        <div className="section-header"><span className="section-label">Top Sellers</span><h2 className="section-title">Featured Products</h2><p className="section-subtitle">Popular filters available in the CORALFLY catalog.</p></div>
        <ProductGrid products={featured} />
        <div className="home-section-action"><Link href="/shop" className="btn btn-outline btn-lg">View All Products →</Link></div>
      </div>
    </section>

    <section className="section why-section">
      <div className="container">
        <div className="section-header"><span className="section-label">Why CORALFLY</span><h2 className="section-title">Built for the Long Haul</h2><p className="section-subtitle">Find the filtration parts you need, with clear pricing and a straightforward checkout.</p></div>
        <div className="features-grid">{features.map((feature) => <article key={feature.title} className="feature-card"><div className="feature-icon">{feature.icon}</div><h3 className="feature-title">{feature.title}</h3><p className="feature-description">{feature.description}</p></article>)}</div>
      </div>
    </section>

    <section className="section home-cta-section"><div className="container"><div className="cta-banner"><h2 className="cta-heading">Ready to Stock Up?</h2><p className="cta-text">Shop CORALFLY filters with same-day processing and free shipping on orders $75+.</p><Link href="/shop" className="btn btn-white btn-lg">Shop All Filters</Link></div></div></section>
  </>;
}

function ShieldIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></svg>; }
function TruckIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h11v12H3zM14 9h4l3 4v4h-7z" /><circle cx="7.5" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>; }
function FilterIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16l-6.5 7.5V19l-3 1v-8.5L4 4Z" /></svg>; }
function SupportIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 13h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2ZM17 19c-1 2-3 2-5 2" /></svg>; }
