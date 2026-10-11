import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";

export const metadata: Metadata = { title: "FAQ — Filters, Shipping & Fitment", description: "Answers about CORALFLY filters, product compatibility, shipping, checkout, and fleet inquiries." };

const faqs: FaqItem[] = [
  { question: "What types of filters does CORALFLY sell?", answer: "The catalog includes oil, air, fuel, cabin, hydraulic, and coolant filters. Browse the Shop page to see current products." },
  { question: "Do CORALFLY products meet OEM specifications?", answer: "Review each product's description and specifications for its listed performance and application information. Match the part number to your equipment before ordering." },
  { question: "How do I make sure a filter fits my truck?", answer: "Compare the part number and application details with the filter you are replacing. A truck make appears as compatible only when it is explicitly listed in the product catalog. Contact us if you need help confirming a match." },
  { question: "Can I use a cross-reference number?", answer: "Use cross-reference numbers shown on the product page as a starting point and verify them against your equipment's requirements before purchase." },
  { question: "How much is shipping and how quickly are orders processed?", answer: "Free shipping is available on orders of $75 or more. Orders placed before 2pm are processed the same day. Shipping options and timing are shown at checkout." },
  { question: "Do you offer bulk or fleet pricing?", answer: "For volume or fleet inquiries, contact our team with the products and quantities you need." },
  { question: "How do returns work?", answer: "Please contact CORALFLY at sales@coralfly.com for return assistance and current return eligibility." },
  { question: "How can I contact CORALFLY?", answer: "Email sales@coralfly.com Monday through Friday, 8:00 AM to 5:00 PM." },
];

export default function FaqPage() {
  return <section className="section"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} /><header className="landing-header"><h1 className="landing-header__title">Frequently Asked Questions</h1><p className="landing-header__intro">Straight answers on filter selection, listed fitment, shipping, and fleet purchasing. Still stuck? <Link href="/contact">Contact us</Link>.</p></header><FaqSection title="Common questions" faqs={faqs} id="site-faq" /><p className="landing-footer-links"><Link href="/guides">Read filter guides</Link> · <Link href="/shop">Shop all filters</Link></p></div></section>;
}
