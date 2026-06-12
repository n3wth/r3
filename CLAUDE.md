# Claude Instructions for r3 Project

## Key Rules

1. **NO EMOJIS** - Never use emojis in any context within this project
2. **Brand Name** - Always use "r3"
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

The docs site at https://r3.newth.ai deploys automatically from the `main` branch via Vercel.

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
- Using "Newth" instead of "Newth.ai"
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

## Design system

Source of truth: `@n3wth/ui/theme` (repo n3wth/ui, src/theme.css). Import tokens, never mirror values:
`@import 'tailwindcss';` then `@import '@n3wth/ui/theme';`

Canonical tokens: bg #08090b | bg-soft #0d0e10 | bg-raise #131316 | ink #f2f3f5 | ink-dim #9aa0a8 | ink-faint #62666d | ink-label #787c83 | ink-ghost #2c2f34 | rail rgba(255,255,255,0.09) | rail-strong rgba(255,255,255,0.17) | accent #ffffff | accent-dim #d4d6da | accent-ink #08090b | ease cubic-bezier(0.16,1,0.3,1)

Rules:
- Geist for display AND body, Geist Mono for code. No other typefaces.
- Flat: no gradients, no glows, no box-shadows. Elevation = bg-raise + rail-strong border.
- No italics for emphasis — weight or color instead.
- Use tokens/utilities (bg-bg, text-ink, border-rail), never hardcoded palette hexes in components.
- Before any UI change ships: run the build, then grep the built CSS for stray hexes, linear-gradient, or box-shadow you introduced.

website/ imports @n3wth/ui/theme; Geist + Geist Mono via next/font. Prism syntax-highlighting colors are functional and exempt. GSAP/framer eases use the canonical cubic-bezier.
