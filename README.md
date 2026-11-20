# Big Ideas Inc — Professional Studio Solutions

> A high-end e-commerce platform for professional musical instruments and studio equipment — built for musicians, producers, and audio engineers who need reliable gear, fast checkout, and expert advice.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 🎸 The Idea

**Big Ideas Inc** is a professional audio equipment storefront designed around the real workflow of studio musicians and engineers. Rather than a generic marketplace, it focuses on high-end, curated gear — from Fender and Moog instruments to Neumann studio monitors — with a shopping experience built for pros:

- **Browse by category & subcategory** (Guitars & Bass, Synthesizers, Studio & Recording, Drums & Percussion, Keys & Pianos) with brand and price filtering.
- **Product detail pages** with specs, ratings, reviews, availability status, and add-to-cart.
- **Shopping cart & wishlist** persisted per user via Supabase Auth.
- **Checkout & order history** with shipping/billing addresses and payment method tracking.
- **User dashboard** for managing orders and account details.
- **Expert consultation booking** — real engineers and producers available to advise on gear choices.
- **Dark mode** and fully responsive UI built with Tailwind CSS v4 and the Manrope typeface.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Server Components, Turbopack) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (~5.8) |
| Backend / Database | Supabase (PostgreSQL, Auth, Row Level Security) |
| Deployment | Vercel |
| Fonts | Manrope, Material Symbols Outlined |
| State | React Context (cart), custom data hooks (`useData`) |

## ✨ Key Features

- **Server-side rendered catalog** with `generateStaticParams()` for category pages and 5-minute revalidation (`revalidate = 300`).
- **In-memory query caching** (5-minute TTL, pattern-based invalidation) to cut redundant database calls.
- **Optimized Supabase queries** — selective field fetching instead of `select('*')`, reducing transfer by ~50–60%.
- **Database indexes** including `pg_trgm` trigram search and composite indexes for common filter/sort patterns.
- **Row Level Security (RLS)** policies so users only access their own cart, wishlist, and orders.
- **Client/server split:** server components fetch data; client components (`HomeClientSection`, `Header`) handle interactivity (add to cart, search suggestions).
- **Authentication flows:** signup, login, password reset/update via Supabase Auth + Next.js middleware session handling.
- **Newsletter subscription** with public RLS insert policy.
- **Next.js metadata API** for SEO on pages.

## 🧩 Problems Faced During Development

Building a production-like e-commerce surface on Next.js 16 / Supabase surfaced several real-world issues:

### 1. Import path & module resolution
The subcategory page (`app/catalog/[category]/[subcategory]/page.tsx`) originally imported `constants.tsx` and `CartContext` with too many `../` segments. Fixed by correcting relative paths and adding `baseUrl` / `paths` (`@/*`) to `tsconfig.json` for clean, maintainable imports.

### 2. Missing ESLint config
The project had no `.eslintrc.json`, so `next lint` failed. Added the Next.js recommended `core-web-vitals` config.

### 3. Tailwind CSS v4 + PostCSS build errors
Tailwind v4's PostCSS setup needed correct `postcss.config.js` and `tailwind.config.js`. Build now exits with code 0.

### 4. Client-side rendering delays
Early pages were `"use client"` and fetched data on the browser, causing waterfalls and slow initial loads. Migrated catalog and home pages to **Server Components** with server-side data fetching.

### 5. Over-fetching data
Queries used `select('*')` and joined full relation trees (`product:products(*)`), bloating payloads. Rewrote to select only fields the UI actually needs.

### 6. Unindexed search & filtering
Full-table scans on product name/brand searches and category filters were slow on larger datasets.

### 7. Hydration & minor UX rough edges
A `data-jetski-tab-id` hydration mismatch warning appeared in the console (environment artifact), and `favicon.ico` returned 404 in development. Product mock data lacked subcategory fields, limiting filter granularity.

## 📚 Things Learned

- **Next.js App Router:** When to use Server Components vs. Client Components, and how to keep data fetching on the server while isolating interactivity (e.g., "add to cart") into small client islands.
- **Caching strategy:** Layered caching — in-memory 5-minute TTL cache with `clearCache()` pattern invalidation, plus Next.js `revalidate` and `generateStaticParams()` for near-instant cached page loads.
- **Supabase at scale:** Designing a relational e-commerce schema (categories → subcategories → products → cart/orders/items), writing Row Level Security policies, and separating server-side vs. browser Supabase clients.
- **Database performance:** `pg_trgm` trigram indexes for fuzzy text search, composite indexes for `(category_id, created_at)` and `(featured, created_at)`, and selective `.select()` to reduce transfer by ~50–60%.
- **Turbopack & Next.js 16:** Configuring Turbopack dev/build and managing environment variables (`NEXT_PUBLIC_*` vs server-side only).
- **TypeScript path aliases:** Setting up `@/*` imports in `tsconfig.json` to avoid deep relative paths.
- **Production deployment:** Vercel environment variable setup, Supabase schema seeding, and post-deployment smoke testing (auth, catalog, cart, checkout).

## 🚀 Performance Results

| Metric | Before | After |
|--------|--------|-------|
| Initial page load | Every load hit the database | Cached pages serve instantly |
| Database query time | Full table scans | Indexed queries 70–90% faster |
| Data transfer | `select('*')` full rows | Selective fields, ~50–60% smaller |
| Subsequent loads | Fresh fetch every time | 95%+ faster from cache |


## 🏁 Quick Start

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

### 1. Clone & install
```bash
git clone https://github.com/jailbreak-0/big-ideas-inc.git
cd big-ideas-inc
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Initialize the database
In your Supabase SQL Editor, run:
1. `lib/supabase/schema.sql` — creates all tables and RLS policies
2. `lib/supabase/seed.sql` — populates categories, subcategories, and sample products
3. `lib/supabase/performance-indexes.sql` — adds search and filter indexes

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```

## 📂 Project Structure

```
big-ideas-inc/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page (server component)
│   ├── catalog/            # Product catalog & category pages
│   ├── cart/, checkout/    # Shopping cart & checkout
│   ├── dashboard/          # User dashboard & orders
│   ├── login/, signup/, ...# Auth pages
│   ├── layout.tsx          # Root layout + metadata
│   └── globals.css         # Global styles
├── components/             # React components (Header, Footer, HeroCarousel, etc.)
├── context/                # CartContext, ThemeContext
├── hooks/                  # useData, useAuth, useProducts, useCart, ...
├── lib/                    # Utilities & Supabase clients
│   └── supabase/           # queries.ts, client.ts, server.ts, schema.sql, seed.sql, ...
├── constants.tsx           # MOCK_PRODUCTS, MOCK_ORDERS
├── types.ts                # Product, CartItem, Order TypeScript interfaces
├── proxy.ts                # Next.js middleware proxy for Supabase session
├── next.config.mjs         # Next.js + Turbopack config
├── tailwind.config.js      # Tailwind v4 config (theme, fonts, colors)
├── .env.example            # Environment variable template
└── package.json
```

## 🚢 Deployment (Vercel)

1. Push the repository to GitHub.
2. In Vercel, **Add New Project → Import this repo**.
3. Add the environment variables from `.env.example` under **Project Settings → Environment Variables**.
4. Deploy. Build command `npm run build` is auto-detected.

See `VERCEL_DEPLOYMENT.md` for the full guide, including required vs. optional Supabase variables and troubleshooting build/runtime errors.

## 🗺️ Roadmap / Future Improvements

- Add a `subcategory` field to the `Product` type and mock data for better filtering.
- Expand `MOCK_PRODUCTS` to cover every subcategory.
- Add a `favicon.ico` and dynamic SEO metadata per page.
- React error boundaries and loading skeletons for data fetching.
- Pagination for large product lists.
- Next.js `<Image>` optimization for product galleries.
- Redis for distributed caching if scaling beyond a single server.
- Service worker for offline support.

## 🙋‍♂️ Author

**Big Ideas Inc** — Professional audio gear for studio professionals.  
Repository: [github.com/jailbreak-0/big-ideas-inc](https://github.com/jailbreak-0/big-ideas-inc)

---

*Built with Next.js 16, React 19, Tailwind CSS v4, TypeScript, Supabase, and deployed on Vercel.*

