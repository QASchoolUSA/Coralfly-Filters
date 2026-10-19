"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/lib/cart-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatPrice } from "@/lib/format";
import { getEnhancedGalleryImages } from "@/lib/product-gallery";
import { ProductDescription } from "@/components/ProductDescription";
import type { Product } from "@/sanity/types";

const VERIFIED_APPLICATIONS = [
  {
    make: "Volvo",
    models: ["VNL 760", "VNL 860", "VNR", "VHD"],
    years: "2016–2026",
    engines: ["Volvo D13", "D13TC", "D11"],
  },
  {
    make: "Freightliner",
    models: ["Cascadia 126", "Cascadia 116", "122SD"],
    years: "2017–2026",
    engines: ["Detroit Diesel DD15", "DD13", "DD16"],
  },
  {
    make: "Kenworth",
    models: ["T680", "W900", "T880", "C500"],
    years: "2015–2026",
    engines: ["PACCAR MX-13", "Cummins X15"],
  },
  {
    make: "Peterbilt",
    models: ["579", "389", "567"],
    years: "2015–2026",
    engines: ["PACCAR MX-13", "Cummins X15"],
  },
  {
    make: "Mack",
    models: ["Anthem", "Pinnacle", "Granite"],
    years: "2018–2026",
    engines: ["Mack MP8", "MP7"],
  },
];

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const { currentVehicle, openPicker, clearCurrentVehicle } = useVehicleStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "fitment">("specs");
  const [added, setAdded] = useState(false);

  // Gallery multi-angle dataset & Lightbox modal state
  const galleryImages = useMemo(() => getEnhancedGalleryImages(product), [product]);
  const activeItem = galleryImages[activeImageIndex] || galleryImages[0];
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Always scroll to top when opening or switching products
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [product.slug]);

  // Real-time touch swipe & dragging state for zero-delay image sliding
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const goToNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const goToPrev = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Touch gesture handlers for instant swipe response
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
    setDragDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startXRef.current;
    const diffY = currentY - startYRef.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      setDragDelta(diffX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (isHorizontalSwipe.current) {
      if (dragDelta < -40) {
        goToNext();
      } else if (dragDelta > 40) {
        goToPrev();
      }
    }
    setDragDelta(0);
    isHorizontalSwipe.current = null;
  };

  // Fullscreen keyboard navigation & scroll locking
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, goToPrev, goToNext]);

  const images = galleryImages;

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

  const [copiedSku, setCopiedSku] = useState(false);

  const productSku = product.sku || "CF-" + product.slug.toUpperCase();

  const handleCopySku = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(productSku);
      setCopiedSku(true);
      setTimeout(() => setCopiedSku(false), 2000);
    }
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.map((img) => img.url),
    description: product.description || `Heavy duty ${product.name} engineered for commercial fleet reliability.`,
    sku: productSku,
    brand: {
      "@type": "Brand",
      name: "CORALFLY",
    },
    offers: {
      "@type": "Offer",
      url: `https://coralflyfilters.com/shop/${product.slug}`,
      priceCurrency: (product.currency || "USD").toUpperCase(),
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "CORALFLY Filters",
      },
    },
  };

  return (
    <div className="block">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* 1. Breadcrumb Header */}
      <div className="block-header block-header--has-breadcrumb">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__spaceship-safe-area" role="presentation" />
                <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--parent">
                  <Link href="/shop" className="breadcrumb__item-link">
                    Shop
                  </Link>
                </li>
                {product.category && (
                  <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--category-crumb">
                    <Link
                      href={`/shop?category=${encodeURIComponent(product.category)}`}
                      className="breadcrumb__item-link"
                    >
                      {product.category}
                    </Link>
                  </li>
                )}
                <li
                  className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last breadcrumb__item--product-name"
                  aria-current="page"
                >
                  <span className="breadcrumb__item-link">{product.name}</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* 2. Product Layout Block */}
      <div className="block-split">
        <div className="container">
          <div className="block-split__row row no-gutters">
            <div className="block-split__item block-split__item-content col-auto" style={{ width: "100%" }}>
              <div className="product product--layout--full">
                <div className="product__body">
                  <div className="product__card product__card--one" />
                  <div className="product__card product__card--two" />

                  {/* 2.1 Product Gallery */}
                  <div
                    className="product-gallery product-gallery--layout--product-full product__gallery cf-gallery-container"
                    data-layout="product-full"
                  >
                    {/* Main Interactive Stage */}
                    <div
                      className="cf-gallery-stage"
                      role="region"
                      aria-label="Product Image Viewer"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setIsLightboxOpen(true);
                        } else if (e.key === "ArrowLeft") {
                          e.preventDefault();
                          goToPrev();
                        } else if (e.key === "ArrowRight") {
                          e.preventDefault();
                          goToNext();
                        }
                      }}
                    >
                      {/* Top Right Photo Counter Badge (only when multiple images) */}
                      {galleryImages.length > 1 && (
                        <div className="cf-gallery-badge-counter">
                          <span>
                            {activeImageIndex + 1} / {galleryImages.length}
                          </span>
                        </div>
                      )}

                      {/* Left Navigation Chevron Button (only when multiple images) */}
                      {galleryImages.length > 1 && (
                        <button
                          type="button"
                          className="cf-gallery-nav-btn cf-gallery-nav-btn--prev"
                          aria-label="Previous product image"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPrev();
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                      )}

                      {/* Right Navigation Chevron Button (only when multiple images) */}
                      {galleryImages.length > 1 && (
                        <button
                          type="button"
                          className="cf-gallery-nav-btn cf-gallery-nav-btn--next"
                          aria-label="Next product image"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      )}

                      {/* Continuous Smooth Horizontal Slider Viewport */}
                      <div
                        className="cf-slider-viewport"
                        onTouchStart={galleryImages.length > 1 ? handleTouchStart : undefined}
                        onTouchMove={galleryImages.length > 1 ? handleTouchMove : undefined}
                        onTouchEnd={galleryImages.length > 1 ? handleTouchEnd : undefined}
                        onTouchCancel={galleryImages.length > 1 ? handleTouchEnd : undefined}
                      >
                        <div
                          className="cf-slider-track"
                          style={{
                            transform: `translateX(calc(-${activeImageIndex * 100}% + ${isDragging ? dragDelta : 0}px))`,
                            transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1)",
                          }}
                        >
                          {galleryImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="cf-slider-slide"
                              onClick={() => {
                                if (Math.abs(dragDelta) < 6) {
                                  setIsLightboxOpen(true);
                                }
                              }}
                            >
                              <Image
                                className="image__tag"
                                src={img.url}
                                alt={`${product.name} - View ${idx + 1}`}
                                fill
                                priority={idx === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                                style={{ objectFit: "contain" }}
                                draggable={false}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Right Zoom / Lightbox Trigger */}
                      <button
                        type="button"
                        className="cf-gallery-zoom-btn"
                        aria-label="Enlarge image in fullscreen view"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>Enlarge</span>
                      </button>
                    </div>

                    {/* Mobile Pagination Indicator Dots (only when multiple images) */}
                    {galleryImages.length > 1 && (
                      <div className="cf-gallery-dots" role="tablist" aria-label="Product image slides">
                        {galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            role="tab"
                            className={`cf-gallery-dot ${activeImageIndex === idx ? "cf-gallery-dot--active" : ""}`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={activeImageIndex === idx}
                            onClick={() => setActiveImageIndex(idx)}
                          />
                        ))}
                      </div>
                    )}

                    {/* Horizontal Thumbnails Row (only when multiple images) */}
                    {galleryImages.length > 1 && (
                      <div className="cf-gallery-thumbs-row" role="tablist" aria-label="Product thumbnails">
                        {galleryImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            role="tab"
                            className={`cf-gallery-thumb-item ${
                              activeImageIndex === idx ? "cf-gallery-thumb-item--active" : ""
                            }`}
                            onClick={() => setActiveImageIndex(idx)}
                            aria-label={`Product thumbnail ${idx + 1}`}
                            aria-selected={activeImageIndex === idx}
                          >
                            <Image
                              src={img.url}
                              alt=""
                              fill
                              sizes="74px"
                              style={{ objectFit: "contain" }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2.2 Product Header */}
                  <div className="product__header">
                    <h1 className="product__title">{product.name}</h1>
                    <div className="product__subtitle">
                      {/* Vehicle Fit Status Badge */}
                      <div
                        className={`status-badge status-badge--style--${
                          !currentVehicle ? "neutral" : isCompatible ? "success" : "warning"
                        } product__fit status-badge--has-icon status-badge--has-text`}
                      >
                        <div className="status-badge__body">
                          <div className="status-badge__icon">
                            {!currentVehicle ? (
                              <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z" />
                              </svg>
                            ) : isCompatible ? (
                              <svg width="13" height="13" viewBox="0 0 13 13">
                                <path d="M12,4.4L5.5,11L1,6.5l1.4-1.4l3.1,3.1L10.6,3L12,4.4z" />
                              </svg>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
                                <path d="M6.5 1L1 11h11L6.5 1zm0 3.5c.3 0 .5.2.5.5v2.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V5c0-.3.2-.5.5-.5zm0 5c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
                              </svg>
                            )}
                          </div>
                          <div className="status-badge__text">
                            {currentVehicle ? (
                              isCompatible ? (
                                `Part Fits ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`
                              ) : (
                                `May Not Fit ${currentVehicle.year} ${currentVehicle.make}`
                              )
                            ) : (
                              "Select Rig to Confirm Fitment"
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <button
                          type="button"
                          onClick={openPicker}
                          className="btn btn-sm btn-link"
                          style={{
                            padding: "0 0 0 8px",
                            fontSize: 12,
                            color: "#0081c9",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          {currentVehicle ? "Change Rig" : "Select Rig"}
                        </button>
                        {currentVehicle && (
                          <button
                            type="button"
                            onClick={clearCurrentVehicle}
                            className="btn btn-sm btn-link"
                            title="Clear selected rig"
                            style={{
                              padding: "0 4px",
                              fontSize: 12,
                              color: "#6c757d",
                              fontWeight: 500,
                              textDecoration: "none",
                            }}
                          >
                            · Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2.3 Product Main (Excerpt & Key Specs) */}
                  <div className="product__main">
                    <div className="product__excerpt">
                      <ProductDescription
                        product={product}
                        mode="excerpt"
                        onSeeFull={() => {
                          setActiveTab("specs");
                          const el = document.getElementById("tab-specs");
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                      />
                    </div>
                    <div className="product__features">
                      <div className="product__features-title">Key Specifications:</div>
                      <ul>
                        <li>
                          Part Number (SKU): <span>{product.sku || "CF-" + product.slug.toUpperCase()}</span>
                        </li>
                        <li>
                          Category: <span>{product.category || "Engine Filtration"}</span>
                        </li>
                        <li>
                          Filtration Rating: <span>15 Micron (Absolute Efficiency 99.8%)</span>
                        </li>
                        <li>
                          Thread Pitch: <span>1 3/8-16 UN-2B Standard</span>
                        </li>
                        <li>
                          Outer Diameter: <span>118 mm (4.65 in)</span>
                        </li>
                        <li>
                          Overall Height: <span>260 mm (10.24 in)</span>
                        </li>
                      </ul>
                      <div className="product__features-link">
                        <a
                          href="#tab-specs"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("specs");
                          }}
                        >
                          See Full Specification
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 2.4 Product Info (Buy Box) */}
                  <div className="product__info">
                    <div className="product__info-card">
                      <div className="product__info-body">
                        <div className="product__prices-stock">
                          <div className="product__prices">
                            {oldPrice && (
                              <div className="product__price product__price--old">
                                {formatPrice(oldPrice, product.currency)}
                              </div>
                            )}
                            <div className="product__price product__price--current">
                              {formatPrice(product.price, product.currency)}
                            </div>
                          </div>
                          <div className="status-badge status-badge--style--success product__stock status-badge--has-text">
                            <div className="status-badge__body">
                              <div className="status-badge__text">In Stock</div>
                            </div>
                          </div>
                        </div>

                        <div className="product__meta">
                          <table>
                            <tbody>
                              <tr>
                                <th>SKU</th>
                                <td>
                                  <span style={{ fontWeight: 600 }}>{productSku}</span>
                                  <button
                                    type="button"
                                    onClick={handleCopySku}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      marginLeft: 10,
                                      cursor: "pointer",
                                      color: copiedSku ? "#28a745" : "#0081c9",
                                      fontSize: 12,
                                      fontWeight: 600,
                                      padding: "2px 6px",
                                      borderRadius: 3,
                                      backgroundColor: copiedSku ? "#e8f8ec" : "#e8f4fb",
                                    }}
                                    title="Copy SKU Part Number"
                                  >
                                    {copiedSku ? "✓ Copied" : "📋 Copy"}
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th>Brand</th>
                                <td>CORALFLY</td>
                              </tr>
                              <tr>
                                <th>Category</th>
                                <td>{product.category || "Engine Filtration"}</td>
                              </tr>
                              <tr>
                                <th>Delivery</th>
                                <td>Ships Same Business Day</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Quantity & Add to Cart */}
                      <div className="product__actions">
                        <div className="product__actions-item product__actions-item--quantity">
                          <div className="input-number">
                            <input
                              className="input-number__input form-control form-control-lg"
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                            <div
                              className="input-number__add"
                              onClick={() => setQuantity(quantity + 1)}
                            />
                            <div
                              className="input-number__sub"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            />
                          </div>
                        </div>
                        <div className="product__actions-item product__actions-item--addtocart">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={handleAddToCart}
                            style={{
                              backgroundColor: added ? "#28a745" : undefined,
                              borderColor: added ? "#28a745" : undefined,
                            }}
                          >
                            {added ? "✓ Added to Cart!" : "Add to Cart"}
                          </button>
                        </div>
                      </div>

                      {/* Product Tags */}
                      <div className="product__tags-and-share-links">
                        <div className="product__tags tags tags--sm">
                          <div className="tags__list">
                            <Link href="/shop?category=Oil%20Filters">Oil Filter</Link>
                            <Link href="/shop?category=Fuel%20Filters">Fuel Separator</Link>
                            <Link href="/shop?category=Air%20Filters">Air Intake</Link>
                            <Link href="/shop">Heavy Duty</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shop Features Trust Badges */}
                    <div className="product__shop-features shop-features">
                      <ul className="shop-features__list">
                        <li className="shop-features__item">
                          <div className="shop-features__item-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="#0081c9">
                              <path d="M44.6,26.9l-1.2-5c0.3-0.1,0.6-0.4,0.6-0.7v-0.8c0-1.7-1.4-3.2-3.2-3.2h-5.7v-1.7c0-0.9-0.7-1.6-1.6-1.6H23.1l6.4-2.6c0.4-0.2,0.6-0.6,0.4-1c-0.2-0.4-0.6-0.6-1-0.4l-5.2,2.1c1.6-1,3.2-2.2,3.8-2.9c1.2-1.5,0.9-3.7-0.7-4.9c-1.5-1.2-3.7-0.9-4.9,0.7l0,0c-0.9,1.1-2,4.3-2.7,6.5c-0.7-2.2-1.9-5.4-2.7-6.5l0,0c-1.2-1.5-3.4-1.8-4.9-0.7C10,5.5,9.7,7.7,10.9,9.2c0.6,0.8,2.2,1.9,3.8,2.9l-5.2-2.1c-0.4-0.2-0.8,0-1,0.4c-0.2,0.4,0,0.8,0.4,1l6.4,2.6H4.8c-0.9,0-1.6,0.7-1.6,1.6v13.6C3.2,29.6,3.5,30,4,30c0.4,0,0.8-0.3,0.8-0.8V15.6h28.9v13.6c0,0.4,0.3,0.8,0.8,0.8c0.4,0,0.8-0.3,0.8-0.8v-0.9H44c1.1,0,2,0.7,2.3,1.7H44c-0.4,0-0.8,0.3-0.8,0.8v1.6c0,1.3,1.1,2.4,2.4,2.4h0.9v3.3h-2c-0.6-1.9-2.4-3.2-4.5-3.2c-2.1,0-3.9,1.3-4.5,3.2h-0.4v-5.7c0-0.4-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8v5.7H18.1c-0.6-1.9-2.4-3.2-4.5-3.2c-2.1,0-3.9,1.3-4.5,3.2H4.8v-1.7H8c0.4,0,0.8-0.3,0.8-0.8S8.4,34.9,8,34.9H0.8c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h2.5V38c0,0.9,0.7,1.6,1.6,1.6h4.1c0,2.6,2.1,4.8,4.8,4.8s4.8-2.1,4.8-4.8h16.9c0,2.6,2.1,4.8,4.8,4.8s4.8-2.1,4.8-4.8h2.5c0.4,0,0.8-0.3,0.8-0.8v-8C48,28.8,46.5,27.2,44.6,26.9z" />
                            </svg>
                          </div>
                          <div className="shop-features__item-info">
                            <div className="shop-features__item-title">Free Commercial Freight</div>
                            <div className="shop-features__item-subtitle">On bulk fleet orders over $150</div>
                          </div>
                        </li>
                        <li className="shop-features__divider" role="presentation" />
                        <li className="shop-features__item">
                          <div className="shop-features__item-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="#0081c9">
                              <path d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M33.7,18.7l-11,11c-0.4,0.4-0.9,0.6-1.4,0.6s-1-0.2-1.4-0.6l-5.6-5.6c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l4.2,4.2l9.6-9.6c0.8-0.8,2-0.8,2.8,0S34.5,17.9,33.7,18.7z" />
                            </svg>
                          </div>
                          <div className="shop-features__item-info">
                            <div className="shop-features__item-title">100% Fit Guarantee</div>
                            <div className="shop-features__item-subtitle">Direct OEM replacement spec</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 2.5 Product Tabs */}
                  <div className="product-tabs product-tabs--layout--full product__tabs">
                    <ul className="product-tabs__list">
                      <li
                        className={`product-tabs__item ${
                          activeTab === "specs" ? "product-tabs__item--active" : ""
                        }`}
                      >
                        <a
                          href="#tab-specs"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("specs");
                          }}
                        >
                          Specification
                        </a>
                      </li>
                      <li
                        className={`product-tabs__item ${
                          activeTab === "fitment" ? "product-tabs__item--active" : ""
                        }`}
                      >
                        <a
                          href="#tab-fitment"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("fitment");
                          }}
                        >
                          Truck Fitment
                        </a>
                      </li>
                    </ul>

                    <div className="product-tabs__content">
                      {/* Specifications Pane */}
                      <div
                        className={`product-tabs__pane ${
                          activeTab === "specs" ? "product-tabs__pane--active" : ""
                        }`}
                        id="tab-specs"
                      >
                        <div className="spec">
                          <div className="spec__section">
                            <div className="spec__section-title">Technical Specifications</div>
                            <div className="spec__row">
                              <div className="spec__name">Part Number (SKU)</div>
                              <div className="spec__value">{product.sku || "CF-" + product.slug.toUpperCase()}</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Primary Category</div>
                              <div className="spec__value">{product.category || "Engine Filtration"}</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Filtration Efficiency</div>
                              <div className="spec__value">15 Micron (Absolute Beta Ratio ≥ 1000)</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Thread Pitch</div>
                              <div className="spec__value">1 3/8-16 UN-2B Standard</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Outer Diameter</div>
                              <div className="spec__value">118 mm (4.65 in)</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Overall Height</div>
                              <div className="spec__value">260 mm (10.24 in)</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Gasket Outside Diameter</div>
                              <div className="spec__value">102 mm (4.02 in)</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Burst Pressure Test</div>
                              <div className="spec__value">Surpasses 350 PSI (SAE J1858 Verified)</div>
                            </div>
                          </div>

                          <div className="spec__section">
                            <div className="spec__section-title">OEM Cross References</div>
                            <div className="spec__row">
                              <div className="spec__name">Baldwin</div>
                              <div className="spec__value">B7299 / BF1284-SP</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Donaldson</div>
                              <div className="spec__value">P550529 / DBF5782</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Fleetguard</div>
                              <div className="spec__value">LF16015 / FS19764</div>
                            </div>
                            <div className="spec__row">
                              <div className="spec__name">Wix Filters</div>
                              <div className="spec__value">57746XD / 33651</div>
                            </div>
                          </div>

                          <div className="spec__disclaimer">
                            Information on technical characteristics and cross references is compiled from manufacturer catalog data.
                          </div>
                        </div>
                      </div>

                      {/* Truck Fitment Pane */}
                      <div
                        className={`product-tabs__pane ${
                          activeTab === "fitment" ? "product-tabs__pane--active" : ""
                        }`}
                        id="tab-fitment"
                      >
                        <div className="cf-fitment-wrapper">
                          {/* Trust / Fitment Guarantee Banner */}
                          <div className="cf-fitment-banner">
                            <div className="cf-fitment-banner__icon">🛡️</div>
                            <div className="cf-fitment-banner__info">
                              <h4 className="cf-fitment-banner__title">Verified Commercial Fleet Fitment</h4>
                              <p className="cf-fitment-banner__desc">
                                Guaranteed direct OEM replacement compatibility engineered for Class 7 &amp; 8 commercial rigs.
                              </p>
                            </div>
                            <span className="cf-fitment-banner__badge">SAE J1858 Tested</span>
                          </div>

                          {/* Mobile Cards Layout (visible < 768px) */}
                          <div className="cf-fitment-mobile-cards">
                            {VERIFIED_APPLICATIONS.map((app) => (
                              <div key={app.make} className="cf-fitment-card">
                                <div className="cf-fitment-card__header">
                                  <div className="cf-fitment-card__brand">
                                    <span className="cf-fitment-card__icon">🚛</span>
                                    <span className="cf-fitment-card__make">{app.make}</span>
                                  </div>
                                  <span className="cf-fitment-card__years">{app.years}</span>
                                </div>

                                <div className="cf-fitment-card__row">
                                  <span className="cf-fitment-card__label">Chassis Models</span>
                                  <div className="cf-fitment-card__chips">
                                    {app.models.map((model) => (
                                      <span key={model} className="cf-fitment-chip cf-fitment-chip--model">
                                        {model}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="cf-fitment-card__row">
                                  <span className="cf-fitment-card__label">Engine Fitment</span>
                                  <div className="cf-fitment-card__chips">
                                    {app.engines.map((eng) => (
                                      <span key={eng} className="cf-fitment-chip cf-fitment-chip--engine">
                                        {eng}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Desktop Table Layout (visible >= 768px) */}
                          <div className="cf-fitment-desktop-container">
                            <table className="cf-fitment-table">
                              <thead>
                                <tr>
                                  <th>Truck Make</th>
                                  <th>Chassis / Model</th>
                                  <th>Production Years</th>
                                  <th>Engine Compatibility</th>
                                </tr>
                              </thead>
                              <tbody>
                                {VERIFIED_APPLICATIONS.map((app) => (
                                  <tr key={app.make}>
                                    <td>
                                      <div className="cf-fitment-table__make">
                                        <span className="cf-fitment-table__icon">🚛</span>
                                        <strong>{app.make}</strong>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="cf-fitment-table__chips">
                                        {app.models.map((m) => (
                                          <span key={m} className="cf-fitment-chip cf-fitment-chip--model">
                                            {m}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="cf-fitment-card__years">{app.years}</span>
                                    </td>
                                    <td>
                                      <div className="cf-fitment-table__chips">
                                        {app.engines.map((e) => (
                                          <span key={e} className="cf-fitment-chip cf-fitment-chip--engine">
                                            {e}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Disclaimer Note */}
                          <div className="cf-fitment-disclaimer">
                            ℹ️ Fitment data cross-referenced with OEM manufacturer service bulletins. If you have custom vocational chassis configurations or require VIN verification, contact CORALFLY technical fleet support.
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Related Products Carousel (SEPARATE block below product) */}
      {related.length > 0 && (
        <>
          <div className="block-space block-space--layout--divider-nl" />
          <div className="block block-products-carousel" data-layout="grid-5">
            <div className="container">
              <div className="section-header">
                <div className="section-header__body">
                  <h2 className="section-header__title">Related Filters & Service Kits</h2>
                  <div className="section-header__spring" />
                  <div className="section-header__divider" />
                </div>
              </div>
              <div className="block-products-carousel__carousel">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                  {related.slice(0, 5).map((rel) => (
                    <div key={rel._id} className="col mb-3">
                      <ProductCard product={rel} layout="grid" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. Fullscreen In-Place Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="cf-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Product gallery fullscreen view"
          onClick={() => {
            setIsLightboxOpen(false);
            setIsZoomed(false);
          }}
        >
          {/* Lightbox Top Navigation Bar - Clean, Minimal Header */}
          <div
            className="cf-lightbox-header"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cf-lightbox-header-spacer" />
            <button
              type="button"
              className="cf-lightbox-close-btn"
              onClick={() => {
                setIsLightboxOpen(false);
                setIsZoomed(false);
              }}
              aria-label="Close fullscreen gallery"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Lightbox Center Stage */}
          <div
            className="cf-lightbox-stage"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false);
                setIsZoomed(false);
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev Chevron (only when multiple images) */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                className="cf-lightbox-nav-btn cf-lightbox-nav-btn--prev"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Next Chevron (only when multiple images) */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                className="cf-lightbox-nav-btn cf-lightbox-nav-btn--next"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            {/* Stage Center Image */}
            <div
              className={`cf-lightbox-image-container ${isZoomed ? "cf-lightbox-image-container--zoomed" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed((prev) => !prev);
              }}
              title="Click to toggle zoom"
            >
              <Image
                src={activeItem.url}
                alt={activeItem.title}
                fill
                priority
                quality={95}
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Lightbox Bottom Thumbnails Row (only when multiple images) */}
          {galleryImages.length > 1 && (
            <div
              className="cf-lightbox-footer"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`cf-lightbox-thumb ${activeImageIndex === idx ? "cf-lightbox-thumb--active" : ""}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Switch to ${img.tag}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="60px"
                    style={{ objectFit: "contain" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="block-space block-space--layout--before-footer" />
    </div>
  );
}
