import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={`mx-auto w-full max-w-3xl px-6 py-10 text-sm text-muted ${className ?? ""}`}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.company}
        </p>
        <nav className="flex gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-foreground"
          >
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
