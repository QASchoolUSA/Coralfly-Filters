import Link from "next/link";

export default function NotFound() {
  return <section className="section"><div className="container status-page"><div className="status-page__icon">404</div><p className="section-label">CORALFLY</p><h1 className="status-page__title">Page Not Found</h1><p className="status-page__copy">The page you requested is not available in the CORALFLY catalog.</p><Link href="/shop" className="btn btn-primary btn-lg">Browse Filters</Link></div></section>;
}
