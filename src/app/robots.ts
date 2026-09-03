import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Invite links are private by nature — they should never be indexed.
      disallow: ["/showplace-invites/", "/group-invites/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
