"use client";

import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className if not provided
  const lang = language || className?.replace(/language-/, "") || "text";

  // Get display name for language
  const getLanguageDisplay = (lang: string) => {
    const displays: Record<string, string> = {
      javascript: "JavaScript",
      typescript: "TypeScript",
      json: "JSON",
      bash: "Bash",
      shell: "Shell",
      python: "Python",
      jsx: "JSX",
      tsx: "TSX",
      css: "CSS",
      html: "HTML",
    };
    return displays[lang] || lang.toUpperCase();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-rail bg-bg-soft">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-raise border-b border-rail">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-ink-label" />
          <span className="text-xs text-ink-label font-mono">
            {getLanguageDisplay(lang)}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md bg-bg-raise hover:bg-rail transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-ink" />
          ) : (
            <Copy className="h-4 w-4 text-ink-label hover:text-ink" />
          )}
        </button>
      </div>

      {/* Code content */}
      <Highlight theme={themes.vsDark} code={children.trim()} language={lang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-6 text-sm leading-relaxed`}
            style={{
              ...style,
              backgroundColor: "transparent",
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
            }}
          >
            <code className="block">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  {/* Line number */}
                  <span className="inline-block w-8 text-ink-faint text-right select-none flex-shrink-0 pr-4">
                    {i + 1}
                  </span>
                  {/* Code content */}
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                    {line.length === 0 && "\n"}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
