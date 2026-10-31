import type { Metadata } from "next";
import { FaqClient } from "@/components/FaqClient";
import { FAQ_SECTIONS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Heavy Duty Filtration FAQ",
  description:
    "Frequently asked questions about CORALFLY heavy duty truck filters, OEM cross-references, shipping policies, warranty compliance, and fleet billing.",
  alternates: {
    canonical: "https://coralflyfilters.com/faq",
  },
  openGraph: {
    title: "Heavy Duty Filtration FAQ | CORALFLY",
    description:
      "Answers to questions regarding commercial truck filters, fitment, cross-references, shipping, and warranty protection.",
    url: "https://coralflyfilters.com/faq",
    type: "website",
    images: [
      {
        url: "https://coralflyfilters.com/images/og-business-card.png",
        alt: "CORALFLY Filtration FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavy Duty Filtration FAQ | CORALFLY",
    description: "Answers to commercial truck filtration and shipping questions.",
    images: ["https://coralflyfilters.com/images/og-business-card.png"],
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqClient />
    </>
  );
}
