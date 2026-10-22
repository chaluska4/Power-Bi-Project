"use client";

import { useEffect, useRef } from "react";
import { submission } from "@/content/submission";

export function HowToRead() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    details.open = window.matchMedia("(min-width: 768px)").matches;
  }, []);

  return (
    <details ref={detailsRef} open className="mt-4 rounded-xl border border-line bg-white p-4 shadow-card">
      <summary className="cursor-pointer font-heading text-xl font-semibold">
        {submission.howToReadTitle}
      </summary>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {submission.howToRead.map((item) => (
          <li key={item.label}>
            <strong>{item.label}.</strong> {item.text}
          </li>
        ))}
      </ul>
    </details>
  );
}
