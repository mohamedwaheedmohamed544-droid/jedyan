import type { CSSProperties, ElementType } from "react";

/** Renders each line as a masked line for staggered text reveal. */
export default function Lines({ lines, as: Tag = "h2", className = "", delay = 0 }: { lines: string[]; as?: ElementType; className?: string; delay?: number }) {
  return (
    <Tag className={`lines ${className}`} style={{ "--d": delay } as CSSProperties}>
      {lines.map((l, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
