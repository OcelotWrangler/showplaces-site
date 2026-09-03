/**
 * The Showplaces mark: the outlined map pin from the iOS app icon.
 *
 * Geometry is redrawn as vector rather than lifted from the icon PNG so it
 * stays crisp at any size and can take the gradient directly. Colors match
 * the icon's cyan-to-spring-green sweep.
 *
 * The gradient needs a document-unique id. `useId` is unavailable in a server
 * component, so pass `idPrefix` if a page ever renders two marks at once.
 */
export function PinMark({
  className,
  idPrefix = "pin",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const gradientId = `${idPrefix}-gradient`;

  return (
    <svg
      viewBox="0 0 100 132"
      role="img"
      aria-label="Showplaces"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0.15" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="100%" stopColor="var(--spring)" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 125.5c0 0-36-59.5-36-81.5a36 36 0 1 1 72 0c0 22-36 81.5-36 81.5z" />
        <circle cx="50" cy="44" r="16" />
      </g>
    </svg>
  );
}
