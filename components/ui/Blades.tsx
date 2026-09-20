/**
 * The brand "blade" — three tapered strokes from the Jedyan mark.
 * Used as the single recurring graphic device: motion converging on a fixed point.
 */
export default function Blades({ className = "", tone = "graphite", animate = true }: { className?: string; tone?: "graphite" | "light" | "ink"; animate?: boolean }) {
  const soft = tone === "graphite" ? "#5d5d60" : tone === "ink" ? "#343437" : "#e9e6e2";
  const id = `bl-${tone}`;
  return (
    <svg className={`blades ${animate ? "blades--anim" : ""} ${className}`} viewBox="0 0 1000 1000" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-o`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6e06" stopOpacity="0" />
          <stop offset="0.35" stopColor="#ffa66b" />
          <stop offset="1" stopColor="#e8650f" />
        </linearGradient>
      </defs>
      <path className="blade b1" d="M40 520 C 380 330, 700 120, 1000 40 L 1000 250 C 720 330, 420 440, 40 520 Z" fill={soft} />
      <path className="blade b2" d="M40 548 C 380 470, 680 420, 1000 418 L 1000 640 C 690 640, 380 600, 40 548 Z" fill={`url(#${id}-o)`} />
      <path className="blade b3" d="M40 580 C 400 740, 720 900, 1000 1000 L 1000 800 C 700 730, 420 650, 40 580 Z" fill={soft} />
    </svg>
  );
}
