import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h1 className="text-3xl font-bold">Thank you for your order!</h1>
            <p className="text-muted-foreground">We have received your payment and will ship your filters shortly.</p>
            <Button asChild className="mt-4">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
