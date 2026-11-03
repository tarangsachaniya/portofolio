import type { MetadataRoute } from "next";
import { nav, notes, site, work } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...nav.map((n) => ({ url: site.url + n.href, lastModified: now, changeFrequency: "monthly" as const, priority: n.href === "/" ? 1 : 0.8 })),
    ...work.map((w) => ({ url: `${site.url}/work/${w.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: w.featured ? 0.9 : 0.6 })),
    ...notes.map((n) => ({ url: `${site.url}/notes/${n.slug}/`, lastModified: new Date(n.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
