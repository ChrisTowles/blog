# Skill Loader Utility

TypeScript utility for loading and parsing Claude Skills from various sources.

## Overview

Skills are structured collections containing:
- **SKILL.md**: YAML frontmatter (metadata) + markdown body (instructions)
- **Resources**: Optional bundled files in `scripts/`, `references/`, or `assets/`

Distribution formats:
1. **.skill ZIP archives** - Compressed packages
2. **Directories** - For development
3. **Buffers** - From database or memory

## SKILL.md Format

```yaml
---
name: my-skill
description: Brief description of what this skill does
---

# Skill Instructions

Markdown content with instructions, examples, etc.
```

### Frontmatter Requirements
- `name` (string): Unique identifier (lowercase, hyphens)
- `description` (string): What the skill does

## File Structure

```
my-skill/
├── SKILL.md           # Required
├── scripts/           # Optional executables
├── references/        # Optional reference docs
└── assets/            # Optional resources
```

ZIP layout is identical, saved as `my-skill.skill`.

## API

### `parseSkillMd(content: string)`

Parse SKILL.md content with YAML frontmatter.

```typescript
const { metadata, body } = parseSkillMd(skillMdContent)
// metadata.name, metadata.description, body (markdown)
```

**Throws:** `SkillLoaderError` if frontmatter is invalid

### `loadSkillFromPath(path: string)`

Load from file path (ZIP or directory).

```typescript
// From ZIP
const skill = await loadSkillFromPath('/path/to/my-skill.skill')

// From directory
const skill = await loadSkillFromPath('/path/to/my-skill/')

// Returns: { metadata, body, resources: Map<string, Buffer>, source }
```

### `loadSkillFromBuffer(buffer: Buffer, source?: string)`

Load from buffer (for database-stored skills). Auto-detects raw SKILL.md vs ZIP.

```typescript
const skill = await loadSkillFromBuffer(Buffer.from(dbSkill.content))
```

## Interfaces

```typescript
interface SkillMetadata {
  name: string
  description: string
}

interface LoadedSkill {
  metadata: SkillMetadata
  body: string
  resources: Map<string, Buffer>
  source: string
}
```

## Usage Examples

### Load from Distribution Archive

```typescript
import { loadSkillFromPath } from '~/server/utils/skills'

const skill = await loadSkillFromPath('/downloads/my-skill.skill')

if (skill.resources.has('scripts/setup.sh')) {
  const setupScript = skill.resources.get('scripts/setup.sh')
  console.log('Setup script:', setupScript.toString())
}
```

### Load from Database

```typescript
import { loadSkillFromBuffer, SkillLoaderError } from '~/server/utils/skills'

const dbSkill = await db.query.skills.findOne({ id: skillId })

try {
  const skill = await loadSkillFromBuffer(
    Buffer.from(dbSkill.content, 'utf-8'),
    `skill-${skillId}`
  )
  // Use skill.metadata, skill.body
} catch (error) {
  if (error instanceof SkillLoaderError) {
    console.error(`Failed to load skill ${skillId}:`, error.code)
  }
}
```

### Process Resources

```typescript
const skill = await loadSkillFromPath(skillPath)

const resources = {
  scripts: new Map<string, string>(),
  references: new Map<string, string>(),
  assets: new Map<string, Buffer>()
}

for (const [path, buffer] of skill.resources) {
  const [category, filename] = path.split('/')
  if (category === 'scripts' || category === 'references') {
    resources[category].set(filename, buffer.toString('utf-8'))
  } else if (category === 'assets') {
    resources[category].set(filename, buffer)
  }
}
```

### Batch Load

```typescript
import { loadSkillFromPath, SkillLoaderError } from '~/server/utils/skills'
import { promises as fs } from 'fs'
import path from 'path'

async function loadSkillsFromDirectory(skillsDir: string) {
  const entries = await fs.readdir(skillsDir, { withFileTypes: true })
  const skills = []
  const errors = []

  for (const entry of entries) {
    if (!entry.isDirectory() && !entry.name.endsWith('.skill')) continue

    const skillPath = path.join(skillsDir, entry.name)
    try {
      skills.push(await loadSkillFromPath(skillPath))
    } catch (error) {
      errors.push({
        path: skillPath,
        error: error instanceof SkillLoaderError ? error.message : 'Unknown'
      })
    }
  }

  return { skills, errors }
}
```

### API Endpoint

```typescript
// server/api/skills/load.post.ts
export default defineEventHandler(async (event) => {
  const { path } = await readBody(event)

  try {
    const skill = await loadSkillFromPath(path)
    return {
      success: true,
      skill: {
        metadata: skill.metadata,
        body: skill.body,
        resourceCount: skill.resources.size,
        resources: Array.from(skill.resources.keys())
      }
    }
  } catch (error) {
    if (error instanceof SkillLoaderError) {
      setResponseStatus(event, 400)
      return { success: false, error: error.message, code: error.code }
    }
    setResponseStatus(event, 500)
    return { success: false, error: 'Internal server error' }
  }
})
```

## Error Handling

```typescript
class SkillLoaderError extends Error {
  code: string
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `INVALID_FRONTMATTER` | YAML frontmatter invalid or missing fields |
| `PARSE_ERROR` | General parsing error |
| `ZIP_OPEN_ERROR` | Failed to open ZIP |
| `ZIP_READ_ERROR` | Failed to read ZIP entry |
| `ZIP_STREAM_ERROR` | Stream error reading ZIP |
| `ZIP_BUFFER_ERROR` | Failed to open ZIP from buffer |
| `MISSING_SKILL_MD` | SKILL.md not found |
| `INVALID_FILE_TYPE` | Not a .skill file |
| `INVALID_PATH` | Path is neither file nor directory |
| `PATH_ERROR` | Path-related error |
| `BUFFER_ERROR` | Buffer processing error |

```typescript
try {
  const skill = await loadSkillFromPath(path)
} catch (error) {
  if (error instanceof SkillLoaderError) {
    switch (error.code) {
      case 'MISSING_SKILL_MD':
        console.error('SKILL.md not found - archive may be corrupted')
        break
      case 'INVALID_FRONTMATTER':
        console.error('Invalid SKILL.md frontmatter - check YAML syntax')
        break
      default:
        console.error(`[${error.code}] ${error.message}`)
    }
  }
}
```

## Dependencies

```bash
pnpm add yauzl gray-matter
pnpm add -D @types/yauzl
```

## Testing

```bash
pnpm test packages/blog/server/utils/skills/
```
