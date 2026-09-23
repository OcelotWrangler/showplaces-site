import "server-only";

import { cache } from "react";
import type { InviteEnvelope, SharedGroup, SharedShowplace } from "./types";

/**
 * Pharos (the backend) base URL. Overridable so the site can be pointed at a
 * local Vapor instance during development.
 */
const apiBaseUrl = process.env.API_BASE_URL ?? "https://api.showplaces.app";

/** How long a fetched invite preview may be reused. Shares can be revoked, so keep it short. */
const revalidateSeconds = 60;

export type InviteResult<T> =
  | { status: "ok"; shared: T }
  /** The invite was reachable but is not usable — expired, revoked, used up, or unknown. */
  | { status: "invalid"; message: string }
  /** We could not reach the backend, or it answered in a way we did not expect. */
  | { status: "unavailable"; message: string };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

async function fetchInvite<T>(
  path: string,
  shareId: string,
): Promise<InviteResult<T>> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/v1/${path}/${shareId}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: revalidateSeconds },
    });
  } catch {
    return {
      status: "unavailable",
      message: "We could not reach Showplaces just now. Please try again.",
    };
  }

  // The backend answers 404 for an invite that never existed and 410-ish
  // semantics via the envelope's errorMessage for one that has lapsed.
  if (response.status === 404) {
    return {
      status: "invalid",
      message: "This link is no longer valid. It may have expired or been revoked.",
    };
  }

  if (!response.ok) {
    return {
      status: "unavailable",
      message: "Showplaces could not open this link right now. Please try again.",
    };
  }

  let envelope: InviteEnvelope<T>;

  try {
    envelope = (await response.json()) as InviteEnvelope<T>;
  } catch {
    return {
      status: "unavailable",
      message: "Showplaces sent back something unexpected. Please try again.",
    };
  }

  if (!envelope.shared) {
    return {
      status: "invalid",
      message:
        envelope.errorMessage ??
        "This link is no longer valid. It may have expired or been revoked.",
    };
  }

  return { status: "ok", shared: envelope.shared };
}

// Wrapped in `cache` because each invite page reads the invite twice per
// request, once in `generateMetadata` and once to render.
export const fetchShowplaceInvite = cache(
  (shareId: string): Promise<InviteResult<SharedShowplace>> =>
    fetchInvite<SharedShowplace>("showplace-invites", shareId),
);

export const fetchGroupInvite = cache(
  (shareId: string): Promise<InviteResult<SharedGroup>> =>
    fetchInvite<SharedGroup>("group-invites", shareId),
);
