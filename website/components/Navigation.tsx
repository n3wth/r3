"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [{ name: "Docs", href: "/docs/introduction" }];

function DartMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.4 6.6 25.2 14a1.5 1.5 0 0 1-.15 2.78l-6.1 1.78a2 2 0 0 0-1.32 1.24l-2.2 6.1c-.5 1.36-2.42 1.27-2.78-.15L8.0 8.2A1.6 1.6 0 0 1 9.4 6.6Z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="site-nav fixed inset-x-3 md:inset-x-4 z-50 flex md:justify-center pointer-events-none"
      style={{ top: "calc(0.75rem + env(safe-area-inset-top))" }}
    >
      <div className="nav-island pointer-events-auto flex h-12 w-full items-center gap-1 pl-4 pr-2 md:w-auto md:pl-5 md:pr-3">
        <Link href="/" className="brand shrink-0" aria-label="n3wth/r3 - home">
          <span className="brand-mark shrink-0" aria-hidden="true">
            <DartMark size={18} />
          </span>
          <span>n3wth/r3</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-0.5 ml-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? "nav-link-active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <span className="ml-auto inline-flex items-center">
          <a
            href="https://github.com/n3wth/r3"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center justify-center"
            aria-label="View on GitHub"
          >
            <GitHubIcon size={18} />
          </a>
        </span>
      </div>
    </header>
  );
}
