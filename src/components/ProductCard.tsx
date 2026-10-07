"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const image = product.images[0];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-xs uppercase tracking-[0.16em] text-muted">
              No image
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1.5">
          {product.category ? (
            <p className="font-display text-[11px] uppercase tracking-[0.16em] text-brand">
              {product.category}
            </p>
          ) : null}
          <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-brand">
            {product.name}
          </h3>
          <p className="text-sm text-muted">{formatPrice(product.price, product.currency)}</p>
        </div>
      </Link>
    </motion.article>
  );
}
