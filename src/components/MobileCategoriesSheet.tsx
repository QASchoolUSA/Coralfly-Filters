"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useVehicleStore } from "@/lib/vehicle-store";
import {
  OilFilterIcon,
  AirFilterIcon,
  FuelFilterIcon,
  CabinFilterIcon,
  TruckIcon,
} from "@/components/CategoryIcons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CATEGORIES = [
  {
    name: "Oil Filters",
    slug: "Oil Filters",
    icon: OilFilterIcon,
    desc: "Full-flow, bypass & cartridges",
    color: "#0284c7",
    bg: "#e0f2fe",
  },
  {
    name: "Air Filters",
    slug: "Air Filters",
    icon: AirFilterIcon,
    desc: "Intake & secondary elements",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  {
    name: "Fuel & Separators",
    slug: "Fuel Filters",
    icon: FuelFilterIcon,
    desc: "Primary, secondary & bowls",
    color: "#ea580c",
    bg: "#ffedd5",
  },
  {
    name: "Cabin Filters",
    slug: "Cabin Filters",
    icon: CabinFilterIcon,
    desc: "Fresh air HVAC carbon media",
    color: "#8b5cf6",
    bg: "#ede9fe",
  },
  {
    name: "Accessories & Kits",
    slug: "Accessories & Kits",
    icon: null,
    desc: "LED lamps & service bundles",
    color: "#0d9488",
    bg: "#ccfbf1",
  },
];

const TRUCK_MAKES = [
  { name: "Volvo", makeParam: "Volvo", engines: "D13, D11" },
  { name: "Freightliner", makeParam: "Freightliner", engines: "Detroit DD15, DD13" },
  { name: "Kenworth", makeParam: "Kenworth", engines: "PACCAR MX, Cummins X15" },
  { name: "Peterbilt", makeParam: "Peterbilt", engines: "Model 579, 389" },
  { name: "Mack", makeParam: "Mack", engines: "MP8, MP7" },
  { name: "Western Star", makeParam: "Western Star", engines: "DD15, DD16" },
];

export function MobileCategoriesSheet({ isOpen, onClose }: Props) {
  const { currentVehicle, openPicker, clearCurrentVehicle } = useVehicleStore();

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cf-sheet-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="cf-sheet-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Grab Handle */}
        <div className="cf-sheet-grab-bar" onClick={onClose}>
          <div className="cf-sheet-grab-handle" />
        </div>

        {/* Sheet Header */}
        <div className="cf-sheet-header">
          <div>
            <div className="cf-sheet-title">Browse Categories & Trucks</div>
            <div className="cf-sheet-subtitle">Select a category or commercial power unit</div>
          </div>
          <button
            type="button"
            className="cf-sheet-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="cf-sheet-content">
          {/* Active Vehicle Status Bar */}
          <div className="cf-sheet-vehicle-card">
            <div className="cf-sheet-vehicle-info">
              <div className="cf-sheet-vehicle-label">Selected Vehicle Rig</div>
              <div className="cf-sheet-vehicle-val">
                {currentVehicle
                  ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`
                  : "No vehicle configured yet"}
              </div>
            </div>
            <div className="cf-sheet-vehicle-actions">
              <button
                type="button"
                className="cf-sheet-vehicle-btn cf-sheet-vehicle-btn--primary"
                onClick={() => {
                  onClose();
                  openPicker();
                }}
              >
                {currentVehicle ? "Change" : "Select Truck"}
              </button>
              {currentVehicle && (
                <button
                  type="button"
                  className="cf-sheet-vehicle-btn cf-sheet-vehicle-btn--clear"
                  onClick={clearCurrentVehicle}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Section 1: Filter Categories */}
          <div className="cf-sheet-section">
            <div className="cf-sheet-section-title">
              <span>Filter by Type</span>
              <Link href="/shop" onClick={onClose} className="cf-sheet-section-link">
                View All →
              </Link>
            </div>
            <div className="cf-sheet-categories-grid">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                    onClick={onClose}
                    className="cf-sheet-cat-card"
                  >
                    <div
                      className="cf-sheet-cat-icon-wrap"
                      style={{ backgroundColor: cat.bg, color: cat.color }}
                    >
                      {IconComponent ? (
                        <IconComponent size={24} />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      )}
                    </div>
                    <div className="cf-sheet-cat-info">
                      <div className="cf-sheet-cat-name">{cat.name}</div>
                      <div className="cf-sheet-cat-desc">{cat.desc}</div>
                    </div>
                    <span className="cf-sheet-cat-arrow">→</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2: Truck Makes */}
          <div className="cf-sheet-section">
            <div className="cf-sheet-section-title">
              <span>Filter by Truck Make</span>
            </div>
            <div className="cf-sheet-makes-grid">
              {TRUCK_MAKES.map((maker) => (
                <Link
                  key={maker.makeParam}
                  href={`/shop?make=${encodeURIComponent(maker.makeParam)}`}
                  onClick={onClose}
                  className="cf-sheet-make-card"
                >
                  <div className="cf-sheet-make-icon">
                    <TruckIcon size={18} />
                  </div>
                  <div className="cf-sheet-make-text">
                    <div className="cf-sheet-make-name">{maker.name}</div>
                    <div className="cf-sheet-make-engines">{maker.engines}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Quick Navigation Shortcuts */}
          <div className="cf-sheet-section cf-sheet-section--footer">
            <div className="cf-sheet-shortcuts">
              <Link href="/shop" onClick={onClose} className="cf-sheet-shortcut-item">
                <span>Browse Full Catalog</span>
                <span>→</span>
              </Link>
              <Link href="/guides" onClick={onClose} className="cf-sheet-shortcut-item">
                <span>OEM Cross-Reference Guides</span>
                <span>→</span>
              </Link>
              <Link href="/about" onClick={onClose} className="cf-sheet-shortcut-item">
                <span>About CORALFLY</span>
                <span>→</span>
              </Link>
              <Link href="/contact" onClick={onClose} className="cf-sheet-shortcut-item">
                <span>Contact &amp; Warehouse Location</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
