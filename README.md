# CORALFLY Filters

Professional ecommerce storefront for CORALFLY — Next.js App Router, Sanity CMS, and Stripe Hosted Checkout.

**Reliable Filter Reliable service**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Sanity (`next-sanity`) for product catalog
- Stripe Checkout Sessions (redirect to Stripe-hosted payment page)
- Motion (`motion/react`) for UI motion
- Zustand for cart persistence

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Sanity credentials, the shop runs on built-in fixture products so you can develop UI immediately.

## Environment variables

See [`.env.local.example`](.env.local.example):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (default `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version |
| `SANITY_API_TOKEN` | Optional read token for private datasets |
| `STRIPE_SECRET_KEY` | Server key for Checkout Sessions |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key (reserved for future client use) |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for Stripe return URLs |

## How checkout works

1. Customer adds products to the cart
2. Cart page calls `POST /api/checkout`
3. API creates a Stripe Checkout Session
4. Browser redirects to Stripe’s hosted page
5. Return to `/checkout/success` or `/checkout/cancel`

## Project structure

- `src/app` — routes (home, shop, product, cart, about, contact, checkout)
- `src/components` — UI shell, product cards, cart, checkout CTA
- `src/sanity` — client, GROQ, normalizers, fixtures
- `src/lib` — cart store, formatting helpers
- `public/brand` — CORALFLY logo assets

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
