"use client";

import { Footer as N3wthFooter, FooterSection } from "@n3wth/ui";

const sections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api-reference" },
      { label: "Quickstart", href: "/docs/quickstart" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/n3wth/r3" },
      { label: "NPM", href: "https://www.npmjs.com/package/@n3wth/r3" },
    ],
  },
];

const sites = [
  { name: "n3wth", href: "https://n3wth.com" },
  { name: "n3wth/skills", href: "https://skills.n3wth.com" },
  { name: "n3wth/ui", href: "https://ui.n3wth.com" },
  { name: "n3wth/r3", href: "https://r3.newth.ai" },
  { name: "n3wth/garden", href: "https://garden.n3wth.com" },
];

export function Footer() {
  return (
    <N3wthFooter
      logo={<span className="text-lg font-semibold">r3</span>}
      description="Persistent memory for AI assistants via MCP"
      sections={sections}
      sites={sites}
      currentSite="n3wth/r3"
      copyright={`\u00A9 ${new Date().getFullYear()} Oliver Newth`}
    />
  );
}
