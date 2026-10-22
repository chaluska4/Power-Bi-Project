"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site, ui } from "@/content/site";

function isCurrent(pathname: string, href: string) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return href === "/" ? path === "/" : path === href;
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M4 19V5M4 19h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 15l4-4 3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TabLink({
  href,
  label,
  primary,
  current,
}: {
  href: string;
  label: string;
  primary: boolean;
  current: boolean;
}) {
  const active = current
    ? "underline decoration-[#99F6E4] decoration-[3px] underline-offset-4"
    : "";
  const className = primary
    ? `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 border-[#99F6E4] bg-teal px-3 font-semibold text-white no-underline ${active}`
    : `inline-flex min-h-11 shrink-0 items-center rounded-lg px-3 font-semibold text-white no-underline hover:bg-white/10 ${active}`;

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={className}
    >
      {primary ? <ChartIcon /> : null}
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname() || "/";

  return (
    <header id="site-header" className="on-navy sticky top-0 z-40 bg-navy text-white">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-2">
        <Link
          href="/"
          className="font-heading text-lg font-semibold text-white no-underline"
        >
          {site.name}
        </Link>
        <nav
          aria-label={ui.primaryNav}
          className="hidden min-w-0 flex-1 items-center justify-end gap-1 md:flex"
        >
          {nav.map((item) => (
            <TabLink
              key={item.href}
              href={item.href}
              label={item.label}
              primary={item.primary}
              current={isCurrent(pathname, item.href)}
            />
          ))}
        </nav>
        <a href="/dashboard.pdf" className="btn-on-navy ml-auto shrink-0 md:ml-2" download>
          {ui.downloadPdf}
        </a>
      </div>
      <nav aria-label={ui.primaryNav} className="md:hidden">
        <div className="flex gap-1 overflow-x-auto px-4 pb-2">
          {nav.map((item) => (
            <TabLink
              key={item.href}
              href={item.href}
              label={item.label}
              primary={item.primary}
              current={isCurrent(pathname, item.href)}
            />
          ))}
        </div>
      </nav>
      <p className="border-t border-white/20 px-4 py-1.5 text-center text-[#E2E8F0]">
        {ui.breadcrumb}
      </p>
    </header>
  );
}
