"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickviewModal } from "@/components/QuickviewModal";
import { VehiclePickerModal } from "@/components/VehiclePickerModal";

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <div className="site">
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
