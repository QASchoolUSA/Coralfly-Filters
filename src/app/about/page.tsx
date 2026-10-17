import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CORALFLY Filters, our filtration engineering standards, fleet support, and commercial warehouse logistics.",
};

export default function AboutPage() {
  return (
    <div className="block about-us">
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__spaceship-safe-area" role="presentation" />
                <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">About Us</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">About CORALFLY Filters</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        {/* Hero Card */}
        <div className="card mb-5" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflow: "hidden" }}>
          <div className="row no-gutters align-items-center">
            <div className="col-12 col-lg-6">
              <div style={{ height: 380, position: "relative", overflow: "hidden" }}>
                <img
                  src="/images/banners/banner1.jpg"
                  alt="CORALFLY Warehouse"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div style={{ padding: 48 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0081c9", textTransform: "uppercase", marginBottom: 8 }}>
                  Our Mission &amp; Standards
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
                  Heavy Duty Filtration Engineered for Long Haul Reliability
                </h2>
                <p style={{ color: "#5c6570", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                  CORALFLY was founded with a singular dedication: ensuring commercial fleet owners, owner-operators,
                  and repair facilities have direct access to heavy-duty filtration that matches or exceeds original
                  equipment manufacturer (OEM) requirements.
                </p>
                <p style={{ color: "#5c6570", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  With over 50,000 SKUs stocked across central logistics facilities in the United States, our team provides
                  verified fitment, ISO 9001 quality verification, and rapid same-day shipping.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Counters */}
        <div className="row mb-5 text-center">
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4, background: "#f8f9fa" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0081c9", marginBottom: 4 }}>15+</div>
              <div style={{ fontSize: 14, color: "#6c757d", fontWeight: 600 }}>Years of Industry Experience</div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4, background: "#f8f9fa" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0081c9", marginBottom: 4 }}>50,000+</div>
              <div style={{ fontSize: 14, color: "#6c757d", fontWeight: 600 }}>In-Stock Filter SKUs</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4, background: "#f8f9fa" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0081c9", marginBottom: 4 }}>99.8%</div>
              <div style={{ fontSize: 14, color: "#6c757d", fontWeight: 600 }}>Fitment Accuracy Rating</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4, background: "#f8f9fa" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0081c9", marginBottom: 4 }}>10,000+</div>
              <div style={{ fontSize: 14, color: "#6c757d", fontWeight: 600 }}>Commercial Fleets Served</div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-5">
          <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 32 }}>Our Core Values</h3>
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="card" style={{ padding: 28, height: "100%", border: "1px solid #ebebeb", borderRadius: 4 }}>
                <div style={{ fontSize: 24, color: "#0081c9", marginBottom: 12 }}>🛡️</div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Absolute Quality</h4>
                <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  We test media pleating, canister burst tolerance, and anti-drainback valves under extreme heat and pressure cycles.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card" style={{ padding: 28, height: "100%", border: "1px solid #ebebeb", borderRadius: 4 }}>
                <div style={{ fontSize: 24, color: "#0081c9", marginBottom: 12 }}>⚡</div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Fast Dispatch</h4>
                <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  Downtime equals lost revenue. Orders placed before 2:00 PM EST ship the exact same business day.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card" style={{ padding: 28, height: "100%", border: "1px solid #ebebeb", borderRadius: 4 }}>
                <div style={{ fontSize: 24, color: "#0081c9", marginBottom: 12 }}>🤝</div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Direct Cross-Reference</h4>
                <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  Our database cross-references hundreds of OEM part numbers across Baldwin, Donaldson, Fleetguard, Wix, and Luber-finer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div
          className="card text-center"
          style={{
            background: "#0b1e2d",
            color: "#fff",
            padding: 48,
            borderRadius: 4,
          }}
        >
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, color: "#fff" }}>Ready to Outfit Your Rig?</h2>
          <p style={{ color: "#cce3ff", fontSize: 16, marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>
            Explore our catalog of certified air, oil, fuel, and hydraulic filters with guaranteed compatibility.
          </p>
          <div>
            <Link
              href="/shop"
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 36px", fontWeight: 700 }}
            >
              Browse All Filters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
