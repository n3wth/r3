"use client";

import { Zap, Code, Lock, Globe, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { useState, lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { JsonLd } from "@/components/JsonLd";

const TerminalDemo = lazy(() =>
  import("@/components/TerminalDemo").then((module) => ({
    default: module.TerminalDemo,
  })),
);

function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-rail bg-bg-raise px-4 py-2.5">
      <code className="font-mono text-sm text-ink">{command}</code>
      <button
        onClick={handleCopy}
        className="text-ink-faint transition-colors hover:text-ink"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("mcp");

  const codeExamples = {
    mcp: `// MCP client config (e.g. claude_desktop_config.json)
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["@n3wth/r3"]
    }
  }
}`,
    cli: `# MCP CLI tools
claude mcp add r3 "npx @n3wth/r3"

# Or via environment variable
export MCP_SERVERS='{"r3":{"command":"npx","args":["@n3wth/r3"]}}'`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <JsonLd type="SoftwareApplication" />
      <Navigation />

      <main id="main-content" className="flex-1 pt-20">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-8 pb-14">
          <div className="grid items-center gap-12 sm:grid-cols-2">
            <div>
              <h1
                className="text-ink tracking-tight"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.15,
                }}
              >
                Persistent memory
                <br />
                for AI assistants
              </h1>
              <p className="mt-5 text-base leading-relaxed text-ink-dim">
                An MCP server that gives AI assistants memory that survives
                between sessions. Local Redis, vector search, and knowledge
                graphs with zero configuration.
              </p>
              <div className="mt-8">
                <InstallCommand command="npx @n3wth/r3" />
              </div>
            </div>

            {/* Code comparison */}
            <div className="grid gap-px overflow-hidden rounded-lg border border-rail-strong bg-rail-strong">
              <div className="bg-bg-raise p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                  <p className="text-[11px] font-medium text-ink-faint">
                    Without r3
                  </p>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-ink-faint">
                  {`> What's my preferred stack?

I don't have any information
about your preferences.`}
                </pre>
              </div>
              <div className="bg-bg-raise p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[11px] font-medium text-ink-faint">
                    With r3
                  </p>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-ink">
                  {`> What's my preferred stack?

Based on our past conversations:
React + TypeScript, Tailwind,
Postgres with Drizzle ORM.`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-rail">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">
              How it works
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
              r3 runs a local Redis server with vector search. Your AI stores
              memories as embeddings and retrieves them by meaning, not just
              keywords.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-md border border-rail px-3 py-1.5 text-xs font-medium text-ink-dim">
                Semantic search
              </span>
              <span className="inline-flex items-center rounded-md border border-rail px-3 py-1.5 text-xs font-medium text-ink-dim">
                Knowledge graphs
              </span>
              <span className="inline-flex items-center rounded-md border border-rail px-3 py-1.5 text-xs font-medium text-ink-dim">
                Sub-10ms latency
              </span>
              <span className="inline-flex items-center rounded-md border border-rail px-3 py-1.5 text-xs font-medium text-ink-dim">
                Zero cloud dependencies
              </span>
            </div>
          </div>
        </section>

        {/* Terminal demo */}
        <section className="border-t border-rail">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">
              See it in action
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-dim">
              Watch r3 remember context across sessions in MCP-compatible tools.
            </p>
            <div className="mt-10">
              <Suspense
                fallback={
                  <div className="bg-bg-soft rounded-lg p-6 animate-pulse h-64" />
                }
              >
                <TerminalDemo />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="border-t border-rail">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">
              Get started
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-label">
                  MCP Desktop Clients
                </p>
                <p className="mt-2 text-sm text-ink-dim">
                  Add r3 to your MCP config file.
                </p>
                <div className="mt-4">
                  <CodeBlock language="json">{codeExamples.mcp}</CodeBlock>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-label">
                  MCP CLI Tools
                </p>
                <p className="mt-2 text-sm text-ink-dim">
                  Add with a single command.
                </p>
                <div className="mt-4">
                  <CodeBlock language="bash">{codeExamples.cli}</CodeBlock>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-ink-dim">
              <Link
                href="/docs/quickstart"
                className="underline underline-offset-4 hover:text-ink"
              >
                Full setup guide
              </Link>
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-rail">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">
              What you get
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-dim">
              r3 runs entirely on your machine. Embedded Redis, vector search,
              and knowledge graphs with no external services.
            </p>

            <div className="mt-10">
              <BentoGrid>
                <BentoCard
                  title="Semantic Search"
                  description="Query stored context using natural language. Cosine similarity ranking across 384-dimension vectors."
                  icon={<Cpu className="h-5 w-5 text-ink-dim" />}
                  span="lg:col-span-2"
                />

                <BentoCard
                  title="Knowledge Graph"
                  description="Automatic entity extraction links memories into a traversable graph of relationships."
                  icon={<Layers className="h-5 w-5 text-ink-dim" />}
                />

                <BentoCard
                  title="Sub-10ms responses"
                  description="Embedded Redis serves as both cache layer and vector store. Local embedding generation, no API calls."
                  icon={<Zap className="h-5 w-5 text-ink-dim" />}
                />

                <BentoCard
                  title="MCP compatible"
                  description="Works with any MCP-compatible client out of the box. Desktop apps, CLI tools, and custom integrations."
                  icon={<Globe className="h-5 w-5 text-ink-dim" />}
                  span="lg:col-span-2"
                />

                <BentoCard
                  title="TypeScript SDK"
                  description="Typed memory operations, search results, and configuration. Ships its own type declarations."
                  icon={<Code className="h-5 w-5 text-ink-dim" />}
                  span="lg:col-span-2"
                />

                <BentoCard
                  title="Zero dependencies"
                  description="Embedded Redis server, local vector store. No cloud services, no API keys, no configuration files."
                  icon={<Lock className="h-5 w-5 text-ink-dim" />}
                />
              </BentoGrid>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-rail">
          <div className="mx-auto max-w-5xl px-6 py-14 text-center">
            <p className="text-xl text-ink-dim">
              Your AI forgets everything between sessions.
            </p>
            <p className="text-xl text-ink font-medium mt-1">
              One command adds persistent memory.
            </p>
            <div className="mt-8 flex justify-center">
              <InstallCommand command="npx @n3wth/r3" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
