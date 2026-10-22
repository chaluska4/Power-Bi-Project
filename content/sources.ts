/** Replace each TODO_URL with the source link. Items without a real URL render as plain text. */
export const TODO_URL = "TODO_URL";

export const sources = {
  heading: "Sources & Notes",
  sourcesTitle: "Sources",
  notesTitle: "Data notes",
  accuracyTitle: "Accuracy notes",
  items: [
    { label: "Company 10-K/annual report figures (contest dataset)", url: TODO_URL },
    { label: "CDC MMWR kindergarten vaccination reports and SchoolVaxView", url: TODO_URL },
    { label: "CIDRAP federal vaccine timeline", url: TODO_URL },
    { label: "HHS via AHCJ (BARDA mRNA cuts, Aug 2025)", url: TODO_URL },
    { label: "U.S. DoD and FDAnews (Operation Warp Speed)", url: TODO_URL },
  ],
  notes: [
    "Moderna IPO Dec 2018 (no earlier share price or 2015 financials).",
    "GSK 2022 revenue reflects the Haleon spin-off.",
    "Merck 2023 R&D includes acquisition charges.",
    "Sanofi/GSK converted from EUR/GBP.",
    "Year-end share prices exclude dividends.",
    "Coverage axis starts at 90%.",
    "2020–21 kindergarten coverage collection was disrupted by COVID-19 (CDC).",
  ],
  accuracy: [
    "Policy markers show timing, not cause. Coverage decline began before 2025 policy changes.",
    "Blanks kept blank (no fake zeros, e.g. Moderna pre-IPO prices).",
    "Truncated coverage axis disclosed. Coverage axis starts at 90%.",
  ],
};
