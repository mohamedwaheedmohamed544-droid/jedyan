# JEDYAN Logistics — Website

Arabic-first (RTL) corporate website for **جديان للخدمات اللوجستية — JEDYAN Logistics**, with a full English (LTR) version.
Built with **Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules** — no animation or UI libraries.

## Run

```bash
npm install
npm run dev        # http://localhost:3000   (Arabic at /, English at /en/)
npm run build      # static export → ./out (deploy to any static host / CDN)
```

Optional: set `NEXT_PUBLIC_LEAD_ENDPOINT` to a CRM / form-service URL; the diagnostic form will POST JSON there.
Without it the form composes a structured email to `info@jedyan.sa`.

## Structure

```
app/(ar)/…            Arabic routes   (html lang="ar" dir="rtl")
app/(en)/en/…         English routes  (html lang="en" dir="ltr")
app/sitemap.ts, robots.ts, icon.svg
content/site.ts       ALL copy (bilingual) — single source of truth, sourced from Company Profile 2026 + Brand Blueprint V6
components/layout     Header (sticky, hide-on-scroll, progress, mobile sheet), Footer, Shell
components/home       Hero (canvas flow), OperatingLayer, CommerceJourney (scroll-driven), CommerceCycle,
                      WhyExists (untangle), SolutionsRail (pinned horizontal), Audience, HowWeWork, Visibility, WhyJedyan, Closing
components/solutions  Visuals per service (bin map, fulfillment line, event map, carrier network, returns flow, control layer), Glyphs
components/contact    DiagnosticForm (5-step progressive diagnosis)
components/pages      Page compositions shared by both locales
lib/                  hooks (in-view, sticky progress, reduced motion), SEO helpers, UI strings
styles/globals.css    Design tokens, type scale, reveal system, buttons
```

## Pages
`/` · `/about` · `/solutions` · `/solutions/{warehousing-inventory|fulfillment|commerce-connect|distribution-carrier-management|returns-value-added-services|enterprise-managed-logistics}` · `/how-we-work` · `/sectors` · `/why-jedyan` · `/vision` · `/contact` — each mirrored under `/en/`.

## Before launch (content owners)
- **Fonts:** IBM Plex Sans Arabic stands in for the licensed brand face *FF Shamel Family*. Add the licensed woff2 files and swap `--font-ar` in `styles/globals.css`.
- **Photography:** the brand files contain no photography, and no stock imagery was used. The design runs on brand-derived motion graphics. If Jedyan commissions real operations photography (warehouse, packing, team), add AVIF/WebP to `/public/media` — the About and solution pages have natural slots after the problem/role blocks.
- **Vision / mission / values** (`/vision`) come from Brand Blueprint V6 and need executive sign-off before publishing.
- **Dashboard & ticket figures** are illustrative and labelled as such on-page.
- **Integrations** are worded as "scoped per account" (Blueprint rule) — no named platform connectors are claimed.
- **KPIs** list the metrics only; target values stay inside each SLA (Blueprint marks them as internal design targets).
- **LinkedIn / address:** not in the source files — add to `content/site.ts → company` when confirmed.
