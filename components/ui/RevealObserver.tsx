"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Mounted once per layout. Marks <html class="js"> and reveals [data-reveal] / .lines on entry. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), .lines:not([data-in])"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    els.forEach((el) => io.observe(el));
    // safety: never leave content hidden (e.g. print, very tall elements)
    const t = window.setTimeout(() => els.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.in = ""; }), 1200);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [pathname]);
  return null;
}
