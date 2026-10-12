import Image from "next/image";
import Link from "next/link";
import type { ProductImage } from "@/sanity/types";

const desktopHeroImage = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80";

export function Hero({ featuredImage, featuredAlt }: { featuredImage?: ProductImage; featuredAlt?: string }) {
  return <section className="hero">
    <div className="hero-background-wrapper">
      <Image src={desktopHeroImage} alt="" className="hero-bg-image" width={1920} height={800} sizes="100vw" priority />
      <div className="hero-overlay" />
      <div className="hero-radial-glow" />
    </div>
    <div className="container hero-container">
      <div className="hero-split">
        <div className="hero-mobile-visual" aria-hidden={!featuredImage?.url}>
          <Image
            src={featuredImage?.url || desktopHeroImage}
            alt={featuredImage?.url ? featuredImage.alt || featuredAlt || "Featured truck filter" : ""}
            fill
            sizes="(max-width: 768px) calc(100vw - 32px), 1px"
            className="hero-mobile-visual__image"
          />
          <span className="hero-mobile-visual__label">Featured filter</span>
        </div>
        <div className="hero-content fade-in-up">
          <div className="hero-discount-wrapper"><span className="hero-discount">CORALFLY · Reliable Filter Reliable service</span></div>
          <h1 className="hero-heading">Premium Filters for Semi Trucks</h1>
          <p className="hero-subheading">OEM-quality filtration solutions to keep your fleet running at peak performance. Shop oil, air, fuel, cabin, and hydraulic filters with clear pricing and secure checkout.</p>
          <div className="hero-actions"><Link href="/shop" className="btn btn-primary btn-lg hero-cta-primary">Shop All Filters</Link></div>
          <div className="hero-trust-indicators">
            <div className="trust-item"><CheckIcon /><span className="trust-text">Free shipping on orders $75+</span></div>
            <div className="trust-item"><CheckIcon /><span className="trust-text">Secure Stripe checkout</span></div>
          </div>
        </div>
        <aside className="hero-promo-card" aria-label="Shipping offer">
          <div className="hero-promo-big-number">75<span>+</span></div>
          <div className="hero-promo-badge">CORALFLY Online Store</div>
          <h2 className="hero-promo-title">Free Shipping</h2>
          <p className="hero-promo-desc">Spend <strong>$75 or more</strong> and shipping is on us. No code required.</p>
          <div className="hero-promo-code-wrapper"><span className="hero-promo-code-label">Checkout, made simple</span><div className="hero-promo-code">SECURE PAY</div></div>
          <Link href="/shop" className="btn btn-primary hero-promo-cta">Shop Filters →</Link>
          <p className="hero-promo-fine">Same-day processing before 2pm</p>
        </aside>
      </div>
    </div>
  </section>;
}

function CheckIcon() {
  return <svg className="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>;
}
