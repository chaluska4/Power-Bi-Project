import { NewTabLink } from "@/components/NewTabLink";
import { sources, TODO_URL } from "@/content/sources";

function hasUrl(url: string) {
  return url !== TODO_URL && /^https?:\/\//.test(url);
}

export function Sources() {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-2xl">{sources.sourcesTitle}</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            {sources.items.map((item) => (
              <li key={item.label}>
                {hasUrl(item.url) ? (
                  <NewTabLink
                    href={item.url}
                    className="font-semibold text-teal underline decoration-2 underline-offset-4"
                  >
                    {item.label}
                  </NewTabLink>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-2xl">{sources.notesTitle}</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            {sources.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="mt-4 rounded-xl border border-line border-l-4 border-l-teal bg-white p-5 shadow-card">
        <h2 className="text-2xl">{sources.accuracyTitle}</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          {sources.accuracy.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
