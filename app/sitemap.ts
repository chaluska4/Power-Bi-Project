import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/findings/", "/build/", "/about/", "/sources/"];
  return paths.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    changeFrequency: "yearly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));
}
