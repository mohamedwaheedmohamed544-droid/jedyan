import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import Header from "./Header";
import Footer from "./Footer";
import RevealObserver from "@/components/ui/RevealObserver";
import JsonLd from "@/components/ui/JsonLd";
import { orgJsonLd } from "@/lib/seo";
// Self-hosted fonts (unicode-range subsets load on demand). IBM Plex Sans Arabic stands in for the
// licensed brand face FF Shamel Family — swap in /public/fonts + @font-face when the licence is supplied.
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@/styles/globals.css";

export default function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <meta name="theme-color" content="#232325" />
        <JsonLd data={orgJsonLd(locale)} />
      </head>
      <body>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <RevealObserver />
      </body>
    </html>
  );
}
