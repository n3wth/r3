# Agent Instructions for r3 Project

## Key Rules

1. **NO EMOJIS** - Never use emojis in any context within this project
2. **Brand Name** - Always use "r3" (lowercase)
3. **Current Year** - Use 2025 in copyright notices
4. **Professional Tone** - Maintain technical, clear communication

## Project Structure

```
r3/
├── src/              # Source code
├── test/             # Test files
├── docs/             # Documentation
├── assets/           # Images and static assets
├── website/          # Documentation website
└── package.json      # Project metadata
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

## README voice: don'ts

1. No LLM adjectives: robust, seamless, powerful, effortless, delightful, blazing, intuitive, elegant, supercharge, leverage.
2. No "getting started journey", "let's dive in", "you're all set". The install section is commands and one sentence per command.
3. No claim without a file, command or URL behind it. If it is not in the repo, it is not in the README.
4. No "intelligent", "hybrid caching", "sub-5ms" as headline claims. Describe the storage path and the flags that select it.
5. No emojis, no `---` dividers, no badges beyond npm and license.
6. No problem/solution story. Say what it does, what it does not do, and how to run it.
7. No comparison tables against other projects unless every cell is verified against that project's current docs, with the date.
8. No "coming soon", roadmap, or registry listings that return 404. Describe the present tense only.
9. No inventing support channels. Issues exist. Discord and Discussions do not.
10. No version bumps or release notes in README edits. The version on npm is the version.
