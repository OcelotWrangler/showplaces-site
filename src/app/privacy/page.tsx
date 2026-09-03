import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";
import { site } from "@/lib/site";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * NEEDS REVIEW BEFORE APP STORE SUBMISSION.
 *
 * This was rewritten in September 2026 to describe the architecture that
 * actually exists (accounts, the Pharos backend, S3 media, TelemetryDeck and
 * Sentry). The previous version still described a contacts-geocoding app that
 * stored everything in iCloud, which had not been true for a long time.
 *
 * It is written from the design docs and the code, not by a lawyer. Read it
 * against what ships and confirm it lines up with the App Store privacy
 * nutrition label before submitting.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Showplaces handles your data: what is stored, what is never collected, and how to delete it.",
};

export default function Privacy() {
  return (
    <ProsePage title="Privacy Policy" updated="September 2, 2026">
      <p>
        Showplaces is built around a simple idea: the places you save are yours.
        This policy describes what the app stores, what leaves your device, and
        what we never collect at all.
      </p>

      <h2>What Showplaces stores</h2>
      <p>
        Places you save — their name, description, address, coordinates, tags,
        and any photos or videos you attach — along with the groups you sort
        them into. Everything is kept on your device so the app works offline.
      </p>
      <p>
        If you create an account, that same content is also stored on our
        servers so it can sync between your devices and be shared with people
        you choose. Media files are stored in Amazon S3. Accounts are created
        with Sign in with Apple; we never see or store a password.
      </p>

      <h2>You do not need an account</h2>
      <p>
        Showplaces works without signing in. If you never create an account,
        your places stay on your device and are never uploaded to us.
      </p>

      <h2>Location</h2>
      <p>
        <em>We do not track where you go.</em> The app uses your location to
        show you on the map and to help you add nearby places, and that happens
        entirely on your device.
      </p>
      <p>
        Visit tracking — noticing when you arrive somewhere you have saved — is
        off unless you turn it on. It runs on-device using geofences. If you
        turn it off, those geofences are removed and monitoring stops. Visit
        history only reaches our servers if you enable cloud sync, and it is
        never fed into analytics.
      </p>

      <h2>Sharing</h2>
      <p>
        Nothing you save is public by default. When you share a place or a
        group, we create a link that only works for whoever you send it to.
        Depending on the mode you pick, a link either hands over a one-time copy
        or keeps the recipient in sync with yours. Links can expire, and you can
        revoke access or remove a collaborator at any time.
      </p>

      <h2>Analytics and crash reporting</h2>
      <p>
        We use TelemetryDeck to understand how the app is used, and Sentry to
        find crashes and errors.
      </p>
      <ul>
        <li>
          Analytics are anonymous by design. A random identifier is generated
          per install — not your Apple ID, not an advertising identifier — and
          it is salted and hashed on your device before it is ever sent.
        </li>
        <li>
          Analytics are never linked to your account, even if you are signed in.
        </li>
        <li>
          Event data is limited to feature-level metadata such as app version,
          plan tier, and locale. The names, descriptions, tags, and coordinates
          of your places are never included.
        </li>
        <li>TelemetryDeck does not store IP addresses.</li>
      </ul>
      <p>
        Crash reports contain diagnostic information about the failure — such as
        a stack trace, the device model, and the app version — so bugs can be
        fixed.
      </p>

      <h2>Email</h2>
      <p>
        If you create an account, we use SendGrid to send account email such as
        address verification. We do not send marketing email.
      </p>

      <h2>What we never do</h2>
      <ul>
        <li>We do not sell your data.</li>
        <li>We do not show ads or share your data with advertisers.</li>
        <li>We do not build a profile of you or track you across other apps.</li>
        <li>The website does not use cookies or third-party trackers.</li>
      </ul>

      <h2>Deleting your data</h2>
      <p>
        You can delete your account from within the app. Doing so permanently
        removes everything you own, including your places, groups, and uploaded
        media. Any live or collaborative links you created stop working and that
        content is removed from your collaborators&rsquo; libraries.
      </p>
      <p>
        Encrypted database backups are taken nightly and kept for a limited
        period so data can be restored after an accidental deletion. Backups age
        out on their own schedule after an account is deleted.
      </p>

      <h2>Children</h2>
      <p>
        Showplaces is not directed at children under 13, and we do not knowingly
        collect information from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        This policy may change as the app changes. Material changes will be
        noted by updating the date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy, or a request to access or delete your data, can
        go to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </ProsePage>
  );
}
