"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "@/lib/content";
import type { T } from "@/content/types";

export type NavItem = { href: string; label: T };
type Ctx = { site: SiteContent; nav: NavItem[] };

const SiteCtx = createContext<Ctx | null>(null);

export function SiteProvider({ site, nav, children }: { site: SiteContent; nav: NavItem[]; children: ReactNode }) {
  return <SiteCtx.Provider value={{ site, nav }}>{children}</SiteCtx.Provider>;
}

export function useSite(): SiteContent {
  const c = useContext(SiteCtx);
  if (!c) throw new Error("useSite must be used inside SiteProvider");
  return c.site;
}

export function useNav(): NavItem[] {
  const c = useContext(SiteCtx);
  return c?.nav ?? [];
}

/** Resolve an editable bilingual/plain prop coming from the dashboard, with a code fallback. */
export function px(props: Record<string, unknown> | undefined, key: string, locale: "ar" | "en", fallback = ""): string {
  const v = props?.[key];
  if (v == null) return fallback;
  if (typeof v === "string") return v || fallback;
  if (typeof v === "object" && v !== null) {
    const o = v as Record<string, string>;
    return (o[locale] ?? o.ar ?? o.en ?? "") || fallback;
  }
  return fallback;
}
