import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { cn } from '@/lib/utils'
import { CartProvider } from '@/components/CartProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'CoralFly - Premium Auto Filters',
  description: 'Shop premium Oil Filters, Fuel Filters, Air Filters, and more at CoralFly.',
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
