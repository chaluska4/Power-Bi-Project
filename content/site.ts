export const site = {
  name: "Haluska Inc.",
  title: "Haluska Inc. | From Windfall to Whiplash",
  description:
    "COVID vaccine purchases drove a 2021–22 boom. Diversified drugmakers kept growing after it; mRNA makers fell back. Kindergarten MMR coverage was already slipping.",
  url: "https://contest.colinhaluska.com",
  eyebrow: "Muhlenberg Data Lab · Data Visualization Contest 2026",
  headline: "From Windfall to Whiplash: Five Vaccine Makers, 2015–2025",
  teamLine: "Team Haluska Inc. · Built in Power BI by Colin Haluska",
  footer:
    "© 2026 Haluska Inc. · Colin Haluska · Built for the Muhlenberg College Data Lab Data Visualization Contest.",
} as const;

export const nav = [
  { href: "/", label: "Dashboard", primary: true },
  { href: "/findings/", label: "Key Findings", primary: false },
  { href: "/build/", label: "Behind the Build", primary: false },
  { href: "/about/", label: "About", primary: false },
  { href: "/sources/", label: "Sources & Notes", primary: false },
] as const;

export const ui = {
  skip: "Skip to content",
  primaryNav: "Primary",
  breadcrumb:
    "Muhlenberg Data Lab · Data Visualization Contest 2026 · Team Haluska Inc.",
  downloadPdf: "Download PDF",
  openFull: "Open full resolution",
  openPowerBi: "Open in Power BI",
  newTab: "(opens in a new tab)",
  backToTop: "Back to top",
  resume: "Resume",
  seeDashboard: "See the dashboard →",
  viewOnDashboard: "View on dashboard →",
  pageNotFound: "Page not found",
  previous: "Previous",
  next: "Next",
  missingDashboard: "Add public/dashboard.png to show the dashboard.",
  missingHeadshot: "Add public/headshot.jpg to show a headshot.",
  heroImageAlt:
    "Thumbnail of the one-page contest dashboard, From Windfall to Whiplash.",
} as const;
