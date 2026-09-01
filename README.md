# r3

<!-- mcp-name: io.github.n3wth/r3 -->

[![npm version](https://img.shields.io/npm/v/@n3wth/r3.svg)](https://www.npmjs.com/package/@n3wth/r3)
[![npm downloads](https://img.shields.io/npm/dm/@n3wth/r3.svg)](https://www.npmjs.com/package/@n3wth/r3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server for persistent AI memory. Local Redis storage with optional cloud sync.

## Install

```bash
npx @n3wth/r3
```

r3 starts an embedded Redis server automatically. No configuration required.

## Claude Desktop

Add to `~/.claude/claude_desktop_config.json`:

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

Restart Claude Desktop. In a new conversation:

```
You: Remember that I prefer TypeScript and dark mode.
Claude: I'll remember that.

[New conversation]

You: What are my preferences?
Claude: You prefer TypeScript and dark mode.
```

## Claude Code

```bash
claude mcp add r3 "npx @n3wth/r3"
```

## MCP Tools

r3 exposes these tools to MCP clients:

| Tool | Description |
|------|-------------|
| `add_memory` | Store content with optional metadata and priority |
| `search_memory` | Query memories using semantic or keyword search |
| `get_all_memories` | List stored memories with pagination |
| `get_memory` | Retrieve a specific memory by ID |
| `update_memory` | Modify existing memory content or metadata |
| `delete_memory` | Remove a memory |

Additional tools for diagnostics: `cache_stats`, `sync_status`, `optimize_cache`, `deduplicate_memories`.

Enhanced mode (default) adds: `extract_entities`, `get_knowledge_graph`, `find_connections`.

## Configuration

Environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `REDIS_URL` | External Redis connection | Embedded server |
| `MEM0_API_KEY` | Mem0 API key for cloud sync | None (local only) |
| `MEM0_USER_ID` | Default user namespace | `default` |
| `INTELLIGENCE_MODE` | `enhanced` or `basic` | `enhanced` |

Example with cloud sync:

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

## Documentation

Full documentation at [r3.n3wth.com](https://r3.n3wth.com).

## License

MIT
