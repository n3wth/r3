"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { versionConfig } from "@/lib/docs-config";

export function DocsHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);

  return (
    <div className="sticky top-14 z-40 bg-bg/80 backdrop-blur-xl border-b border-rail">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-ink-dim">Docs</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-bg-soft hover:bg-bg-raise border border-rail rounded-lg transition-colors sm:w-48"
            >
              <Search className="h-4 w-4 text-ink-dim" />
              <span className="hidden sm:inline text-sm text-ink-dim">
                Search
              </span>
              <div className="hidden sm:flex items-center gap-1 ml-auto">
                <kbd className="px-1.5 py-0.5 text-xs bg-bg-raise rounded border border-rail-strong">
                  /
                </kbd>
              </div>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-bg-soft hover:bg-bg-raise border border-rail rounded-lg transition-colors"
              >
                <span className="text-sm text-ink">
                  {versionConfig.current}
                </span>
                <ChevronDown className="h-3 w-3 text-ink-dim" />
              </button>

              {showVersionDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-raise border border-rail-strong rounded-lg overflow-hidden">
                  {versionConfig.versions.map((version) => (
                    <a
                      key={version.version}
                      href={version.path}
                      className="block px-4 py-2 text-sm text-ink-dim hover:bg-rail hover:text-ink transition-colors"
                    >
                      {version.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSearch && (
        <div
          className="fixed inset-0 z-50 bg-bg/80"
          onClick={() => setShowSearch(false)}
        >
          <div className="fixed inset-x-0 top-20 mx-auto max-w-2xl p-4">
            <div
              className="bg-bg-raise border border-rail-strong rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-rail">
                <Search className="h-5 w-5 text-ink-dim" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-ink placeholder:text-ink-faint focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-ink-dim hover:text-ink"
                >
                  <kbd className="px-2 py-1 text-xs bg-bg-raise rounded border border-rail-strong">
                    ESC
                  </kbd>
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                <div className="space-y-1">
                  <a
                    href="/docs/quickstart"
                    className="block px-3 py-2 rounded-lg hover:bg-rail transition-colors"
                  >
                    <div className="text-sm font-medium text-ink">
                      Quickstart
                    </div>
                    <div className="text-xs text-ink-dim">
                      Get up and running in 5 minutes
                    </div>
                  </a>
                  <a
                    href="/docs/api-reference"
                    className="block px-3 py-2 rounded-lg hover:bg-rail transition-colors"
                  >
                    <div className="text-sm font-medium text-ink">
                      API Reference
                    </div>
                    <div className="text-xs text-ink-dim">
                      Complete API reference for r3
                    </div>
                  </a>
                  <a
                    href="/docs/examples"
                    className="block px-3 py-2 rounded-lg hover:bg-rail transition-colors"
                  >
                    <div className="text-sm font-medium text-ink">Examples</div>
                    <div className="text-xs text-ink-dim">
                      Example integrations
                    </div>
                  </a>
                </div>
              </div>

              <div className="px-4 py-2 border-t border-rail bg-bg-soft">
                <div className="flex items-center gap-4 text-xs text-ink-dim">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-bg-raise rounded border border-rail-strong">
                      esc
                    </kbd>
                    Close
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
