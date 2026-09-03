import type { AccessLevel, ShareType } from "./types";

/**
 * Human wording for the three share modes described in
 * `Documents/showplaces-sharing.md`. `.copy` is a frozen snapshot; `.live` is a
 * reference back to the sender's copy, read-only ("Live") or editable
 * ("Collaborate") depending on the access level.
 */
export function describeShare(
  shareType: ShareType,
  accessLevel: AccessLevel,
): { label: string; blurb: string } {
  if (shareType === "COPY") {
    return {
      label: "Sent as a copy",
      blurb:
        "Accepting this adds your own independent copy. Later changes by the sender will not appear.",
    };
  }

  if (accessLevel === "EDITABLE") {
    return {
      label: "Shared to collaborate",
      blurb:
        "Accepting this lets you view and edit alongside the sender. Everyone sees each other's changes.",
    };
  }

  return {
    label: "Shared live",
    blurb:
      "Accepting this keeps it in sync with the sender's copy. You will see their updates, but cannot edit.",
  };
}
