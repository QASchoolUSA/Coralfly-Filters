import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
    return (
        <div className="container px-4 py-16 md:py-24 max-w-4xl mx-auto">
            <div className="space-y-4 mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                    <p>
                        Lynx Trucking LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, order our products, including Coralfly Filters, or use our services.
                    </p>
                    <p>
                        Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                    </p>
                </CardContent>
            </Card>

            <div className="mt-8 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                                <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Use of Your Information</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Create and manage your account.</li>
                                <li>Process your orders and deliver products.</li>
                                <li>Email you regarding your account or order.</li>
                                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                                <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                                <li>Increase the efficiency and operation of the Site.</li>
                                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                                <li>Notify you of updates to the Site.</li>
                                <li>Offer new products, services, and/or recommendations to you.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Disclosure of Your Information</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Security of Your Information</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p>
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p>
                                If you have questions or comments about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4">
                                <p className="font-semibold">Lynx Trucking LLC</p>
                                <p>123 Logistics Way</p>
                                <p>Transportation City, TC 98765</p>
                                <p>Email: support@lynxtrucking.com</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
