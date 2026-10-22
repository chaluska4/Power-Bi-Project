import Link from "next/link";
import { nav, ui } from "@/content/site";

export function PageEnd({ current }: { current: string }) {
  const index = nav.findIndex((item) => item.href === current);
  const prev = index > 0 ? nav[index - 1] : null;
  const next = index >= 0 && index < nav.length - 1 ? nav[index + 1] : null;

  return (
    <div className="page-end mt-12">
      <Link
        href="/"
        className="flex min-h-16 items-center justify-center bg-teal px-4 py-6 text-center font-heading text-xl font-semibold text-white no-underline"
      >
        {ui.seeDashboard}
      </Link>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        {prev ? (
          <Link href={prev.href} className="btn-outline">
            {ui.previous}: {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="btn-outline">
            {ui.next}: {next.label}
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
