"use client";

import {
  Zap,
  Shield,
  ArrowRight,
  Code,
  Database,
  Lock,
  Globe,
  Sparkles,
  Cpu,
  Layers,
  Gauge,
} from "lucide-react";
import Link from "next/link";
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Section,
  SectionHeader,
  Card,
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

          {/* Enhanced animated gradient background - simplified on mobile */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,100,255,0.08),transparent_50%)] animate-pulse"
              style={{ animationDuration: "8s" }}
            />
            <div
              className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,150,255,0.08),transparent_50%)] animate-pulse"
              style={{ animationDuration: "10s", animationDelay: "1s" }}
            />
            {/* Aurora gradient - simpler on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/[0.03] to-transparent transform translate-y-full animate-aurora" />
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
        <Section spacing="lg" className="border-t border-white/5 relative overflow-hidden">
          <Meteors number={20} />
          <Container size="lg">
            <div className="max-w-4xl mx-auto relative z-10">
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
            </div>
          </Container>
        </Section>

        {/* Code Example - Clean tabs */}
        <Section spacing="lg" className="border-t border-white/5">
          <Container size="lg">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                title="Simple integration"
                description="Add r3 to your MCP config or import the SDK directly"
                align="center"
                className="mb-12"
              />

              <div className="relative">
                <div className="border-b border-white/10 bg-black/40 rounded-t-xl">
                  <nav className="flex" aria-label="Tabs">
                    {Object.keys(codeExamples).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={`
                        flex-1 px-4 py-3 text-sm font-medium capitalize transition-all
                        ${
                          activeTab === lang
                            ? "text-white bg-white/5 border-b-2 border-white"
                            : "text-gray-400 hover:text-gray-300"
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
            </div>
          </Container>
        </Section>

        {/* Features - Stunning Bento Grid */}
        <Section spacing="lg" className="border-t border-white/5 relative">
          <Container size="lg">
            <SectionHeader
              title="Open source memory layer"
              description="Local-first. Embedded Redis, vector search, and knowledge graphs with zero external services."
              align="center"
              className="mb-12"
            />

            <BentoGrid>
              <BentoCard
                title="AI Intelligence Engine"
                description="Real vector embeddings, entity extraction, and knowledge graphs - all running locally"
                icon={
                  <Sparkles className="h-6 w-6 text-gray-400 transition-colors duration-500 group-hover:text-emerald-400" />
                }
                gradient="from-emerald-500/20 to-blue-500/20"
                span="lg:col-span-3"
              />

              <BentoCard
                title="Semantic Search"
                description="Query stored context using natural language. Returns ranked results by cosine similarity."
                icon={
                  <Cpu className="h-5 w-5 text-gray-400 transition-colors duration-500 group-hover:text-cyan-400" />
                }
                gradient="from-cyan-900/20 to-blue-900/20"
                span="lg:col-span-2"
              />

              <BentoCard
                title="Knowledge Graph"
                description="Automatic entity extraction links memories into a traversable graph of relationships"
                icon={
                  <Layers className="h-5 w-5 text-gray-400 transition-colors duration-500 group-hover:text-purple-400" />
                }
                gradient="from-purple-900/20 to-indigo-900/20"
              />

              <BentoCard
                title="<10ms Latency"
                description="Local embedding generation with 384-dim vectors. No API calls for search or storage."
                icon={
                  <Gauge className="h-5 w-5 text-gray-400 transition-colors duration-500 group-hover:text-orange-400" />
                }
                gradient="from-orange-900/20 to-red-900/20"
              />

              <BentoCard
                title="Redis-powered caching"
                description="Embedded Redis serves as both cache layer and vector store. Hot memories stay in RAM."
                icon={
                  <Zap className="h-5 w-5 text-gray-400 transition-colors duration-500 group-hover:text-yellow-400" />
                }
                gradient="from-yellow-900/20 to-orange-900/20"
                span="lg:col-span-2"
              />

              <BentoCard
                title="Automatic failover"
                description="Works offline with local Redis, syncs when online"
                icon={
                  <Shield className="h-5 w-5 text-gray-400 transition-colors duration-500 group-hover:text-blue-400" />
                }
                gradient="from-blue-900/20 to-cyan-900/20"
              />

              <BentoCard
                title="Efficient storage"
                description="Compressed entries with automatic TTL management"
                icon={<Database className="h-5 w-5 text-purple-400" />}
                gradient="from-purple-900/20 to-pink-900/20"
                span="lg:col-span-2"
              />

              <BentoCard
                title="MCP protocol compatible"
                description="Works with Claude Desktop, Gemini CLI, and any MCP client"
                icon={<Globe className="h-5 w-5 text-green-400" />}
                gradient="from-green-900/20 to-teal-900/20"
                span="lg:col-span-2"
              />

              <BentoCard
                title="TypeScript SDK"
                description="Typed memory operations, search results, and configuration. Ships its own declarations."
                icon={<Code className="h-5 w-5 text-indigo-400" />}
                gradient="from-indigo-900/20 to-blue-900/20"
              />

              <BentoCard
                title="Local-first architecture"
                description="Embedded Redis server, no external dependencies"
                icon={<Lock className="h-5 w-5 text-red-400" />}
                gradient="from-red-900/20 to-orange-900/20"
                span="lg:col-span-3"
              />
            </BentoGrid>
          </Container>
        </Section>

        {/* Bottom CTA section */}
        <Section spacing="lg" className="border-t border-white/5">
          <Container size="sm">
            <div className="flex justify-center">
              <Card variant="glass" padding="lg" className="max-w-2xl w-full relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <p className="text-center text-lg text-gray-300 mb-6">
                    Your AI forgets everything between sessions.
                    <br />
                    <span className="text-white font-medium">
                      One command fixes that.
                    </span>
                  </p>
                  <div className="flex justify-center">
                    <CommandBox
                      command="npx r3"
                      variant="primary"
                      showCopyButton
                    />
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
