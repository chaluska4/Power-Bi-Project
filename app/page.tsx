import { DashboardViewer } from "@/components/DashboardViewer";
import { HowToRead } from "@/components/HowToRead";
import { KpiStrip } from "@/components/KpiStrip";
import { site, ui } from "@/content/site";
import { getEmbedUrl } from "@/lib/config";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata(site.title, "/");

export default function Page() {
  const embedUrl = getEmbedUrl();

  return (
    <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[1600px] px-4 pb-10 pt-3">
      <h1 className="text-balance text-xl leading-tight sm:text-2xl">{site.headline}</h1>
      <p className="mt-1 truncate text-muted" title={site.description}>
        {site.description}
      </p>
      <div className="mt-3">
        <DashboardViewer embedUrl={embedUrl} />
      </div>
      <div className="no-print mt-3 flex flex-wrap gap-3">
        <a
          className="btn-outline"
          href="/dashboard.png"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ui.openFull}
          <span className="sr-only"> {ui.newTab}</span>
        </a>
        <a className="btn-primary" href="/dashboard.pdf" download>
          {ui.downloadPdf}
        </a>
        {embedUrl ? (
          <a
            className="btn-outline"
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ui.openPowerBi}
            <span className="sr-only"> {ui.newTab}</span>
          </a>
        ) : null}
      </div>
      <HowToRead />
      <KpiStrip />
    </main>
  );
}
