import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container px-4 py-16 md:py-24 max-w-5xl mx-auto">
      <div className="space-y-4 mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're here to help with any questions about our filters or your order. Reach out to us and we'll respond as soon as we can.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Contact Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Reach us directly through email, phone, or visit our office.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">support@lynxandparts.com</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (407) 885-3831</p>
                  <p className="text-xs text-muted-foreground mt-1">Mon-Fri from 8am to 5pm EST</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Office</h3>
                  <p className="text-sm text-muted-foreground">
                    Lynx Trucking LLC<br />
                    1660 Retreat View Cir<br />
                    Sanford, FL 32771
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Order #12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
