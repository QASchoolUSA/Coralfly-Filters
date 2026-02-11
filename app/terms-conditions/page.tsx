import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsConditionsPage() {
    return (
        <div className="container px-4 py-16 md:py-24 max-w-4xl mx-auto">
            <div className="space-y-4 mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Terms and Conditions</h1>
                <p className="text-lg text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Agreement to Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Lynx Trucking LLC ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                    </p>
                    <p className="mt-4">
                        You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                    </p>
                </CardContent>
            </Card>

            <div className="mt-8 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
                    <Card>
                        <CardContent className="pt-6 text-sm md:text-base">
                            <p>
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">User Representations</h2>
                    <Card>
                        <CardContent className="pt-6 text-sm md:text-base">
                            <p>By using the Site, you represent and warrant that:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                                <li>You are not a minor in the jurisdiction in which you reside.</li>
                                <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
                                <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                                <li>Your use of the Site will not violate any applicable law or regulation.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Products</h2>
                    <Card>
                        <CardContent className="pt-6 text-sm md:text-base">
                            <p>
                                We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
                            </p>
                            <p className="mt-4">
                                All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Purchases and Payment</h2>
                    <Card>
                        <CardContent className="pt-6 text-sm md:text-base">
                            <p>
                                We accept the following forms of payment: Visa, Mastercard, American Express, Discover, and PayPal. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                            </p>
                            <p className="mt-4">
                                Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section id="return-policy">
                    <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
                    <Card className="border-primary/50">
                        <CardHeader>
                            <CardTitle className="text-primary">Returns and Refunds</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 text-sm md:text-base space-y-4">
                            <p>
                                We want you to be completely satisfied with your purchase. If you are not satisfied with your purchase for any reason, you may return it to us for a full refund or an exchange. Please see below for more information on our return policy.
                            </p>

                            <h3 className="font-semibold text-lg">Returns</h3>
                            <p>
                                All returns must be postmarked within thirty (30) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
                            </p>

                            <h3 className="font-semibold text-lg">Return Process</h3>
                            <p>
                                To return an item, please email customer service at support@lynxtrucking.com to obtain a Return Merchandise Authorization (RMA) number. After receiving a RMA number, place the item securely in its original packaging and mail your return to the following address:
                            </p>
                            <address className="not-italic bg-muted p-4 rounded-md">
                                Lynx Trucking LLC<br />
                                Attn: Returns<br />
                                RMA #<br />
                                123 Logistics Way<br />
                                Transportation City, TC 98765
                            </address>
                            <p>
                                Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return.
                            </p>

                            <h3 className="font-semibold text-lg">Refunds</h3>
                            <p>
                                After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow at least seven (7) days from the receipt of your item to process your return or exchange. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.
                            </p>

                            <h3 className="font-semibold text-lg">Exceptions</h3>
                            <p>
                                For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p>
                                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                            </p>
                            <div className="mt-4">
                                <p className="font-semibold">Lynx Trucking LLC</p>
                                <p>123 Logistics Way</p>
                                <p>Transportation City, TC 98765</p>
                                <p>Email: support@lynxtrucking.com</p>
                                <p>Phone: +1 (555) 123-4567</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
