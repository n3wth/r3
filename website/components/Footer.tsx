"use client";

import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Documentation", href: "/docs/introduction" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "API Reference", href: "/docs/api-reference" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/n3wth/r3", external: true },
      {
        label: "npm",
        href: "https://www.npmjs.com/package/@n3wth/r3",
        external: true,
      },
    ],
  },
  {
    title: "n3wth",
    links: [
      { label: "n3wth.com", href: "https://n3wth.com", external: true },
      { label: "kit", href: "https://kit.n3wth.com", external: true },
      { label: "skills", href: "https://skills.n3wth.com", external: true },
      { label: "garden", href: "https://garden.n3wth.com", external: true },
      { label: "ui", href: "https://ui.n3wth.com", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rail bg-bg-soft">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <p className="font-mono text-sm font-semibold text-ink">n3wth/r3</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-faint">
              Persistent memory for AI assistants.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium uppercase tracking-widest text-ink-label">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-dim transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-dim transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-rail pt-6">
          <p className="text-xs text-ink-faint">2025 Oliver Newth</p>
          <p className="text-xs text-ink-faint">n3wth/r3</p>
        </div>
      </div>
    </footer>
  );
}
