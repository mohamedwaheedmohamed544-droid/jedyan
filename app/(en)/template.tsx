import type { ReactNode } from "react";
/** Re-mounts on every navigation → soft page-enter transition. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
