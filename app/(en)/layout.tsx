import type { ReactNode } from "react";
import type { Viewport } from "next";
import Shell from "@/components/layout/Shell";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#232325" };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
