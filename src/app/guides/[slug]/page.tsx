import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { guides } from "@/lib/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  return guide ? { title: guide.title, description: guide.excerpt } : { title: "Guide Not Found" };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <section className="section"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }, { name: guide.title }]} /><header className="landing-header"><h1 className="landing-header__title">{guide.title}</h1><p className="landing-header__intro">{guide.excerpt}</p></header><article className="guide-article">
    {guide.sections.map((section) => <section className="guide-article__section" key={section.heading}><h2>{section.heading}</h2>{section.intro ? <p>{section.intro}</p> : null}{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}
    <FaqSection title="Frequently Asked Questions" faqs={guide.faqs} id="guide-faq" />
    <p className="guide-article__note">This guide is general reference material. Its truck and part examples do not confirm that any CORALFLY catalog product fits your application; product fitment is shown only when explicitly listed on the product. <Link href="/contact">Contact CORALFLY</Link> if you need help.</p>
    <p className="landing-footer-links">Related truck makes: {guide.relatedTruckBrands.map((make, index) => <span key={make}>{index > 0 ? " · " : ""}<Link href={`/shop?make=${encodeURIComponent(make)}`}>{make}</Link></span>)} · <Link href="/guides">All guides</Link></p>
  </article></div></section>;
}
