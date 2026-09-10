/**
 * The MapKit JS token.
 *
 * This is a *Maps token*, generated in the Apple Developer account under
 * Certificates, Identifiers & Profiles → Services → Maps → Configure → Tokens.
 * It is restricted to the Showplaces domains and can be revoked from that same
 * screen, which makes it safe to ship to the browser — MapKit JS needs it
 * client-side either way, and Apple's own examples put it in a `data-token`
 * attribute.
 *
 * That domain restriction, not the token's secrecy, is the security boundary.
 *
 * Because it is `NEXT_PUBLIC_`, Next.js inlines the value at build time, which
 * is why the map does not depend on Amplify's runtime environment (Amplify
 * withholds console variables from the SSR compute runtime — see the README).
 * The reference below must stay a literal `process.env.NEXT_PUBLIC_MAPKIT_TOKEN`
 * for that substitution to happen; don't refactor it behind a helper or index
 * into `process.env` dynamically.
 *
 * This replaced a self-signed ES256 JWT built from a `.p8` private key. That
 * approach is still required for the Maps *Server* API (scope `mapkit_js`), but
 * it is the wrong tool for embedding a map: it put an Apple private key into the
 * deployment artifact, and its single-valued `origin` claim could not cover both
 * the apex and `www`.
 */
export const mapKitToken = process.env.NEXT_PUBLIC_MAPKIT_TOKEN ?? null;
