import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto py-10 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative h-10 w-48">
                                <Image
                                    src="/lynxandparts-logo.svg"
                                    alt="Lynx Trucking & Parts"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Professional Grade Filters for your vehicle. Oil, Fuel, Air, and more.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop?type=oil-filter">Oil Filters</Link></li>
                            <li><Link href="/shop?type=fuel-filter">Fuel Filters</Link></li>
                            <li><Link href="/shop?type=air-filter">Air Filters</Link></li>
                            <li><Link href="/shop?type=cabin-air-filter">Cabin Filters</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Customer Service</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/terms-conditions#return-policy">Return Policy</Link></li>
                            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-3">Subscribe for updates and offers.</p>
                        {/* Form placeholder */}
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Lynx Trucking & Parts. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
