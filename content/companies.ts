export const companies = {
  pfizer: { name: "Pfizer", color: "#C2410C" },
  moderna: { name: "Moderna", color: "#7C3AED" },
  merck: { name: "Merck", color: "#0F766E" },
  sanofi: { name: "Sanofi", color: "#2563EB" },
  gsk: { name: "GSK", color: "#64748B" },
} as const;

export type CompanyKey = keyof typeof companies;
