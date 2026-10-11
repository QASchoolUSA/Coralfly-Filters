import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { guides } from "@/lib/guides";

export const metadata: Metadata = { title: "Truck Filter Guides", description: "Practical reference guides for filter applications, part numbers, and maintenance." };

export default function GuidesIndexPage() {
  return <section className="section"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} /><header className="landing-header"><h1 className="landing-header__title">Filter Guides</h1><p className="landing-header__intro">Practical reference material for checking filter part numbers and applications. Always confirm the specific equipment and component before ordering.</p></header><div className="guide-card-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><h2 className="guide-card__title"><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><p className="guide-card__excerpt">{guide.excerpt}</p><Link href={`/guides/${guide.slug}`} className="guide-card__cta">Read guide →</Link></article>)}</div><p className="landing-footer-links"><Link href="/shop">Shop all filters</Link> · <Link href="/contact">Ask us about fitment</Link></p></div></section>;
}
