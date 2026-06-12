"use client";

import { useState, useEffect } from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

const demos = [
  {
    title: "Claude Code + Coding Preferences",
    commands: [
      { type: "typing", text: "$ claude --project my-nextjs-app", delay: 0 },
      {
        type: "animated",
        text: "Claude Code v1.0.5 • Model: Claude 3.5 Sonnet",
        className: "text-ink-dim",
        delay: 1500,
      },
      {
        type: "animated",
        text: "✓ MCP server 'r3' connected (hybrid memory active)",
        className: "text-ink",
        delay: 2000,
      },
      {
        type: "animated",
        text: "You: Remember I prefer React with TypeScript, Tailwind CSS, and Vitest for testing",
        className: "text-ink-dim",
        delay: 3000,
        userText: true,
      },
      {
        type: "animated",
        text: "Claude: I'll remember your development stack preferences.",
        className: "text-ink-dim",
        delay: 4500,
        assistantText: true,
      },
      {
        type: "animated",
        text: "[Memory stored: 3ms • Priority: high • TTL: persistent]",
        className: "text-ink-faint text-xs",
        delay: 5000,
      },
      {
        type: "animated",
        text: "You: Create a new component",
        className: "text-ink-dim",
        delay: 6000,
        userText: true,
      },
      {
        type: "animated",
        text: "Claude: I'll create a TypeScript React component with Tailwind styling...",
        className: "text-ink-dim",
        delay: 7000,
        assistantText: true,
      },
      {
        type: "animated",
        text: "[Memory retrieved: 2ms from L1 cache]",
        className: "text-ink-faint text-xs",
        delay: 7500,
      },
    ],
  },
  {
    title: "Gemini CLI + Personal Knowledge",
    commands: [
      {
        type: "typing",
        text: '$ gemini --save "Oliver uses r3 for knowledge management"',
        delay: 0,
      },
      {
        type: "animated",
        text: "Gemini CLI with r3 context • Model: Gemini 1.5 Pro",
        className: "text-ink-dim",
        delay: 1500,
      },
      {
        type: "animated",
        text: "✓ Saved to r3 and GEMINI.md",
        className: "text-ink",
        delay: 2500,
      },
      {
        type: "animated",
        text: "[Memory synced: L1 cache + L2 persistence]",
        className: "text-ink-faint text-xs",
        delay: 3000,
      },
      {
        type: "typing",
        text: '$ gemini -p "@./ explain my knowledge system"',
        delay: 4000,
      },
      {
        type: "animated",
        text: "📚 Retrieving context from r3...",
        className: "text-ink-dim",
        delay: 5500,
      },
      {
        type: "animated",
        text: "Based on your setup, you use r3 which combines:",
        className: "text-ink-dim",
        delay: 6500,
      },
      {
        type: "animated",
        text: "• L1 Cache: Redis (sub-5ms responses)",
        className: "text-ink-dim",
        delay: 7000,
      },
      {
        type: "animated",
        text: "• L2 Storage: Cloud persistence",
        className: "text-ink-dim",
        delay: 7500,
      },
      {
        type: "animated",
        text: "• Smart routing with cache optimization",
        className: "text-ink-dim",
        delay: 8000,
      },
      {
        type: "animated",
        text: "[Context enhanced with 3 relevant memories]",
        className: "text-ink-faint text-xs",
        delay: 8500,
      },
    ],
  },
  {
    title: "Claude Code + Project Context",
    commands: [
      {
        type: "typing",
        text: '$ claude mcp add r3 "npx r3"',
        delay: 0,
      },
      {
        type: "animated",
        text: "◐ Installing MCP server...",
        className: "text-ink-dim",
        delay: 1500,
      },
      {
        type: "animated",
        text: "✓ MCP server 'r3' added to claude_config.json",
        className: "text-ink",
        delay: 2500,
      },
      {
        type: "typing",
        text: "$ claude --project saas-dashboard",
        delay: 3500,
      },
      {
        type: "animated",
        text: "You: Remember our API uses GraphQL with Apollo Client",
        className: "text-ink-dim",
        delay: 5000,
        userText: true,
      },
      {
        type: "animated",
        text: "Claude: Noted. I'll use GraphQL queries with Apollo Client for API calls.",
        className: "text-ink-dim",
        delay: 6500,
        assistantText: true,
      },
      {
        type: "animated",
        text: "[Memory stored: Project-specific context saved]",
        className: "text-ink-faint text-xs",
        delay: 7000,
      },
      {
        type: "animated",
        text: "You: Add user authentication",
        className: "text-ink-dim",
        delay: 8000,
        userText: true,
      },
      {
        type: "animated",
        text: "Claude: I'll implement auth using GraphQL mutations with Apollo Client...",
        className: "text-ink-dim",
        delay: 9000,
        assistantText: true,
      },
      {
        type: "animated",
        text: "[Retrieved 5 related memories about your auth patterns]",
        className: "text-ink-faint text-xs",
        delay: 9500,
      },
    ],
  },
  {
    title: "Gemini CLI + Cross-Project Analysis",
    commands: [
      { type: "typing", text: "$ gemini check", delay: 0 },
      {
        type: "animated",
        text: "Running 4 parallel checks with r3 context...",
        className: "text-ink-dim",
        delay: 1500,
      },
      {
        type: "animated",
        text: "✓ Authentication: JWT with refresh tokens",
        className: "text-ink",
        delay: 2500,
      },
      {
        type: "animated",
        text: "✓ Database: PostgreSQL with Prisma ORM",
        className: "text-ink",
        delay: 3000,
      },
      {
        type: "animated",
        text: "✓ Testing: 87% coverage with Vitest",
        className: "text-ink",
        delay: 3500,
      },
      {
        type: "animated",
        text: "✓ Performance: Core Web Vitals passing",
        className: "text-ink",
        delay: 4000,
      },
      {
        type: "typing",
        text: '$ gemini compare "auth implementation" project-a project-b',
        delay: 5000,
      },
      {
        type: "animated",
        text: "Analyzing with r3-enhanced context...",
        className: "text-ink-dim",
        delay: 6500,
      },
      {
        type: "animated",
        text: "Project A: OAuth 2.0 with social providers",
        className: "text-ink-dim",
        delay: 7500,
      },
      {
        type: "animated",
        text: "Project B: Magic link authentication",
        className: "text-ink-dim",
        delay: 8000,
      },
      {
        type: "animated",
        text: "[Analysis enhanced with your auth preference history]",
        className: "text-ink-faint text-xs",
        delay: 8500,
      },
    ],
  },
];

export function TerminalDemo() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [key, setKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demos.length);
      setKey((prev) => prev + 1); // Force re-render for animations
    }, 18000); // Switch every 18 seconds - slower rotation

    return () => clearInterval(interval);
  }, [mounted]);

  const demo = demos[currentDemo];

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="w-full h-auto min-h-[400px] sm:h-[500px] flex items-center justify-center">
        <div className="text-ink-faint">Loading terminal...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[400px] sm:h-[500px] flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-ink mb-1">{demo.title}</h3>
        <div className="flex gap-2 justify-center">
          {demos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentDemo(index);
                setKey((prev) => prev + 1);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentDemo
                  ? "bg-accent w-8"
                  : "bg-ink-faint hover:bg-ink-dim"
              }`}
              aria-label={`Switch to demo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <Terminal key={key} className="w-full max-w-4xl">
          {demo.commands.map((cmd, index) => {
            if (cmd.type === "typing") {
              return (
                <TypingAnimation key={index} delay={cmd.delay}>
                  {cmd.text}
                </TypingAnimation>
              );
            } else {
              let displayText: React.ReactNode = cmd.text;
              if (cmd.userText) {
                const cleanText = cmd.text.replace("You: ", "");
                displayText = (
                  <>
                    <span className="text-ink">You:</span> {cleanText}
                  </>
                );
              } else if (cmd.assistantText) {
                const cleanText = cmd.text.replace("Claude: ", "");
                displayText = (
                  <>
                    <span className="text-ink">Claude:</span> {cleanText}
                  </>
                );
              }

              return (
                <AnimatedSpan
                  key={index}
                  className={cmd.className}
                  delay={cmd.delay}
                >
                  <span>{displayText}</span>
                </AnimatedSpan>
              );
            }
          })}
        </Terminal>
      </div>
    </div>
  );
}
