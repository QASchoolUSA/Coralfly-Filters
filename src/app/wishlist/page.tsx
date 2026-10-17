"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore, type WishlistItem } from "@/lib/wishlist-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";

export default function WishlistPage() {
  const { items, removeItem, clear } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = (item: WishlistItem) => {
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
                  <span className="breadcrumb__item-link">Wishlist</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">Wishlist</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        {items.length === 0 ? (
          <div className="card" style={{ padding: 48, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your Wishlist is Empty</h2>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 24 }}>
              Explore our heavy duty filtration catalog and click the heart icon on any filter to save it for later.
            </p>
            <div>
              <Link
                href="/shop"
                className="btn btn-primary"
                style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 32px" }}
              >
                Explore Filters
              </Link>
            </div>
          </div>
        ) : (
          <div className="card" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #ebebeb", background: "#f8f9fa" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Saved Products ({items.length})</div>
              <button
                type="button"
                onClick={clear}
                style={{ background: "none", border: "none", color: "#dc3545", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
              >
                Clear All
              </button>
            </div>

            <table className="table" style={{ margin: 0, fontSize: 14 }}>
              <thead style={{ background: "#fafafa" }}>
                <tr>
                  <th style={{ width: 100 }}>Image</th>
                  <th>Product</th>
                  <th>Stock Status</th>
                  <th>Price</th>
                  <th style={{ width: 160 }}>Action</th>
                  <th style={{ width: 50 }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ verticalAlign: "middle" }}>
                    <td>
                      <Link href={`/shop/${item.slug}`}>
                        <img
                          src={item.image || "/images/products/product-1-245x245.jpg"}
                          alt={item.name}
                          style={{ width: 64, height: 64, objectFit: "contain" }}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/shop/${item.slug}`} style={{ fontWeight: 700, color: "#1a1d21", textDecoration: "none" }}>
                        {item.name}
                      </Link>
                      <div style={{ fontSize: 12, color: "#6c757d", marginTop: 4 }}>
                        SKU: {item.sku || "CF-PART"}
                      </div>
                    </td>
                    <td>
                      <span style={{ color: "#28a745", fontWeight: 600 }}>✓ In Stock</span>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: 15, color: "#0081c9" }}>
                      {formatPrice(item.price, item.currency)}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddToCart(item)}
                        style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", width: "100%" }}
                      >
                        Add to Cart
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        style={{ background: "none", border: "none", color: "#dc3545", fontSize: 18, cursor: "pointer" }}
                        title="Remove"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
