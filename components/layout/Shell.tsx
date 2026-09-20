import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import Header from "./Header";
import { SiteProvider } from "@/components/SiteContext";
import { getSite, getNav } from "@/lib/content";
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

export default async function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const site = await getSite();
  const nav = await getNav();
  const th = site.settings.theme;
  const themeCss = `:root{
  --ink:${th.colors.ink};--ink-2:${th.colors.ink2};--graphite:${th.colors.graphite};--steel:${th.colors.steel};
  --mist:${th.colors.mist};--paper:${th.colors.paper};--paper-2:${th.colors.paper2};--white:${th.colors.white};
  --orange:${th.colors.orange};--orange-soft:${th.colors.orangeSoft};--tint:${th.colors.tint};
  --font-ar:"${th.fonts.ar}","FF Shamel Family Sans","Segoe UI",Tahoma,sans-serif;
  --font-en:"${th.fonts.en}","Helvetica Neue",Arial,sans-serif;
  --font-serif:"${th.fonts.serif}",Georgia,serif;
  --font-mono:"${th.fonts.mono}",ui-monospace,Menlo,monospace;
  --radius:${th.scale.radius}px;--max:${th.scale.maxWidth}px;
  --fs-h1:clamp(2.25rem,1.4rem + 3.8vw,${th.scale.h1}rem);
  --fs-h2:clamp(1.75rem,1.3rem + 2vw,${th.scale.h2}rem);
  --fs-h3:clamp(1.25rem,1.1rem + 0.6vw,${th.scale.h3}rem);
  --fs-body:clamp(1rem,0.96rem + 0.2vw,${th.scale.body}rem);
}
.section{padding-block:clamp(72px,10vw,${th.scale.sectionSpace}px)}
${th.motion.enabled ? "" : ".js [data-reveal],.js .lines>span>span{opacity:1!important;transform:none!important;clip-path:none!important}"}`;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <meta name="theme-color" content="#232325" />
        <JsonLd data={orgJsonLd(locale)} />
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        {site.settings.integrations.headScripts ? <script dangerouslySetInnerHTML={{ __html: site.settings.integrations.headScripts }} /> : null}
      </head>
      <body>
        <SiteProvider site={site} nav={nav}>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} site={site} nav={nav} />
          <RevealObserver />
        </SiteProvider>
      </body>
    </html>
  );
}
