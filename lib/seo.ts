import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { SITE_URL, company } from "@/content/site";
import { localePath } from "@/content/types";

export function pageMeta(opts: { locale: Locale; path: string; title: string; description: string }): Metadata {
  const { locale, path, title, description } = opts;
  const url = SITE_URL + localePath(locale, path);
  const brand = company.name[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: path === "/" ? `${brand} | ${title}` : `${title} | ${brand}`,
    description,
    alternates: {
      canonical: url,
      languages: { ar: SITE_URL + localePath("ar", path), en: SITE_URL + localePath("en", path), "x-default": SITE_URL + localePath("ar", path) },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: brand,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: brand }],
    },
    twitter: { card: "summary_large_image", title, description, site: "@jedyan_sa" },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  };
}

export function orgJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name[locale],
    alternateName: locale === "ar" ? company.name.en : company.name.ar,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/jedyan-logo-ink.png`,
    email: company.email,
    telephone: company.phoneHref,
    address: { "@type": "PostalAddress", addressCountry: "SA" },
    parentOrganization: { "@type": "Organization", name: locale === "ar" ? "صقر الجديان القابضة" : "Saqr Al-Jedyan Holding" },
    sameAs: [company.instagram, company.x],
  };
}
