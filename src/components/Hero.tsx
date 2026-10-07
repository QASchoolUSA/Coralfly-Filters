"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#0b1e2d] text-white sm:min-h-[92vh]">
      <Image
        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-45"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#06131f]/95 via-[#0b1e2d]/75 to-[#0081c9]/35"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:min-h-[92vh] sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <Image
            src="/brand/logo-full.png"
            alt="CORALFLY — Reliable Filter Reliable service"
            width={420}
            height={120}
            priority
            className="mb-8 h-auto w-full max-w-[280px] brightness-0 invert sm:max-w-[360px]"
          />
          <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] sm:text-5xl lg:text-6xl">
            Filtration you can trust under load
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Professional filters for engines, hydraulics, and industrial systems —
            engineered for reliability and backed by service that keeps fleets moving.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark"
            >
              Shop filters
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center border border-white/40 px-7 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
