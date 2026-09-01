# Style Guide for r3

This document outlines the style and formatting guidelines for all documentation, code, and communications in the r3 project.

## Writing Style

### No Emojis Policy

**IMPORTANT**: Do not use emojis anywhere in this project, including:
- Documentation (README, guides, API docs)
- Code comments
- Commit messages
- GitHub issues and pull requests
- Release notes
- Website content
- Error messages
- CLI output

### Professional Tone

- Use clear, concise, technical language
- Focus on clarity and precision
- Avoid unnecessary embellishments
- Let the quality of the code and documentation speak for itself

### Brand Guidelines

- Use "r3" as the product name. Package is @n3wth/r3. Site is r3.n3wth.com.
- Use current year in copyright notices

## Documentation Standards

### Headers

Use descriptive headers without decorative elements:
- ✅ Good: `## Installation`
- ❌ Bad: `## 🚀 Installation`

### Lists

Use plain bullet points or numbers:
- ✅ Good: `- Lightning fast performance`
- ❌ Bad: `- ⚡ Lightning fast performance`

### Code Examples

Keep code examples clean and professional:
```bash
# Good: Clear, descriptive comment
npx @n3wth/r3
```

## Commit Messages

Follow conventional commit format without emojis:
- ✅ Good: `feat: Add caching layer`
- ❌ Bad: `✨ feat: Add caching layer`

## Error Messages

Keep error messages informative and emoji-free:
- ✅ Good: `Error: Redis connection failed`
- ❌ Bad: `❌ Error: Redis connection failed`

## CLI Output

Use plain text indicators:
- ✅ Good: `[OK] Connection established`
- ❌ Bad: `✅ Connection established`

## Release Notes

Structure release notes professionally:
```markdown
## v1.2.0

### Features
- Added intelligent caching system
- Improved error handling

### Bug Fixes
- Fixed memory leak in connection pool
```

## Code Comments

Keep comments professional and informative:
```javascript
// Good: Implement exponential backoff for retries
// Bad: 🔄 Implement exponential backoff for retries
```

## Why This Matters

Professional documentation and code:
1. Improves accessibility for screen readers
2. Ensures consistent rendering across platforms
3. Maintains professional appearance
4. Reduces character encoding issues
5. Focuses attention on content, not decoration

## Enforcement

This style guide is enforced through:
- Code reviews
- Automated linting where possible
- CI/CD checks
- Documentation reviews

## For AI Assistants

When working with this codebase:
- Never add emojis to any files
- Remove emojis if found in existing content
- Follow all guidelines in this document
- Reference this guide when making documentation updates