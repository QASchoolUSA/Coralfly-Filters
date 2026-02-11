import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { cn } from '@/lib/utils'
import { CartProvider } from '@/components/CartProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://lynxandparts.com'),
  title: {
    default: 'Lynx Trucking & Parts - Premium Semi Truck Filters',
    template: '%s | Lynx Trucking & Parts'
  },
  description: 'Shop premium Oil Filters, Fuel Filters, Air Filters, Cabin Filters, and Water Separators for semi trucks. Professional grade quality, direct to your door.',
  keywords: ['semi truck filters', 'oil filters', 'fuel filters', 'air filters', 'heavy duty filters', 'truck parts', 'Coralfly', 'Lynx Trucking'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lynxandparts.com',
    title: 'Lynx Trucking & Parts - Premium Semi Truck Filters',
    description: 'Shop premium Oil Filters, Fuel Filters, Air Filters, and more for your semi truck.',
    siteName: 'Lynx Trucking & Parts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lynx Trucking & Parts - Premium Semi Truck Filters',
    description: 'Shop premium Oil Filters, Fuel Filters, Air Filters, and more for your semi truck.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <CartProvider>
          <Header />
          <main className="min-h-[calc(100vh-theme(spacing.16))]">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
