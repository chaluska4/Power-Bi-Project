import Link from "next/link";
import { companies } from "@/content/companies";
import { findings } from "@/content/findings";

export function KpiStrip() {
  return (
    <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-4">
      {findings.map((finding) => (
        <li key={finding.value}>
          <Link
            href="/findings/"
            className="flex h-full flex-col rounded-xl border border-line bg-white p-3 text-ink no-underline shadow-card"
          >
            <span className="mb-2 flex h-2.5 gap-1.5" aria-hidden="true">
              {finding.companies.map((key) => (
                <span
                  key={key}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: companies[key].color }}
                />
              ))}
            </span>
            <span className="font-heading text-2xl font-semibold leading-none">
              <span className="sr-only">{finding.label}: </span>
              {finding.value}
            </span>
            <span className="mt-2">{finding.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
