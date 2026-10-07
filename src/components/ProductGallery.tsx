"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/sanity/types";

type Props = {
  images: ProductImage[];
  productName: string;
  featured?: boolean;
};

export function ProductGallery({ images, productName, featured }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center border border-border bg-surface font-display text-xs uppercase tracking-[0.16em] text-muted">
        No image
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden border border-border bg-surface">
        {featured ? (
          <span className="absolute left-4 top-4 z-10 bg-brand px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-white">
            Best seller
          </span>
        ) : null}
        {current ? (
          <Image
            src={current.url}
            alt={current.alt || productName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden border bg-surface transition-colors ${
                index === active
                  ? "border-brand ring-1 ring-brand"
                  : "border-border hover:border-brand/60"
              }`}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === active}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
