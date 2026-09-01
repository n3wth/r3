"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Docs", href: "/docs/introduction" },
  { name: "GitHub", href: "https://github.com/n3wth/r3", external: true },
];

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

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      if (openerRef.current?.isConnected) openerRef.current.focus();
      openerRef.current = null;
      return;
    }
    openerRef.current = (document.activeElement as HTMLElement | null) ?? null;
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>(".mobile-nav-row")?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menu) return;
      const focusables = menu.querySelectorAll<HTMLElement>("a, button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div ref={menuRef}>
      <header
        className="site-nav fixed inset-x-3 md:inset-x-4 z-50 flex md:justify-center pointer-events-none"
        style={{ top: "calc(0.75rem + env(safe-area-inset-top))" }}
      >
        <div className="nav-island pointer-events-auto flex h-12 w-full items-center gap-1 pl-4 pr-2 md:w-auto md:pl-5">
          <Link href="/" className="brand shrink-0" aria-label="n3wth/r3 - home">
            <span className="brand-mark shrink-0" aria-hidden="true">
              <DartMark size={18} />
            </span>
            <span>n3wth/r3</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-0.5 ml-3">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "nav-link-active" : ""}`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <span className="ml-auto inline-flex items-center gap-1">
            <button
              type="button"
              className="nav-burger md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </span>
        </div>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="mobile-menu fixed inset-0 z-40 md:hidden flex flex-col"
          style={{
            background: "var(--color-bg, #08090b)",
            paddingTop: "calc(5rem + env(safe-area-inset-top))",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <nav
            className="mobile-nav flex flex-1 min-h-0 flex-col overflow-y-auto overscroll-contain touch-pan-y px-4 pt-2 pb-4"
            aria-label="Mobile navigation"
          >
            {navigation.map((item, i) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mobile-nav-link mobile-nav-row"
                  style={{ "--row-i": i } as React.CSSProperties}
                >
                  <span className="mobile-nav-link-label">{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-link mobile-nav-row ${
                    isActive(item.href) ? "mobile-nav-link-active" : ""
                  }`}
                  style={{ "--row-i": i } as React.CSSProperties}
                >
                  <span className="mobile-nav-link-label">{item.name}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
