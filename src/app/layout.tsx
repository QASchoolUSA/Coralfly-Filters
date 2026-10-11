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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
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
