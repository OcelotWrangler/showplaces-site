import Link from "next/link";
import type { ReactNode } from "react";
import { PinMark } from "@/components/PinMark";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

/** Common frame for the invite pages: brand header, content, footer. */
export function InviteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="mx-auto w-full max-w-3xl px-6 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <PinMark className="h-7 w-auto" idPrefix="header-pin" />
          <span className="text-lg font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-8 pb-4">
        {children}
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * Shown when a link cannot be opened. Deliberately vague about *why* an invite
 * is unusable — whether a share was revoked or simply never existed is not
 * something a stranger holding the link should be able to probe.
 */
export function InviteProblem({
  heading,
  message,
}: {
  heading: string;
  message: string;
}) {
  return (
    <InviteShell>
      <div className="surface rounded-3xl px-6 py-12 text-center sm:px-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {heading}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">{message}</p>
        <Link
          href="/"
          className="accent-button mt-8 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          About Showplaces
        </Link>
      </div>
    </InviteShell>
  );
}

/**
 * The footer note on a valid invite.
 *
 * These pages are the universal-link target for `showplaces.app/showplace-invites/*`
 * and `/group-invites/*`, so anyone who already has the app installed is handed
 * straight to it and never sees this page. That makes this the not-installed
 * path — and until the app ships there is no App Store URL to send them to, so
 * it says so plainly rather than linking somewhere useless.
 */
export function GetTheApp() {
  return (
    <div className="surface mt-6 rounded-2xl px-5 py-5 text-sm sm:px-6">
      <h2 className="font-semibold">Open this in Showplaces</h2>
      <p className="mt-2 leading-relaxed text-muted">
        If you have Showplaces installed, this link opens straight into the app,
        where you can save it to your own places. Showplaces isn&rsquo;t on the
        App Store yet — it&rsquo;s still in development, coming to iOS.
      </p>
    </div>
  );
}
