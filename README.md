# r3

<!-- mcp-name: io.github.n3wth/r3 -->

[![npm version](https://img.shields.io/npm/v/@n3wth/r3.svg)](https://www.npmjs.com/package/@n3wth/r3)
[![npm downloads](https://img.shields.io/npm/dm/@n3wth/r3.svg)](https://www.npmjs.com/package/@n3wth/r3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Persistent memory for MCP clients (Claude Desktop, Claude Code, Cursor) that runs entirely on your machine, with no accounts, no API keys, and no cloud service required to start.

![Memory persisting across two separate server processes](demo/demo.gif)

## Quick start

```bash
npx @n3wth/r3
```

That single command starts an MCP server backed by an embedded Redis instance and a local vector index. There is no separate database to install and no signup step.

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
 auto-downloaded binary,    for semantic search,
 no external service)       no external service)
   |
   +--- optional ---> Mem0 cloud API (MEM0_API_KEY)
                       cross-device sync, off by default
```

- **Embedded Redis** — `redis-memory-server` downloads and manages a local Redis binary for you. It stores memory content and metadata. If it cannot start, r3 falls back to an in-process store.
- **vectra** — a local, file-backed vector index used for semantic search. No network calls, no external vector database.
- **Mem0 (optional)** — if `MEM0_API_KEY` is set, r3 also syncs to Mem0's cloud API so memories can follow you across machines. Without a key, nothing leaves your machine.

## MCP client configuration

### Claude Desktop

Edit `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`):

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

### Claude Code

```bash
claude mcp add r3 "npx @n3wth/r3"
```

### Cursor

Add to `.cursor/mcp.json` in your project (or the global Cursor MCP config):

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

Restart the client after editing config. In a new conversation:

```
You: Remember that I prefer TypeScript and dark mode.
AI: I'll remember that.

[new conversation]

You: What are my preferences?
AI: You prefer TypeScript and dark mode.
```

## Tools

| Tool                  | Description                                        |
| --------------------- | --------------------------------------------------- |
| `add_memory`          | Store content with optional metadata and priority   |
| `search_memory`       | Query memories using semantic or keyword search     |
| `get_all_memories`    | List stored memories with pagination                |
| `get_memory`          | Retrieve a specific memory by ID                    |
| `update_memory`       | Modify existing memory content or metadata          |
| `delete_memory`       | Remove a memory                                     |
| `deduplicate_memories`| Find and merge duplicate memories                   |
| `cache_stats`         | Report cache hit rate and storage stats             |
| `sync_status`         | Report Mem0 cloud sync status                       |
| `optimize_cache`      | Run cache maintenance                               |
| `import_memories`     | Bulk import memories                                |

Enhanced mode (default, `INTELLIGENCE_MODE=enhanced`) adds:

| Tool                  | Description                                        |
| --------------------- | --------------------------------------------------- |
| `extract_entities`    | Extract named entities from text                    |
| `get_knowledge_graph` | Return the entity/relationship graph                |
| `find_connections`    | Find entities connected to a given entity           |

## Configuration

Environment variables, all optional:

| Variable            | Description                  | Default            |
| ------------------- | ----------------------------- | ------------------- |
| `REDIS_URL`         | Use an external Redis instead of the embedded one | embedded server |
| `MEM0_API_KEY`      | Enables Mem0 cloud sync       | unset (local only) |
| `MEM0_USER_ID`      | Namespace for memories        | `default`          |
| `INTELLIGENCE_MODE` | `enhanced` or `basic`         | `enhanced`         |

Example with cloud sync enabled:

```json
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["@n3wth/r3"],
      "env": {
        "MEM0_API_KEY": "mem0_..."
      }
    }
  }
}
```

## Comparison

| | r3 | mem0 (OSS) | zep |
| --- | --- | --- | --- |
| Runs fully local with zero config | yes (embedded Redis + vectra) | requires a Postgres/vector DB you configure | requires a Postgres instance you configure |
| Needs an API key to try it | no | no (self-hosted) / yes (cloud) | yes (cloud), or self-hosted setup |
| Optional cloud sync | yes, via Mem0 | n/a (is the cloud option) | yes |

This table only reflects setup requirements observed in each project's own documentation, not benchmark performance or feature completeness. Verify against current upstream docs before relying on it.

## Known issues

See [LAUNCH_AUDIT.md](./LAUNCH_AUDIT.md) for current limitations, including a native module build failure on some macOS setups.

## Documentation

Full documentation at [r3.n3wth.com](https://r3.n3wth.com).

## License

MIT
