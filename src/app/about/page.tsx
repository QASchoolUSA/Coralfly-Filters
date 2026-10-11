import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { getProducts } from "@/sanity/products";

export const metadata: Metadata = {
  title: "About CORALFLY",
  description: "Learn about CORALFLY and our approach to dependable filtration, clear product details, and reliable service.",
};

const aboutFaqs: FaqItem[] = [
  { question: "What types of filters does CORALFLY sell?", answer: "The CORALFLY catalog includes oil, air, fuel, cabin, hydraulic, and coolant filters as listed on the Shop page." },
  { question: "How can I check that a filter fits my truck?", answer: "Match the part number and product specifications to your application. A product is shown as compatible with a truck make only when that fitment is listed in its catalog data." },
  { question: "How much is shipping?", answer: "Orders of $75 or more qualify for free shipping. The applicable shipping details are shown during checkout." },
  { question: "How is payment handled?", answer: "Checkout is completed on Stripe's secure hosted checkout page." },
];

export default async function AboutPage() {
  const products = await getProducts();
  const categories = new Set(products.map((product) => product.category).filter(Boolean));
  const makes = new Set(products.flatMap((product) => product.compatibleMakes ?? []));
  const stats = [
    { value: String(categories.size), label: "Filter Categories" },
    { value: String(products.length), label: "Catalog Products" },
    { value: String(makes.size), label: "Truck Makes Tagged" },
    { value: "$75+", label: "Free Shipping Threshold" },
  ];
  const crumbs = [{ name: "Home", href: "/" }, { name: "About" }];

  return <>
    <div className="about-hero"><div className="about-hero__inner"><Breadcrumbs items={crumbs} /><span className="about-hero__badge">CORALFLY · Reliable Filter Reliable service</span><h1>About CORALFLY</h1><p>Premium filtration solutions for operators who depend on their equipment every day.</p></div></div>
    <section className="about-stats"><div className="about-stats__inner">{stats.map((stat) => <div className="about-stat" key={stat.label}><span className="about-stat__value">{stat.value}</span><span className="about-stat__label">{stat.label}</span></div>)}</div></section>
    <section className="about-section"><div className="about-section__container"><div className="about-cards-row">
      <article className="about-card"><div className="about-card__accent" /><h2 className="about-card__heading">Our Story</h2><p>CORALFLY builds filtration products for operators who cannot afford downtime: clear specifications, consistent media quality, and service that matches the hardware.</p><p>Our online catalog brings oil, air, fuel, cabin, hydraulic, and coolant filters together so customers can find product details, check pricing, and order in one place.</p></article>
      <article className="about-card"><div className="about-card__accent" /><h2 className="about-card__heading">Our Mission</h2><p>Our mission is simple: make it easier to find dependable filtration products and keep equipment moving.</p><p>We organize products around the information customers need to compare options and confirm fitment before buying.</p></article>
    </div></div></section>
    <section className="about-section about-section--alt"><div className="about-section__container"><div className="about-section__header"><h2 className="about-section__title">Why Choose CORALFLY</h2><p className="about-section__subtitle">A straightforward place to find filters, review product information, and check out securely.</p></div><div className="about-features">
      <Feature icon={<ShieldIcon />} title="Clear Product Details">Review available descriptions, specifications, part numbers, and fitment information before ordering.</Feature>
      <Feature icon={<TruckIcon />} title="Fast Processing">Same-day processing before 2pm and free shipping on orders of $75 or more.</Feature>
      <Feature icon={<SecureIcon />} title="Secure Checkout">Complete payment through Stripe's secure hosted checkout.</Feature>
      <Feature icon={<SupportIcon />} title="Help Finding a Match">Contact our team with a part number and equipment details if you need help choosing.</Feature>
    </div></div></section>
    <section className="about-section"><div className="about-section__container"><FaqSection title="Frequently Asked Questions" faqs={aboutFaqs} id="about-faq" /><p className="landing-footer-links"><Link href="/faq">View all FAQs</Link> · <Link href="/guides">Read filter guides</Link></p></div></section>
    <section className="about-section"><div className="about-section__container"><div className="about-cta-banner"><h2 className="about-cta-banner__heading">Ready to Find the Right Filter?</h2><p className="about-cta-banner__text">Browse the catalog or contact us with your filter number and equipment details.</p><div className="about-cta-banner__actions"><Link href="/shop" className="btn btn-primary btn-lg">Shop Our Products</Link><Link href="/contact" className="btn btn-outline btn-lg">Contact Us</Link></div></div></div></section>
  </>;
}

function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: string }) { return <article className="about-feature"><div className="about-feature__icon">{icon}</div><div className="about-feature__body"><h3 className="about-feature__title">{title}</h3><p className="about-feature__desc">{children}</p></div></article>; }
function ShieldIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></svg>; }
function TruckIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h11v12H3zM14 9h4l3 4v4h-7z" /><circle cx="7.5" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>; }
function SecureIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" /></svg>; }
function SupportIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 13h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z" /></svg>; }
