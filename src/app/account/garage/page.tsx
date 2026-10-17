"use client";

import Link from "next/link";
import { useVehicleStore } from "@/lib/vehicle-store";

export default function AccountGaragePage() {
  const { garage, currentVehicle, selectVehicle, removeFromGarage, openPicker } = useVehicleStore();

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
                <li className="breadcrumb__item">
                  <span className="breadcrumb__item-arrow">/</span>
                  <Link href="/account/dashboard" className="breadcrumb__item-link">My Account</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-arrow">/</span>
                  <span className="breadcrumb__item-link">Garage</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">My Garage</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row">
          {/* Navigation Sidebar */}
          <div className="col-12 col-lg-3 mb-4 mb-lg-0">
            <div className="account-nav card" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflow: "hidden" }}>
              <h4 className="account-nav__title" style={{ padding: "16px 20px", borderBottom: "1px solid #ebebeb", margin: 0, fontSize: 16 }}>
                Navigation
              </h4>
              <ul className="account-nav__list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li className="account-nav__item">
                  <Link href="/account/dashboard" style={{ display: "block", padding: "10px 20px", color: "#495057" }}>
                    Dashboard
                  </Link>
                </li>
                <li className="account-nav__item account-nav__item--active">
                  <Link href="/account/garage" style={{ display: "block", padding: "10px 20px", color: "#0081c9", fontWeight: 700, borderLeft: "3px solid #0081c9" }}>
                    My Garage ({garage.length})
                  </Link>
                </li>
                <li className="account-nav__item">
                  <Link href="/track-order" style={{ display: "block", padding: "10px 20px", color: "#495057" }}>
                    Order History
                  </Link>
                </li>
                <li className="account-nav__item">
                  <Link href="/wishlist" style={{ display: "block", padding: "10px 20px", color: "#495057" }}>
                    Saved Wishlist
                  </Link>
                </li>
                <li className="account-nav__divider" style={{ height: 1, background: "#ebebeb", margin: "6px 0" }} />
                <li className="account-nav__item">
                  <Link href="/account/login" style={{ display: "block", padding: "10px 20px", color: "#dc3545" }}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-12 col-lg-9">
            <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Manage Your Fleet Rigs</h3>
                  <p style={{ color: "#6c757d", fontSize: 14, margin: "4px 0 0" }}>
                    Vehicles stored here allow 1-click fitment verification across our entire filtration catalog.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openPicker}
                  style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", fontSize: 14, fontWeight: 600 }}
                >
                  + Add New Vehicle
                </button>
              </div>

              {garage.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <p style={{ color: "#6c757d", fontSize: 15 }}>No vehicles currently added to your garage.</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openPicker}
                    style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                  >
                    Select Your First Vehicle
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {garage.map((v, idx) => {
                    const isCurrent =
                      currentVehicle?.year === v.year &&
                      currentVehicle?.make === v.make &&
                      currentVehicle?.model === v.model;

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: 20,
                          border: isCurrent ? "2px solid #0081c9" : "1px solid #ebebeb",
                          borderRadius: 4,
                          background: isCurrent ? "#e8f4fb" : "#fff",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 12,
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21" }}>
                              {v.year} {v.make} {v.model}
                            </span>
                            {isCurrent && (
                              <span style={{ fontSize: 11, fontWeight: 700, background: "#0081c9", color: "#fff", padding: "2px 8px", borderRadius: 3 }}>
                                ACTIVE RIG
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 14, color: "#6c757d", marginTop: 4 }}>
                            Engine: {v.engine}
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          {!isCurrent ? (
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={() => selectVehicle(v)}
                              style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                            >
                              Set as Active
                            </button>
                          ) : (
                            <Link
                              href={`/shop?make=${encodeURIComponent(v.make)}`}
                              className="btn btn-sm btn-outline-primary"
                              style={{ borderColor: "#0081c9", color: "#0081c9" }}
                            >
                              View Matching Filters →
                            </Link>
                          )}
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => removeFromGarage(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
