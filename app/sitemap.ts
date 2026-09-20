import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";
import { allPagePaths } from "@/lib/page-render";
import { localePath } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const base = site.settings.seo.siteUrl.replace(/\/$/, "");
  const paths = await allPagePaths();
  return paths.map((p) => ({
    url: base + localePath("ar", p),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : p.startsWith("/solutions") ? 0.9 : 0.7,
    alternates: { languages: { ar: base + localePath("ar", p), en: base + localePath("en", p) } },
  }));
}
