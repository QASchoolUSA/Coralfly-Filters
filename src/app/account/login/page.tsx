"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountLoginPage() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("fleet.manager@transportcorp.com");
  const [loginPassword, setLoginPassword] = useState("••••••••");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account/dashboard");
  };

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
                  <span className="breadcrumb__item-link">Account Login</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">Login &amp; Register</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row">
          {/* Login Card */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <div className="card" style={{ padding: 36, border: "1px solid #ebebeb", borderRadius: 4, height: "100%" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Existing Customer Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6c757d", margin: 0, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: "#0081c9" }} />
                    <span>Remember Me</span>
                  </label>
                  <a href="#" style={{ fontSize: 13, color: "#0081c9" }}>
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{
                    width: "100%",
                    height: 46,
                    fontSize: 15,
                    fontWeight: 700,
                    backgroundColor: "#0081c9",
                    borderColor: "#0081c9",
                  }}
                >
                  Log In to Account
                </button>
              </form>
            </div>
          </div>

          {/* Register Card */}
          <div className="col-12 col-md-6">
            <div className="card" style={{ padding: 36, border: "1px solid #ebebeb", borderRadius: 4, height: "100%" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Create Fleet Account</h3>
              <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 20 }}>
                Registering gives you access to quick garage fitment, order history tracking, and wholesale fleet discounts.
              </p>
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{
                    width: "100%",
                    height: 46,
                    fontSize: 15,
                    fontWeight: 700,
                    backgroundColor: "#0081c9",
                    borderColor: "#0081c9",
                  }}
                >
                  Register Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
