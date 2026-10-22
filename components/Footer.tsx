import { site, ui } from "@/content/site";

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-muted">{site.footer}</p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-semibold text-teal underline decoration-2 underline-offset-4"
        >
          {ui.backToTop}
        </a>
      </div>
    </footer>
  );
}
