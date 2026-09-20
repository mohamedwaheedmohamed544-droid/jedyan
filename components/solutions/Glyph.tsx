import type { Solution } from "@/content/site";

/** Compact line-art signature per solution — same stroke system, different mechanism. */
export default function Glyph({ type, className = "" }: { type: Solution["visual"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const o = "#ff6e06";
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true">
      {type === "bins" && (
        <g {...common}>
          {[0, 1, 2, 3].map((c) => [0, 1, 2].map((r) => (
            <rect key={`${c}${r}`} x={24 + c * 40} y={22 + r * 34} width="32" height="26" rx="3" stroke={c === 2 && r === 1 ? o : "currentColor"} fill={c === 2 && r === 1 ? "rgba(255,110,6,.15)" : "none"} />
          )))}
          <path d="M20 128h160" />
        </g>
      )}
      {type === "flow" && (
        <g {...common}>
          <path d="M14 70h172" strokeDasharray="3 5" />
          {[30, 76, 122, 168].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="70" r="14" stroke={i === 2 ? o : "currentColor"} />
              <path d={`M${x - 5} 70h10`} stroke={i === 2 ? o : "currentColor"} />
            </g>
          ))}
          <path d="M60 40h40l10 10" stroke={o} />
        </g>
      )}
      {type === "connect" && (
        <g {...common}>
          {[26, 58, 90, 122].map((y) => <rect key={y} x="14" y={y - 10} width="44" height="20" rx="10" />)}
          {[26, 58, 90, 122].map((y) => <path key={`p${y}`} d={`M58 ${y} C 100 ${y}, 110 70, 140 70`} />)}
          <rect x="140" y="48" width="46" height="44" rx="8" stroke={o} />
          <path d="M152 70h22" stroke={o} />
        </g>
      )}
      {type === "carrier" && (
        <g {...common}>
          <circle cx="36" cy="70" r="12" stroke={o} />
          {[24, 70, 116].map((y, i) => <path key={y} d={`M48 70 C 90 70, 100 ${y}, 164 ${y}`} stroke={i === 1 ? o : "currentColor"} strokeDasharray={i === 1 ? "none" : "4 5"} />)}
          {[24, 70, 116].map((y) => <circle key={`c${y}`} cx="172" cy={y} r="7" />)}
        </g>
      )}
      {type === "returns" && (
        <g {...common}>
          <path d="M30 40h120a20 20 0 0 1 0 40H50" />
          <path d="M60 68 48 80l12 12" />
          <path d="M100 80v36M100 116h-50M100 116h50" />
          <circle cx="50" cy="120" r="5" stroke={o} fill="rgba(255,110,6,.2)" />
          <circle cx="150" cy="120" r="5" />
        </g>
      )}
      {type === "tower" && (
        <g {...common}>
          <rect x="30" y="16" width="140" height="26" rx="6" />
          <rect x="30" y="56" width="140" height="28" rx="6" stroke={o} fill="rgba(255,110,6,.12)" />
          {[30, 60, 90, 120, 150].map((x) => <rect key={x} x={x} y="100" width="22" height="24" rx="4" />)}
          <path d="M100 42v14M100 84v16" />
        </g>
      )}
    </svg>
  );
}
