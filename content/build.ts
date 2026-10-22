export const build = {
  heading: "Behind the Build",
  onThisPage: "On this page",
  designTitle: "Design decisions",
  toolsTitle: "Tools",
  processLabel: "Process",
  subnav: [
    { href: "#process", label: "Process" },
    { href: "#decisions", label: "Design decisions" },
    { href: "#tools", label: "Tools" },
  ],
  tools: ["Power BI (DAX, TMDL)", "Excel/Power Query", "Python (pandas)"],
  steps: [
    {
      n: 1,
      title: "Question",
      body: "Why did vaccine makers' fortunes split after COVID?",
    },
    {
      n: 2,
      title: "Data prep",
      body: "Cleaned the contest dataset into a star schema (fact_financials, dim_company, vax_coverage, policy_events, data_notes, sources). Sanofi/GSK converted from EUR/GBP. Blanks kept blank (no fake zeros, e.g. Moderna pre-IPO prices).",
    },
    {
      n: 3,
      title: "Modeling",
      body: "DAX measures (Revenue vs Peak, Stock Change 2021–25, R&D per $ of sales, exemption change), all using DIVIDE and fixed comparison years so KPIs ignore cross-filtering.",
    },
    {
      n: 4,
      title: "Design",
      body: "One consistent color per company, direct labels instead of legends, zero baselines on bars, titles that state the finding, and alt text on every visual.",
    },
    {
      n: 5,
      title: "Integrity checks",
      body: "Every KPI re-validated against source rows. Causal language removed. Truncated coverage axis disclosed.",
    },
  ],
  decisions: [
    {
      choice: "Line over area",
      why: "Five companies stay separate. An area chart would stack them into a total this story is not claiming.",
    },
    {
      choice: "No pies or donuts",
      why: "Angles are hard to compare. Lines and bars share a baseline.",
    },
    {
      choice: "Direct labels",
      why: "The company name sits on the mark, so the reader does not have to match a legend.",
    },
    {
      choice: "Colorblind-safe palette plus labels",
      why: "Each company keeps one color, and the label still names it when color is hard to see.",
    },
    {
      choice: "Single page by rule",
      why: "The contest entry is one page, so the argument stays in a single view.",
    },
    {
      choice: "Footnotes for restatements",
      why: "The GSK Haleon spin-off in 2022 and Merck’s 2023 acquisition charges are footnoted, not drawn as ordinary operating results.",
    },
  ],
} as const;
