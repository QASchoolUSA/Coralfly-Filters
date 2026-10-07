import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CORALFLY for filter matching, fleet orders, and support.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
      <div>
        <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
          Contact
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
          Need a match?
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Tell us the application, equipment, or current filter number. Our team
          will help you find the right CORALFLY product.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.14em] text-foreground">
              Email
            </dt>
            <dd className="mt-1 text-muted">sales@coralfly.com</dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.14em] text-foreground">
              Hours
            </dt>
            <dd className="mt-1 text-muted">Mon–Fri, 8:00–17:00</dd>
          </div>
        </dl>
      </div>

      <div className="border border-border bg-white p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
