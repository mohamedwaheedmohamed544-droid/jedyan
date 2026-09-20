/** Deterministic date formatting (same output on server and client). */
const fmt = new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", {
  year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Riyadh",
});

export function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value.includes("T") || value.includes("Z") ? value : value.replace(" ", "T") + "Z") : value;
  if (Number.isNaN(d.getTime())) return "—";
  return fmt.format(d);
}
