import { Headshot } from "@/components/Headshot";
import { NewTabLink } from "@/components/NewTabLink";
import { about } from "@/content/about";
import { ui } from "@/content/site";
import { publicAssetExists } from "@/lib/assets";

export function About() {
  const showResume = publicAssetExists("resume.pdf");

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-line bg-white p-5 shadow-card sm:p-8 md:flex-row md:items-start">
      <Headshot />
      <div className="min-w-0">
        <h2 className="text-2xl">{about.name}</h2>
        <p className="mt-1 text-muted">{about.subtitle}</p>
        <p className="mt-4 max-w-prose">{about.bio}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {about.links.map((link) => (
            <NewTabLink key={link.href} href={link.href} className="btn-outline">
              {link.label}
            </NewTabLink>
          ))}
          {showResume ? (
            <NewTabLink href="/resume.pdf" className="btn-outline">
              {ui.resume}
            </NewTabLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}
