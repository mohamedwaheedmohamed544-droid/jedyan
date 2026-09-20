import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { initDb, query, exec, enc, dec, uid } from "./db";
import * as D from "@/content/site";
import { defaultPages } from "@/content/pages";
import type { T } from "@/content/types";

/* ============================ types ============================ */

export type Theme = {
  colors: { ink: string; ink2: string; graphite: string; steel: string; mist: string; paper: string; paper2: string; white: string; orange: string; orangeSoft: string; tint: string };
  fonts: { ar: string; en: string; serif: string; mono: string };
  scale: { h1: number; h2: number; h3: number; body: number; radius: number; maxWidth: number; sectionSpace: number };
  motion: { enabled: boolean; heroCanvas: boolean };
};

export type Settings = {
  company: { name: T; parent: T; country: T; email: string; phoneDisplay: string; phoneHref: string; web: string; instagram: string; x: string; linkedin: string; address: T };
  seo: { siteUrl: string; titleSuffix: T; defaultDescription: T; ogImage: string };
  integrations: { leadEmail: string; leadWebhook: string; headScripts: string };
  theme: Theme;
};

export type Section = { id: string; type: string; visible: boolean; props: Record<string, unknown> };
export type PageDoc = {
  id: string;
  slug: string;
  status: "published" | "draft";
  position: number;
  inNav: boolean;
  title: T;
  seo: { title: T; description: T };
  sections: Section[];
};

export type SiteContent = {
  settings: Settings;
  messages: typeof D.messages;
  whyExists: typeof D.whyExists;
  foundation: typeof D.foundation;
  diagnosis: typeof D.diagnosis;
  sectorRule: T;
  solutions: typeof D.solutions;
  segments: typeof D.segments;
  sectors: typeof D.sectors;
  cycle: typeof D.cycle;
  journey: typeof D.journey;
  operatingElements: typeof D.operatingElements;
  operatingLayers: typeof D.operatingLayers;
  clientJourney: typeof D.clientJourney;
  rhythm: typeof D.rhythm;
  scaleModes: typeof D.scaleModes;
  visibility: typeof D.visibility;
  reasons: typeof D.reasons;
};

/* ============================ defaults ============================ */

export const defaultTheme: Theme = {
  colors: { ink: "#232325", ink2: "#2b2b2d", graphite: "#4b4b4d", steel: "#8b8a8f", mist: "#c9c7c6", paper: "#f4f3f1", paper2: "#eae8e5", white: "#ffffff", orange: "#ff6e06", orangeSoft: "#ffa66b", tint: "#fff1e6" },
  fonts: { ar: "IBM Plex Sans Arabic", en: "IBM Plex Sans", serif: "EB Garamond", mono: "IBM Plex Mono" },
  scale: { h1: 4.75, h2: 3, h3: 1.625, body: 1.125, radius: 14, maxWidth: 1320, sectionSpace: 150 },
  motion: { enabled: true, heroCanvas: true },
};

export const defaultSettings: Settings = {
  company: {
    name: D.company.name,
    parent: D.company.parent,
    country: D.company.country,
    email: D.company.email,
    phoneDisplay: D.company.phoneDisplay,
    phoneHref: D.company.phoneHref,
    web: D.company.web,
    instagram: D.company.instagram,
    x: D.company.x,
    linkedin: "",
    address: { ar: "", en: "" },
  },
  seo: {
    siteUrl: D.SITE_URL,
    titleSuffix: { ar: "جديان للخدمات اللوجستية", en: "Jedyan Logistics" },
    defaultDescription: {
      ar: "جديان للخدمات اللوجستية: شريك منظومة تشغيل التجارة في السعودية — التخزين وتنفيذ الطلبات والتوزيع والمرتجعات تحت مسؤولية تشغيلية واحدة.",
      en: "Jedyan Logistics: a Saudi commerce operations partner — warehousing, fulfillment, distribution and returns under one operating accountability.",
    },
    ogImage: "/og.png",
  },
  integrations: { leadEmail: D.company.email, leadWebhook: "", headScripts: "" },
  theme: defaultTheme,
};

const docDefaults: Record<string, unknown> = {
  settings: defaultSettings,
  messages: D.messages,
  whyExists: D.whyExists,
  foundation: D.foundation,
  diagnosis: D.diagnosis,
  sectorRule: D.sectorRule,
  solutions: D.solutions,
  segments: D.segments,
  sectors: D.sectors,
  cycle: D.cycle,
  journey: D.journey,
  operatingElements: D.operatingElements,
  operatingLayers: D.operatingLayers,
  clientJourney: D.clientJourney,
  rhythm: D.rhythm,
  scaleModes: D.scaleModes,
  visibility: D.visibility,
  reasons: D.reasons,
};

export const DOC_KEYS = Object.keys(docDefaults);

/* ============================ seed ============================ */

let seedOnce: Promise<void> | null = null;

/** Runs once per process: creates the schema and seeds defaults when the tables are empty. */
export function seedIfEmpty() {
  seedOnce ||= doSeed();
  return seedOnce;
}

async function doSeed() {
  await initDb();
  const rows = await query<{ key: string }>("select key from documents");
  const have = new Set(rows.map((r) => r.key));
  for (const [key, value] of Object.entries(docDefaults)) {
    if (!have.has(key)) await exec("insert into documents (key, data) values (?, ?)", [key, enc(value)]);
  }
  const pages = await query<{ id: string }>("select id from pages");
  if (pages.length === 0) {
    for (const p of defaultPages) {
      await exec("insert into pages (id, slug, status, position, in_nav, data) values (?, ?, ?, ?, ?, ?)", [
        p.id, p.slug, p.status, p.position, p.inNav ? 1 : 0, enc({ title: p.title, seo: p.seo, sections: p.sections }),
      ]);
    }
  }
}

/* ============================ reads ============================ */

async function loadSite(): Promise<SiteContent> {
  const rows = await query<{ key: string; data: unknown }>("select key, data from documents");
  const out: Record<string, unknown> = { ...docDefaults };
  for (const r of rows) out[r.key] = dec(r.data, docDefaults[r.key]);
  // make sure new fields added in later versions still exist
  out.settings = { ...defaultSettings, ...(out.settings as object), theme: { ...defaultTheme, ...((out.settings as Settings)?.theme || {}) } };
  return out as unknown as SiteContent;
}

const cachedSite = unstable_cache(loadSite, ["site-content"], { tags: ["content"] });

export async function getSite(): Promise<SiteContent> {
  await seedIfEmpty();
  return cachedSite();
}

async function loadPages(): Promise<PageDoc[]> {
  const rows = await query<{ id: string; slug: string; status: string; position: number; in_nav: number | boolean; data: unknown }>(
    "select id, slug, status, position, in_nav, data from pages order by position asc"
  );
  return rows.map((r) => {
    const d = dec<{ title: T; seo: PageDoc["seo"]; sections: Section[] }>(r.data, { title: { ar: "", en: "" }, seo: { title: { ar: "", en: "" }, description: { ar: "", en: "" } }, sections: [] });
    return { id: r.id, slug: r.slug, status: r.status as PageDoc["status"], position: Number(r.position), inNav: !!r.in_nav, ...d };
  });
}

const cachedPages = unstable_cache(loadPages, ["site-pages"], { tags: ["content"] });

export async function getPages(): Promise<PageDoc[]> {
  await seedIfEmpty();
  return cachedPages();
}

export async function getPage(slug: string) {
  const pages = await getPages();
  return pages.find((p) => p.slug === slug) || null;
}

/* ============================ writes ============================ */

export async function saveDoc(key: string, data: unknown, author?: string) {
  await initDb();
  const existing = await query("select key from documents where key = ?", [key]);
  if (existing.length) await exec("update documents set data = ?, updated_at = current_timestamp where key = ?", [enc(data), key]);
  else await exec("insert into documents (key, data) values (?, ?)", [key, enc(data)]);
  await exec("insert into revisions (id, entity, entity_id, data, author) values (?, ?, ?, ?, ?)", [uid("rev_"), "document", key, enc(data), author || null]);
  revalidateTag("content");
}

export async function savePage(page: PageDoc, author?: string) {
  await initDb();
  const body = enc({ title: page.title, seo: page.seo, sections: page.sections });
  const existing = await query("select id from pages where id = ?", [page.id]);
  if (existing.length) {
    await exec("update pages set slug = ?, status = ?, position = ?, in_nav = ?, data = ?, updated_at = current_timestamp where id = ?", [page.slug, page.status, page.position, page.inNav ? 1 : 0, body, page.id]);
  } else {
    await exec("insert into pages (id, slug, status, position, in_nav, data) values (?, ?, ?, ?, ?, ?)", [page.id, page.slug, page.status, page.position, page.inNav ? 1 : 0, body]);
  }
  await exec("insert into revisions (id, entity, entity_id, data, author) values (?, ?, ?, ?, ?)", [uid("rev_"), "page", page.id, body, author || null]);
  revalidateTag("content");
}

export async function deletePage(id: string) {
  await initDb();
  await exec("delete from pages where id = ?", [id]);
  revalidateTag("content");
}

export async function resetDoc(key: string) {
  if (!(key in docDefaults)) return;
  await saveDoc(key, docDefaults[key], "reset");
}

export const bumpContent = () => revalidateTag("content");

/** Main navigation = published pages flagged for the menu, in their saved order. */
export async function getNav() {
  const pages = await getPages();
  return pages.filter((p) => p.status === "published" && p.inNav).map((p) => ({ href: p.slug, label: p.title }));
}
