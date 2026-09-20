import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/content/types";
import { getPage, getPages, getSite } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import Renderer from "@/components/blocks/Renderer";
import SolutionPage from "@/components/pages/SolutionPage";

const toPath = (slug?: string[]) => "/" + (slug || []).join("/");

export async function renderMetadata(locale: Locale, slugParts?: string[]): Promise<Metadata> {
  const path = toPath(slugParts);
  const site = await getSite();
  if (path.startsWith("/solutions/")) {
    const s = site.solutions.find((x) => x.slug === path.replace("/solutions/", ""));
    if (!s) return {};
    return pageMeta({ locale, path, title: s.title[locale], description: `${s.headline[locale]} ${s.intro[locale]}`, siteUrl: site.settings.seo.siteUrl, brand: site.settings.seo.titleSuffix[locale], ogImage: site.settings.seo.ogImage });
  }
  const page = await getPage(path);
  if (!page) return {};
  return pageMeta({
    locale,
    path,
    title: page.seo.title[locale] || page.title[locale],
    description: page.seo.description[locale] || site.settings.seo.defaultDescription[locale],
    siteUrl: site.settings.seo.siteUrl,
    brand: site.settings.seo.titleSuffix[locale],
    ogImage: site.settings.seo.ogImage,
  });
}

export async function renderPage(locale: Locale, slugParts?: string[]) {
  const path = toPath(slugParts);
  if (path.startsWith("/solutions/")) {
    const slug = path.replace("/solutions/", "");
    const site = await getSite();
    if (!site.solutions.some((x) => x.slug === slug)) notFound();
    return <SolutionPage locale={locale} slug={slug} />;
  }
  const page = await getPage(path);
  if (!page || page.status !== "published") notFound();
  return <Renderer sections={page.sections} locale={locale} />;
}

export async function allPagePaths() {
  const pages = await getPages();
  const site = await getSite();
  return [...pages.filter((p) => p.status === "published").map((p) => p.slug), ...site.solutions.map((s) => `/solutions/${s.slug}`)];
}
