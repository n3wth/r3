"use client";

const products = [
  { label: "hop.flights", href: "https://hop.flights", external: true },
  { label: "ui", href: "https://ui.n3wth.com", external: true },
  { label: "kit", href: "https://kit.n3wth.com", external: true },
  { label: "garden", href: "https://garden.n3wth.com", external: true },
  { label: "skills", href: "https://skills.n3wth.com", external: true },
  { label: "n3wth.com", href: "https://n3wth.com", external: true },
  { label: "Email", href: "mailto:hey@n3wth.com", external: false },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rail">
      <div className="mx-auto max-w-5xl px-6">
        <div className="py-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="text-sm text-ink-dim">2025 Oliver Newth</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-baseline gap-x-1.5 gap-y-2">
              {products.map((link, i) => (
                <li key={link.href} className="flex items-baseline gap-1.5">
                  {i > 0 && (
                    <span className="text-ink-faint" aria-hidden="true">
                      &middot;
                    </span>
                  )}
                  <a
                    href={link.href}
                    className="footer-link text-sm"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
