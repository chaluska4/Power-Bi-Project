"use client";

import { SafeImage } from "@/components/SafeImage";
import { about } from "@/content/about";
import { ui } from "@/content/site";

export function Headshot() {
  return (
    <SafeImage
      src="/headshot.jpg"
      alt={about.headshotAlt}
      width={640}
      height={640}
      sizes="160px"
      className="h-40 w-40 rounded-xl object-cover"
      fallback={
        <span
          role="img"
          aria-label={about.headshotAlt}
          className="flex h-40 w-40 items-center justify-center rounded-xl bg-navy text-center text-white"
        >
          <span aria-hidden="true" className="font-heading text-3xl">
            CH
          </span>
          <span className="sr-only">{ui.missingHeadshot}</span>
        </span>
      }
    />
  );
}
