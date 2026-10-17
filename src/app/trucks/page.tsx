import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/sanity/products";
import { getCatalogMakes } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Commercial Truck Fitment Hub",
  description:
    "Find heavy duty filters tailored for Volvo, Freightliner, Kenworth, Peterbilt, Mack, and International trucks.",
};

const TRUCK_DETAILS: Record<string, { desc: string; models: string; engines: string }> = {
  volvo: {
    desc: "Long-haul highway and regional heavy distribution filtration.",
    models: "VNL 760, VNL 860, VHD 300, VNX 630",
    engines: "Volvo D11, D13, D13TC, D16",
  },
  freightliner: {
    desc: "Severe-duty vocational and on-highway aerodynamic efficiency.",
    models: "Cascadia 126, Cascadia 116, 114SD, 122SD",
    engines: "Detroit DD13, DD15, DD16, Cummins X15",
  },
  kenworth: {
    desc: "The World's Best commercial rigs and heavy timber haulers.",
    models: "T680 Next Gen, W900L, T880, W990",
    engines: "PACCAR MX-11, MX-13, Cummins X15 Performance",
  },
  peterbilt: {
    desc: "Iconic pride and class heavy-duty trucks engineered for maximum uptime.",
    models: "Model 579 UltraLoft, Model 389 Heritage, Model 567",
    engines: "PACCAR MX-13, Cummins X15 Efficiency / Performance",
  },
  mack: {
    desc: "Born ready for the toughest construction, refuse, and highway applications.",
    models: "Anthem, Pinnacle, Granite, TerraPro",
    engines: "Mack MP7, MP8, MP8-TC, MP10",
  },
  international: {
    desc: "Uptime-focused commercial vehicles designed for efficient payload delivery.",
    models: "LT Series, RH Series, Lonestar, HV Series",
    engines: "International A26, Cummins X15",
  },
};

export default async function TrucksIndexPage() {
  const products = await getProducts();
  const makes = getCatalogMakes(products);

  const fallbackMakes = [
    { slug: "volvo", name: "Volvo" },
    { slug: "freightliner", name: "Freightliner" },
    { slug: "kenworth", name: "Kenworth" },
    { slug: "peterbilt", name: "Peterbilt" },
    { slug: "mack", name: "Mack" },
    { slug: "international", name: "International" },
  ];

  const displayMakes = makes.length > 0 ? makes : fallbackMakes;

  return (
    <div className="block">
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
                  <span className="breadcrumb__item-link">Truck Fitment</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Heavy Duty Truck Fitment Guides</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <p style={{ fontSize: 16, color: "#5c6570", maxWidth: 800, marginBottom: 36, lineHeight: 1.6 }}>
          Select your truck brand below to browse all verified CORALFLY oil, air, fuel, and hydraulic filters
          engineered to OEM specifications for your exact power unit.
        </p>

        <div className="row">
          {displayMakes.map(({ slug, name }) => {
            const info = TRUCK_DETAILS[slug.toLowerCase()] || {
              desc: "Verified commercial filtration products with listed application specs.",
              models: "Commercial linehaul and vocational series",
              engines: "Heavy duty diesel engines",
            };

            return (
              <div key={slug} className="col-12 col-md-6 col-lg-4 mb-4">
                <div
                  className="card"
                  style={{
                    border: "1px solid #ebebeb",
                    borderRadius: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 28,
                    background: "#fff",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#1a1d21" }}>
                        {name}
                      </h3>
                      <span style={{ fontSize: 11, fontWeight: 700, background: "#e8f4fb", color: "#0081c9", padding: "3px 8px", borderRadius: 3 }}>
                        FITMENT HUB
                      </span>
                    </div>

                    <p style={{ fontSize: 14, color: "#5c6570", lineHeight: 1.5, marginBottom: 16 }}>
                      {info.desc}
                    </p>

                    <div style={{ fontSize: 13, color: "#333", marginBottom: 8 }}>
                      <strong>Popular Models:</strong> {info.models}
                    </div>

                    <div style={{ fontSize: 13, color: "#333", marginBottom: 20 }}>
                      <strong>Engines:</strong> {info.engines}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 16 }}>
                    <Link
                      href={`/shop?make=${encodeURIComponent(name)}`}
                      className="btn btn-primary btn-block"
                      style={{
                        width: "100%",
                        backgroundColor: "#0081c9",
                        borderColor: "#0081c9",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Browse All {name} Filters →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
