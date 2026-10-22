import { companies, type CompanyKey } from "@/content/companies";

export type Finding = {
  value: string;
  label: string;
  text: string;
  source: string;
  companies: CompanyKey[];
};

const filingSource =
  "Source: Company 10-K / annual report figures (contest dataset)";

export const findings: Finding[] = [
  {
    value: "−90%",
    label: "Moderna revenue change",
    text: "Moderna revenue, $19.3B (2022) → $1.9B (2025).",
    source: filingSource,
    companies: ["moderna"],
  },
  {
    value: "−38%",
    label: "Pfizer revenue change",
    text: "Pfizer revenue, $101.2B (2022) → $62.6B (2025).",
    source: filingSource,
    companies: ["pfizer"],
  },
  {
    value: "+29%",
    label: "Merck, Sanofi, and GSK combined revenue change",
    text: "Merck + Sanofi + GSK revenue, $124.4B (2019) → $160.9B (2025).",
    source: filingSource,
    companies: ["merck", "sanofi", "gsk"],
  },
  {
    value: "2.5% → 4.2%",
    label: "Kindergarten vaccine exemptions",
    text: "Kindergarten vaccine exemptions, 2019–20 → 2025–26.",
    source: "Source: CDC MMWR kindergarten vaccination reports and SchoolVaxView",
    companies: [],
  },
];

export const findingsSection = {
  heading: "Key Findings",
  callout:
    "Moderna spent $1.61 on R&D for every $1 of 2025 revenue ($3.13B R&D vs $1.94B revenue).",
  calloutSource: filingSource,
  calloutCompany: companies.moderna,
  integrity:
    "Policy markers show timing, not cause. Coverage decline began before 2025 policy changes.",
} as const;
