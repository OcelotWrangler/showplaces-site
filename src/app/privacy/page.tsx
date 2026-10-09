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
 * The analytics section was checked against the TelemetryDeck SDK's source
 * (2.14.2) in October 2026; showplaces-analytics.md lists everything it sends.
 * Re-check it whenever the SDK is updated.
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
    <ProsePage title="Privacy Policy" updated="October 9, 2026">
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
        you choose. Media files are stored in Amazon S3. You sign in with Apple
        or with a one-time code we email you. There are no passwords, so we
        never see or store one. Your account holds your email address and, if
        you add them, a display name and profile picture. Location data is
        removed from a profile picture before it is stored.
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
      <p>
        People you share with in the app see your display name and profile
        picture, and you see theirs. Nobody else does, and your email address
        is never shown to anyone. Opening a share link on the web shows what
        was shared and the display name of the person who sent it.
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
          Deleting the app resets it.
        </li>
        <li>
          Analytics are never linked to your account, even if you are signed in.
        </li>
        <li>
          Each event records which feature was used, along with technical
          context: the app version, your device model and operating system
          version, language and region settings, your time zone as an offset
          from UTC (such as UTC−5), the time of day, accessibility settings
          such as larger text or reduced motion, and simple usage counts such as
          how many sessions you have had and how long they last. It also notes
          whether you are signed in and whether you have Pro, but never which
          account. The names, descriptions, tags, and
          coordinates of your places are never included, and neither is your
          location.
        </li>
        <li>
          When you buy Showplaces Pro in the app, an event records the plan,
          the price, and the country and currency of your App Store account.
          Like every other event, it is never linked to your account.
        </li>
        <li>TelemetryDeck does not store IP addresses.</li>
      </ul>
      <p>
        Crash and error reports contain diagnostic information about the
        failure — such as a stack trace, the kind of error and where in the
        app&rsquo;s code it happened, the device model and operating system
        version, the app version, which of the app&rsquo;s network requests
        failed with identifiers removed, and Apple&rsquo;s own reports of the
        app freezing or overusing the processor or storage — so bugs can be
        fixed. They never include what you were looking at or working on, such
        as the names, notes or locations of your places. Each report
        carries a random identifier for this install so repeated crashes can be
        counted. It is not linked to your account, and no IP address is stored.
        Reports never include screenshots or recordings of your screen.
      </p>

      <h2>Purchases</h2>
      <p>
        Showplaces Pro is sold by Apple through the App Store. Apple handles
        payment, and we never see your payment details or your Apple Account.
      </p>
      <ul>
        <li>
          To give Pro to your Showplaces account, the app sends our server the
          record Apple signs for your subscription. We keep the plan, its
          renewal and expiry dates, whether it was refunded, Apple&rsquo;s
          identifier for the subscription, and which Showplaces account it
          belongs to. Apple tells our server when the subscription renews,
          lapses, or is refunded.
        </li>
        <li>
          In a TestFlight beta build, the app sends Apple&rsquo;s signed record
          of how it was installed, so testers get Pro.
        </li>
      </ul>

      <h2>Email</h2>
      <p>
        If you create an account, we use SendGrid to send account email, such
        as your sign-in codes. We do not send marketing email.
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
        Deleting your account does not cancel a Showplaces Pro subscription,
        which Apple bills: cancel it in your Apple Account&rsquo;s subscription
        settings. The subscription&rsquo;s record is unlinked from your
        account and kept, without anything identifying you, so a subscription
        that is still active can be restored to a new account.
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
