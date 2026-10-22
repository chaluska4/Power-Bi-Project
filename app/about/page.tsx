import { About } from "@/components/About";
import { PageEnd } from "@/components/PageEnd";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("About | Haluska Inc.", "/about/");

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl sm:text-4xl">{about.heading}</h1>
        <About />
      </div>
      <PageEnd current="/about/" />
    </main>
  );
}
