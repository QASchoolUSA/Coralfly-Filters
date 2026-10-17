import Link from "next/link";

export default function NotFound() {
  return (
    <div className="block not-found">
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <h1 style={{ fontSize: 110, fontWeight: 900, color: "#0081c9", lineHeight: 1, marginBottom: 12 }}>
            404
          </h1>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Oops! Page Not Found</h2>
          <p style={{ color: "#6c757d", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We can&apos;t seem to find the filter or page you are looking for. It might have been moved or removed from our catalog.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Link
              href="/"
              className="btn btn-secondary"
              style={{ padding: "12px 28px" }}
            >
              Go to Homepage
            </Link>
            <Link
              href="/shop"
              className="btn btn-primary"
              style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 28px", fontWeight: 700 }}
            >
              Browse All Filters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
