import { NextResponse } from "next/server";
import Stripe from "stripe";
import { toStripeUnitAmount } from "@/lib/format";
import type { CartItem } from "@/sanity/types";

type CheckoutBody = {
  items?: CartItem[];
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment.",
      },
      { status: 500 },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = body.items ?? [];
  if (!items.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  for (const item of items) {
    if (
      !item?.id ||
      !item.name ||
      typeof item.price !== "number" ||
      item.price <= 0 ||
      !item.quantity ||
      item.quantity < 1
    ) {
      return NextResponse.json(
        { error: "One or more cart items are invalid" },
        { status: 400 },
      );
    }
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: (item.currency || "usd").toLowerCase(),
          unit_amount: toStripeUnitAmount(item.price),
          product_data: {
            name: item.name,
            description: item.sku ? `SKU: ${item.sku}` : undefined,
            images: item.image ? [item.image] : undefined,
            metadata: {
              sanity_id: item.id,
              sku: item.sku || "",
            },
          },
        },
      })),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: {
        source: "coralfly-storefront",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create Stripe checkout session",
      },
      { status: 500 },
    );
  }
}
