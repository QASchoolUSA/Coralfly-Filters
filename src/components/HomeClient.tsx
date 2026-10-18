"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useVehicleStore } from "@/lib/vehicle-store";
import type { Product } from "@/sanity/types";

const VEHICLE_DATA = [
  {
    make: "Volvo",
    models: ["VNL 760", "VNL 860", "VHD 300", "VNX 630"],
    engines: ["D13TC 455 HP", "D13 500 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Freightliner",
    models: ["Cascadia 126", "Cascadia 116", "114SD", "122SD"],
    engines: ["Detroit DD15 505 HP", "Detroit DD13 450 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Kenworth",
    models: ["T680", "W900L", "T880"],
    engines: ["PACCAR MX-13 455 HP", "PACCAR MX-11 430 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Peterbilt",
    models: ["Model 579", "Model 389", "Model 567"],
    engines: ["PACCAR MX-13 455 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Mack",
    models: ["Anthem", "Pinnacle", "Granite"],
    engines: ["Mack MP8 505 HP", "Mack MP7 425 HP"],
  },
];

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

const TYPE_TABS = [
  "All",
  "Air Filters",
  "Oil Filters",
  "Fuel Filters",
  "Cabin Filters",
  "Hydraulic Filters",
];

const TRUCK_TABS = [
  "All Trucks",
  "Volvo",
  "Freightliner",
  "Kenworth",
  "Peterbilt",
  "Mack",
];

export function HomeClient({
  products,
}: {
  products: Product[];
  featured?: Product[];
}) {
  const router = useRouter();
  const { selectVehicle } = useVehicleStore();

  // Finder form state (unselected by default)
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");

  // Tab filters for Filters by Type block
  const [typeTab, setTypeTab] = useState("All");

  // Tab filters for Filters by Truck Make block
  const [truckTab, setTruckTab] = useState("All Trucks");

  const makeObj = VEHICLE_DATA.find((m) => m.make === make);

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    setModel("");
    setEngine("");
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setEngine("");
  };

  const isFinderComplete = Boolean(year && make && model && engine);

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFinderComplete) return;
    selectVehicle({ year, make, model, engine });
    router.push(`/shop?make=${encodeURIComponent(make)}&year=${encodeURIComponent(year)}`);
  };

  // Filtered products for Filters by Type
  const filteredByType = products.filter((p) => {
    if (typeTab === "All") return true;
    if (typeTab === "Air Filters") return p.category?.toLowerCase().includes("air");
    if (typeTab === "Oil Filters") return p.category?.toLowerCase().includes("oil");
    if (typeTab === "Fuel Filters") return p.category?.toLowerCase().includes("fuel");
    if (typeTab === "Cabin Filters") return p.category?.toLowerCase().includes("cabin");
    if (typeTab === "Hydraulic Filters") return p.category?.toLowerCase().includes("hydraulic");
    return true;
  });

  // Filtered products for Filters by Truck Make
  const filteredByTruck = products.filter((p) => {
    if (truckTab === "All Trucks") return true;
    return p.compatibleMakes?.some((m) => m.toLowerCase() === truckTab.toLowerCase());
  });

  // Latest blog posts data
  const posts = [
    {
      id: 1,
      title: "How to Choose the Right Heavy-Duty Oil Filter for Long Haul Rigs",
      date: "OCTOBER 15, 2026",
      image: "/images/posts/post-1-730x485.jpg",
      slug: "freightliner-cascadia-filter-guide",
      author: "Filtration Engineering Team",
      comments: 6,
    },
    {
      id: 2,
      title: "Understanding Micron Ratings & Gasket Integrity in Diesel Fuel Systems",
      date: "SEPTEMBER 28, 2026",
      image: "/images/posts/post-2-730x485.jpg",
      slug: "oem-filter-cross-reference-guide",
      author: "Technical Specialist",
      comments: 14,
    },
    {
      id: 3,
      title: "The Fleet Operator's Comprehensive Guide to Air Intake Pre-Cleaners",
      date: "SEPTEMBER 12, 2026",
      image: "/images/posts/post-3-730x485.jpg",
      slug: "volvo-vnl-d13-filtration-specs",
      author: "Service Support",
      comments: 9,
    },
  ];

  return (
    <>
      {/* 1. Block Finder Hero Banner */}
      <div className="block-finder block">
        <div className="decor block-finder__decor decor--type--bottom">
          <div className="decor__body">
            <div className="decor__start" />
            <div className="decor__end" />
            <div className="decor__center" />
          </div>
        </div>

        <div
          className="block-finder__image"
          style={{ backgroundImage: "url('/images/finder-1903x500.jpg')" }}
        />

        <div className="block-finder__body container container--max--xl">
          <div className="block-finder__title">Find The Right Filters For Your Truck</div>
          <div className="block-finder__subtitle">
            Over thousands of heavy-duty filters and verified OEM cross-references in stock
          </div>

          <form className="block-finder__form" onSubmit={handleFinderSubmit}>
            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="year"
                aria-label="Vehicle Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="make"
                aria-label="Vehicle Make"
                value={make}
                onChange={(e) => handleMakeChange(e.target.value)}
              >
                <option value="">Select Make</option>
                {VEHICLE_DATA.map((v) => (
                  <option key={v.make} value={v.make}>
                    {v.make}
                  </option>
                ))}
              </select>
            </div>

            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="model"
                aria-label="Vehicle Model"
                value={model}
                disabled={!make || !makeObj}
                onChange={(e) => handleModelChange(e.target.value)}
              >
                <option value="">{make ? "Select Model" : "Select Make First"}</option>
                {makeObj?.models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="engine"
                aria-label="Vehicle Engine"
                value={engine}
                disabled={!model || !makeObj}
                onChange={(e) => setEngine(e.target.value)}
              >
                <option value="">{model ? "Select Engine" : "Select Model First"}</option>
                {makeObj?.engines.map((eng) => (
                  <option key={eng} value={eng}>
                    {eng}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="block-finder__form-control block-finder__form-control--button"
              type="submit"
              disabled={!isFinderComplete}
              style={{
                backgroundColor: isFinderComplete ? "#0081c9" : "#cbd5e1",
                borderColor: isFinderComplete ? "#0081c9" : "#cbd5e1",
                cursor: isFinderComplete ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
              }}
            >
              Search Filters
            </button>
          </form>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 2. Filters by Type */}
      <div className="block block-products-carousel" data-layout="grid-4">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">Filters by Type</h2>
              <div className="section-header__spring" />
              <ul className="section-header__groups">
                {TYPE_TABS.map((tab) => (
                  <li key={tab} className="section-header__groups-item">
                    <button
                      type="button"
                      className={`section-header__groups-button ${typeTab === tab ? "section-header__groups-button--active" : ""}`}
                      onClick={() => setTypeTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {filteredByType.slice(0, 8).map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <ProductCard product={product} layout="grid" />
              </div>
            ))}
          </div>

          {filteredByType.length > 8 && (
            <div className="text-center mt-2 mb-3">
              <Link
                href={typeTab === "All" ? "/shop" : `/shop?category=${encodeURIComponent(typeTab)}`}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 3, fontWeight: 500 }}
              >
                View All {typeTab} ({filteredByType.length})
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 3. Filters by Truck Make */}
      <div className="block block-products-carousel" data-layout="grid-4">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">Filters by Truck Make</h2>
              <div className="section-header__spring" />
              <ul className="section-header__groups">
                {TRUCK_TABS.map((tab) => (
                  <li key={tab} className="section-header__groups-item">
                    <button
                      type="button"
                      className={`section-header__groups-button ${truckTab === tab ? "section-header__groups-button--active" : ""}`}
                      onClick={() => setTruckTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {filteredByTruck.slice(0, 8).map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <ProductCard product={product} layout="grid" />
              </div>
            ))}
          </div>

          {filteredByTruck.length > 8 && (
            <div className="text-center mt-2 mb-3">
              <Link
                href={truckTab === "All Trucks" ? "/shop" : `/shop?make=${encodeURIComponent(truckTab)}`}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 3, fontWeight: 500 }}
              >
                View All {truckTab} Filters ({filteredByTruck.length})
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 4. Promotional Banners (2-Column) */}
      <div className="block-banners block">
        <div className="container">
          <div className="block-banners__list">
            <Link
              href="/shop?q=Fleet"
              className="block-banners__item block-banners__item--style--one"
            >
              <div
                className="block-banners__item-image"
                style={{ backgroundImage: "url('/images/banners/banner1.jpg')" }}
              />
              <div className="block-banners__item-title">Heavy Duty Fleet Packs</div>
              <div className="block-banners__item-details">
                Save up to 25% when buying filter case quantities for commercial fleets and repair shops.
              </div>
              <span className="block-banners__item-button btn btn-primary btn-sm" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                Shop Fleet Cases
              </span>
            </Link>

            <Link
              href="/guides/oem-filter-cross-reference-guide"
              className="block-banners__item block-banners__item--style--two"
            >
              <div
                className="block-banners__item-image"
                style={{ backgroundImage: "url('/images/banners/banner2.jpg')" }}
              />
              <div className="block-banners__item-title">100% Guaranteed Fitment</div>
              <div className="block-banners__item-details">
                Engineered to meet or exceed OEM specifications for Volvo, Freightliner, Kenworth, and Cummins.
              </div>
              <span className="block-banners__item-button btn btn-primary btn-sm" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                Cross Reference Tool
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 5. New Arrivals */}
      <div className="block block-products-carousel" data-layout="grid-4">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">New Arrivals</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <ProductCard product={product} layout="grid" badge="NEW" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 6. Latest News & Tech Guides */}
      <div className="block block-posts-carousel block-posts-carousel--layout--grid">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">Latest Technical Guides & News</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-4 mb-4">
                <div className="post-card post-card--layout--grid" style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 3, overflow: "hidden" }}>
                  <div className="post-card__image" style={{ position: "relative", width: "100%", height: 210 }}>
                    <Link href={`/guides/${post.slug}`} style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="post-card__info" style={{ padding: 20 }}>
                    <div className="post-card__category" style={{ fontSize: 11, fontWeight: 700, color: "#0081c9", textTransform: "uppercase", marginBottom: 6 }}>
                      Special Technical Report
                    </div>
                    <div className="post-card__name" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>
                      <Link href={`/guides/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {post.title}
                      </Link>
                    </div>
                    <div className="post-card__date" style={{ fontSize: 12, color: "#999" }}>
                      By {post.author} on {post.date} • {post.comments} Comments
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--before-footer" />
    </>
  );
}
