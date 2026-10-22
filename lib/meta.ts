import type { Metadata } from "next";
import { site } from "@/content/site";

const image = {
  url: "/dashboard.png",
  width: 3840,
  height: 2179,
  alt: site.headline,
};

export function pageMetadata(title: string, path: string): Metadata {
  return {
    title,
    description: site.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: site.description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      images: ["/dashboard.png"],
    },
  };
}
