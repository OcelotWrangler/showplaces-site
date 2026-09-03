import type { Metadata } from "next";
import Image from "next/image";
import {
  GetTheApp,
  InviteProblem,
  InviteShell,
} from "@/components/InviteShell";
import { fetchGroupInvite, isUuid } from "@/lib/api";
import { describeShare } from "@/lib/share";

/**
 * Public preview for `showplaces.app/group-invites/{shareId}`.
 *
 * Note there is no map here. `GroupInviteDTO` carries a bare `GroupDTO`
 * (title, description, cover image) and no showplaces, so the site has no
 * coordinates to plot — see `GroupSharingService.getInvitePreview`. If that
 * preview ever grows a showplace list, this page can render `<InviteMap />`
 * exactly the way the showplace invite page does.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shared group",
  robots: { index: false, follow: false },
};

export default async function GroupInvitePage({
  params,
}: PageProps<"/group-invites/[shareId]">) {
  const { shareId } = await params;

  if (!isUuid(shareId)) {
    return (
      <InviteProblem
        heading="This link doesn't look right"
        message="Check that you copied the whole link, then try again."
      />
    );
  }

  const result = await fetchGroupInvite(shareId);

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

  const { group, shareType, accessLevel } = result.shared;
  const share = describeShare(shareType, accessLevel);
  const cover = group.coverImage;

  return (
    <InviteShell>
      <p className="text-sm font-medium text-muted">{share.label}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {group.title}
      </h1>
      <p className="mt-2 max-w-xl leading-relaxed text-muted">{share.blurb}</p>

      {cover ? (
        <div className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={cover.url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}

      {group.description ? (
        <div className="surface mt-6 rounded-2xl px-5 py-5 sm:px-6">
          <p className="leading-relaxed">{group.description}</p>
        </div>
      ) : null}

      <p className="mt-6 text-sm leading-relaxed text-muted">
        Open this group in Showplaces to see the places it holds.
      </p>

      <GetTheApp />
    </InviteShell>
  );
}
