# Shopirrr Shop Creator 🌸

Bold & vibrant Shopify **Hydrogen + Oxygen** headless storefront for Beauty/Wellness.

## Stack
- **Hydrogen** — React Router 7
- **Oxygen** — Edge hosting (free on paid Shopify plans)
- **Tailwind CSS** — Custom brand design tokens
- **TypeScript** — Type-safe Storefront API queries

## Brand Colors
| Token | Hex |
|-------|-----|
| Pink (CTA) | `#FF2D78` |
| Violet (Accent) | `#7B2FFF` |
| Dark (BG) | `#0A0A0A` |
| Gold | `#F5C542` |

## Get Started
```bash
npm install
cp .env.example .env
npm run dev
```
Open http://localhost:3000 — uses Mock.shop out of the box ✅

## Connect Real Store
```bash
npx shopify hydrogen link
```

## Deploy to Oxygen
```bash
npx shopify hydrogen deploy
```

## Structure
```
app/
├── components/   — Layout, Hero, ProductCard, CartDrawer, AnnouncementBar
├── routes/       — _index, products.$handle, collections.$handle
├── lib/          — GraphQL fragments + utils
└── styles/       — Tailwind + brand CSS
```

## GitHub → Oxygen Auto-Deploy
Push to `main` → Oxygen builds at edge → Live ✅
