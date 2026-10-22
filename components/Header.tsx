"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site, ui } from "@/content/site";

function isCurrent(pathname: string, href: string) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return href === "/" ? path === "/" : path === href;
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  const text = current
    ? "font-semibold text-white"
    : "font-normal text-[#E2E8F0] hover:text-white";
  const shape = primary
    ? `rounded-full border-2 border-[#2DD4BF] ${
        current ? "border-b-[3px] bg-teal" : "hover:bg-white/10"
      }`
    : `rounded-t-lg border-b-[3px] hover:bg-white/10 ${
        current ? "border-[#2DD4BF]" : "border-transparent"
      }`;

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`inline-flex min-h-11 shrink-0 items-center gap-2 px-3 no-underline ${shape} ${text}`}
    >
      {primary ? <ChartIcon /> : null}
      {label}
    </Link>
  );
}

function Tabs({ pathname }: { pathname: string }) {
  return (
    <>
      {nav.map((item) => (
        <TabLink
          key={item.href}
          href={item.href}
          label={item.label}
          primary={item.primary}
          current={isCurrent(pathname, item.href)}
        />
      ))}
    </>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ left: false, right: false });

  const updateFade = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setFade({ left: node.scrollLeft > 2, right: node.scrollLeft < max - 2 });
  }, []);

  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, [updateFade]);

  return (
    <header id="site-header" className="on-navy sticky top-0 z-40 bg-navy text-white">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-1.5">
        <Link href="/" className="font-heading text-lg font-semibold text-white no-underline">
          {site.name}
        </Link>
        <nav
          aria-label={ui.primaryNav}
          className="hidden min-w-0 flex-1 items-end justify-end gap-1 md:flex"
        >
          <Tabs pathname={pathname} />
        </nav>
        <a href="/dashboard.pdf" className="btn-on-navy ml-auto shrink-0 md:ml-2" download>
          {ui.downloadPdf}
        </a>
      </div>
      <nav aria-label={ui.primaryNav} className="relative md:hidden">
        <div
          ref={scrollerRef}
          onScroll={updateFade}
          className="flex gap-1 overflow-x-auto px-4 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Tabs pathname={pathname} />
        </div>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-navy transition-opacity ${
            fade.left ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-navy transition-opacity ${
            fade.right ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
      <p className="border-t border-white/20 px-4 py-1 text-center text-[#E2E8F0]">
        {ui.breadcrumb}
      </p>
    </header>
  );
}
