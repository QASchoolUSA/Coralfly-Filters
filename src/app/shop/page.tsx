import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalog } from "@/components/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop Filters",
  description:
    "Shop CORALFLY oil, air, fuel, cabin, and coolant filters. Filter by truck make, search by part number, and checkout securely.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "60px 0", textAlign: "center" }}>Loading catalog...</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
