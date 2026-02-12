"use client";

import {
  Zap,
  ArrowRight,
  Code,
  Lock,
  Globe,
  Cpu,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Section,
  SectionHeader,
  CommandBox,
} from "@n3wth/ui";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Grid";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { MemoryVisualization } from "@/components/MemoryVisualization";
import { MemoryComparison } from "@/components/MemoryComparison";
import { CodeBlock } from "@/components/CodeBlock";
import { ScrollReveal } from "@/components/ScrollReveal";
// Lazy load heavy components
const TerminalDemo = lazy(() =>
  import("@/components/TerminalDemo").then((module) => ({
    default: module.TerminalDemo,
  })),
);
const Meteors = lazy(() =>
  import("@/components/magicui/meteors").then((module) => ({
    default: module.Meteors,
  })),
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("node");

  const codeExamples = {
    node: `import { Recall } from 'r3';

// Zero configuration - works immediately
const recall = new Recall();

// Remember work context
await recall.add({
  content: 'Dashboard uses Next.js 14, TypeScript, and Tailwind CSS',
  userId: 'work'
});

// Remember personal context
await recall.add({
  content: 'Kids: Emma (8, loves robotics), Josh (5, into dinosaurs)',
  userId: 'personal'
});

// AI remembers across sessions
const context = await recall.search({
  query: 'What framework am I using?',
  userId: 'work'
});`,
    mcp: `// claude_desktop_config.json
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["-y", "r3"]
    }
  }
}

// That's it. Your AI assistant now has
// persistent memory across every session.
// No API keys, no database setup, no config.`,
    curl: `curl https://api.r3.newth.ai/v1/memories \\
  -H "Authorization: Bearer $MEM0_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "User prefers dark mode UI",
    "metadata": {
      "user_id": "user_123"
    }
  }'`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navigation />

      {/* Main content wrapper */}
      <main className="flex-1">
        {/* Hero - Mobile-first optimization */}
        <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden -mt-20 pt-20 sm:pt-24 md:pt-32 lg:pt-40">
          {/* Memory visualization - hidden on mobile for cleaner experience */}
          <div className="hidden sm:block absolute inset-0">
            <MemoryVisualization />
          </div>

          {/* Gradient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,100,255,0.12),transparent_60%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <div className="mx-auto max-w-4xl">
              {/* Professional value prop badge - mobile-optimized */}
              <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/[0.03] backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium border border-white/[0.08]">
                <span className="text-white sm:hidden whitespace-nowrap">
                  AI Memory
                </span>
                <span className="hidden sm:inline-flex sm:items-center sm:gap-3">
                  <span className="text-purple-300">Memory MCP server</span>
                  <span className="text-white/40">×</span>
                  <span className="text-blue-300">Open source</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-[1.15]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white block"
                >
                  Give your AI
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-white inline-block mt-1"
                >
                  permanent memory
                </motion.span>
              </h1>

              {/* Mobile-first subtitle */}
              <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 md:mb-10 font-light leading-relaxed px-0">
                <span className="sm:hidden">
                  Context that persists across every AI conversation. Works with Claude, GPT, and Gemini.
                </span>
                <span className="hidden sm:inline">
                  Your AI assistant remembers what you talked about last session.{" "}
                  <span className="text-white font-medium">
                    Redis caching
                  </span>{" "}
                  and{" "}
                  <span className="text-white font-medium">
                    vector search
                  </span>{" "}
                  keep context fast and relevant. Works with Claude, GPT, and Gemini via MCP.
                </span>
              </p>

              {/* CTAs - mobile-optimized full width on small screens */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <CommandBox
                  command="npx r3"
                  variant="primary"
                  showCopyButton
                  className="w-full sm:w-auto"
                />

                <Link href="/docs/quickstart" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>

              {/* Stats - Mobile optimized with selective hiding */}
              <div className="mt-10 sm:mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center"
                >
                  <div className="text-lg sm:text-xl md:text-2xl font-light text-white">
                    <AnimatedCounter to={5} suffix="ms" duration={1.5} />
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 mt-1">
                    Response time
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center"
                >
                  <div className="text-lg sm:text-xl md:text-2xl font-light text-white">
                    <AnimatedCounter to={384} duration={1.5} />
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 mt-1">
                    Dimensions per vector
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center sm:col-span-1 col-span-1"
                >
                  <div className="text-lg sm:text-xl md:text-2xl font-light text-white">
                    <AnimatedCounter to={0} duration={1.5} />
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 mt-1">
                    Cloud dependencies
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center col-span-1"
                >
                  <div className="text-lg sm:text-xl md:text-2xl font-light text-white">
                    <AnimatedCounter to={1} duration={1.5} />
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 mt-1">
                    Command to install
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* The Context Problem Section - Interactive */}
        <MemoryComparison />

        {/* Interactive Terminal Demo */}
        <Section spacing="lg" className="border-t border-white/[0.06] relative overflow-hidden">
          <Meteors number={20} />
          <Container size="lg">
            <ScrollReveal className="max-w-4xl mx-auto relative z-10">
              <SectionHeader
                title="See it in action"
                description="Watch r3 remember context across sessions in Gemini CLI and Claude Code"
                align="center"
                className="mb-12"
              />
              <Suspense
                fallback={
                  <div className="bg-gray-900 rounded-lg p-6 animate-pulse h-64" />
                }
              >
                <TerminalDemo />
              </Suspense>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Code Example - Clean tabs */}
        <Section spacing="lg" className="border-t border-white/[0.06]">
          <Container size="lg">
            <ScrollReveal className="max-w-4xl mx-auto">
              <SectionHeader
                title="Simple integration"
                description="Add r3 to your MCP config or import the SDK directly"
                align="center"
                className="mb-12"
              />

              <div className="relative">
                <div className="border-b border-white/[0.08] bg-white/[0.02] rounded-t-xl">
                  <nav className="flex" aria-label="Tabs">
                    {Object.keys(codeExamples).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={`
                        flex-1 px-4 py-3 text-sm font-medium capitalize transition-all
                        ${
                          activeTab === lang
                            ? "text-white border-b-2 border-white/80"
                            : "text-gray-500 hover:text-gray-300"
                        }
                      `}
                      >
                        {lang === "node" ? "Node.js" : lang === "mcp" ? "MCP Config" : lang}
                      </button>
                    ))}
                  </nav>
                </div>
                <CodeBlock
                  language={
                    activeTab === "node"
                      ? "javascript"
                      : activeTab === "curl"
                        ? "bash"
                        : activeTab === "mcp"
                          ? "json"
                          : activeTab
                  }
                >
                  {codeExamples[activeTab as keyof typeof codeExamples]}
                </CodeBlock>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Features - Bento Grid */}
        <Section spacing="lg" className="border-t border-white/[0.06] relative">
          <Container size="lg">
            <ScrollReveal>
            <SectionHeader
              title="Open source memory layer"
              description="Local-first. Embedded Redis, vector search, and knowledge graphs with zero external services."
              align="center"
              className="mb-12"
            />

            <BentoGrid>
              <BentoCard
                title="Semantic Search"
                description="Query stored context using natural language. Cosine similarity ranking across 384-dimension vectors."
                icon={
                  <Cpu className="h-5 w-5 text-gray-400" />
                }
                span="lg:col-span-2"
              />

              <BentoCard
                title="Knowledge Graph"
                description="Automatic entity extraction links memories into a traversable graph of relationships."
                icon={
                  <Layers className="h-5 w-5 text-gray-400" />
                }
              />

              <BentoCard
                title="Sub-10ms responses"
                description="Embedded Redis serves as both cache layer and vector store. Local embedding generation, no API calls."
                icon={
                  <Zap className="h-5 w-5 text-gray-400" />
                }
              />

              <BentoCard
                title="MCP compatible"
                description="Works with Claude Desktop, Claude Code, Gemini CLI, and any MCP client out of the box."
                icon={<Globe className="h-5 w-5 text-gray-400" />}
                span="lg:col-span-2"
              />

              <BentoCard
                title="TypeScript SDK"
                description="Typed memory operations, search results, and configuration. Ships its own type declarations."
                icon={<Code className="h-5 w-5 text-gray-400" />}
                span="lg:col-span-2"
              />

              <BentoCard
                title="Zero dependencies"
                description="Embedded Redis server, local vector store. No cloud services, no API keys, no configuration files."
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
            </BentoGrid>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Bottom CTA section */}
        <Section spacing="lg" className="border-t border-white/[0.06]">
          <Container size="sm">
            <ScrollReveal className="text-center">
              <p className="text-xl sm:text-2xl text-gray-300 mb-2 font-light">
                Your AI forgets everything between sessions.
              </p>
              <p className="text-xl sm:text-2xl text-white font-medium mb-8">
                One command fixes that.
              </p>
              <div className="flex justify-center">
                <CommandBox
                  command="npx r3"
                  variant="primary"
                  showCopyButton
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
