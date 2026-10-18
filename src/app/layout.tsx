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
  metadataBase: new URL("https://coralflyfilters.com"),
  title: {
    default: "CORALFLY | Heavy Duty Filters for Semi Trucks",
    template: "%s | CORALFLY",
  },
  description:
    "Buy CORALFLY filters online — heavy duty oil, air, fuel, and cabin filters for commercial semi trucks. In-stock SKUs, fast USA shipping, secure checkout.",
  openGraph: {
    title: "CORALFLY | Heavy Duty Filters for Semi Trucks",
    description:
      "Heavy duty commercial semi truck filters — Oil, Air, Fuel, and Cabin filters for Volvo, Freightliner, Kenworth, and Peterbilt.",
    url: "https://coralflyfilters.com",
    siteName: "CORALFLY Filters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://coralflyfilters.com/images/og-business-card.png",
        width: 1200,
        height: 630,
        alt: "CORALFLY - Heavy Duty Filters for Semi Trucks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CORALFLY | Heavy Duty Filters for Semi Trucks",
    description:
      "Heavy duty commercial semi truck filters — Oil, Air, Fuel, and Cabin filters for Volvo, Freightliner, Kenworth, and Peterbilt.",
    images: ["https://coralflyfilters.com/images/og-business-card.png"],
  },
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
      "@id": "https://coralflyfilters.com/#store",
      name: "CORALFLY Filters",
      url: "https://coralflyfilters.com",
      logo: "https://coralflyfilters.com/brand/logo.png",
      image: "https://coralflyfilters.com/images/banners/banner1.jpg",
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
      "@id": "https://coralflyfilters.com/#website",
      url: "https://coralflyfilters.com",
      name: "CORALFLY Filters",
      publisher: {
        "@id": "https://coralflyfilters.com/#store",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://coralflyfilters.com/shop?q={search_term_string}",
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
