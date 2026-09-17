"use client";
import { useRef, type ReactNode } from "react";

/** Subtle magnetic pull for primary CTAs (pointer: fine only; disabled on reduced motion via CSS). */
export default function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ display: "inline-flex", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }}>
      {children}
    </span>
  );
}
