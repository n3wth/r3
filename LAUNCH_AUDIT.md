# Launch audit

Findings from reading the codebase and attempting a clean install on 2026-09-01. Scope: is this ready for a public Hacker News launch. This is not a full security review.

## Blockers

### 1. `npm install` fails on macOS with older GNU Make

Reproduced on this machine (macOS, GNU Make 3.81, node v22.22.3):

```
npm error deps/readies/mk/main:6: *** GNU Make version is too old. Aborting..  Stop.
npm error make[1]: *** [src/bin/macos-arm64v8-release/redisbloom.so] Error 2
npm error make: *** [build] Error 1
```

Root cause: `redis-memory-server` (a dependency used for the embedded Redis backend) does not have a prebuilt binary for this OS/arch/Redis-module combination, so it compiles Redis and its modules from source. The build system requires GNU Make >= 4.0; macOS ships Make 3.81 by default (BSD-licensed, Apple stopped upgrading it after GPLv3). Anyone without `brew install make` and PATH configured to use it will hit this.

Impact: `npx @n3wth/r3` and `npm install @n3wth/r3` will fail for a meaningful fraction of macOS users on first run, exactly the audience most likely to try the tool the day it's posted. This is the single biggest launch risk.

Fix options, roughly in order of effort:
- Pin/vendor a `redis-memory-server` version with a matching prebuilt binary for macOS arm64, or document the exact known-good version.
- Document the workaround prominently in the README ("if npx fails, `brew install make` and re-run" or similar), with a troubleshooting section.
- Longer term: reduce dependence on compiling Redis from source per-install, e.g. ship a fallback pure-JS/in-memory store as the default and treat embedded Redis as an optional upgrade.

### 2. Tests do not actually gate anything

`test/run-tests.js`:
- Exits `0` immediately if `MEM0_API_KEY` is not set: "Skipping tests during npm publish (no MEM0_API_KEY)".
- Even when it does run, the process always calls `process.exit(0)` on the child test process's exit or error, regardless of pass/fail ("Always exit successfully for prepublish").
- CI additionally sets `SKIP_TESTS=true`.

Net effect: `npm test` and the CI test step cannot currently fail. There is no verified passing test run to point to. Before a public launch, either fix the runner to propagate real exit codes and run without requiring a cloud API key, or be explicit in docs that test coverage is not currently enforced.

### 3. No demo GIF/video

No demo asset exists in `assets/`, `docs/`, or referenced from the README. HN launches for developer tools convert much better with a 10-30 second terminal recording showing the "remember X" / "what do you know about me" round trip described in the README. Currently a reader has to take the usage example on faith.

## Non-blocking but worth fixing before/soon after launch

- **`docs/CLI_USAGE.md` inconsistency**: shows `npm install -g r3` / `npx r3`, but the published package is scoped as `@n3wth/r3` (bin name is `r3` only after a global install). The main README correctly uses `npx @n3wth/r3`; the CLI usage doc should be aligned to avoid a confused first command.
- **Claude Desktop config path**: `docs/CLI_USAGE.md` pointed at `~/.claude/claude_desktop_config.json`, which is not the actual Claude Desktop config location on macOS (`~/Library/Application Support/Claude/claude_desktop_config.json`). Corrected in the new README; the CLI usage doc still has the old path.
- **`redis-memory-server` as a hard dependency**: even when the build succeeds, this downloads a Redis binary on first run, which means the very first `npx @n3wth/r3` requires network access and a delay. Not documented anywhere as an expectation.
- **Default `MEM0_USER_ID` mismatch**: `package.json`'s `mcp.env` block lists `MEM0_API_KEY` and `REDIS_URL` as `required: true` even though the code treats both as optional with working defaults/fallbacks. This will confuse any MCP client UI that surfaces "required" fields to a user who does not need them.
- **No CHANGELOG.md** referenced anywhere for a 1.3.2 package; harder for early adopters to see what changed recently.
- **CI never exercises the macOS embedded-Redis path**: `.github/workflows/ci.yml` runs everything on `ubuntu-latest`, so the exact failure in blocker #1 has no CI coverage and could regress silently again.

## What already looks solid

- Core architecture (embedded Redis via `redis-memory-server`, local vector search via `vectra`, optional Mem0 cloud sync) is implemented as described, not aspirational.
- MCP tool surface in `src/index.ts` matches what the README documents (verified by inspecting the actual tool registrations, not just prior docs).
- Local-only mode genuinely requires no API key: `MEM0_API_KEY` gating is real and cloud calls are skipped without it.
- README quick start (`npx @n3wth/r3`) is accurate to the current published bin name and package scope.

## Suggested pre-launch checklist

1. Fix or clearly document the macOS Make/build issue (blocker #1) — this alone will determine whether the first wave of HN traffic can even try the tool.
2. Make `npm test` fail on real test failures, or remove the always-green behavior and state coverage honestly.
3. Record and add a short terminal demo GIF to the README.
4. Align `docs/CLI_USAGE.md` with the corrected package name and Claude Desktop config path.
