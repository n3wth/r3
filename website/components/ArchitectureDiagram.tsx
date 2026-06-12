"use client";

import {
  ArrowDown,
  ArrowRight,
  Cloud,
  Database,
  Monitor,
  Server,
} from "lucide-react";

export function ArchitectureDiagram() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        {/* Horizontal flow: Claude → MCP → r3 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-bg-soft border border-rail">
            <Monitor className="h-5 w-5 text-ink-dim" />
            <span className="text-ink font-medium">Claude Desktop</span>
          </div>

          <ArrowRight className="h-5 w-5 text-ink-faint hidden md:block" />
          <ArrowDown className="h-5 w-5 text-ink-faint md:hidden" />

          <div className="text-sm text-ink-dim bg-bg-soft px-4 py-2 rounded border border-rail">
            MCP Protocol
          </div>

          <ArrowRight className="h-5 w-5 text-ink-faint hidden md:block" />
          <ArrowDown className="h-5 w-5 text-ink-faint md:hidden" />

          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-bg-soft border border-rail">
            <Server className="h-5 w-5 text-ink-dim" />
            <span className="text-ink font-medium">r3 Server</span>
          </div>
        </div>

        {/* Vertical flow: r3 → Redis → Mem0 */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <ArrowDown className="h-5 w-5 text-ink-faint" />

            <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-bg-soft border border-rail">
              <Database className="h-5 w-5 text-ink-dim" />
              <div className="flex items-center gap-2">
                <span className="text-ink font-medium">Redis</span>
                <span className="text-xs text-ink-dim">(L1 Cache)</span>
              </div>
            </div>

            <ArrowDown className="h-5 w-5 text-ink-faint" />

            <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-bg-soft border border-rail">
              <Cloud className="h-5 w-5 text-ink-dim" />
              <div className="flex items-center gap-2">
                <span className="text-ink font-medium">Mem0 Cloud</span>
                <span className="text-xs text-ink-dim">(L2 Storage)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance metrics */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="text-center p-3 rounded-lg bg-bg-soft border border-rail">
            <div className="text-xl font-light text-ink">&lt;5ms</div>
            <div className="text-xs text-ink-label mt-1">Cache Hit</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-soft border border-rail">
            <div className="text-xl font-light text-ink">~200ms</div>
            <div className="text-xs text-ink-label mt-1">Cache Miss</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-soft border border-rail">
            <div className="text-xl font-light text-ink">~10ms</div>
            <div className="text-xs text-ink-label mt-1">First Store</div>
          </div>
        </div>
      </div>
    </div>
  );
}
