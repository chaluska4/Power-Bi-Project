import { build } from "@/content/build";

export function Build() {
  return (
    <div>
      <nav
        aria-label={build.onThisPage}
        className="sticky top-[7.5rem] z-30 mb-8 hidden gap-4 border-b border-line bg-page/95 py-3 md:flex"
      >
        {build.subnav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="inline-flex min-h-11 items-center font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="process" aria-label={build.processLabel} className="scroll-mt-36">
        <ol className="m-0 max-w-3xl list-none p-0">
          {build.steps.map((step, index) => (
            <li key={step.n} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
              <div className="flex h-full flex-col items-center" aria-hidden="true">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-white">
                  {step.n}
                </span>
                {index < build.steps.length - 1 ? (
                  <span className="mt-2 w-0.5 flex-1 bg-navy/30" />
                ) : null}
              </div>
              <div className={index < build.steps.length - 1 ? "pb-8" : ""}>
                <h2 className="text-xl sm:text-2xl">
                  <span className="sr-only">Step {step.n}. </span>
                  {step.title}
                </h2>
                <p className="mt-2 break-words">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="decisions" aria-labelledby="decisions-heading" className="scroll-mt-36">
        <h2 id="decisions-heading" className="mt-12 text-2xl">
          {build.designTitle}
        </h2>
        <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {build.decisions.map((decision) => (
            <li
              key={decision.choice}
              className="rounded-xl border border-line bg-white p-5 shadow-card"
            >
              <h3 className="text-xl">{decision.choice}</h3>
              <p className="mt-2">{decision.why}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" aria-labelledby="tools-heading" className="scroll-mt-36">
        <h2 id="tools-heading" className="mt-12 text-2xl">
          {build.toolsTitle}
        </h2>
        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
          {build.tools.map((tool) => (
            <li key={tool} className="rounded-full border border-line bg-white px-4 py-2">
              {tool}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
