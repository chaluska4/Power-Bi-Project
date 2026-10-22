import { PageEnd } from "@/components/PageEnd";
import { Sources } from "@/components/Sources";
import { sources } from "@/content/sources";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("Sources & Notes | Haluska Inc.", "/sources/");

export default function SourcesPage() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl sm:text-4xl">{sources.heading}</h1>
        <Sources />
      </div>
      <PageEnd current="/sources/" />
    </main>
  );
}
