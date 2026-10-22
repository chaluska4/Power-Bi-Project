import type { ReactNode } from "react";
import { ui } from "@/content/site";

export function NewTabLink({
  href,
  className,
  children,
  download,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      download={download || undefined}
    >
      {children}
      <span className="sr-only"> {ui.newTab}</span>
    </a>
  );
}
