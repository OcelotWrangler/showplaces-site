import type { Metadata } from "next";
import { InviteMap } from "@/components/InviteMap";
import {
  GetTheApp,
  InviteProblem,
  InviteShell,
} from "@/components/InviteShell";
import { PlaceCard } from "@/components/PlaceCard";
import { fetchShowplaceInvite, isUuid } from "@/lib/api";
import { addressSummary } from "@/lib/address";
import { createMapKitToken } from "@/lib/mapkit-token";
import { describeShare } from "@/lib/share";

/**
 * Public preview for `showplaces.app/showplace-invites/{shareId}`, the link the
 * iOS share sheet produces (see `ShareShowplaceSheet.swift`). Also the universal
 * link target, so this only renders for people who do not have the app.
 */

// Shares can be revoked at any time, so never prerender these at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shared place",
  // A share link is private; keep it out of search results even if one leaks.
  robots: { index: false, follow: false },
};

export default async function ShowplaceInvitePage({
  params,
}: PageProps<"/showplace-invites/[shareId]">) {
  const { shareId } = await params;

  if (!isUuid(shareId)) {
    return (
      <InviteProblem
        heading="This link doesn't look right"
        message="Check that you copied the whole link, then try again."
      />
    );
  }

  const result = await fetchShowplaceInvite(shareId);

  if (result.status !== "ok") {
    return (
      <InviteProblem
        heading={
          result.status === "invalid"
            ? "This link is no longer active"
            : "Something went wrong"
        }
        message={result.message}
      />
    );
  }

  const { showplace, shareType, accessLevel } = result.shared;
  const share = describeShare(shareType, accessLevel);
  const token = await mapKitTokenOrNull();

  return (
    <InviteShell>
      <p className="text-sm font-medium text-muted">{share.label}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {showplace.title}
      </h1>
      <p className="mt-2 max-w-xl leading-relaxed text-muted">{share.blurb}</p>

      {token ? (
        <div className="mt-7 h-[320px] sm:h-[400px]">
          <InviteMap
            token={token}
            pins={[
              {
                id: showplace.id,
                title: showplace.title,
                subtitle: addressSummary(showplace.postalAddress),
                latitude: showplace.latitude,
                longitude: showplace.longitude,
              },
            ]}
          />
        </div>
      ) : null}

      <ul className="mt-6 space-y-4">
        <PlaceCard showplace={showplace} />
      </ul>

      <GetTheApp />
    </InviteShell>
  );
}

/**
 * A missing or malformed MapKit key should cost the visitor the map, not the
 * whole page — the address is the part they actually need.
 */
async function mapKitTokenOrNull(): Promise<string | null> {
  try {
    return await createMapKitToken();
  } catch (error) {
    console.error("Could not mint a MapKit token:", error);
    return null;
  }
}
