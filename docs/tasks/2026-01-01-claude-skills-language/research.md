# Claude Code Skills: Language, Build Steps, Dependencies

## Question

When creating Claude Code skills, which language is best? Are build steps OK? How do you handle dependencies?

---

## Key Findings

### 1. Language: Markdown Only (with script bundles)

**Skills are Markdown-based, not code-based.** The core skill is always `SKILL.md`:

- YAML frontmatter for metadata
- Markdown instructions Claude follows

However, **utility scripts can be bundled** in any language:

- Python scripts (most common)
- Bash/shell scripts
- TypeScript via `tsx` (seen in this repo's worktree plugin)

Scripts are **executed, not loaded into context**—only their output counts toward tokens.

```
my-skill/
├── SKILL.md              # Required (Markdown)
├── scripts/
│   ├── helper.py         # Executed via Bash tool
│   └── validate.ts       # Run with tsx
└── references/
    └── guide.md          # Loaded on demand
```

### 2. Build Steps: Not Officially Supported

The skill framework has **no build system**. Skills don't compile.

**Workarounds observed in this repo:**

- Use `tsx` to run TypeScript directly (worktree plugin)
- Python scripts need no build
- Bash scripts need no build

If you need TypeScript, add to package.json:

```json
{
  "devDependencies": {
    "tsx": "^4.19.0",
    "typescript": "^5.7.0"
  }
}
```

Then reference scripts with shebang: `#!/usr/bin/env tsx`

### 3. Dependencies: Document + Assume Installed

**Official approach:** Declare requirements in SKILL.md, let users install.

````markdown
## Requirements

```bash
pip install pypdf pdfplumber
```
````

```

**No package manager integration** for skills—dependencies must be pre-installed in environment.

For bundled TypeScript scripts (like worktree plugin):
- Include `package.json` with deps
- User runs `pnpm install` before using

---

## Codebase Context

This repo has 3 plugin styles:

| Plugin | Language | Build? | Dependencies |
|--------|----------|--------|--------------|
| tt-core | Markdown only | No | None |
| notifications | Python + Bash | No | System audio (ffplay/afplay) |
| worktree | TypeScript + Markdown | tsx | yaml, tsx, typescript |

The worktree plugin shows **TypeScript is viable** if you:
1. Use `tsx` for direct execution
2. Bundle `package.json` with deps
3. Reference scripts via `{baseDir}/scripts/*.ts`

---

## Expert Recommendations

### From Official Docs
- Keep SKILL.md under 500 lines (~5000 words)
- Use progressive disclosure: minimal in SKILL.md, details in reference files
- One-level-deep references (SKILL.md → reference.md, not chained)
- Use `allowed-tools` to restrict permissions

### From Community
- "Skills are not executable code. They do NOT run Python or JavaScript" directly—they use Bash tool to execute scripts
- Always use `{baseDir}` for paths, never hardcode
- Design descriptions for auto-discovery matching

---

## Recommended Approach

**For most skills:** Pure Markdown
- Fastest to create
- No dependencies
- Works everywhere

**When you need complex logic:** Markdown + Python scripts
- Python is ubiquitous
- No build step needed
- Easy to debug

**For TypeScript preference:** Markdown + tsx
- Use this repo's worktree plugin as template
- Requires tsx/typescript devDependencies
- User must install deps first

---

## Sources

- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Claude Agent Skills: A First Principles Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)
- [Claude Code customization guide](https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/)
- [Agent Skills in the SDK](https://platform.claude.com/docs/en/agent-sdk/skills)
- Codebase: `packages/claude-plugins/worktree/` (TypeScript example)
```
