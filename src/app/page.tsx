import { PinMark } from "@/components/PinMark";
import { SiteFooter } from "@/components/SiteFooter";
import { highlights, pitch, site } from "@/lib/site";

// Each element rises in a beat after the one above it. `.rise` reads
// --rise-delay; see globals.css.
export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pt-20 pb-8 text-center sm:pt-28">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pin-glow absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgb(46_230_168/0.35),transparent_68%)] blur-2xl"
          />
          <PinMark className="rise h-28 w-auto drop-shadow-[0_0_18px_rgb(34_199_236/0.35)] sm:h-32" />
        </div>

        <h1 className="rise mt-8 text-5xl font-semibold tracking-tight [--rise-delay:90ms] sm:text-6xl">
          {site.name}
        </h1>

        <p className="rise accent-text mt-4 text-xl font-medium [--rise-delay:180ms] sm:text-2xl">
          {site.tagline}
        </p>

        <div className="rise mt-7 space-y-4 text-base leading-relaxed text-muted [--rise-delay:270ms] sm:text-lg">
          {pitch.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="rise surface mt-9 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-muted [--rise-delay:360ms]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-spring-mark shadow-[0_0_10px_rgb(46_230_168/0.9)]"
          />
          {site.status}
        </p>

        <ul className="rise mt-14 grid w-full gap-4 text-left [--rise-delay:450ms] sm:grid-cols-3">
          {highlights.map((highlight) => (
            <li key={highlight.title} className="surface rounded-2xl p-5">
              <h2 className="text-base font-semibold">{highlight.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {highlight.body}
              </p>
            </li>
          ))}
        </ul>
      </main>

      <SiteFooter className="rise [--rise-delay:540ms]" />
    </>
  );
}
