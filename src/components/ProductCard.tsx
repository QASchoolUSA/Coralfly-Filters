"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";

export function ProductCard({ product, badge }: { product: Product; index?: number; badge?: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [added, setAdded] = useState(false);
  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const image = product.images[0];

  function addProduct(open = false) {
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
    if (open) openCart();
  }

  return (
    <article className="product-card">
      <div className="product-card-visual">
        <Link href={`/shop/${product.slug}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          {image ? <Image src={image.url} alt={image.alt || product.name} className="product-card-image" width={480} height={480} sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw" /> : <div className="product-card-placeholder"><FilterGlyph /></div>}
          {badge || product.featured ? <span className="product-card-badge">{badge || "Featured"}</span> : null}
          {discount > 0 ? <span className="product-card-badge product-card-badge-sale">-{discount}%</span> : null}
          {product.inStock === false ? <span className="product-card-badge product-card-badge-oos">Out of Stock</span> : null}
        </div>
        </Link>
        {product.inStock === false ? null : <div className="product-card-quick-add"><button className="product-card-quick-add-btn" type="button" onClick={() => addProduct(true)}><BagIcon />{added ? "Added ✓" : "Quick Add"}</button></div>}
      </div>
      <Link href={`/shop/${product.slug}`} className="product-card-link">
        <div className="product-card-info">
          {product.category ? <span className="product-card-category">{product.category}</span> : null}
          <h3 className="product-card-name">{product.name}</h3>
          {product.sku ? <span className="product-card-part">SKU {product.sku}</span> : null}
          {product.compatibleMakes?.length ? <span className="product-card-fitment">Fits: {product.compatibleMakes.join(", ")}</span> : null}
          <div className="product-card-pricing">
            <span className="product-card-price">{formatPrice(product.price, product.currency)}</span>
            {discount > 0 && product.compareAtPrice ? <span className="product-card-compare">{formatPrice(product.compareAtPrice, product.currency)}</span> : null}
          </div>
        </div>
      </Link>
      <button className="product-card-cart-btn" type="button" onClick={() => addProduct(true)} disabled={product.inStock === false}>{product.inStock === false ? "Out of Stock" : added ? "Added to Cart ✓" : "Add to Cart"}</button>
    </article>
  );
}

function FilterGlyph() {
  return <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="16" y="10" width="32" height="44" rx="5" /><path d="M21 19h22M21 25h22M21 31h22M21 37h22M21 43h22" opacity=".55" /><circle cx="32" cy="32" r="6" opacity=".4" /></svg>;
}

function BagIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}
