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

**Link previews carry the shared item's title.** iMessage, Slack and friends
read `og:title`, so both pages build their metadata in `generateMetadata` via
`lib/invite-metadata.ts`, falling back to "Shared place" / "Shared group" when
the invite cannot be loaded. Setting `openGraph` on a page replaces the
layout's whole object and drops the image `app/opengraph-image.tsx` would
otherwise attach, so that helper restates the site name, type and card image
too. `lib/api.ts` wraps the invite fetches in React `cache`, so the metadata
and the page share one call to Pharos.

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

### Authentication

Auth is a **Maps token** — a long-lived, domain-restricted token generated in
the Apple Developer account, not a JWT this site signs. To create or rotate it:

> Developer Account → Certificates, Identifiers & Profiles → **Services** →
> Maps → **Configure** → **Tokens** → **+** → Token Type **MapKit JS** →
> Restriction Type **Domain** → Websites: a comma-delimited list of domains.

It is exposed as `NEXT_PUBLIC_MAPKIT_TOKEN` and reaches the browser, which is
fine and is how Apple's own examples do it — MapKit JS needs it client-side
regardless. **The domain restriction, not the token's secrecy, is the security
boundary.** If it ever leaks, revoke it on that same screen and issue a new one.

This replaced a self-signed ES256 JWT built from a `.p8` private key. Three
reasons it is better, all of which bit us:

- No Apple private key in the repo, the environment, or the build artifact.
- A JWT's `origin` claim holds **one** value. A Maps token takes a list, so the
  apex and `www` are both covered without a redirect.
- `NEXT_PUBLIC_` is inlined at build time, so the map no longer depends on
  Amplify's runtime environment (see below).

The JWT path still exists for the Maps **Server** API (sign with scope
`mapkit_js`), so it comes back if server-side geocoding is ever added. It is
just the wrong tool for embedding a map.

Prefer **No Expiration** on the token. An expiring token dies silently in
production, and the domain restriction is the control that actually matters.

### Local development needs a second token

The production token is bound to the `showplaces.app` domains and Apple will
reject it on `http://localhost:3000`. Create a second token with **Restriction
Type = None**, keep it in `.env.local`, and never deploy it. Leaving
`NEXT_PUBLIC_MAPKIT_TOKEN` blank is also fine — the page renders without a map.

### Failure is visible, deliberately

A rejected token does not reject `load()`. Apple validates it over the network
and reports it on the `mapkit` `"error"` event with `status: "Unauthorized"`,
which is why `InviteMap.tsx` listens for that. Without the listener a revoked
token, an expired one, or a domain missing from the Websites list all render as
a blank grey rectangle with nothing in the UI to explain it.

If there is no token at all, the invite pages still render — the visitor loses
the map, not the address.

## Environment variables

Set these on the Amplify app. See `.env.example`.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_MAPKIT_TOKEN` | yes | Maps token, domain-restricted. Public by design. |
| `API_BASE_URL` | no | Defaults to `https://api.showplaces.app`. |

### Amplify does not pass console variables to the SSR runtime

Worth knowing even though the map no longer depends on it. Environment
variables set in the Amplify console reach the **build** container only — the
SSR compute function that serves requests never sees them, [by design][ssr-env],
to avoid leaking build-time secrets. A server component reading `process.env` at
request time gets `undefined`.

`amplify.yml` therefore writes them into `.env.production` during the build,
which Next.js does load at runtime, and then hard-fails the build if the MapKit
token is missing. A red build beats a silently mapless deploy.

`NEXT_PUBLIC_*` variables are inlined by Next at build time and so do not
strictly need this, but the build spec covers them anyway — it costs nothing.

If you ever add a variable holding a genuine secret, note that this approach
bakes it into the deployment artifact, which AWS warns against; use [an IAM role
on the compute function][ssr-role] instead.

[ssr-env]: https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html
[ssr-role]: https://docs.aws.amazon.com/amplify/latest/userguide/amplify-SSR-compute-role.html


## Deploying

This folder is the repository root, so connecting the repo in the Amplify
console is enough — no monorepo app root to configure. `amplify.yml` is
committed mainly to pin Node 22 (Next 16 needs 20.9+).
