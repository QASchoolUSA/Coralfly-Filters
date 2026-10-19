"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useVehicleStore } from "@/lib/vehicle-store";
import type { Product } from "@/sanity/types";

type Props = { products: Product[]; categories: string[] };

function normalizeCategory(cat?: string | null): string {
  if (!cat) return "";
  return cat.toLowerCase().replace(/[-_&]/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeMake(make?: string | null): string {
  if (!make) return "";
  return make.toLowerCase().replace(/[-_]/g, " ").trim();
}

export function ShopFilters({ products, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const selectedMake = searchParams.get("make") || "all";

  const { currentVehicle, openPicker, clearCurrentVehicle } = useVehicleStore();

  // Filters State
  const [priceMax, setPriceMax] = useState<number>(150);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "name">("default");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [mobileDrawerTab, setMobileDrawerTab] = useState<"filters" | "sort">("filters");

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (!isMobileDrawerOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileDrawerOpen]);

  const itemsPerPage = 12;

  // Extract all truck makes available in catalog
  const availableMakes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.compatibleMakes?.forEach((m) => set.add(m));
    });
    return Array.from(set).sort();
  }, [products]);

  // Filter products: exact matching
  const filteredProducts = useMemo(() => {
    const targetCat = normalizeCategory(selectedCategory);
    const targetMake = normalizeMake(selectedMake);

    return products.filter((p) => {
      // Query filter
      if (queryParam) {
        const q = queryParam.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      // Category filter: exact match on normalized category
      if (targetCat && targetCat !== "all") {
        const productCat = normalizeCategory(p.category);
        if (productCat !== targetCat) {
          return false;
        }
      }

      // Make filter: check if product supports this truck make
      if (targetMake && targetMake !== "all") {
        const matches = p.compatibleMakes?.some(
          (m) => normalizeMake(m) === targetMake
        );
        if (!matches) return false;
      }

      // Price filter
      if (p.price > priceMax) return false;

      // In-stock filter
      if (inStockOnly && p.inStock === false) return false;

      return true;
    });
  }, [products, queryParam, selectedCategory, selectedMake, priceMax, inStockOnly]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filteredProducts, sortBy]);

  // Paginated products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategorySelect = (cat: string) => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const handleMakeSelect = (make: string) => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (make === "all") {
      params.delete("make");
    } else {
      params.set("make", make);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    setPriceMax(150);
    setInStockOnly(false);
    setSortBy("default");
    setCurrentPage(1);
    router.push("/shop", { scroll: false });
  };

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedMake !== "all" ? 1 : 0) +
    (priceMax < 150 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (currentVehicle ? 1 : 0);

  const getSortLabel = () => {
    switch (sortBy) {
      case "price-asc":
        return "Price: Low to High";
      case "price-desc":
        return "Price: High to Low";
      case "name":
        return "Name: A to Z";
      default:
        return "Featured";
    }
  };

  return (
    <div className="block">
      {/* Block Header with Breadcrumb and Title */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
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
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">
                    {selectedCategory !== "all" ? selectedCategory : "Filters"}
                  </span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">
              {selectedCategory !== "all" ? selectedCategory : "All Truck & Equipment Filters"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="block-split block-split--has-sidebar">
          <div className="block-split__row row">
            {/* Left Sidebar: Red-Parts Exact Filter Widgets (Desktop only) */}
            <div className="block-split__item-sidebar col-12 col-lg-3 d-none d-lg-block">
              <div className="card widget widget-filters">
                <div className="widget-filters__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #ebebeb" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Filters</h4>
                    {activeFilterCount > 0 && (
                      <span
                        style={{
                          backgroundColor: "#0081c9",
                          color: "#fff",
                          borderRadius: 12,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {activeFilterCount}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      style={{ background: "none", border: "none", color: "#0081c9", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="widget-filters__list" style={{ padding: 20 }}>
                  {/* Filter 1: Active Vehicle Filter Box */}
                  <div className="widget-filters__item mb-4" style={{ paddingBottom: 16, borderBottom: "1px solid #ebebeb" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#333", marginBottom: 10 }}>
                      Vehicle Fitment
                    </div>
                    {currentVehicle ? (
                      <div style={{ background: "#e8f4fb", border: "1px solid #0081c9", borderRadius: 4, padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, color: "#0081c9", fontWeight: 700, textTransform: "uppercase" }}>
                          Active Rig
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1d21", marginTop: 2 }}>
                          {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                          <button
                            type="button"
                            onClick={openPicker}
                            style={{ background: "none", border: "none", color: "#0081c9", fontSize: 12, textDecoration: "underline", padding: 0, cursor: "pointer", fontWeight: 600 }}
                          >
                            Change Vehicle
                          </button>
                          <button
                            type="button"
                            onClick={clearCurrentVehicle}
                            style={{ background: "none", border: "none", color: "#6c757d", fontSize: 12, textDecoration: "underline", padding: 0, cursor: "pointer" }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={openPicker}
                        style={{ width: "100%", borderColor: "#0081c9", color: "#0081c9" }}
                      >
                        + Select Vehicle
                      </button>
                    )}
                  </div>

                  {/* Filter 2: Categories Tree */}
                  <div className="widget-filters__item mb-4" style={{ paddingBottom: 16, borderBottom: "1px solid #ebebeb" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#333", marginBottom: 10 }}>
                      Categories
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14 }}>
                      <li style={{ marginBottom: 8 }}>
                        <button
                          type="button"
                          onClick={() => handleCategorySelect("all")}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            fontWeight: selectedCategory === "all" ? 700 : 400,
                            color: selectedCategory === "all" ? "#0081c9" : "#495057",
                            textAlign: "left",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>All Categories</span>
                          <span style={{ color: "#999", fontSize: 12 }}>({products.length})</span>
                        </button>
                      </li>
                      {categories.map((cat) => {
                        const count = products.filter((p) => normalizeCategory(p.category) === normalizeCategory(cat)).length;
                        const isSelected = normalizeCategory(selectedCategory) === normalizeCategory(cat);
                        return (
                          <li key={cat} style={{ marginBottom: 8 }}>
                            <button
                              type="button"
                              onClick={() => handleCategorySelect(cat)}
                              style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                fontWeight: isSelected ? 700 : 400,
                                color: isSelected ? "#0081c9" : "#495057",
                                textAlign: "left",
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{cat}</span>
                              <span style={{ color: "#999", fontSize: 12 }}>({count})</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Filter 3: Price Range Slider */}
                  <div className="widget-filters__item mb-4" style={{ paddingBottom: 16, borderBottom: "1px solid #ebebeb" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#333", marginBottom: 10 }}>
                      Price Range
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={150}
                      step={5}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "#0081c9" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6c757d", marginTop: 6 }}>
                      <span>$10</span>
                      <strong style={{ color: "#0081c9" }}>Up to ${priceMax}</strong>
                    </div>
                  </div>

                  {/* Filter 4: Truck Makes */}
                  {availableMakes.length > 0 && (
                    <div className="widget-filters__item mb-4" style={{ paddingBottom: 16, borderBottom: "1px solid #ebebeb" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#333", marginBottom: 10 }}>
                        Truck Make
                      </div>
                      <div className="widget-filters__makes-list">
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: 14,
                            color: selectedMake === "all" ? "#0081c9" : "#495057",
                            fontWeight: selectedMake === "all" ? 600 : 400,
                            marginBottom: 8,
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input
                              type="radio"
                              name="truckMake"
                              checked={selectedMake === "all"}
                              onChange={() => handleMakeSelect("all")}
                              style={{ accentColor: "#0081c9" }}
                            />
                            <span>All Makes</span>
                          </div>
                          <span style={{ color: "#999", fontSize: 12 }}>({products.length})</span>
                        </label>
                        {availableMakes.map((m) => {
                          const isChecked = selectedMake.toLowerCase() === m.toLowerCase();
                          const count = products.filter((p) => p.compatibleMakes?.some((cm) => cm.toLowerCase() === m.toLowerCase())).length;
                          return (
                            <label
                              key={m}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: 14,
                                color: isChecked ? "#0081c9" : "#495057",
                                fontWeight: isChecked ? 600 : 400,
                                marginBottom: 8,
                                cursor: "pointer",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <input
                                  type="radio"
                                  name="truckMake"
                                  checked={isChecked}
                                  onChange={() => handleMakeSelect(isChecked ? "all" : m)}
                                  style={{ accentColor: "#0081c9" }}
                                />
                                <span>{m}</span>
                              </div>
                              <span style={{ color: "#999", fontSize: 12 }}>({count})</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Filter 5: Availability */}
                  <div className="widget-filters__item mb-2">
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", color: "#333" }}>
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        style={{ accentColor: "#0081c9" }}
                      />
                      <span>In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="block-split__item-content col-12 col-lg-9">
              <div className="block">
                {/* Mobile Filter & Sort Control Bar (Visible on mobile/tablet < 992px) */}
                <div className="cf-shop-mobile-bar d-lg-none">
                  <div className="cf-shop-mobile-actions">
                    <button
                      type="button"
                      className={`cf-shop-mobile-btn ${activeFilterCount > 0 ? "cf-shop-mobile-btn--active" : ""}`}
                      onClick={() => {
                        setMobileDrawerTab("filters");
                        setIsMobileDrawerOpen(true);
                      }}
                      aria-label="Open filter options"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                      </svg>
                      <span>Filters</span>
                      {activeFilterCount > 0 && (
                        <span className="cf-shop-mobile-badge">{activeFilterCount}</span>
                      )}
                    </button>

                    <button
                      type="button"
                      className="cf-shop-mobile-btn"
                      onClick={() => {
                        setMobileDrawerTab("sort");
                        setIsMobileDrawerOpen(true);
                      }}
                      aria-label="Open sorting options"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 15 12 20 17 15" />
                        <polyline points="17 9 12 4 7 9" />
                      </svg>
                      <span className="cf-shop-mobile-btn-text">
                        Sort: <strong>{getSortLabel()}</strong>
                      </span>
                    </button>
                  </div>

                  {/* Active Filter Chips (Instant 1-Tap Dismissal) */}
                  {activeFilterCount > 0 && (
                    <div className="cf-shop-active-chips">
                      {selectedCategory !== "all" && (
                        <button
                          type="button"
                          className="cf-shop-chip"
                          onClick={() => handleCategorySelect("all")}
                          title="Remove category filter"
                        >
                          <span>{selectedCategory}</span>
                          <span className="cf-shop-chip__remove">✕</span>
                        </button>
                      )}
                      {selectedMake !== "all" && (
                        <button
                          type="button"
                          className="cf-shop-chip"
                          onClick={() => handleMakeSelect("all")}
                          title="Remove truck make filter"
                        >
                          <span>Make: {selectedMake}</span>
                          <span className="cf-shop-chip__remove">✕</span>
                        </button>
                      )}
                      {currentVehicle && (
                        <button
                          type="button"
                          className="cf-shop-chip cf-shop-chip--rig"
                          onClick={clearCurrentVehicle}
                          title="Remove active truck filter"
                        >
                          <span>Rig: {currentVehicle.make} {currentVehicle.model}</span>
                          <span className="cf-shop-chip__remove">✕</span>
                        </button>
                      )}
                      {priceMax < 150 && (
                        <button
                          type="button"
                          className="cf-shop-chip"
                          onClick={() => setPriceMax(150)}
                          title="Remove price limit"
                        >
                          <span>Under ${priceMax}</span>
                          <span className="cf-shop-chip__remove">✕</span>
                        </button>
                      )}
                      {inStockOnly && (
                        <button
                          type="button"
                          className="cf-shop-chip"
                          onClick={() => setInStockOnly(false)}
                          title="Remove in-stock filter"
                        >
                          <span>In Stock</span>
                          <span className="cf-shop-chip__remove">✕</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="cf-shop-chip cf-shop-chip--clear-all"
                        onClick={handleResetFilters}
                      >
                        Reset All
                      </button>
                    </div>
                  )}

                  {/* Mobile Counter */}
                  <div className="cf-shop-mobile-count">
                    Showing {sortedProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} filters
                  </div>
                </div>

                {/* Desktop View Options Control Bar (Visible on desktop >= 992px) */}
                <div className="view-options d-none d-lg-flex" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fff", border: "1px solid #ebebeb", borderRadius: 3, marginBottom: 24 }}>
                  {/* Legend / Counters */}
                  <div className="view-options__legend" style={{ fontSize: 13, color: "#6c757d" }}>
                    Showing {sortedProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} filters
                  </div>

                  {/* Sort By Dropdown */}
                  <div className="view-options__select" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ fontSize: 13, color: "#6c757d", margin: 0 }}>Sort by:</label>
                    <select
                      className="form-control form-control-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "default" | "price-asc" | "price-desc" | "name")}
                      style={{ height: 32, fontSize: 13, width: "auto" }}
                    >
                      <option value="default">Default</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Product Name</option>
                    </select>
                  </div>
                </div>

                {/* Product Results: 4 per row */}
                {paginatedProducts.length === 0 ? (
                  <div style={{ padding: "48px 24px", textAlign: "center", background: "#fff", border: "1px solid #ebebeb", borderRadius: 4 }}>
                    <h3 style={{ fontSize: 18, color: "#333", marginBottom: 8 }}>No filters matched your search criteria</h3>
                    <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 16 }}>
                      Try relaxing your price limit or clearing specific truck fitment filters.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleResetFilters}
                      style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="row g-2 g-sm-3 g-md-4">
                    {paginatedProducts.map((product) => (
                      <div key={product._id} className="col-6 col-md-4 col-xl-3 mb-3 mb-md-4">
                        <ProductCard product={product} layout="grid" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 32, gap: 6 }}>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      ‹ Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        type="button"
                        className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-light"}`}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{
                          backgroundColor: currentPage === i + 1 ? "#0081c9" : undefined,
                          borderColor: currentPage === i + 1 ? "#0081c9" : undefined,
                          minWidth: 32,
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next ›
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Slide-Up Filter & Sort Drawer */}
      {isMobileDrawerOpen && (
        <div
          className="cf-shop-drawer-overlay"
          onClick={() => setIsMobileDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cf-shop-drawer-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div
              className="cf-sheet-grab-bar"
              onClick={() => setIsMobileDrawerOpen(false)}
            >
              <div className="cf-sheet-grab-handle" />
            </div>

            {/* Drawer Header */}
            <div className="cf-shop-drawer-header">
              <div className="cf-shop-drawer-title-wrap">
                <div className="cf-shop-drawer-title">Filter &amp; Sort</div>
                {activeFilterCount > 0 && (
                  <span className="cf-shop-drawer-badge">{activeFilterCount} active</span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="cf-shop-drawer-reset-btn"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  className="cf-sheet-close-btn"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="cf-shop-drawer-tabs">
              <button
                type="button"
                className={`cf-shop-drawer-tab ${mobileDrawerTab === "filters" ? "cf-shop-drawer-tab--active" : ""}`}
                onClick={() => setMobileDrawerTab("filters")}
              >
                <span>Filter Products</span>
                {activeFilterCount > 0 && (
                  <span className="cf-shop-drawer-tab-pill">{activeFilterCount}</span>
                )}
              </button>
              <button
                type="button"
                className={`cf-shop-drawer-tab ${mobileDrawerTab === "sort" ? "cf-shop-drawer-tab--active" : ""}`}
                onClick={() => setMobileDrawerTab("sort")}
              >
                <span>Sort Options</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="cf-shop-drawer-body">
              {mobileDrawerTab === "sort" ? (
                /* Sort Options Tab */
                <div className="cf-shop-sort-list">
                  {[
                    { id: "default", label: "Featured / Default" },
                    { id: "price-asc", label: "Price: Low to High" },
                    { id: "price-desc", label: "Price: High to Low" },
                    { id: "name", label: "Product Name (A–Z)" },
                  ].map((opt) => {
                    const isSelected = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`cf-shop-sort-card ${isSelected ? "cf-shop-sort-card--active" : ""}`}
                        onClick={() => {
                          setSortBy(opt.id as "default" | "price-asc" | "price-desc" | "name");
                          setCurrentPage(1);
                        }}
                      >
                        <span className="cf-shop-sort-card-label">{opt.label}</span>
                        <span className="cf-shop-sort-card-check">
                          {isSelected ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0081c9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", border: "2px solid #cbd5e1" }} />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Filters Tab */
                <div className="cf-shop-filter-sections">
                  {/* Vehicle Fitment */}
                  <div className="cf-shop-drawer-section">
                    <div className="cf-sheet-section-title">Vehicle Fitment</div>
                    {currentVehicle ? (
                      <div className="cf-sheet-vehicle-card" style={{ marginBottom: 0 }}>
                        <div className="cf-sheet-vehicle-info">
                          <div className="cf-sheet-vehicle-label">Active Rig</div>
                          <div className="cf-sheet-vehicle-val">
                            {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
                          </div>
                        </div>
                        <div className="cf-sheet-vehicle-actions">
                          <button
                            type="button"
                            className="cf-sheet-vehicle-btn cf-sheet-vehicle-btn--primary"
                            onClick={() => {
                              setIsMobileDrawerOpen(false);
                              openPicker();
                            }}
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            className="cf-sheet-vehicle-btn cf-sheet-vehicle-btn--clear"
                            onClick={clearCurrentVehicle}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setIsMobileDrawerOpen(false);
                          openPicker();
                        }}
                        style={{ width: "100%", borderColor: "#0081c9", color: "#0081c9", padding: "10px", borderRadius: 8, fontWeight: 600 }}
                      >
                        + Select Vehicle Rig
                      </button>
                    )}
                  </div>

                  {/* Categories */}
                  <div className="cf-shop-drawer-section">
                    <div className="cf-sheet-section-title">Categories</div>
                    <div className="cf-shop-cat-list">
                      <button
                        type="button"
                        className={`cf-shop-cat-row ${selectedCategory === "all" ? "cf-shop-cat-row--active" : ""}`}
                        onClick={() => handleCategorySelect("all")}
                      >
                        <span>All Categories</span>
                        <span className="cf-shop-cat-count">{products.length}</span>
                      </button>
                      {categories.map((cat) => {
                        const count = products.filter((p) => normalizeCategory(p.category) === normalizeCategory(cat)).length;
                        const isSelected = normalizeCategory(selectedCategory) === normalizeCategory(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            className={`cf-shop-cat-row ${isSelected ? "cf-shop-cat-row--active" : ""}`}
                            onClick={() => handleCategorySelect(cat)}
                          >
                            <span>{cat}</span>
                            <span className="cf-shop-cat-count">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Truck Makes */}
                  {availableMakes.length > 0 && (
                    <div className="cf-shop-drawer-section">
                      <div className="cf-sheet-section-title">Filter by Truck Make</div>
                      <div className="cf-shop-makes-grid">
                        <button
                          type="button"
                          className={`cf-shop-make-pill ${selectedMake === "all" ? "cf-shop-make-pill--active" : ""}`}
                          onClick={() => handleMakeSelect("all")}
                        >
                          All Makes
                        </button>
                        {availableMakes.map((m) => {
                          const isChecked = selectedMake.toLowerCase() === m.toLowerCase();
                          const count = products.filter((p) => p.compatibleMakes?.some((cm) => cm.toLowerCase() === m.toLowerCase())).length;
                          return (
                            <button
                              key={m}
                              type="button"
                              className={`cf-shop-make-pill ${isChecked ? "cf-shop-make-pill--active" : ""}`}
                              onClick={() => handleMakeSelect(isChecked ? "all" : m)}
                            >
                              <span>{m}</span>
                              <span style={{ fontSize: 11, opacity: 0.7 }}>({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Price Range Slider */}
                  <div className="cf-shop-drawer-section">
                    <div className="cf-sheet-section-title" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Price Range</span>
                      <strong style={{ color: "#0081c9", textTransform: "none" }}>Up to ${priceMax}</strong>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={150}
                      step={5}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "#0081c9", marginTop: 8 }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginTop: 4 }}>
                      <span>$10</span>
                      <span>$150</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="cf-shop-drawer-section">
                    <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, cursor: "pointer", color: "#1e293b", margin: 0 }}>
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        style={{ width: 18, height: 18, accentColor: "#0081c9" }}
                      />
                      <span style={{ fontWeight: 600 }}>In Stock Only</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="cf-shop-drawer-footer">
              <button
                type="button"
                className="cf-shop-drawer-btn cf-shop-drawer-btn--reset"
                onClick={handleResetFilters}
              >
                Reset All
              </button>
              <button
                type="button"
                className="cf-shop-drawer-btn cf-shop-drawer-btn--apply"
                onClick={() => setIsMobileDrawerOpen(false)}
              >
                Show {sortedProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="block-space block-space--layout--before-footer" />
    </div>
  );
}
