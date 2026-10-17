"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useCompareStore, type CompareItem } from "@/lib/compare-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";

export default function ComparePage() {
  const { items, removeItem, clear } = useCompareStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = (item: CompareItem) => {
    const product: Product = {
      _id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      currency: item.currency,
      sku: item.sku,
      images: [{ url: item.image || "/images/products/product-1-245x245.jpg" }],
      inStock: true,
    };
    addItem(product, 1);
    openCart();
  };

  return (
    <div className="block">
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-arrow">/</span>
                  <span className="breadcrumb__item-link">Compare</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">Compare Products</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        {items.length === 0 ? (
          <div className="card" style={{ padding: 48, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚖</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>No Products Selected For Comparison</h2>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 24 }}>
              Click the compare icon on any product card in the catalog to evaluate filtration specifications side-by-side.
            </p>
            <div>
              <Link
                href="/shop"
                className="btn btn-primary"
                style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 32px" }}
              >
                Go to Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="card" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflowX: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #ebebeb", background: "#f8f9fa" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Comparing {items.length} Products</div>
              <button
                type="button"
                onClick={clear}
                style={{ background: "none", border: "none", color: "#dc3545", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
              >
                Clear Comparison
              </button>
            </div>

            <table className="table table-bordered" style={{ margin: 0, fontSize: 14 }}>
              <tbody>
                {/* Product Summary Row */}
                <tr>
                  <th style={{ width: 180, background: "#f8f9fa" }}>Product</th>
                  {items.map((item) => (
                    <td key={item.id} style={{ minWidth: 220, textAlign: "center", padding: 20 }}>
                      <div style={{ position: "relative", height: 120, width: "100%", marginBottom: 12 }}>
                        <img
                          src={item.image || "/images/products/product-1-245x245.jpg"}
                          alt={item.name}
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <Link href={`/shop/${item.slug}`} style={{ fontWeight: 700, color: "#1a1d21", textDecoration: "none", display: "block", marginBottom: 8 }}>
                        {item.name}
                      </Link>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#0081c9", marginBottom: 12 }}>
                        {formatPrice(item.price, item.currency)}
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary mb-2"
                        onClick={() => handleAddToCart(item)}
                        style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", width: "100%" }}
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        style={{ background: "none", border: "none", color: "#999", fontSize: 12, cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <th style={{ background: "#f8f9fa" }}>Rating</th>
                  {items.map((item) => (
                    <td key={item.id} style={{ textAlign: "center", color: "#ffc107" }}>
                      ★★★★★ (5.0)
                    </td>
                  ))}
                </tr>

                {/* Availability */}
                <tr>
                  <th style={{ background: "#f8f9fa" }}>Availability</th>
                  {items.map((item) => (
                    <td key={item.id} style={{ textAlign: "center", color: "#28a745", fontWeight: 600 }}>
                      ✓ In Stock
                    </td>
                  ))}
                </tr>

                {/* SKU */}
                <tr>
                  <th style={{ background: "#f8f9fa" }}>SKU</th>
                  {items.map((item) => (
                    <td key={item.id} style={{ textAlign: "center" }}>
                      {item.sku || "CF-" + item.slug.toUpperCase()}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <th style={{ background: "#f8f9fa" }}>Category</th>
                  {items.map((item) => (
                    <td key={item.id} style={{ textAlign: "center" }}>
                      {item.category || "Filtration Element"}
                    </td>
                  ))}
                </tr>

                {/* Compatible Makes */}
                <tr>
                  <th style={{ background: "#f8f9fa" }}>Compatible Rigs</th>
                  {items.map((item) => (
                    <td key={item.id} style={{ textAlign: "center", fontSize: 13 }}>
                      {item.compatibleMakes?.join(", ") || "Volvo, Freightliner, Kenworth, Peterbilt"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
