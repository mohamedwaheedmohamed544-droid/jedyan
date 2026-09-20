import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { ui } from "@/lib/ui";
import Blades from "./Blades";
import Lines from "./Lines";

export default function PageHero({ locale, eyebrow, title, lead, crumbs = [], children }: { locale: Locale; eyebrow: string; title: string[]; lead?: string; crumbs?: { href: string; label: string }[]; children?: ReactNode }) {
  return (
    <section className="dark page-hero">
      <Blades className="page-hero__blades" tone="ink" />
      <div className="wrap" style={{ position: "relative" }}>
        <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"}>
          <ol className="breadcrumb">
            <li><Link href={localePath(locale, "/")}>{ui("home", locale)}</Link></li>
            {crumbs.map((c) => (
              <li key={c.href}><span aria-hidden="true">/ </span><Link href={localePath(locale, c.href)}>{c.label}</Link></li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow" style={{ marginTop: 36 }} data-reveal>{eyebrow}</p>
        <Lines as="h1" className="h1" lines={title} />
        {lead && <p className="lead" data-reveal style={{ ["--d" as string]: 300 }}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}
