"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileTabBar } from "@/components/MobileTabBar";
import { PromoBar } from "@/components/PromoBar";

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PromoBar />
      <Suspense fallback={<div className="navbar" aria-hidden="true"><div className="navbar-container" /></div>}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <Suspense fallback={<div className="mobile-tab-bar" aria-hidden="true" />}>
        <MobileTabBar />
      </Suspense>
    </>
  );
}
