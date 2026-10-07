"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-[#0b1e2d] text-white sm:min-h-[85vh]">
      <Image
        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-45"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#06131f]/95 via-[#0b1e2d]/78 to-[#0081c9]/30"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:min-h-[85vh] sm:px-6 sm:pb-18 lg:px-8 lg:pb-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <Image
            src="/brand/logo-full.png"
            alt="CORALFLY — Reliable Filter Reliable service"
            width={440}
            height={134}
            priority
            className="mb-6 h-auto w-full max-w-[260px] brightness-0 invert sm:max-w-[360px] lg:max-w-[400px]"
          />
          <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-brand">
            Online store · Secure Stripe checkout
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] sm:text-5xl lg:text-6xl">
            Buy filters. Ship fast. Keep running.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Oil, air, fuel, cabin, and hydraulic filters ready to order — clear
            pricing, in-stock SKUs, and checkout that takes seconds.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-brand px-8 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark"
            >
              Shop all filters
            </Link>
            <Link
              href="/shop?category=Oil%20Filters"
              className="inline-flex h-12 items-center justify-center border border-white/45 px-8 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Shop oil filters
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/70 sm:text-sm">
            Free shipping $75+ · In stock · Same-day processing
          </p>
        </motion.div>
      </div>
    </section>
  );
}
