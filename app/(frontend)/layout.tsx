import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartProvider } from '@/components/CartProvider'

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <Header />
            <main className="min-h-[calc(100vh-theme(spacing.16))]">
                {children}
            </main>
            <Footer />
        </CartProvider>
    )
}
