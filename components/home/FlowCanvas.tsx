"use client";
import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };
type Curve = { p0: Pt; p1: Pt; p2: Pt; p3: Pt; lane: "in" | "out"; w: number };
type Particle = { c: number; t: number; v: number; len: number };

const bez = (c: Curve, t: number): Pt => {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, d = 3 * u * t * t, e = t * t * t;
  return { x: a * c.p0.x + b * c.p1.x + d * c.p2.x + e * c.p3.x, y: a * c.p0.y + b * c.p1.y + d * c.p2.y + e * c.p3.y };
};

// deterministic pseudo random so SSR/CSR and resizes stay stable
const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

/**
 * Hero visual: many scattered demand streams (channels) converge on one fixed point —
 * the Jedyan operating layer — and leave as ordered lanes. Grey before the point, orange after.
 */
export default function FlowCanvas({ rtl, onHub }: { rtl: boolean; onHub?: (p: Pt) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, raf = 0, running = true, visible = true;
    let curves: Curve[] = [];
    let particles: Particle[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const hubBase: Pt = { x: 0, y: 0 };

    const build = () => {
      const r = rng(7);
      const mobile = W < 760;
      // work in LTR space: sources at right edge, outputs travel left. Mirror for LTR pages later.
      hubBase.x = mobile ? W * 0.5 : W * 0.66;
      hubBase.y = mobile ? H * 0.52 : H * 0.5;
      const hub = { x: hubBase.x + pointer.x, y: hubBase.y + pointer.y };
      curves = [];
      const nIn = mobile ? 14 : 22;
      for (let i = 0; i < nIn; i++) {
        const y0 = (i / (nIn - 1)) * H * 1.3 - H * 0.15 + (r() - 0.5) * 40;
        const x0 = W + 20;
        curves.push({
          p0: { x: x0, y: y0 },
          p1: { x: x0 - (W - hub.x) * (0.35 + r() * 0.3), y: y0 + (r() - 0.5) * H * 0.5 },
          p2: { x: hub.x + (W - hub.x) * (0.25 + r() * 0.2), y: hub.y + (y0 - hub.y) * (0.15 + r() * 0.2) },
          p3: hub,
          lane: "in",
          w: 0.6 + r() * 0.8,
        });
      }
      const nOut = mobile ? 5 : 7;
      const spread = mobile ? H * 0.46 : H * 0.34;
      for (let i = 0; i < nOut; i++) {
        const k = i / (nOut - 1) - 0.5;
        const y3 = hub.y + k * spread * 2;
        curves.push({
          p0: hub,
          p1: { x: hub.x - W * 0.08, y: hub.y + k * spread * 0.2 },
          p2: { x: hub.x - W * 0.22, y: y3 },
          p3: { x: -40, y: y3 + k * 30 },
          lane: "out",
          w: 1.2,
        });
      }
      onHub?.({ x: rtl ? W - hub.x : hub.x, y: hub.y });
    };

    const seed = () => {
      const r = rng(11);
      particles = [];
      const count = W < 760 ? 60 : 120;
      for (let i = 0; i < count; i++) {
        const out = i % 3 === 0;
        const idx = out ? curves.findIndex((c) => c.lane === "out") + Math.floor(r() * curves.filter((c) => c.lane === "out").length) : Math.floor(r() * curves.filter((c) => c.lane === "in").length);
        particles.push({ c: idx, t: r(), v: out ? 0.0022 + r() * 0.0014 : 0.0014 + r() * 0.0022, len: out ? 0.06 : 0.035 });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      build(); seed(); draw(0);
    };

    const X = (x: number) => (rtl ? W - x : x);

    const draw = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // ease hub toward pointer
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const hub = { x: hubBase.x + pointer.x, y: hubBase.y + pointer.y };
      for (const c of curves) { if (c.lane === "in") c.p3 = hub; else c.p0 = hub; }

      // guide lines
      for (const c of curves) {
        ctx.beginPath();
        ctx.moveTo(X(c.p0.x), c.p0.y);
        ctx.bezierCurveTo(X(c.p1.x), c.p1.y, X(c.p2.x), c.p2.y, X(c.p3.x), c.p3.y);
        ctx.strokeStyle = c.lane === "in" ? "rgba(255,255,255,0.07)" : "rgba(255,110,6,0.22)";
        ctx.lineWidth = c.lane === "in" ? c.w : 1;
        ctx.stroke();
      }

      // particles as short tapered trails
      for (const p of particles) {
        const c = curves[p.c];
        if (!c) continue;
        p.t += p.v * dt;
        if (p.t > 1) p.t -= 1;
        const steps = 6;
        for (let s = 0; s < steps; s++) {
          const t0 = Math.max(0, p.t - (p.len * (s + 1)) / steps);
          const t1 = Math.max(0, p.t - (p.len * s) / steps);
          const a = bez(c, t0), b = bez(c, t1);
          const alpha = (1 - s / steps) * (c.lane === "in" ? 0.55 : 0.95);
          ctx.beginPath();
          ctx.moveTo(X(a.x), a.y);
          ctx.lineTo(X(b.x), b.y);
          ctx.strokeStyle = c.lane === "in" ? `rgba(226,224,222,${alpha})` : `rgba(255,${120 + s * 10},${30 + s * 12},${alpha})`;
          ctx.lineWidth = (c.lane === "in" ? 1.4 : 2.4) * (1 - s / (steps + 2));
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // hub: fixed point (Al-Jiddi) — steady, with one slow breathing ring
      const hx = X(hub.x), hy = hub.y;
      const now = performance.now() / 1000;
      const ring = reduced ? 0 : (now % 3) / 3;
      ctx.beginPath();
      ctx.arc(hx, hy, 14 + ring * 46, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,110,6,${0.35 * (1 - ring)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hx, hy, 30, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.stroke();
      // four-point star
      ctx.save();
      ctx.translate(hx, hy);
      ctx.beginPath();
      const R = 11, r2 = 2.6;
      for (let i = 0; i < 8; i++) {
        const ang = (Math.PI / 4) * i - Math.PI / 2;
        const rad = i % 2 === 0 ? R : r2;
        ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
      }
      ctx.closePath();
      ctx.fillStyle = "#ff6e06";
      ctx.shadowColor = "rgba(255,110,6,0.7)";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(48, now - last) / 16.67;
      last = now;
      draw(dt);
      if (running && visible) raf = requestAnimationFrame(loop);
    };

    const start = () => { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (reduced) {
      draw(0);
    } else start();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(canvas);
    const vis = () => { running = !document.hidden; if (running) start(); else stop(); };
    document.addEventListener("visibilitychange", vis);

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointer.tx = (rtl ? -nx : nx) * 40;
      pointer.ty = ny * 30;
    };
    window.addEventListener("pointermove", move, { passive: true });

    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", vis); window.removeEventListener("pointermove", move); };
  }, [rtl, onHub]);

  return <canvas ref={ref} aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
}
