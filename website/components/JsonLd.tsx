import { getPackageVersion } from "@/lib/version";

interface JsonLdProps {
  type: "WebSite" | "SoftwareApplication" | "WebPage";
  data?: {
    name?: string;
    description?: string;
    url?: string;
  };
}

export function JsonLd({ type, data }: JsonLdProps) {
  const version = getPackageVersion();
  
  const baseUrl = "https://r3.n3wth.com";
  
  const schemas: Record<string, object> = {
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "r3",
      alternateName: "n3wth/r3",
      url: baseUrl,
      description: "Persistent memory for AI assistants. An MCP server that gives Claude, Gemini, and GPT memory that survives between sessions.",
      publisher: {
        "@type": "Person",
        name: "Oliver Newth",
        url: "https://n3wth.com",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/docs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    SoftwareApplication: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "r3",
      alternateName: "n3wth/r3",
      description: "An MCP server that gives AI assistants persistent memory across sessions. Local Redis, vector search, and knowledge graphs with zero configuration.",
      url: baseUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Windows, Linux",
      softwareVersion: version,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "Oliver Newth",
        url: "https://n3wth.com",
      },
      programmingLanguage: ["TypeScript", "JavaScript"],
      runtimePlatform: "Node.js",
      installUrl: "https://www.npmjs.com/package/@n3wth/r3",
      downloadUrl: "https://www.npmjs.com/package/@n3wth/r3",
      codeRepository: "https://github.com/n3wth/r3",
      keywords: ["MCP", "AI memory", "Claude", "Gemini", "GPT", "Redis", "vector search", "knowledge graph"],
    },
    WebPage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: data?.name || "r3 Documentation",
      description: data?.description || "Documentation for r3, the persistent memory MCP server for AI assistants.",
      url: data?.url || `${baseUrl}/docs`,
      isPartOf: {
        "@type": "WebSite",
        name: "r3",
        url: baseUrl,
      },
      publisher: {
        "@type": "Person",
        name: "Oliver Newth",
        url: "https://n3wth.com",
      },
    },
  };

  const schema = schemas[type];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
