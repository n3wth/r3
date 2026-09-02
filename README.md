# r3

<!-- mcp-name: io.github.n3wth/r3 -->

[![npm version](https://img.shields.io/npm/v/@n3wth/r3.svg)](https://www.npmjs.com/package/@n3wth/r3)
[![npm downloads](https://img.shields.io/npm/dm/@n3wth/r3.svg)](https://www.npmjs.com/package/@n3wth/r3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A local memory server for MCP clients. One command starts a server that stores memories in an embedded Redis instance and a file-backed vector index on your machine. No account, no API key, no database to install.

![Memory persisting across two separate server processes](demo/demo.gif)

## Install

Requires Node 18 or newer.

```bash
npx @n3wth/r3
```

This starts the MCP server on stdio. The first run downloads a Redis binary through `redis-memory-server`, so it needs network access once and takes longer than later runs.

Claude Code:

```bash
claude mcp add r3 -- npx @n3wth/r3
```

Claude Desktop, in `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS:

```json
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["@n3wth/r3"]
    }
  }
}
```

Cursor, in `.cursor/mcp.json` in the project or in the global Cursor MCP config:

```json
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["@n3wth/r3"]
    }
  }
}
```

Restart the client after editing config. Then, in a new conversation:

```
You: Remember that I prefer TypeScript and dark mode.
AI: I'll remember that.

[new conversation]

You: What are my preferences?
AI: You prefer TypeScript and dark mode.
```

## What it is

- An MCP server over stdio with 14 tools for storing, searching, updating and deleting memories.
- Local by default. Memory content and metadata live in an embedded Redis started by `redis-memory-server`. Semantic search uses `vectra`, an on-disk vector index. Nothing leaves the machine unless you enable hybrid mode.
- Optional cloud sync through the Mem0 API, in hybrid mode only. Hybrid mode needs both `MEM0_API_KEY` and the `--hybrid` flag. With the key alone, r3 stays local and does not call Mem0.

## What it is not

- Not a hosted service. There is no r3 cloud. The only remote option is your own Mem0 account.
- Not persistent if embedded Redis fails to start. r3 then logs "Falling back to demo mode (in-memory only)" and memories are lost when the process exits.
- Not multi-device by default. Memories stay on the machine that wrote them unless hybrid mode is on.
- Not a library. The package exposes a server binary. Other directories in this repo (see below) are separate projects.

## How it works

```
MCP client (Claude Desktop / Claude Code / Cursor)
        |
        v
   r3 MCP server (stdio)
        |
   +----+-----------------------+
   |                            |
embedded Redis            vectra local index
(redis-memory-server,      (on-disk vector store
 auto-downloaded binary)    for semantic search)
   |
   +--- hybrid mode only ---> Mem0 cloud API
        (MEM0_API_KEY + --hybrid)
```

## Tools

| Tool                   | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `add_memory`           | Store content with optional metadata and priority |
| `search_memory`        | Query memories using semantic or keyword search   |
| `get_all_memories`     | List stored memories with pagination              |
| `get_memory`           | Retrieve a specific memory by ID                  |
| `update_memory`        | Modify existing memory content or metadata        |
| `delete_memory`        | Remove a memory                                   |
| `deduplicate_memories` | Find and merge duplicate memories                 |
| `cache_stats`          | Report cache hit rate and storage stats           |
| `sync_status`          | Report Mem0 cloud sync status                     |
| `optimize_cache`       | Run cache maintenance                             |
| `import_memories`      | Bulk import memories                              |

Enhanced mode (the default) adds three more:

| Tool                  | Description                               |
| --------------------- | ----------------------------------------- |
| `extract_entities`    | Extract named entities from text          |
| `get_knowledge_graph` | Return the entity/relationship graph      |
| `find_connections`    | Find entities connected to a given entity |

## Configuration

All optional.

| Variable            | Description                                        | Default            |
| ------------------- | -------------------------------------------------- | ------------------ |
| `REDIS_URL`         | Use an external Redis instead of the embedded one  | embedded server    |
| `MEM0_API_KEY`      | Mem0 API key. Only used together with `--hybrid`   | unset              |
| `MEM0_USER_ID`      | Namespace for memories                             | `default`          |
| `INTELLIGENCE_MODE` | `enhanced` or `basic`                              | `enhanced`         |
| `DEBUG`             | `true` for debug logging to stderr                 | unset              |

Flags passed after the package name: `--hybrid` (Mem0 sync, needs the key), `--basic` (same as `INTELLIGENCE_MODE=basic`), `--demo` (in-memory only, no persistence), `--debug`.

Hybrid mode example:

```json
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["@n3wth/r3", "--hybrid"],
      "env": {
        "MEM0_API_KEY": "mem0_..."
      }
    }
  }
}
```

## Known issues

**macOS install fails with "GNU Make version is too old".** `redis-memory-server` compiles Redis from source when no prebuilt binary matches your OS and architecture. That build needs GNU Make 4 or newer, and macOS ships 3.81. Install a newer Make and put it first on `PATH` before running r3:

```bash
brew install make
export PATH="$(brew --prefix)/opt/make/libexec/gnubin:$PATH"
npx @n3wth/r3
```

Details and other findings are in [LAUNCH_AUDIT.md](./LAUNCH_AUDIT.md).

## Also in this repo

These are separate from the npm package, which ships only `dist/` and `examples/`.

- `website/`: the docs site at https://r3.n3wth.com
- `mcp-server/`: a Python remote MCP server for ChatGPT connectors, deployed on its own
- `r3call-cli/`, `mac-menubar-app/`, `r3call-swift-app/`: terminal and macOS UIs for browsing memories
- `docs/`: CLI usage, contributing, security policy, code of conduct

The published bin also has `r3 ui` and `r3 manage` commands. They are terminal UIs that talk to a separate HTTP API (`--api-url`, default `http://localhost:3030`) and are not needed for MCP use.

## Where it is listed

- npm: [@n3wth/r3](https://www.npmjs.com/package/@n3wth/r3), current version 1.3.2
- Glama: [r3 by n3wth](https://glama.ai/mcp/servers/n3wth/r3), maintainer claim in `glama.json`

## License and maintenance

MIT. Copyright n3wth.

Maintained by Oliver Newth ([n3wth](https://github.com/n3wth)). Bugs and requests go to [GitHub Issues](https://github.com/n3wth/r3/issues). Security reports follow [docs/SECURITY.md](./docs/SECURITY.md). There is no Discord and no discussions board.
