"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickviewModal } from "@/components/QuickviewModal";
import { VehiclePickerModal } from "@/components/VehiclePickerModal";
import { ScrollToTop } from "@/components/ScrollToTop";

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>

      <Suspense fallback={<div style={{ height: 140, background: "#fff" }} />}>
        <Header />
      </Suspense>

      <div className="site__body">
        {children}
      </div>

      <Footer />
      <CartDrawer />
      <VehiclePickerModal />
      <QuickviewModal />
    </div>
  );
}
