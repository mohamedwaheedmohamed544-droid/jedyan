/* eslint-disable @next/next/no-img-element */
export default function Logo({ variant = "ink", className = "" }: { variant?: "ink" | "white"; className?: string }) {
  return (
    <img
      src={`/brand/jedyan-logo-${variant}.png`}
      alt="JEDYAN Logistics — جديان للخدمات اللوجستية"
      width={900}
      height={251}
      className={className}
      decoding="async"
    />
  );
}
