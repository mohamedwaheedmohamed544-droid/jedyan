import type { MetadataRoute } from "next";
import { SITE_URL, solutions } from "@/content/site";
import { localePath } from "@/content/types";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/solutions", ...solutions.map((s) => `/solutions/${s.slug}`), "/how-we-work", "/sectors", "/why-jedyan", "/vision", "/contact"];
  return paths.map((p) => ({
    url: SITE_URL + localePath("ar", p),
    lastModified: new Date("2026-09-17"),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/solutions") ? 0.9 : 0.7,
    alternates: { languages: { ar: SITE_URL + localePath("ar", p), en: SITE_URL + localePath("en", p) } },
  }));
}
