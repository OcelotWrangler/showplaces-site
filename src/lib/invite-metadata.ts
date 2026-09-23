import type { Metadata } from "next";
import { site } from "./site";

/**
 * The card rendered by `app/opengraph-image.tsx`. Next attaches it on its own
 * only to segments that leave `openGraph` alone, so invite pages name it here.
 */
const socialCard = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${site.name} - ${site.tagline}`,
};

/**
 * Metadata for an invite page. Link previews (iMessage, Slack, and so on) read
 * `og:title` rather than `<title>`, and a segment that sets `openGraph` replaces
 * the layout's whole object instead of merging into it, so every field the
 * layout sets is restated here, the social card image included.
 *
 * Nothing here goes beyond what the page itself shows to anyone holding the link.
 */
export function inviteMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    // A share link is private; keep it out of search results even if one leaks.
    robots: { index: false, follow: false },
    // The layout points these at the home page, which would send scrapers that
    // honor og:url (Facebook, LinkedIn) off to fetch the home page's card instead.
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title,
      description,
      images: [socialCard],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialCard],
    },
  };
}
