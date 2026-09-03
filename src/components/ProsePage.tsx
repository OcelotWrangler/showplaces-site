import type { ReactNode } from "react";
import { InviteShell } from "@/components/InviteShell";

/**
 * Frame for the text pages (privacy, coordinate formats). Reuses the invite
 * header/footer frame so every page outside the landing page looks the same.
 */
export function ProsePage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <InviteShell>
      <article>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {updated ? (
          <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
        ) : null}
        <div
          className={[
            "mt-8 space-y-4 leading-relaxed text-muted",
            "[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
            "[&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
            "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
            "[&_a]:text-spring-mark [&_a]:underline [&_a]:underline-offset-2",
            "[&_em]:text-foreground [&_em]:not-italic [&_em]:font-medium",
          ].join(" ")}
        >
          {children}
        </div>
      </article>
    </InviteShell>
  );
}
