# Agent Instructions for r3 Project

## Key Rules

1. **NO EMOJIS** - Never use emojis in any context within this project
2. **Brand Name** - Always use "r3" (lowercase)
3. **Current Year** - Use 2025 in copyright notices
4. **Professional Tone** - Maintain technical, clear communication

## Project Structure

```
r3/
├── src/                          # Core TypeScript source
│   ├── index.ts                  # Main entry point
│   ├── core/
│   │   └── memory-engine.ts      # Central memory logic
│   ├── handlers/
│   │   └── tool-handlers.ts      # MCP tool handler implementations
│   ├── lib/
│   │   ├── cache-manager.ts      # Redis cache layer
│   │   ├── cache-manager-optimized.ts
│   │   ├── redis-manager.ts      # Redis connection management
│   │   ├── vectra-memory.ts      # Vectra vector store integration
│   │   ├── enhanced-vectra-memory.ts
│   │   ├── local-memory.ts       # Local (non-Redis) memory fallback
│   │   ├── entity-extractor.ts   # NLP entity extraction
│   │   ├── entity-extractor-spacy.ts
│   │   ├── spacy_bridge.py       # Python/spaCy interop bridge
│   │   ├── pubsub-manager.ts     # Redis pub/sub
│   │   └── errors.ts             # Shared error types
│   ├── cli-ui/                   # Interactive CLI UI components (Ink/React)
│   │   └── source/
│   │       ├── cli.tsx
│   │       ├── app.tsx
│   │       └── SimpleSpinner.tsx
│   ├── types/
│   │   ├── index.ts              # Shared type definitions
│   │   ├── blessed.d.ts
│   │   └── terminal.d.ts
│   └── populate-demo-data.ts     # Seed script for demo data
├── test/                         # Test suite (requires Redis + MEM0_API_KEY)
│   ├── test-suite.js             # Primary integration tests
│   ├── test-intelligence.js      # Intelligence/recall tests
│   ├── test.js
│   └── run-tests.js
├── docs/                         # Documentation
│   ├── CLI_USAGE.md
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   ├── TODO.md
│   └── validation-prompt.md
├── mcp-server/                   # Standalone Python MCP server
│   ├── server.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
├── r3call-cli/                   # Ink-based CLI sub-package
│   └── source/
│       ├── cli.tsx
│       ├── app.tsx
│       ├── api.ts
│       └── SimpleSpinner.tsx
├── mac-menubar-app/              # macOS menu bar app (Swift)
│   └── main.swift
├── website/                      # Docs site (Next.js, deployed to r3.n3wth.com)
│   ├── app/                      # Next.js app router pages
│   ├── components/               # Shared React components
│   ├── content/docs/             # MDX documentation content
│   ├── lib/                      # Utility modules
│   └── public/                   # Static assets and fonts
├── assets/                       # Brand assets (SVG logos)
├── data/                         # Local runtime data (gitignored in prod)
│   ├── memories.db               # SQLite memory store
│   └── vectra-index/             # Vectra vector index
├── .github/workflows/            # CI/CD workflows
│   ├── ci.yml                    # Lint and test on PR
│   ├── release.yml               # Bump version and publish to npm
│   └── auto-release.yml
├── Dockerfile                    # Container image for the MCP server
├── index.d.ts                    # Public TypeScript declarations
├── package.json                  # Root package (npm publish target)
└── vercel.json                   # Vercel deployment config for website
```

## Development Workflow

1. Follow existing code patterns
2. Test changes with `npm test`
3. Use the unified release workflow via GitHub Actions
4. Never commit directly to npm - use the release workflow

## Deployment

### npm Package (GitHub Actions)

Use GitHub Actions workflow only - never `npm publish` locally:

```bash
# Trigger via GitHub CLI
gh workflow run release.yml -f version=patch|minor|major

# Or use the release script
npm run release:patch
npm run release:minor
npm run release:major
```

The `.github/workflows/release.yml` bumps version, runs tests, and publishes to npm.

### Documentation Website (Vercel)

The docs site at https://r3.n3wth.com deploys automatically from the `main` branch via Vercel.

- **Framework:** Next.js (in `website/` directory)
- **Build command:** `cd website && npm run build`
- **Install command:** `cd website && npm install`
- **Auto-deploy:** Every push to `main` triggers deployment
- **Preview:** PRs get preview deployments

Configuration is in `vercel.json` at the project root.

### Telemetry

Web Vitals (LCP, CLS, INP, FCP, TTFB) are collected via [Axiom](https://app.axiom.co) (`next-axiom`) and PostHog (`capture_performance`). Data flows to the `vercel` dataset in Axiom. Monitors alert on poor LCP (>4s), CLS (>0.25), and INP (>500ms). Only production deployments send data.

- Axiom dashboard: https://app.axiom.co
- PostHog web vitals: https://us.posthog.com (Web Analytics > Web Vitals)

### Dependencies

The website uses `@n3wth/ui` for shared design components. Update with:

```bash
cd website && npm install @n3wth/ui@latest
```

## Code Style

- Use ES modules (import/export)
- Async/await over promises
- Descriptive variable names
- No decorative comments
- No emojis in any context

## Documentation Updates

When updating documentation:

1. Use clear, technical language
2. Test all code examples
3. Update both README and website docs if needed

## Common Mistakes to Avoid

- Adding emojis to documentation
- Publishing directly to npm (use GitHub Actions)
- Adding decorative elements to professional documentation

## Testing

```bash
# Run tests (currently requires Redis and Mem0 API key)
npm test

# Run specific test file
node test/test-suite.js
```

## Important Files

- `README.md` - Main documentation (keep professional)
- `.github/workflows/release.yml` - Unified release process
- `package.json` - Version and dependencies
