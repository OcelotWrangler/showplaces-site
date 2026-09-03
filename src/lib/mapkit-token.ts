import "server-only";

import { SignJWT, importPKCS8 } from "jose";
import type { CryptoKey } from "jose";

/**
 * Mints the ES256 JWT that authorizes MapKit JS.
 *
 * Apple's requirements: an ES256 signature from the MapKit private key (.p8),
 * `kid` set to the MapKit key ID, `iss` set to the Apple Developer team ID, and
 * an `origin` claim that exactly matches the origin serving the page. A token
 * with a mismatched `origin` is rejected by Apple with a 401 and the map simply
 * never appears, so `MAPKIT_ORIGIN` must track wherever the site is deployed.
 *
 * Required environment variables:
 *   MAPKIT_PRIVATE_KEY  the full PKCS#8 PEM contents of the .p8 file
 *   MAPKIT_KEY_ID       the 10-character MapKit key ID   (JWT `kid`)
 *   MAPKIT_TEAM_ID      the 10-character Apple team ID   (JWT `iss`)
 * Optional:
 *   MAPKIT_ORIGIN       origin to lock the token to; defaults to https://showplaces.app.
 *                       Set to an empty string to mint an origin-less token — necessary
 *                       for local development against http://localhost:3000.
 */

/** Apple caps MapKit tokens at a year; short-lived tokens limit the blast radius of a leak. */
const TOKEN_LIFETIME = "30m";

const DEFAULT_ORIGIN = "https://showplaces.app";

export class MapKitConfigurationError extends Error {}

/**
 * Reads a variable under its current name, falling back to the name the
 * pre-rewrite site used so an existing Amplify configuration keeps working.
 */
function readEnv(name: string, legacyName: string): string | undefined {
  return process.env[name] ?? process.env[legacyName];
}

/**
 * The private key. The pre-rewrite site stored it as JSON (`{"mapkit_key": "..."}`)
 * in MAPKIT_KEY; the plain PEM in MAPKIT_PRIVATE_KEY is preferred now. Amplify and
 * most CI systems flatten newlines to a literal `\n`, so those are restored here.
 */
function readPrivateKey(): string {
  const direct = process.env.MAPKIT_PRIVATE_KEY;
  if (direct) return direct.replace(/\\n/g, "\n").trim();

  const legacy = process.env.MAPKIT_KEY;
  if (legacy) {
    try {
      const parsed: unknown = JSON.parse(legacy);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "mapkit_key" in parsed &&
        typeof (parsed as { mapkit_key: unknown }).mapkit_key === "string"
      ) {
        return (parsed as { mapkit_key: string }).mapkit_key
          .replace(/\\n/g, "\n")
          .trim();
      }
    } catch {
      // Not JSON — fall through and treat the value itself as the PEM.
    }
    return legacy.replace(/\\n/g, "\n").trim();
  }

  throw new MapKitConfigurationError(
    "MAPKIT_PRIVATE_KEY is not set. The map cannot be rendered without it.",
  );
}

// importPKCS8 is not free, and the key never changes for the life of the process.
let cachedKey: Promise<CryptoKey> | undefined;

function privateKey(): Promise<CryptoKey> {
  cachedKey ??= importPKCS8(readPrivateKey(), "ES256");
  return cachedKey;
}

export async function createMapKitToken(): Promise<string> {
  const keyId = readEnv("MAPKIT_KEY_ID", "KID");
  const teamId = readEnv("MAPKIT_TEAM_ID", "ISS");

  if (!keyId) {
    throw new MapKitConfigurationError("MAPKIT_KEY_ID is not set.");
  }
  if (!teamId) {
    throw new MapKitConfigurationError("MAPKIT_TEAM_ID is not set.");
  }

  // `?? DEFAULT_ORIGIN` rather than `||` on purpose: an explicitly empty
  // MAPKIT_ORIGIN is the documented way to mint an origin-less dev token.
  const origin = process.env.MAPKIT_ORIGIN ?? DEFAULT_ORIGIN;

  const token = new SignJWT(origin ? { origin } : {})
    .setProtectedHeader({ alg: "ES256", kid: keyId, typ: "JWT" })
    .setIssuer(teamId)
    .setIssuedAt()
    .setExpirationTime(TOKEN_LIFETIME);

  return token.sign(await privateKey());
}
