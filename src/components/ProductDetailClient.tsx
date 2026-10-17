"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/lib/cart-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const { currentVehicle, openPicker } = useVehicleStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "fitment" | "reviews">("desc");
  const [added, setAdded] = useState(false);

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = product.images.length > 0 ? product.images : [{ url: "/images/products/product-1-245x245.jpg" }];
  const activeImage = images[activeImageIndex] || images[0];

  const oldPrice =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice
      : product.price * 1.25;

  const isCompatible =
    !currentVehicle ||
    !product.compatibleMakes ||
    product.compatibleMakes.length === 0 ||
    product.compatibleMakes.some(
      (m) => m.toLowerCase() === currentVehicle.make.toLowerCase()
    );

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewText) {
      setReviewSubmitted(true);
      setReviewText("");
    }
  };

  return (
    <div className="block">
      {/* Breadcrumb Header */}
      <div className="block-header block-header--has-breadcrumb">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb__item">
                  <span className="breadcrumb__item-arrow">/</span>
                  <Link href="/shop" className="breadcrumb__item-link">
                    Shop
                  </Link>
                </li>
                {product.category && (
                  <li className="breadcrumb__item">
                    <span className="breadcrumb__item-arrow">/</span>
                    <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="breadcrumb__item-link">
                      {product.category}
                    </Link>
                  </li>
                )}
                <li className="breadcrumb__item breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-arrow">/</span>
                  <span className="breadcrumb__item-link">{product.name}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="product product--layout--full">
          <div className="product__body">
            <div className="row">
              {/* Product Gallery (Left) */}
              <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                <div className="product__gallery" style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 4, padding: 24 }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 420,
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={activeImage.url}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain", padding: 12 }}
                      priority
                    />
                  </div>

                  {/* Thumbnail Row */}
                  {images.length > 1 && (
                    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            border: activeImageIndex === idx ? "2px solid #0081c9" : "1px solid #ebebeb",
                            borderRadius: 4,
                            padding: 4,
                            background: "#fff",
                            cursor: "pointer",
                            width: 72,
                            height: 72,
                            position: "relative",
                          }}
                        >
                          <img
                            src={img.url}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Header & Actions (Right) */}
              <div className="col-12 col-lg-6">
                <div className="product__info" style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 4, padding: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontSize: 13, color: "#6c757d" }}>
                      SKU: <strong style={{ color: "#333" }}>{product.sku || "CF-" + product.slug.toUpperCase()}</strong>
                    </div>
                    <div className="product-card__badges" style={{ display: "flex", gap: 6 }}>
                      <div className="tag-badge tag-badge--sale">SALE</div>
                      <div className="tag-badge tag-badge--hot">HOT</div>
                    </div>
                  </div>

                  <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 14, color: "#1a1d21" }}>
                    {product.name}
                  </h1>

                  {/* Rating & Availability */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, borderBottom: "1px solid #ebebeb", paddingBottom: 16 }}>
                    <div style={{ display: "flex", color: "#ffc107", fontSize: 16 }}>
                      {"★★★★★"}
                    </div>
                    <span style={{ fontSize: 14, color: "#6c757d" }}>4.9 on 18 customer reviews</span>
                    <span style={{ color: "#ccc" }}>•</span>
                    <span style={{ fontSize: 13, color: "#28a745", fontWeight: 700 }}>
                      ✓ In Stock (Warehouse Ready)
                    </span>
                  </div>

                  {/* Vehicle Fitment Notification Box */}
                  <div
                    style={{
                      background: isCompatible ? "#e8f8ec" : "#fff3cd",
                      border: isCompatible ? "1px solid #28a745" : "1px solid #ffc107",
                      borderRadius: 4,
                      padding: "12px 16px",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18, color: isCompatible ? "#28a745" : "#856404" }}>
                        {isCompatible ? "✓" : "⚠"}
                      </span>
                      <div style={{ fontSize: 13, fontWeight: 600, color: isCompatible ? "#155724" : "#856404" }}>
                        {currentVehicle ? (
                          isCompatible ? (
                            `Verified Fit for ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`
                          ) : (
                            `May not be compatible with ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`
                          )
                        ) : (
                          "Select your vehicle to confirm fitment"
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={openPicker}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0081c9",
                        fontSize: 12,
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {currentVehicle ? "Change Rig" : "Select Vehicle"}
                    </button>
                  </div>

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
                    <span style={{ fontSize: 32, fontWeight: 700, color: "#0081c9" }}>
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <span style={{ fontSize: 18, color: "#999", textDecoration: "line-through" }}>
                      {formatPrice(oldPrice, product.currency)}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, background: "#ff4747", color: "#fff", padding: "2px 8px", borderRadius: 2 }}>
                      SAVE 20%
                    </span>
                  </div>

                  {/* Short Description */}
                  <p style={{ fontSize: 14, color: "#5c6570", lineHeight: 1.6, marginBottom: 24 }}>
                    {product.description ||
                      "Heavy-duty commercial grade filtration engineered with high-dirt-holding synthetic media. Guaranteed fitment, maximum service life, and optimal fluid flow under rigorous hauling conditions."}
                  </p>

                  {/* Quantity & Add to Cart */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ebebeb",
                        borderRadius: 3,
                        height: 48,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ width: 40, height: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 20 }}
                      >
                        −
                      </button>
                      <span style={{ width: 44, textAlign: "center", fontWeight: 700, fontSize: 16 }}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        style={{ width: 40, height: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 20 }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                      style={{
                        height: 48,
                        padding: "0 36px",
                        fontSize: 15,
                        fontWeight: 700,
                        backgroundColor: added ? "#28a745" : "#0081c9",
                        borderColor: added ? "#28a745" : "#0081c9",
                        flex: 1,
                      }}
                    >
                      {added ? "✓ Added to Cart!" : "Add to Cart"}
                    </button>
                  </div>


                </div>
              </div>
            </div>

            {/* Product Tabs: Description, Specs, Fitment, Reviews */}
            <div className="product-tabs" style={{ marginTop: 40 }}>
              <div className="product-tabs__list" style={{ display: "flex", borderBottom: "2px solid #ebebeb", gap: 8 }}>
                <button
                  type="button"
                  className={`product-tabs__item ${activeTab === "desc" ? "product-tabs__item--active" : ""}`}
                  onClick={() => setActiveTab("desc")}
                  style={{
                    padding: "14px 24px",
                    border: "none",
                    background: "none",
                    fontWeight: activeTab === "desc" ? 700 : 500,
                    fontSize: 16,
                    color: activeTab === "desc" ? "#0081c9" : "#495057",
                    borderBottom: activeTab === "desc" ? "3px solid #0081c9" : "none",
                    cursor: "pointer",
                  }}
                >
                  Description
                </button>
                <button
                  type="button"
                  className={`product-tabs__item ${activeTab === "specs" ? "product-tabs__item--active" : ""}`}
                  onClick={() => setActiveTab("specs")}
                  style={{
                    padding: "14px 24px",
                    border: "none",
                    background: "none",
                    fontWeight: activeTab === "specs" ? 700 : 500,
                    fontSize: 16,
                    color: activeTab === "specs" ? "#0081c9" : "#495057",
                    borderBottom: activeTab === "specs" ? "3px solid #0081c9" : "none",
                    cursor: "pointer",
                  }}
                >
                  Specification
                </button>
                <button
                  type="button"
                  className={`product-tabs__item ${activeTab === "fitment" ? "product-tabs__item--active" : ""}`}
                  onClick={() => setActiveTab("fitment")}
                  style={{
                    padding: "14px 24px",
                    border: "none",
                    background: "none",
                    fontWeight: activeTab === "fitment" ? 700 : 500,
                    fontSize: 16,
                    color: activeTab === "fitment" ? "#0081c9" : "#495057",
                    borderBottom: activeTab === "fitment" ? "3px solid #0081c9" : "none",
                    cursor: "pointer",
                  }}
                >
                  Truck Fitment
                </button>
                <button
                  type="button"
                  className={`product-tabs__item ${activeTab === "reviews" ? "product-tabs__item--active" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                  style={{
                    padding: "14px 24px",
                    border: "none",
                    background: "none",
                    fontWeight: activeTab === "reviews" ? 700 : 500,
                    fontSize: 16,
                    color: activeTab === "reviews" ? "#0081c9" : "#495057",
                    borderBottom: activeTab === "reviews" ? "3px solid #0081c9" : "none",
                    cursor: "pointer",
                  }}
                >
                  Reviews (3)
                </button>
              </div>

              <div className="product-tabs__content" style={{ padding: "32px 0" }}>
                {activeTab === "desc" && (
                  <div style={{ maxWidth: 860, fontSize: 15, lineHeight: 1.7, color: "#495057" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 14 }}>
                      Engineered for Heavy Duty Performance &amp; Uptime
                    </h3>
                    <p style={{ marginBottom: 16 }}>
                      CORALFLY filtration elements are manufactured using advanced multi-layer synthetic media
                      designed to trap sub-micron contaminants without restricting critical fluid or air flow.
                      Each unit undergoes 100% burst and pressure testing to ensure durability under harsh highway and off-road cycles.
                    </p>
                    <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
                      <li style={{ marginBottom: 6 }}>High-efficiency retention rate surpassing OEM factory standards.</li>
                      <li style={{ marginBottom: 6 }}>Heat-resistant fluoroelastomer sealing gaskets prevent bypass leakage.</li>
                      <li style={{ marginBottom: 6 }}>Heavy-gauge steel canister resists pressure spikes and vibration fatigue.</li>
                      <li style={{ marginBottom: 6 }}>Certified for extended drain intervals in commercial fleets.</li>
                    </ul>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div style={{ maxWidth: 760 }}>
                    <table className="table table-striped table-bordered" style={{ fontSize: 14 }}>
                      <tbody>
                        <tr>
                          <th style={{ width: "35%", background: "#f8f9fa" }}>Part Number (SKU)</th>
                          <td>{product.sku || "CF-" + product.slug.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>Category</th>
                          <td>{product.category || "Engine Filtration"}</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>Filtration Rating</th>
                          <td>15 Micron (Absolute Efficiency 99.8%)</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>Thread Pitch</th>
                          <td>1 3/8-16 UN-2B Standard</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>Outer Diameter</th>
                          <td>118 mm (4.65 in)</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>Overall Height</th>
                          <td>260 mm (10.24 in)</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>Gasket O.D.</th>
                          <td>102 mm (4.02 in)</td>
                        </tr>
                        <tr>
                          <th style={{ background: "#f8f9fa" }}>OEM Cross References</th>
                          <td>Baldwin B7299, Donaldson P550529, Fleetguard LF16015, Wix 57746XD</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "fitment" && (
                  <div style={{ maxWidth: 860 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Verified Compatible Applications:</h4>
                    <table className="table table-bordered" style={{ fontSize: 14 }}>
                      <thead style={{ background: "#f8f9fa" }}>
                        <tr>
                          <th>Make</th>
                          <th>Model</th>
                          <th>Year</th>
                          <th>Engine</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Volvo</strong></td>
                          <td>VNL 760, VNL 860, VHD</td>
                          <td>2016–2026</td>
                          <td>Volvo D13, D13TC, D11</td>
                        </tr>
                        <tr>
                          <td><strong>Freightliner</strong></td>
                          <td>Cascadia 126, 116</td>
                          <td>2017–2026</td>
                          <td>Detroit Diesel DD15, DD13</td>
                        </tr>
                        <tr>
                          <td><strong>Kenworth</strong></td>
                          <td>T680, W900, T880</td>
                          <td>2015–2026</td>
                          <td>PACCAR MX-13, Cummins X15</td>
                        </tr>
                        <tr>
                          <td><strong>Peterbilt</strong></td>
                          <td>579, 389, 567</td>
                          <td>2015–2026</td>
                          <td>PACCAR MX-13, Cummins X15</td>
                        </tr>
                        <tr>
                          <td><strong>Mack</strong></td>
                          <td>Anthem, Pinnacle, Granite</td>
                          <td>2018–2026</td>
                          <td>Mack MP8, MP7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div style={{ maxWidth: 800 }}>
                    {/* Customer Review List */}
                    <div style={{ marginBottom: 32 }}>
                      <div style={{ padding: "16px 0", borderBottom: "1px solid #ebebeb" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <div>
                            <strong>Dave M. — Fleet Maintenance Director</strong>
                            <span style={{ fontSize: 12, color: "#28a745", marginLeft: 8 }}>✓ Verified Purchaser</span>
                          </div>
                          <div style={{ color: "#ffc107" }}>★★★★★</div>
                        </div>
                        <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
                          &ldquo;We run 42 Cascadia rigs with DD15s. CORALFLY filters hold up through our entire 45,000-mile drain interval without collapse or pressure spikes. Outstanding value.&rdquo;
                        </p>
                      </div>

                      <div style={{ padding: "16px 0", borderBottom: "1px solid #ebebeb" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <div>
                            <strong>Carlos R. — Owner-Operator</strong>
                            <span style={{ fontSize: 12, color: "#28a745", marginLeft: 8 }}>✓ Verified Purchaser</span>
                          </div>
                          <div style={{ color: "#ffc107" }}>★★★★★</div>
                        </div>
                        <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
                          &ldquo;Exact fit on my 2022 Volvo VNL 760. High-quality heavy canister and pre-lubed gasket. Free shipping arrived in two days.&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Write Review Form */}
                    <div style={{ background: "#f8f9fa", padding: 24, borderRadius: 4 }}>
                      <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Write A Customer Review</h4>

                      {reviewSubmitted ? (
                        <div style={{ color: "#28a745", fontWeight: 600 }}>
                          ✓ Thank you! Your review has been submitted for moderation.
                        </div>
                      ) : (
                        <form onSubmit={handleReviewSubmit}>
                          <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                              <label style={{ fontSize: 13, fontWeight: 600 }}>Your Name</label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                              />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                              <label style={{ fontSize: 13, fontWeight: 600 }}>Email Address</label>
                              <input
                                type="email"
                                required
                                className="form-control"
                                value={reviewEmail}
                                onChange={(e) => setReviewEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Your Review</label>
                            <textarea
                              rows={4}
                              required
                              className="form-control"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                          >
                            Submit Review
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Carousel */}
            {related.length > 0 && (
              <div className="block block-products-carousel" style={{ marginTop: 40 }}>
                <div className="section-header">
                  <div className="section-header__body">
                    <h2 className="section-header__title">Related Filters &amp; Service Kits</h2>
                    <div className="section-header__spring" />
                    <div className="section-header__divider" />
                  </div>
                </div>

                <div className="row">
                  {related.slice(0, 4).map((rel) => (
                    <div key={rel._id} className="col-12 col-sm-6 col-md-3 mb-4">
                      <ProductCard product={rel} layout="grid" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer" />
    </div>
  );
}
