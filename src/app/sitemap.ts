import type { MetadataRoute } from "next";
import { offers } from "@/data/offers";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-29");
  const pages = ["", "/afisha", "/gid", "/o-proekte", "/kontakty"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...offers.map((o) => ({ url: `${site.url}/afisha/${o.slug}`, lastModified: now, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${site.url}/gid/${a.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
