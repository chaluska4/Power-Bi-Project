import { Build } from "@/components/Build";
import { PageEnd } from "@/components/PageEnd";
import { build } from "@/content/build";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("Behind the Build | Haluska Inc.", "/build/");

export default function BuildPage() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-3xl sm:text-4xl">{build.heading}</h1>
        <Build />
      </div>
      <PageEnd current="/build/" />
    </main>
  );
}
