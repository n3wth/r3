"use client";

import { Nav, NavItem } from "@n3wth/ui";
import { LogoEffectSlideshow } from "./LogoEffectSlideshow";

const navItems: NavItem[] = [
  { label: "Documentation", href: "/docs/introduction" },
  { label: "API", href: "/docs/api-reference" },
  { label: "GitHub", href: "https://github.com/n3wth/r3", external: true },
];

export function Navigation() {
  return (
    <Nav
      logo={<LogoEffectSlideshow />}
      logoHref="/"
      items={navItems}
      theme="dark"
      fixed
    />
  );
}
