"use client";

import Link from "next/link";
import { useVehicleStore } from "@/lib/vehicle-store";

export default function AccountDashboardPage() {
  const { currentVehicle, garage } = useVehicleStore();

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
                  <span className="breadcrumb__item-link">My Account</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">My Account</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row">
          {/* Account Navigation Sidebar */}
          <div className="col-12 col-lg-3 mb-4 mb-lg-0">
            <div className="account-nav card" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflow: "hidden" }}>
              <h4 className="account-nav__title" style={{ padding: "16px 20px", borderBottom: "1px solid #ebebeb", margin: 0, fontSize: 16 }}>
                Navigation
              </h4>
              <ul className="account-nav__list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li className="account-nav__item account-nav__item--active">
                  <Link href="/account/dashboard" style={{ display: "block", padding: "10px 20px", color: "#0081c9", fontWeight: 700, borderLeft: "3px solid #0081c9" }}>
                    Dashboard
                  </Link>
                </li>
                <li className="account-nav__item">
                  <Link href="/account/garage" style={{ display: "block", padding: "10px 20px", color: "#495057" }}>
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
            <div className="row">
              {/* Profile Card */}
              <div className="col-12 col-md-6 mb-4">
                <div className="card" style={{ padding: 24, border: "1px solid #ebebeb", borderRadius: 4, height: "100%" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Fleet Profile</h4>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
                    <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#0081c9", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>
                      JD
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>John Doe</div>
                      <div style={{ color: "#6c757d", fontSize: 13 }}>American Fleet Logistics</div>
                      <div style={{ color: "#6c757d", fontSize: 13 }}>j.doe@fleetlogistics.com</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "#28a745", fontWeight: 600 }}>
                    ✓ Corporate Commercial Fleet Tier 1
                  </div>
                </div>
              </div>

              {/* Default Rig Card */}
              <div className="col-12 col-md-6 mb-4">
                <div className="card" style={{ padding: 24, border: "1px solid #ebebeb", borderRadius: 4, height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Active Vehicle</h4>
                    <Link href="/account/garage" style={{ fontSize: 12, color: "#0081c9" }}>
                      Manage Garage
                    </Link>
                  </div>
                  {currentVehicle ? (
                    <div style={{ background: "#e8f4fb", padding: 14, borderRadius: 4, border: "1px solid #c5d9e5" }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1d21" }}>
                        {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
                      </div>
                      <div style={{ fontSize: 13, color: "#6c757d" }}>{currentVehicle.engine}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#0081c9", marginTop: 4 }}>
                        Catalog automatically filters for this truck
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: "#6c757d", fontSize: 13 }}>No active rig selected.</p>
                  )}
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="col-12">
                <div className="card" style={{ border: "1px solid #ebebeb", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #ebebeb", background: "#f8f9fa", fontWeight: 700 }}>
                    Recent Orders
                  </div>
                  <table className="table" style={{ margin: 0, fontSize: 14 }}>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>#CF-89241</strong></td>
                        <td>Oct 16, 2026</td>
                        <td><span style={{ color: "#28a745", fontWeight: 600 }}>In Transit</span></td>
                        <td>$142.50 for 4 items</td>
                        <td><Link href="/track-order" style={{ color: "#0081c9", fontSize: 13 }}>Track →</Link></td>
                      </tr>
                      <tr>
                        <td><strong>#CF-84190</strong></td>
                        <td>Sep 28, 2026</td>
                        <td><span style={{ color: "#6c757d" }}>Delivered</span></td>
                        <td>$418.00 for 12 items</td>
                        <td><Link href="/track-order" style={{ color: "#0081c9", fontSize: 13 }}>Details →</Link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
