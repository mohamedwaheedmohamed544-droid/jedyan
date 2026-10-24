import type { ReactNode, SVGProps } from "react";

/* Isometric 3D-style icons, one per journey stage. Pure SVG: three-tone faces fake the lighting. */
const K = 8;
const pt = (x: number, y: number, z: number) => `${(60 + (x - y) * 0.866 * K).toFixed(1)},${(82 + (x + y) * 0.5 * K - z * K).toFixed(1)}`;
const poly = (pts: [number, number, number][], fill: string, key: string) => <polygon key={key} points={pts.map((p) => pt(...p)).join(" ")} fill={fill} />;

type Tone = { t: string; l: string; r: string };
const OR: Tone = { t: "#ff9a52", l: "#ff6e06", r: "#bf4b00" };
const WH: Tone = { t: "#f4f4f5", l: "#d3d3d7", r: "#9c9ca3" };
const DK: Tone = { t: "#5c5c62", l: "#46464b", r: "#323236" };

function box(x: number, y: number, z: number, w: number, d: number, h: number, c: Tone, key: string): ReactNode {
  return (
    <g key={key}>
      {poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], c.l, "l")}
      {poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], c.r, "r")}
      {poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], c.t, "t")}
    </g>
  );
}
const at = (x: number, y: number, z: number) => pt(x, y, z).split(",").map(Number) as [number, number];

const ICONS: Record<string, () => ReactNode> = {
  // Box dropping onto a pallet
  inbound: () => (
    <>
      {box(-3, -3, 0, 6, 6, 0.7, DK, "pal")}
      {box(-2, -2, 0.7, 4, 4, 3, OR, "box")}
      <path d={`M${at(0, 0, 8.4).join(",")} v18 m-6 -6 l6 6 l6 -6`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Warehouse / store
  storage: () => {
    const [x, y, z, w, d, r] = [-3.5, -3, 0, 7, 6, 2.6];
    return (
      <>
        {box(x, y, z, w, d, 3.6, WH, "body")}
        {poly([[x, y + d, 3.6], [x + w, y + d, 3.6], [x + w, y + d / 2, 3.6 + r], [x, y + d / 2, 3.6 + r]], OR.l, "rl")}
        {poly([[x + w, y, 3.6], [x + w, y + d, 3.6], [x + w, y + d / 2, 3.6 + r]], OR.r, "rg")}
        {poly([[x + 1.2, y + d, 0], [x + 5.8, y + d, 0], [x + 5.8, y + d, 2.6], [x + 1.2, y + d, 2.6]], OR.l, "door")}
        {poly([[x + 3.5, y + d, 0], [x + 3.5, y + d, 2.6], [x + 3.55, y + d, 2.6], [x + 3.55, y + d, 0]], "#fff", "dl")}
      </>
    );
  },
  // Order slip with lines and check
  order: () => (
    <>
      {box(-3, -0.6, 0, 6, 1.2, 8, WH, "slab")}
      {poly([[-2, 0.6, 6.4], [2, 0.6, 6.4], [2, 0.6, 5.8], [-2, 0.6, 5.8]], "#9c9ca3", "a")}
      {poly([[-2, 0.6, 4.8], [0.6, 0.6, 4.8], [0.6, 0.6, 4.2], [-2, 0.6, 4.2]], "#9c9ca3", "b")}
      <circle cx={at(0, 0.6, 1.9)[0]} cy={at(0, 0.6, 1.9)[1]} r="7" fill="#ff6e06" />
      <path d={`M${at(-1, 0.6, 1.9).join(",")} l3.5 3.5 l6 -7`} transform="translate(0 1)" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Shelf with one box lifted out
  pick: () => (
    <>
      {box(-4, -2, 0, 3.4, 4, 2.2, WH, "a")}
      {box(-4, -2, 2.2, 3.4, 4, 2.2, WH, "b")}
      {box(-0.4, -2, 0, 3.4, 4, 2.2, WH, "c")}
      {box(-0.4, -2, 3.8, 3.4, 4, 2.4, OR, "up")}
      <path d={`M${at(1.3, 0, 7.4).join(",")} v-9`} stroke="#fff" strokeWidth="2" strokeDasharray="1.5 4" strokeLinecap="round" />
    </>
  ),
  // Closed carton with tape
  pack: () => (
    <>
      {box(-3.4, -3.4, 0, 6.8, 6.8, 5.6, OR, "c")}
      {poly([[-0.7, -3.4, 5.6], [0.7, -3.4, 5.6], [0.7, 3.4, 5.6], [-0.7, 3.4, 5.6]], "#ffe2cc", "tt")}
      {poly([[-0.7, 3.4, 0], [0.7, 3.4, 0], [0.7, 3.4, 5.6], [-0.7, 3.4, 5.6]], "#ffd0ab", "tl")}
    </>
  ),
  // Truck
  dispatch: () => (
    <>
      {box(-5, -2, 1, 6.4, 4, 4.2, WH, "cargo")}
      {box(1.4, -2, 1, 3.4, 4, 2.8, OR, "cab")}
      {[-2, 3.4].map((wx) => (
        <ellipse key={wx} cx={at(wx, 2, 1)[0]} cy={at(wx, 2, 1)[1]} rx="4" ry="4.4" fill="#2a2a2d" stroke="#8a8a90" strokeWidth="2" />
      ))}
    </>
  ),
  // Map pin on a plate
  delivery: () => (
    <>
      {box(-4.5, -4.5, 0, 9, 9, 0.8, DK, "plate")}
      <ellipse cx="60" cy={at(0, 0, 0.8)[1]} rx="8" ry="4" fill="rgba(0,0,0,.35)" />
      <path d={`M60 ${at(0, 0, 0.8)[1] - 2} L51 ${at(0, 0, 0.8)[1] - 26} h18 Z`} fill="#bf4b00" />
      <circle cx="60" cy={at(0, 0, 0.8)[1] - 32} r="12" fill="url(#j3d-orb)" />
      <circle cx="60" cy={at(0, 0, 0.8)[1] - 32} r="4.5" fill="#fff" />
    </>
  ),
  // Box with a return loop
  returns: () => {
    const [cx, cy] = at(0, 0, 4);
    return (
      <>
        {box(-3, -3, 0, 6, 6, 4, OR, "box")}
        <path d={`M${cx - 15},${cy} a15 8.5 0 1 1 6 6.8`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        <path d={`M${cx - 20},${cy - 3} l5.5 6 l5 -7 Z`} fill="#fff" />
      </>
    );
  },
  // Racked inventory: two columns of stacked cartons
  inventory: () => (
    <>
      {box(-4.5, -3, 0, 9, 6, 0.6, DK, "base")}
      {box(-4, -2.4, 0.6, 3.6, 4.8, 2, WH, "a1")}
      {box(-4, -2.4, 2.6, 3.6, 4.8, 2, OR, "a2")}
      {box(0.4, -2.4, 0.6, 3.6, 4.8, 2, OR, "b1")}
      {box(0.4, -2.4, 2.6, 3.6, 4.8, 2, WH, "b2")}
      {box(0.4, -2.4, 4.6, 3.6, 4.8, 2, WH, "b3")}
    </>
  ),
  // Data: stacked server slabs with status lights
  data: () => (
    <>
      {box(-4, -3, 0, 8, 6, 2, DK, "s1")}
      {box(-4, -3, 2.2, 8, 6, 2, WH, "s2")}
      {box(-4, -3, 4.4, 8, 6, 2, OR, "s3")}
      {[0, 2.2, 4.4].map((z) => poly([[-3, 3, z + 0.8], [-1, 3, z + 0.8], [-1, 3, z + 1.3], [-3, 3, z + 1.3]], z === 2.2 ? "#ff6e06" : "#fff", `led${z}`))}
    </>
  ),
  // Demand: shopping cart carrying an order
  demand: () => (
    <>
      {box(-4, -2.6, 1.4, 7, 5.2, 2.6, WH, "cart")}
      {box(-2.6, -1.4, 4, 3.4, 3, 2.2, OR, "item")}
      <path d={`M${at(-4, -2.6, 4)[0]},${at(-4, -2.6, 4)[1]} l-9 -9 h-6`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {[-2.4, 1.6].map((wx) => (
        <ellipse key={wx} cx={at(wx, 2.6, 1.2)[0]} cy={at(wx, 2.6, 1.2)[1] + 1} rx="3.6" ry="4" fill="#2a2a2d" stroke="#8a8a90" strokeWidth="1.8" />
      ))}
    </>
  ),
  // Customer: house with a parcel at the door
  customer: () => {
    const [x, y, w, d, h, r] = [-4.2, -3, 5.6, 5.4, 3.2, 2.4];
    return (
      <>
        {box(x, y, 0, w, d, h, WH, "house")}
        {poly([[x, y + d, h], [x + w, y + d, h], [x + w, y + d / 2, h + r], [x, y + d / 2, h + r]], OR.l, "rl")}
        {poly([[x + w, y, h], [x + w, y + d, h], [x + w, y + d / 2, h + r]], OR.r, "rg")}
        {poly([[x + 1.8, y + d, 0], [x + 3.8, y + d, 0], [x + 3.8, y + d, 2.2], [x + 1.8, y + d, 2.2]], OR.l, "door")}
        {box(2, 0.6, 0, 2.8, 2.8, 2.4, OR, "parcel")}
      </>
    );
  },
  // Bar chart on a slab
  reporting: () => (
    <>
      {box(-5, -3, 0, 10, 6, 0.8, DK, "base")}
      {box(-4, -1.5, 0.8, 2.2, 3, 2.4, WH, "b1")}
      {box(-1, -1.5, 0.8, 2.2, 3, 4.4, OR, "b2")}
      {box(2, -1.5, 0.8, 2.2, 3, 6.6, OR, "b3")}
    </>
  ),
};

const ALIAS: Record<string, string> = { fulfillment: "pack", distribution: "dispatch" };

/** `icon` is the dashboard choice (preset key, "none", or empty = derive from `stage`). */
export default function JourneyIcon3D({ stage, icon, ...rest }: { stage: string; icon?: string } & SVGProps<SVGSVGElement>) {
  const raw = (icon || stage).toLowerCase();
  const Icon = raw === "none" ? undefined : ICONS[ALIAS[raw] ?? raw];
  if (!Icon) return null;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" {...rest}>
      <defs>
        <radialGradient id="j3d-orb" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffb070" />
          <stop offset=".6" stopColor="#ff6e06" />
          <stop offset="1" stopColor="#a84100" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="94" rx="30" ry="9" fill="rgba(0,0,0,.35)" />
      <g>{Icon()}</g>
    </svg>
  );
}
