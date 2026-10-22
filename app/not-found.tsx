import Link from "next/link";
import { ui } from "@/content/site";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl sm:text-4xl">{ui.pageNotFound}</h1>
      <p className="mt-6">
        <Link href="/" className="btn-primary">
          {ui.seeDashboard}
        </Link>
      </p>
    </main>
  );
}
