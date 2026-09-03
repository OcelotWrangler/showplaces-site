# showplaces.app

The Showplaces website (repo `OcelotWrangler/showplaces-site`, "Artemision"). Two
jobs today: a coming-soon landing page, and the public preview pages that share
links resolve to.

Stack and layout deliberately mirror [skyepowered.com](https://github.com/SkyePowered/www)
and the Daze site, so the three stay easy to move between.

## Stack

- Next.js 16.3.1 (App Router, Turbopack) + React 19.2.8 + TypeScript
- Tailwind CSS v4, tokens in `src/app/globals.css`
- MapKit JS 6 via `@apple/mapkit-loader`, Apple's official loader
- ESLint 9 with `eslint-config-next`
- Deployed on AWS Amplify Hosting (SSR / WEB_COMPUTE)

## Local development

```
npm install
cp .env.example .env.local   # then fill in the MapKit values
npm run dev
```

http://localhost:3000

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Layout

```
src/app/
  layout.tsx                       metadata, fonts, the .ground backdrop
  page.tsx                         the coming-soon landing page
  globals.css                      palette + .surface/.accent-*/.rise helpers
  icon.svg                         favicon
  opengraph-image.tsx              social card, rendered at build time
  robots.ts, sitemap.ts            both exclude the invite routes
  privacy/page.tsx
  coordinate-formats/page.tsx
  showplace-invites/[shareId]/     share preview, with a map
  group-invites/[shareId]/         share preview, no map (see below)
src/components/
  PinMark.tsx                      the brand pin, vector
  InviteMap.tsx                    the only "use client" component
  InviteShell.tsx                  header/footer frame + error states
  PlaceCard.tsx, ProsePage.tsx, SiteFooter.tsx
src/lib/
  site.ts                          all copy and links — edit here, not in components
  api.ts                           reads the Pharos invite-preview endpoints
  mapkit-token.ts                  mints the ES256 MapKit token
  types.ts                         TS mirrors of the Giza DTOs
  address.ts, share.ts             formatting helpers
```

Colors come from the iOS app icon: navy `#12094E`, and the pin's cyan `#22C7EC`
to spring-green `#2EE6A8` gradient. The site is dark-only on purpose — the mark
is built on that navy. Don't hardcode hex in components; use the tokens.

All motion is CSS-only and held still under `prefers-reduced-motion: reduce`.

## Share links

The iOS share sheet produces `https://showplaces.app/showplace-invites/{uuid}`
(see `ShareShowplaceSheet.swift`). Those pages server-render a preview from
Pharos's public endpoint, `GET /v1/showplace-invites/{shareId}`, which is
optionally authenticated — anonymous viewers get the preview.

Both invite routes are `force-dynamic`, `noindex`, and excluded from
`sitemap.ts` and `robots.ts`. A share link is private; it should never be
cached at the edge or indexed.

**The group page has no map.** `GroupInviteDTO` carries a bare `GroupDTO` —
title, description, cover image — and no showplaces, so there are no
coordinates to plot. If `GroupSharingService.getInvitePreview` ever returns the
group's showplaces, that page can drop in `<InviteMap />` exactly as the
showplace page does.

## Universal links

`public/.well-known/apple-app-site-association` associates
`/showplace-invites/*`, `/validate-email`, and `/reset-password` with the app.

`/group-invites/*` is **deliberately not** in that file. `URLHandler.swift` has
no group-invite branch, so associating it would make iOS open the app and then
do nothing. The web preview is the better outcome until the app handles it — add
the component then, not before.

## MapKit

`react-mapkit` was retired here: it was last published in June 2022 and never
supported React 18+. `@apple/mapkit-loader` is Apple's own loader and defaults
to MapKit JS 6.

The token is signed per request in a server component and passed to
`<InviteMap />` as a prop, so there is no public token-minting endpoint and no
extra round trip before the map draws. Tokens live 30 minutes.

`MAPKIT_ORIGIN` must exactly match the origin serving the page or Apple rejects
the token and the map silently never appears. Leave it empty locally to mint an
origin-less token; MapKit logs a warning about that, which is expected in dev.

If the key is missing or malformed the invite pages still render — the visitor
loses the map, not the address.

## Environment variables

Set these on the Amplify app. See `.env.example`.

| Variable | Required | Notes |
|---|---|---|
| `MAPKIT_PRIVATE_KEY` | yes | PKCS#8 PEM contents of the MapKit `.p8`. Literal `\n` is unescaped at runtime. |
| `MAPKIT_KEY_ID` | yes | MapKit key ID (JWT `kid`). |
| `MAPKIT_TEAM_ID` | yes | Apple team ID (JWT `iss`). |
| `MAPKIT_ORIGIN` | no | Defaults to `https://showplaces.app`. Empty = no origin restriction. |
| `API_BASE_URL` | no | Defaults to `https://api.showplaces.app`. |

The pre-rewrite names `MAPKIT_KEY` (JSON-wrapped), `KID`, and `ISS` are still
accepted as a fallback so an existing Amplify configuration keeps working, but
prefer the names above.

## Deploying

This folder is the repository root, so connecting the repo in the Amplify
console is enough — no monorepo app root to configure. `amplify.yml` is
committed mainly to pin Node 22 (Next 16 needs 20.9+).
