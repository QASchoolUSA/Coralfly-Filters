import Link from "next/link"
import { Metadata } from "next"
import { Search, ArrowRight, ShieldCheck, Truck, Clock, Droplet, Flame, Wind, Fan, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { HeroVideo } from "@/components/HeroVideo"

export const metadata: Metadata = {
  title: 'Lynx Trucking & Parts - Premium Semi Truck Filters',
  description: 'Your trusted source for premium semi truck filters. Shop Oil, Fuel, Air, Cabin, and Water Separators. Fast shipping and exact fit guarantee.',
  alternates: {
    canonical: 'https://lynxandparts.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lynx Trucking & Parts',
  url: 'https://lynxandparts.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://lynxandparts.com/shop?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative bg-muted/40 py-8 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 order-last lg:order-none">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Premium Filters for <span className="text-primary">Maximum Performance</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Find the perfect Oil, Fuel, and Air filters for your vehicle. Professional grade quality, direct to your door.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <form action="/shop" className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="search" name="search" placeholder="Enter Part Number..." className="flex-1 bg-background h-12" />
                  <Button type="submit" size="lg" className="h-12 px-8">Search</Button>
                </form>
              </div>
              <p className="text-xs text-muted-foreground">
                Popular: <Link href="/shop?search=CF-123" className="underline hover:text-primary">CF-123</Link>, <Link href="/shop?search=Oil" className="underline hover:text-primary">Oil Filters</Link>
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-background border-y">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">OEM-grade materials designed for longevity.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm">Same-day shipping on orders before 2PM.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Exact Fit Guarantee</h3>
              <p className="text-muted-foreground text-sm">Verify your part number for a perfect fit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container px-4 md:px-6 space-y-8 mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
              <p className="text-muted-foreground mt-2">Browse our complete inventory.</p>
            </div>
            <Link href="/shop">
              <Button variant="outline">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Oil Filters', slug: 'oil-filter', icon: Droplet },
              { name: 'Fuel Filters', slug: 'fuel-filter', icon: Flame },
              { name: 'Air Filters', slug: 'air-filter', icon: Wind },
              { name: 'Cabin Filters', slug: 'cabin-air-filter', icon: Fan },
              { name: 'Water Separators', slug: 'fuel-water-separator', icon: Filter },
            ].map((cat) => (
              <Link key={cat.slug} href={`/shop?type=${cat.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 h-full text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <cat.icon className="h-8 w-8" />
                    </div>
                    <span className="font-semibold">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 space-y-8 mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Shop by Vehicle</h2>
              <p className="text-muted-foreground mt-2">Find parts specifically for your truck.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Volvo', slug: 'volvo', icon: Truck },
              { name: 'Freightliner', slug: 'freightliner', icon: Truck },
              { name: 'Kenworth', slug: 'kenworth', icon: Truck },
            ].map((veh) => (
              <Link key={veh.slug} href={`/shop?vehicle=${veh.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/50">
                  <CardContent className="p-8 flex flex-col items-center justify-center space-y-4 h-full text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <veh.icon className="h-10 w-10" />
                    </div>
                    <span className="font-bold text-lg">{veh.name} Parts</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
