import type { PostalAddress } from "./types";

/**
 * Formats a postal address into display lines, dropping anything the geocoder
 * did not fill in. The pre-rewrite site printed "No City Found" in italics for
 * every blank field, which made sparse addresses look broken rather than short.
 */
export function addressLines(address: PostalAddress): string[] {
  const cityLine = [address.city, address.state]
    .filter(Boolean)
    .join(", ");

  return [
    address.street,
    [cityLine, address.postalCode].filter(Boolean).join(" "),
    address.country,
  ]
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** A one-line form, for map annotation subtitles and meta descriptions. */
export function addressSummary(address: PostalAddress): string {
  return addressLines(address).join(", ");
}
