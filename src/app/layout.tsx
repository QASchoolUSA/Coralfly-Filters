import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { StorefrontShell } from "@/components/StorefrontShell";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CORALFLY | Reliable Filter Reliable service",
    template: "%s | CORALFLY",
  },
  description:
    "Buy CORALFLY filters online — oil, air, fuel, and cabin filters. In-stock SKUs, free shipping $75+, secure Stripe checkout.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoPartsStore",
      "@id": "https://www.coralflyfilters.com/#store",
      name: "CORALFLY Filters",
      url: "https://www.coralflyfilters.com",
      logo: "https://www.coralflyfilters.com/brand/logo.png",
      image: "https://www.coralflyfilters.com/images/banners/banner1.jpg",
      telephone: "+1-407-768-1488",
      email: "support@coralflyfilters.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1660 Retreat View Cir",
        addressLocality: "Sanford",
        addressRegion: "FL",
        postalCode: "32771",
        addressCountry: "US",
      },
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.coralflyfilters.com/#website",
      url: "https://www.coralflyfilters.com",
      name: "CORALFLY Filters",
      publisher: {
        "@id": "https://www.coralflyfilters.com/#store",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.coralflyfilters.com/shop?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${roboto.className} flex min-h-screen flex-col antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <StorefrontShell>{children}</StorefrontShell>
      </body>
    </html>
  );
}
