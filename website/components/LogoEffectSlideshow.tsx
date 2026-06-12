"use client";

import Link from "next/link";

/* Flat wordmark — decorative overlay effects removed.
   source of truth: @n3wth/ui/theme */
export function LogoEffectSlideshow() {
  return (
    <Link
      href="/"
      className="relative inline-flex items-center text-3xl font-semibold text-ink"
      style={{ fontFamily: "var(--font-brand)" }}
    >
      <span className="relative z-10">
        r<span className="relative -top-[0.15em] text-2xl">3</span>
      </span>
    </Link>
  );
}
