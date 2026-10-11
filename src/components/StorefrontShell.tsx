"use client";

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
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <MobileTabBar />
    </>
  );
}
