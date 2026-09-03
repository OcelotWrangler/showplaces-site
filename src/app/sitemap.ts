import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Invite routes are intentionally absent: they are per-share, private, and
  // must not be discoverable.
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/privacy`, priority: 0.5 },
    { url: `${site.url}/coordinate-formats`, priority: 0.3 },
  ];
}
