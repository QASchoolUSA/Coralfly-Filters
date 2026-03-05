import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { getStripe } from "@/lib/stripe"
import { PurchaseTracker } from "@/components/PurchaseTracker"

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
    const { session_id } = await searchParams;
    let purchaseData = null;

    if (session_id) {
        try {
            const stripe = getStripe()
            const session = await stripe.checkout.sessions.retrieve(session_id)

            if (session.payment_status === 'paid' && session.metadata?.product_ids) {
                purchaseData = {
                    partNumbers: JSON.parse(session.metadata.product_ids) as string[],
                    value: (session.amount_total || 0) / 100, // format to dollars
                    currency: session.currency?.toUpperCase() || 'USD'
                }
            }
        } catch (error) {
            console.error("Error retrieving Stripe session inside success page:", error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            {purchaseData && (
                <PurchaseTracker
                    partNumbers={purchaseData.partNumbers}
                    value={purchaseData.value}
                    currency={purchaseData.currency}
                />
            )}
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h1 className="text-3xl font-bold">Thank you for your order!</h1>
            <p className="text-muted-foreground">We have received your payment and will ship your filters shortly.</p>
            <Button asChild className="mt-4">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
