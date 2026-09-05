#!/usr/bin/env node

import { spawn } from "child_process";

// Explicit opt-out only (used by the npm publish workflow).
if (process.env.NPM_PUBLISH === "true" || process.env.SKIP_TESTS === "true") {
  console.log("Tests skipped (NPM_PUBLISH/SKIP_TESTS set)");
  process.exit(0);
}

const TIMEOUT_MS = 120000;

function run(cmd, args, env = {}, successSentinel = null) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      stdio: successSentinel ? ["inherit", "pipe", "inherit"] : "inherit",
      env: { ...process.env, ...env },
    });
    let sawSentinel = false;
    if (successSentinel) {
      child.stdout.on("data", (chunk) => {
        process.stdout.write(chunk);
        if (chunk.toString().includes(successSentinel)) sawSentinel = true;
      });
    }
    const timer = setTimeout(() => {
      console.error(`\nTimeout after ${TIMEOUT_MS / 1000}s: ${args.join(" ")}`);
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 1000);
    }, TIMEOUT_MS);
    child.on("exit", (code) => {
      clearTimeout(timer);
      // onnxruntime-node can abort during process teardown on macOS after
      // all tests pass; trust the explicit success sentinel over exit code.
      if (successSentinel && sawSentinel) return resolve(0);
      resolve(code ?? 1);
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      console.error("Test process error:", err);
      resolve(1);
    });
  });
}

const suiteCode = await run("node", ["--test", "test/test-suite.js"]);
const intelligenceCode = await run(
  "node",
  ["test/test-intelligence.js"],
  { QUIET_MODE: "true" },
  "All intelligence tests passed",
);

const failed = suiteCode !== 0 || intelligenceCode !== 0;
if (failed) {
  console.error(
    `\nFAILED (suite=${suiteCode}, intelligence=${intelligenceCode})`,
  );
}
process.exit(failed ? 1 : 0);
