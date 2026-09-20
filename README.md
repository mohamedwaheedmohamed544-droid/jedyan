# JEDYAN Logistics — Website + Dashboard

Arabic-first (RTL) corporate website for **جديان للخدمات اللوجستية — JEDYAN Logistics** with a full English (LTR) version,
and a built-in Arabic dashboard at **`/admin`** that controls the content, the pages and sections, the brand design, the media
library, the client requests inbox and the users.

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules · SQLite or Postgres** — no UI or animation libraries.

---

## 1. Run locally

```bash
cp .env.example .env      # set ADMIN_EMAIL / ADMIN_PASSWORD
npm install
npm run dev               # site: http://localhost:3000 — dashboard: http://localhost:3000/admin
```

The database, the schema and the default content are created automatically on first run
(SQLite file at `data/jedyan.db`, or Postgres if `DATABASE_URL` is set).

```bash
npm run build && npm start        # production
node scripts/reset-password.mjs info@jedyan.sa "new-password"
```

## 2. Deploy

The site needs a **Node runtime** (it renders from the database) — not static file hosting.

**A. Vercel / any serverless host → use Postgres**

1. Create a Postgres database (Vercel Postgres, Neon, Supabase…).
2. Set the env vars: `DATABASE_URL` (or the platform-provided `POSTGRES_URL` / `NETLIFY_DATABASE_URL`, both read automatically), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. Deploy the repo. The schema and default content are created on the first request.

**B. VPS (Hetzner, DigitalOcean, local server) → SQLite is enough**

```bash
npm ci && npm run build
ADMIN_EMAIL=info@jedyan.sa ADMIN_PASSWORD=... npm start   # behind nginx / pm2 / systemd
```
Keep the `data/` folder in your backups — it holds all content, media and leads.

> Uploaded media is stored **in the database** (not on disk), so it survives redeploys on both hosts.

## 3. Structure

```
app/(ar)/[[...slug]]        Arabic pages, rendered from the database   (html lang="ar" dir="rtl")
app/(en)/en/[[...slug]]     English pages                              (html lang="en" dir="ltr")
app/(admin)/admin/…         Dashboard (login, pages, content, media, brand, leads, settings, users)
app/api/leads               Public endpoint for the diagnosis form
app/api/media/[id]          Serves uploaded media
lib/db.ts                   Storage layer (SQLite ↔ Postgres)
lib/content.ts              Content model, cache, seeding, save/revision helpers
lib/blocks.ts               Section library + editable field definitions (what the dashboard renders)
lib/auth.ts                 Sessions, scrypt password hashing
components/blocks           Section components + the renderer that builds a page from its sections
components/home             The interactive sections (hero canvas, journey, cycle, dashboards…)
components/admin            Dashboard UI (page editor, collection editor, media, leads, brand…)
content/site.ts             Default content (seed source, from Company Profile 2026 + Brand Blueprint V6)
content/pages.ts            Default pages and their sections (seed source)
```

## 4. How content works

- **Pages** live in the database; each page is an ordered list of **sections**. The section library is in `lib/blocks.ts`
  (31 section types, each with its editable fields). Adding a new section type = one entry there + one component in
  `components/blocks` + one line in `components/blocks/Renderer.tsx`.
- **Shared collections** (solutions, sectors, segments, journey stages, values…) are single documents; every section that
  uses one reads the same data.
- Empty fields fall back to the original approved copy, so the site never renders blank.
- Saving calls `revalidateTag("content")` — changes are live immediately, and every save is written to a `revisions` table.

## 5. Before launch (content owners)

- **Fonts:** IBM Plex Sans Arabic stands in for the licensed **FF Shamel Family**. Add the licensed woff2 files, then pick the
  family in the dashboard (**الهوية والتصميم ← الخطوط**).
- **Photography:** no stock imagery was used; the design runs on brand-derived motion graphics. Upload real Jedyan operations
  photography in **مكتبة الصور** and place it with the “صورة مع نص” / “معرض صور” sections.
- **Vision / mission / values** need executive sign-off before publishing.
- **Dashboard & order-card figures** are illustrative and labelled as such on the page.
- **Integrations** are worded as “scoped per account” (Blueprint rule) — no named platform connectors are claimed.
- **KPIs** list metrics only; target values belong in each SLA.
- **LinkedIn / address** are empty until confirmed (dashboard → الإعدادات).

## 6. Security notes

- Change `ADMIN_PASSWORD` after the first login; sessions are httpOnly cookies valid for 30 days.
- `/admin` and `/api` are excluded from `robots.txt` and marked `noindex`.
- Uploads are limited to 4 MB and to image/MP4 types (fits Vercel and Netlify request caps).
- Put the site behind HTTPS in production (cookies are marked `secure` automatically).

Arabic guides: dashboard `docs/DASHBOARD-AR.md` · deployment (Vercel & Netlify) `docs/DEPLOY-AR.md` · Strategy & QA: `docs/STRATEGY-AND-QA.md`
