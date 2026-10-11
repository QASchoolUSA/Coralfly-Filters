import type { Metadata } from "next";
import { StorefrontShell } from "@/components/StorefrontShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CORALFLY | Reliable Filter Reliable service",
    template: "%s | CORALFLY",
  },
  description:
    "Buy CORALFLY filters online — oil, air, fuel, cabin, and hydraulic. In-stock SKUs, free shipping $75+, secure Stripe checkout.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="flex min-h-screen flex-col antialiased">
        <StorefrontShell>{children}</StorefrontShell>
      </body>
    </html>
  );
}
