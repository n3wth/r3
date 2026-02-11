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

export function Footer() {
  return (
    <N3wthFooter
      logo={<span className="text-lg font-semibold">r3</span>}
      description="Intelligent memory MCP for AI apps"
      sections={sections}
      copyright={`© ${new Date().getFullYear()} Oliver Newth`}
    />
  );
}
