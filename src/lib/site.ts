/**
 * Single source of truth for site content and links.
 * Edit here rather than in the components.
 */

export const site = {
  name: "Showplaces",
  domain: "showplaces.app",
  url: "https://showplaces.app",
  tagline: "The places worth going back to.",
  description:
    "Showplaces is a private place-keeping app for iOS. Save the spots you actually care about, organize them your way, and share them with the people you choose.",
  /** Product support address. */
  email: "support@ocelotwrangler.com",
  company: "Ocelot Wrangler",
  status: "In development · coming to iOS",
} as const;

/** Rendered as the short "what is this" pitch on the landing page. */
export const pitch = [
  "A map of the places you never want to lose track of — the restaurant a friend swore by, the trailhead you found by accident, the house you grew up in.",
  "Tag them, group them, and share a place or a whole collection with whoever you want. Nothing is public by default and nothing tracks where you go.",
] as const;

/** The three-up value props under the pitch. */
export const highlights = [
  {
    title: "Private by default",
    body: "No account required to start. No location tracking on our servers. Analytics are anonymous and never tied to who you are.",
  },
  {
    title: "Organized your way",
    body: "Tag places however makes sense to you, and give each tag its own color and icon. Your styling stays yours, even on places someone shared with you.",
  },
  {
    title: "Shared on your terms",
    body: "Send a copy, share a live view, or collaborate on a list together. Every share can expire, and you can revoke access at any time.",
  },
] as const;

export const navLinks: { label: string; href: string }[] = [
  { label: "Coordinate Formats", href: "/coordinate-formats" },
  { label: "Privacy", href: "/privacy" },
];
