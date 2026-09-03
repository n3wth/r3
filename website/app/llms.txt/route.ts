import { getPackageVersion } from "@/lib/version";

export async function GET() {
  const version = getPackageVersion();

  const content = `# n3wth/r3

> Persistent memory for AI assistants. An MCP server that gives Claude, Gemini, and GPT memory that survives between sessions.

## Quick Start

\`\`\`bash
npx @n3wth/r3
\`\`\`

No configuration required. r3 starts an embedded Redis server automatically.

## What is r3?

r3 is a Model Context Protocol (MCP) server that gives AI assistants persistent memory across sessions. It runs locally with:

- Embedded Redis for sub-10ms memory retrieval
- 384-dimensional vector embeddings for semantic search
- Automatic entity extraction and knowledge graph construction
- Zero external API calls required

## Integration

### Claude Desktop

Add to \`~/.claude/claude_desktop_config.json\`:

\`\`\`json
{
  "mcpServers": {
    "r3": {
      "command": "npx",
      "args": ["@n3wth/r3"]
    }
  }
}
\`\`\`

### Claude Code

\`\`\`bash
claude mcp add r3 "npx @n3wth/r3"
\`\`\`

### Gemini CLI

\`\`\`bash
export MCP_SERVERS='{"r3":{"command":"npx","args":["@n3wth/r3"]}}'
\`\`\`

### Programmatic Usage

\`\`\`typescript
import { R3 } from '@n3wth/r3';

const r3 = new R3();

await r3.add({
  content: 'User prefers TypeScript',
  userId: 'user_123'
});

const memories = await r3.search({
  query: 'programming preferences',
  userId: 'user_123'
});
\`\`\`

## MCP Tools

r3 provides these tools to MCP clients:

- add_memory: Store new information
- search_memory: Find relevant context using semantic search
- get_all_memories: List all memories for a user
- update_memory: Modify existing memory
- delete_memory: Remove specific memory
- delete_all_memories: Clear all memories
- get_memory_history: View memory changes
- cache_stats: Monitor performance
- optimize_cache: Reorganize cache
- health_check: Check system status

## Documentation

- Introduction: https://r3.n3wth.com/docs/introduction
- Quickstart: https://r3.n3wth.com/docs/quickstart
- Installation: https://r3.n3wth.com/docs/installation
- API Reference: https://r3.n3wth.com/docs/api-reference
- Examples: https://r3.n3wth.com/docs/examples
- Troubleshooting: https://r3.n3wth.com/docs/troubleshooting

## Key Features

- Local-first: All data stays on your machine
- Zero config: Just run \`npx @n3wth/r3\`
- Fast: Sub-10ms responses with embedded Redis
- Smart: Vector search and knowledge graphs built-in
- Private: No external API calls required

## Version

Current version: ${version}

## Links

- Website: https://r3.n3wth.com
- GitHub: https://github.com/n3wth/r3
- npm: https://www.npmjs.com/package/@n3wth/r3
- Contact: hey@n3wth.com
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
