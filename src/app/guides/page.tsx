import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Filtration Guides & Technical Reports",
  description: "Practical engineering reference guides for commercial filter applications, cross-references, and maintenance.",
};

const guideImages = [
  "/images/posts/post-1-730x485.jpg",
  "/images/posts/post-2-730x485.jpg",
  "/images/posts/post-3-730x485.jpg",
  "/images/posts/post-4-730x485.jpg",
  "/images/posts/post-5-730x485.jpg",
  "/images/posts/post-6-730x485.jpg",
];

export default function GuidesIndexPage() {
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
                  <span className="breadcrumb__item-link">Guides &amp; Tech</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">Technical Filtration Guides</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row">
          {/* Main Guides List (Left) */}
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <div className="row">
              {guides.map((guide, idx) => {
                const img = guideImages[idx % guideImages.length];
                return (
                  <div key={guide.slug} className="col-12 mb-4">
                    <div className="card" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflow: "hidden" }}>
                      <div className="row no-gutters">
                        <div className="col-12 col-md-5">
                          <Link href={`/guides/${guide.slug}`} style={{ display: "block", height: "100%", minHeight: 220, position: "relative" }}>
                            <img
                              src={img}
                              alt={guide.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </Link>
                        </div>
                        <div className="col-12 col-md-7">
                          <div style={{ padding: 24 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#0081c9", textTransform: "uppercase", marginBottom: 6 }}>
                              Fleet Engineering Reference
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.4, marginBottom: 10 }}>
                              <Link href={`/guides/${guide.slug}`} style={{ color: "#1a1d21", textDecoration: "none" }}>
                                {guide.title}
                              </Link>
                            </h3>
                            <p style={{ color: "#5c6570", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                              {guide.excerpt}
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Link
                                href={`/guides/${guide.slug}`}
                                className="btn btn-sm btn-primary"
                                style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "6px 16px" }}
                              >
                                Read Technical Guide →
                              </Link>
                              <span style={{ fontSize: 12, color: "#999" }}>
                                {guide.sections.length} Sections
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="col-12 col-lg-4">
            <div className="card mb-4" style={{ padding: 24, border: "1px solid #ebebeb", borderRadius: 4 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Filter Types</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14 }}>
                <li style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <Link href="/shop?category=Air%20Filters" style={{ color: "#495057", textDecoration: "none" }}>
                    Engine Air &amp; RadialSeal Filters
                  </Link>
                </li>
                <li style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <Link href="/shop?category=Oil%20Filters" style={{ color: "#495057", textDecoration: "none" }}>
                    Lube &amp; Synthetic Media Oil Filters
                  </Link>
                </li>
                <li style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <Link href="/shop?category=Fuel%20Filters" style={{ color: "#495057", textDecoration: "none" }}>
                    Fuel Water Separator Elements
                  </Link>
                </li>
                <li style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <Link href="/shop?category=Cabin%20Filters" style={{ color: "#495057", textDecoration: "none" }}>
                    Cabin Air Cleaners
                  </Link>
                </li>
                <li style={{ padding: "8px 0" }}>
                  <Link href="/shop?category=Hydraulic%20Filters" style={{ color: "#495057", textDecoration: "none" }}>
                    Hydraulic High-Pressure Elements
                  </Link>
                </li>
              </ul>
            </div>

            <div className="card" style={{ padding: 24, border: "1px solid #ebebeb", borderRadius: 4, background: "#f8f9fa" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Need Cross-Reference Help?</h4>
              <p style={{ fontSize: 13, color: "#6c757d", lineHeight: 1.6, marginBottom: 16 }}>
                Provide your engine serial number or existing filter brand part number, and our team will identify the verified CORALFLY SKU.
              </p>
              <Link
                href="/contact"
                className="btn btn-outline-primary btn-sm btn-block"
                style={{ width: "100%", borderColor: "#0081c9", color: "#0081c9" }}
              >
                Ask a Filter Specialist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
