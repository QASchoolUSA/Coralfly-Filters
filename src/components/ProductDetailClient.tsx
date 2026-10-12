"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useCartStore } from "@/lib/cart-store";
import { slugifyCatalogName } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";
import { ProductGrid } from "@/components/ProductGrid";

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const image = product.images[activeImage] ?? product.images[0];
  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") setActiveImage((current) => (current + 1) % product.images.length);
      if (event.key === "ArrowLeft") setActiveImage((current) => (current - 1 + product.images.length) % product.images.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [lightboxOpen, product.images.length, closeLightbox]);

  function addToCart() {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
    openCart();
  }

  return <>
    <section className="section product-page-section">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><ol className="breadcrumbs__list">
          <li className="breadcrumbs__item"><Link href="/" className="breadcrumbs__link">Home</Link><span className="breadcrumbs__sep">/</span></li>
          <li className="breadcrumbs__item"><Link href="/shop" className="breadcrumbs__link">Shop</Link><span className="breadcrumbs__sep">/</span></li>
          {product.category ? <li className="breadcrumbs__item"><Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="breadcrumbs__link">{product.category}</Link><span className="breadcrumbs__sep">/</span></li> : null}
          <li className="breadcrumbs__item"><span className="breadcrumbs__current" aria-current="page">{product.name}</span></li>
        </ol></nav>

        <div className="product-detail">
          <div className="product-detail-images">
            <div className="product-detail-main-image" role={image ? "button" : undefined} tabIndex={image ? 0 : undefined} onClick={() => image && setLightboxOpen(true)} onKeyDown={(event) => { if (image && (event.key === "Enter" || event.key === " ")) setLightboxOpen(true); }}>
              {product.featured ? <span className="product-card-badge">Featured</span> : null}
              {image ? <Image src={image.url} alt={image.alt || product.name} fill priority sizes="(max-width: 480px) min(320px, calc(100vw - 32px)), (max-width: 960px) min(420px, calc(100vw - 40px)), min(560px, 42vw)" /> : <FilterGlyph />}
              {image ? <span className="lightbox-zoom-hint" aria-hidden="true"><ZoomIcon /></span> : null}
            </div>
            {product.images.length > 1 ? <div className="product-detail-thumbs" role="group" aria-label="Product images">{product.images.map((item, index) => <button key={`${item.url}-${index}`} type="button" className={`product-detail-thumb${activeImage === index ? " active" : ""}`} onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}`} aria-pressed={activeImage === index}><Image src={item.url} alt={item.alt || `${product.name} image ${index + 1}`} width={100} height={100} /></button>)}</div> : null}
          </div>

          <div className="product-detail-info">
            {product.category ? <p className="product-detail-category">{product.category}</p> : null}
            <h1 className="product-detail-name">{product.name}</h1>
            {product.sku ? <p className="product-detail-part">Part Number: {product.sku}</p> : null}
            <div className="product-price-stock-row">
              <div className="product-detail-price-block">
                <div className="product-detail-stock"><span className={`stock-indicator ${product.inStock === false ? "stock-out" : product.inStock === true ? "stock-in" : "stock-unknown"}`} />{product.inStock === false ? "Out of stock" : product.inStock === true ? "In stock" : "Availability confirmed at checkout"}</div>
                <div className="product-detail-pricing"><span className="product-detail-price">{formatPrice(product.price, product.currency)}</span>{discount > 0 && product.compareAtPrice ? <><span className="product-detail-compare">{formatPrice(product.compareAtPrice, product.currency)}</span><span className="product-detail-save">Save {discount}%</span></> : null}</div>
              </div>
            </div>
            {product.compatibleMakes?.length || product.fitmentDetails?.length ? <div className="product-fitment">
              <h2>Truck fitment</h2>
              {product.compatibleMakes?.length ? <div className="compatibility-tags">{product.compatibleMakes.map((make) => <Link className="compat-tag" key={make} href={`/trucks/${slugifyCatalogName(make)}`}>{make}</Link>)}</div> : null}
              {product.fitmentDetails?.length ? <div className="product-fitment-details">{product.fitmentDetails.map((fitment, index) => <div className="product-fitment-detail" key={`${fitment.brand}-${index}`}>
                <h3><Link href={`/trucks/${slugifyCatalogName(fitment.brand)}`}>{fitment.brand}</Link></h3>
                {fitment.models?.length ? <p><strong>Models:</strong> {fitment.models.join(", ")}</p> : null}
                {fitment.engines?.length ? <p><strong>Engines:</strong> {fitment.engines.join(", ")}</p> : null}
                {fitment.notes ? <p>{fitment.notes}</p> : null}
              </div>)}</div> : null}
            </div> : null}
            <div className="quantity-selector" aria-label="Quantity selector"><button className="quantity-btn" type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><output className="quantity-value">{quantity}</output><button className="quantity-btn" type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button></div>
            <div className="product-purchase-actions"><button type="button" className="btn btn-primary btn-lg" onClick={addToCart} disabled={product.inStock === false}>{product.inStock === false ? "Out of Stock" : added ? "Added to Cart ✓" : "Add to Cart"}</button><Link href="/cart" className="btn btn-outline btn-lg">View Cart</Link></div>
            <div className="product-purchase-assurances"><span><CheckIcon /> Secure Stripe checkout</span><span><CheckIcon /> Free shipping on orders $75+</span><span><CheckIcon /> Need help? <Link href="/contact">Contact us</Link></span></div>

            <div className="product-accordions-group">
              {product.description ? <Accordion title="Description"><p>{product.description}</p></Accordion> : null}
              {product.details ? <Accordion title="Additional Details"><p>{product.details}</p></Accordion> : null}
              {product.specs?.length ? <Accordion title="Specifications"><table className="specs-table"><tbody>{product.specs.map((spec) => <tr key={`${spec.label}-${spec.value}`}><th scope="row">{spec.label}</th><td>{spec.value}</td></tr>)}</tbody></table></Accordion> : null}
              {product.crossReferences?.length ? <Accordion title="Cross References"><p className="cross-ref-intro">Compare the listed reference numbers with the part you are replacing before ordering.</p><div className="compatibility-tags">{product.crossReferences.map((reference) => <span className="compat-tag" key={reference}>{reference}</span>)}</div></Accordion> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
    {related.length ? <section className="section product-detail-related"><div className="container"><div className="section-header"><span className="section-label">Keep browsing</span><h2 className="section-title">Related Products</h2></div><ProductGrid products={related} /></div></section> : null}
    {lightboxOpen && image ? <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={`${product.name} image viewer`} onClick={closeLightbox}><button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close image viewer"><CloseIcon /></button><p className="lightbox-counter">{activeImage + 1} / {product.images.length}</p>{product.images.length > 1 ? <button type="button" className="lightbox-arrow lightbox-arrow--prev" onClick={(event) => { event.stopPropagation(); setActiveImage((current) => (current - 1 + product.images.length) % product.images.length); }} aria-label="Previous image">‹</button> : null}<Image src={image.url} alt={image.alt || product.name} width={1400} height={1400} className="lightbox-image" onClick={(event) => event.stopPropagation()} />{product.images.length > 1 ? <button type="button" className="lightbox-arrow lightbox-arrow--next" onClick={(event) => { event.stopPropagation(); setActiveImage((current) => (current + 1) % product.images.length); }} aria-label="Next image">›</button> : null}</div> : null}
  </>;
}

function Accordion({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  return <details className="product-accordion" open={open}><summary className="product-accordion-summary">{title}<span className="accordion-icon"><ChevronIcon /></span></summary><div className="accordion-content">{children}</div></details>;
}

function FilterGlyph() { return <svg width="72" height="72" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="16" y="10" width="32" height="44" rx="5" /><path d="M21 19h22M21 25h22M21 31h22M21 37h22M21 43h22" opacity=".55" /></svg>; }
function CheckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>; }
function ZoomIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5M10.8 7.8v6M7.8 10.8h6" /></svg>; }
function CloseIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg>; }
function ChevronIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>; }
