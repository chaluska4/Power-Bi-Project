export const sources = {
  heading: "Sources & Notes",
  sourcesTitle: "Sources",
  notesTitle: "Data notes",
  accuracyTitle: "Accuracy notes",
  accuracy: [
    "Policy markers show timing, not cause. Coverage decline began before 2025 policy changes.",
    "Blanks kept blank (no fake zeros, e.g. Moderna pre-IPO prices).",
    "Truncated coverage axis disclosed. Coverage axis starts at 90%.",
  ],
  items: [
    "Company 10-K/annual report figures (contest dataset)",
    "CDC MMWR kindergarten vaccination reports and SchoolVaxView",
    "CIDRAP federal vaccine timeline",
    "HHS via AHCJ (BARDA mRNA cuts, Aug 2025)",
    "U.S. DoD and FDAnews (Operation Warp Speed)",
  ],
  notes: [
    "Moderna IPO Dec 2018 (no earlier share price or 2015 financials).",
    "GSK 2022 revenue reflects the Haleon spin-off.",
    "Merck 2023 R&D includes acquisition charges.",
    "Sanofi/GSK converted from EUR/GBP.",
    "Year-end share prices exclude dividends.",
    "Coverage axis starts at 90%.",
  ],
} as const;
