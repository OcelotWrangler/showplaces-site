import { addressLines } from "@/lib/address";
import type { Showplace } from "@/lib/types";

/**
 * One shared place: name, tags, address.
 *
 * Tag titles travel with the showplace, but tag *styling* (color, SF Symbol)
 * lives in each user's personal Tag Style library and is resolved at render
 * time on-device — so the web has no colors to resolve and renders tags as
 * neutral chips. See `Documents/showplaces-tags-and-groups.md`.
 */
export function PlaceCard({ showplace }: { showplace: Showplace }) {
  const lines = addressLines(showplace.postalAddress);

  return (
    <li className="surface rounded-2xl px-5 py-5 sm:px-6">
      <h3 className="text-lg font-semibold tracking-tight">
        {showplace.title}
      </h3>

      {showplace.subtitle ? (
        <p className="mt-0.5 text-sm text-muted">{showplace.subtitle}</p>
      ) : null}

      {showplace.tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {showplace.tags.map((tag) => (
            <li
              key={tag.id}
              className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted"
            >
              {tag.title}
            </li>
          ))}
        </ul>
      ) : null}

      {lines.length > 0 ? (
        <address className="mt-3 text-sm leading-relaxed text-muted not-italic">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ) : null}

      {showplace.description ? (
        <p className="mt-3 text-sm leading-relaxed">{showplace.description}</p>
      ) : null}
    </li>
  );
}
