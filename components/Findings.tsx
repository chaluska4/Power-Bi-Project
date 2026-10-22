import { companies } from "@/content/companies";
import { findings, findingsSection } from "@/content/findings";

export function Findings() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {findings.map((finding) => (
          <article
            key={finding.value}
            className="flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-card"
          >
            <div className="mb-3 flex h-2.5 gap-1.5" aria-hidden="true">
              {finding.companies.map((key) => (
                <span
                  key={key}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: companies[key].color }}
                />
              ))}
            </div>
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              <span className="sr-only">{finding.label}: </span>
              {finding.value}
            </h2>
            <p className="mt-3 flex-1">{finding.text}</p>
            <p className="mt-4 text-muted">{finding.source}</p>
          </article>
        ))}
      </div>
      <aside
        className="mt-4 rounded-xl border border-line border-l-4 bg-white p-5 shadow-card"
        style={{ borderLeftColor: findingsSection.calloutCompany.color }}
      >
        <p>{findingsSection.callout}</p>
        <p className="mt-3 text-muted">{findingsSection.calloutSource}</p>
      </aside>
      <p className="mt-6 max-w-3xl text-muted">{findingsSection.integrity}</p>
    </div>
  );
}
