import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalog } from "@/components/ShopCatalog";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shop Filters",
  description: "Shop CORALFLY oil, air, fuel, cabin, hydraulic, and coolant filters. Filter by truck make, search by part number, and checkout securely.",
};

export default function ShopPage() {
  return <>
    <div className="shop-page-title-banner">
      <div className="container">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop" }]} />
        <h1>All Products</h1>
        <p>Premium oil, air, fuel, cabin, and equipment filters. Search by part number, filter type, or a truck make to find products with listed fitment.</p>
      </div>
    </div>
    <section className="section shop-section">
      <div className="container"><Suspense fallback={<ProductGridSkeleton count={8} />}><ShopCatalog /></Suspense></div>
    </section>
  </>;
}
