export const submission = {
  heading: "The Dashboard",
  badge: "Contest entry · one page · Power BI",
  howToReadTitle: "How to read this dashboard",
  alt: "One-page dashboard. Four KPI tiles: Moderna revenue down 90% from its 2022 peak; Pfizer down 38% from its 2022 peak; Merck, Sanofi and GSK combined revenue up 29% from 2019 to 2025; kindergarten vaccine exemptions up from 2.5% to 4.2%. Line chart of revenue 2015–2025 with policy markers in 2020, 2023 and 2025. Bar chart of share-price change from end of 2021 to end of 2025: Moderna −88%, Pfizer −58%, Sanofi −3%, GSK +11%, Merck +37%. Column chart of Moderna revenue vs R&D, 2019–2025. Line chart of kindergarten MMR coverage falling from 95.2% to 92.4% against a 95% target.",
  enlarge: "Enlarge.",
  lightboxTitle: "Enlarged dashboard",
  close: "Close",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  resetZoom: "Reset zoom",
  fit: "Fit",
  fullscreen: "Fullscreen",
  exitFullscreen: "Exit fullscreen",
  zoomHelp: "Scroll, pinch, or use the zoom buttons. Press Escape to leave fullscreen.",
  howToRead: [
    {
      label: "KPI row",
      text: "Four tiles: Moderna and Pfizer off their 2022 peaks, Merck, Sanofi, and GSK combined revenue up since 2019, and kindergarten exemptions up.",
    },
    {
      label: "Revenue story",
      text: "The line chart runs from 2015 to 2025, with policy markers in 2020, 2023, and 2025.",
    },
    {
      label: "Market reaction",
      text: "Bars show share-price change from the end of 2021 to the end of 2025.",
    },
    {
      label: "Public-health context",
      text: "Moderna revenue is set against R&D, then kindergarten MMR coverage is set against the 95% target.",
    },
  ],
} as const;
