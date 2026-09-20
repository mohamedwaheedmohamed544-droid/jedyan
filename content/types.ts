export type Locale = "ar" | "en";

/** A bilingual string. Arabic is the source language; English is an adaptation, not a literal translation. */
export type T = { ar: string; en: string };

export const tr = (v: T, l: Locale) => v[l];

export const localePath = (l: Locale, path: string) => {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return l === "ar" ? clean : clean === "/" ? "/en/" : `/en${clean}`;
};
