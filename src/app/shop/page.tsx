import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalog } from "@/components/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop Heavy Duty Filters",
  description:
    "Shop CORALFLY oil, air, fuel, cabin, and coolant filters. Filter by truck make, search by OEM part number, and checkout securely with fast USA shipping.",
  alternates: {
    canonical: "https://coralflyfilters.com/shop",
  },
  openGraph: {
    title: "Shop Heavy Duty Filters | CORALFLY",
    description:
      "Shop CORALFLY oil, air, fuel, cabin, and coolant filters. Filter by truck make, search by OEM part number, and checkout securely.",
    url: "https://coralflyfilters.com/shop",
    type: "website",
    images: [
      {
        url: "https://coralflyfilters.com/images/og-business-card.png",
        width: 1200,
        height: 630,
        alt: "CORALFLY Heavy Duty Filters Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Heavy Duty Filters | CORALFLY",
    description:
      "Shop CORALFLY oil, air, fuel, cabin, and coolant filters. Filter by truck make and search by part number.",
    images: ["https://coralflyfilters.com/images/og-business-card.png"],
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "60px 0", textAlign: "center" }}>Loading catalog...</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
