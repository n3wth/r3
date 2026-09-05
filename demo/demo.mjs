#!/usr/bin/env node
// Demo driver: talks MCP over stdio to the real r3 server, twice,
// to show memory persisting across sessions. Used by demo.tape (VHS).
import { spawn } from "child_process";

const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

function rpc(child, id, method, params) {
  return new Promise((resolve, reject) => {
    let buf = "";
    const onData = (chunk) => {
      buf += chunk.toString();
      for (const line of buf.split("\n")) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line);
          if (msg.id === id) {
            child.stdout.off("data", onData);
            return resolve(msg);
          }
        } catch {
          /* not JSON */
        }
      }
    };
    child.stdout.on("data", onData);
    setTimeout(() => reject(new Error(`timeout: ${method}`)), 60000);
    child.stdin.write(
      JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n",
    );
  });
}

async function session(label, actions) {
  console.log(bold(`\n── ${label} ` + "─".repeat(46 - label.length)));
  const child = spawn(
    "node",
    [new URL("../dist/index.js", import.meta.url).pathname],
    {
      cwd: process.env.R3_DEMO_DATA ?? "/tmp/r3-demo-data",
      env: {
        PATH: process.env.PATH,
        HOME: process.env.HOME,
        QUIET_MODE: "true",
      },
      stdio: ["pipe", "pipe", "ignore"],
    },
  );
  await rpc(child, 1, "initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "demo", version: "1.0" },
  });
  child.stdin.write(
    JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) +
      "\n",
  );
  let id = 2;
  for (const [tool, args, note] of actions) {
    console.log(cyan(`→ ${tool}`) + dim(` ${JSON.stringify(args)}`));
    const res = await rpc(child, id++, "tools/call", {
      name: tool,
      arguments: args,
    });
    const text = res.result?.content?.[0]?.text ?? JSON.stringify(res.error);
    let out = text;
    try {
      const j = JSON.parse(text);
      if (tool === "search_memory" && j.results) {
        out = j.results
          .slice(0, 1)
          .map(
            (r) =>
              `  ${green("✓")} ${r.memory ?? r.content ?? JSON.stringify(r).slice(0, 80)}`,
          )
          .join("\n");
      } else if (j.success !== undefined) {
        out = `  ${green("✓")} ${note ?? "stored"}`;
      }
    } catch {
      /* not JSON */
    }
    console.log(out);
  }
  // Let async persistence (vectra flush, redis save) settle before exit
  await new Promise((r) => setTimeout(r, 1500));
  child.kill();
  console.log(dim(`── session ended (process exited) ` + "─".repeat(15)));
}

console.log(
  bold("$ npx @n3wth/r3") +
    dim("  # zero config: embedded Redis + local vectors"),
);

await session("Session 1", [
  [
    "add_memory",
    {
      content: "Oliver prefers TypeScript with no semicolons",
      priority: "high",
    },
    "memory stored",
  ],
  [
    "add_memory",
    { content: "Deploy target is Vercel, region sfo1" },
    "memory stored",
  ],
]);

await session("Session 2 (new process, fresh context)", [
  ["search_memory", { query: "what are the code style preferences?" }],
  ["search_memory", { query: "where do we deploy?" }],
]);

console.log(green(bold("\nMemory survived the restart. That is the point.\n")));
process.exit(0);
