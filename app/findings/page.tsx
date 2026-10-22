import Link from "next/link";
import { Findings } from "@/components/Findings";
import { PageEnd } from "@/components/PageEnd";
import { SafeImage } from "@/components/SafeImage";
import { findingsSection } from "@/content/findings";
import { ui } from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("Key Findings | Haluska Inc.", "/findings/");

export default function FindingsPage() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl sm:text-4xl">{findingsSection.heading}</h1>
        <Link
          href="/"
          className="mt-6 flex max-w-xl flex-col overflow-hidden rounded-xl border border-line bg-white text-ink no-underline shadow-card"
        >
          <SafeImage
            src="/dashboard-hero.jpg"
            alt={ui.heroImageAlt}
            width={960}
            height={545}
            sizes="(min-width: 640px) 576px, 100vw"
            className="h-auto w-full"
            fallback={<span className="block aspect-video bg-page" />}
          />
          <span className="px-4 py-3 font-semibold text-teal">{ui.viewOnDashboard}</span>
        </Link>
        <div className="mt-8">
          <Findings />
        </div>
      </div>
      <PageEnd current="/findings/" />
    </main>
  );
}
