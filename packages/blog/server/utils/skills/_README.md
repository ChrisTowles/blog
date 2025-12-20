# Skill Loader Utility

A comprehensive TypeScript utility for loading and parsing Claude Skills from various sources.

## Overview

Skills in this system are structured collections containing:
- **SKILL.md**: A file with YAML frontmatter (metadata) and markdown body (instructions)
- **Resources**: Optional bundled files in `scripts/`, `references/`, or `assets/` directories

Skills can be distributed as:
1. **.skill ZIP archives** - Compressed packages for distribution
2. **Unzipped directories** - For development and testing
3. **Buffers** - Loaded from database or memory

## API

### `parseSkillMd(content: string)`

Parse SKILL.md file content with YAML frontmatter.

**Parameters:**
- `content` - Full SKILL.md file content

**Returns:** `{ metadata: SkillMetadata; body: string }`

**Throws:** `SkillLoaderError` if frontmatter is invalid

```typescript
const { metadata, body } = parseSkillMd(skillMdContent)
console.log(metadata.name)        // "my-skill"
console.log(metadata.description) // "What this skill does"
console.log(body)                 // Markdown body (instructions, examples, etc.)
```

### `loadSkillFromPath(path: string)`

Load a skill from file path (ZIP or directory).

**Parameters:**
- `path` - Path to `.skill` ZIP file or unzipped skill directory

**Returns:** `Promise<LoadedSkill>`

**Throws:** `SkillLoaderError` if path is invalid or SKILL.md is missing

```typescript
// From ZIP file
const skill = await loadSkillFromPath('/path/to/my-skill.skill')

// From directory
const skill = await loadSkillFromPath('/path/to/my-skill/')

console.log(skill.metadata.name)
console.log(skill.body)
console.log(skill.resources)  // Map<string, Buffer>
```

### `loadSkillFromBuffer(buffer: Buffer, source?: string)`

Load a skill from a buffer (for database-stored skills).

Automatically detects:
- Raw SKILL.md content (UTF-8 encoded)
- .skill ZIP archives (by magic bytes)

**Parameters:**
- `buffer` - Buffer containing SKILL.md or .skill ZIP
- `source` - Optional source identifier for logging

**Returns:** `Promise<LoadedSkill>`

**Throws:** `SkillLoaderError` if buffer is invalid

```typescript
// From database SKILL.md content
const skillContent = await db.getSkillContent(skillId)
const skill = await loadSkillFromBuffer(Buffer.from(skillContent))

// From database .skill ZIP archive
const skillZip = await db.getSkillZip(skillId)
const skill = await loadSkillFromBuffer(skillZip, `skill-${skillId}`)
```

## Interfaces

### `SkillMetadata`

```typescript
interface SkillMetadata {
  name: string              // Unique skill identifier (lowercase, hyphens)
  description: string       // What skill does and when to trigger it
}
```

### `LoadedSkill`

```typescript
interface LoadedSkill {
  metadata: SkillMetadata   // Parsed frontmatter
  body: string              // Markdown body (instructions after frontmatter)
  resources: Map<string, Buffer>  // Bundled files from scripts/, references/, assets/
  source: string            // Path or identifier of the source
}
```

## SKILL.md Format

```yaml
---
name: my-skill
description: Brief description of what this skill does and when to use it
---

# Skill Instructions

Markdown content explaining:
- How the skill works
- When to trigger it
- Examples
- Implementation details
- etc.

## Examples

### Example 1
Details here...
```

### Frontmatter Requirements

The YAML frontmatter MUST include:
- `name` (string): Unique skill identifier
- `description` (string): What the skill does

Additional fields can be added as needed.

## File Structure

### Directory Layout

```
my-skill/
├── SKILL.md           # Required: metadata + instructions
├── scripts/           # Optional: executable scripts
│   ├── setup.sh
│   └── deploy.sh
├── references/        # Optional: reference materials
│   ├── api-docs.md
│   └── examples.json
└── assets/            # Optional: resource files
    ├── icon.svg
    └── template.html
```

### ZIP Layout

Same structure, but compressed as `my-skill.skill`:
```
my-skill.skill (ZIP)
├── SKILL.md
├── scripts/setup.sh
├── references/api-docs.md
└── assets/icon.svg
```

## Error Handling

### `SkillLoaderError`

Custom error class with error codes for specific failures:

```typescript
export class SkillLoaderError extends Error {
  code: string  // Error code for handling specific cases
}

// Error codes:
// - INVALID_FRONTMATTER: YAML frontmatter invalid or missing required fields
// - PARSE_ERROR: General parsing error
// - ZIP_OPEN_ERROR: Failed to open ZIP file
// - ZIP_READ_ERROR: Failed to read entry from ZIP
// - ZIP_STREAM_ERROR: Stream error while reading ZIP
// - ZIP_ERROR: General ZIP processing error
// - ZIP_BUFFER_ERROR: Failed to open ZIP from buffer
// - MISSING_SKILL_MD: SKILL.md not found
// - INVALID_FILE_TYPE: File doesn't have .skill extension
// - INVALID_PATH: Path is neither file nor directory
// - PATH_ERROR: General path-related error
// - BUFFER_ERROR: Buffer processing error
```

```typescript
try {
  const skill = await loadSkillFromPath(path)
} catch (error) {
  if (error instanceof SkillLoaderError) {
    switch (error.code) {
      case 'MISSING_SKILL_MD':
        console.error('SKILL.md not found in archive')
        break
      case 'INVALID_FRONTMATTER':
        console.error('Invalid SKILL.md frontmatter')
        break
      default:
        console.error(`Skill load error: ${error.message}`)
    }
  }
}
```

## Examples

### Load from ZIP Distribution

```typescript
import { loadSkillFromPath } from '~/server/utils/skills/loader'

const skill = await loadSkillFromPath('/path/to/downloaded-skill.skill')
console.log(skill.metadata.name)
console.log(skill.body)

// Check for additional resources
if (skill.resources.has('scripts/setup.sh')) {
  const setupScript = skill.resources.get('scripts/setup.sh')
  // Use setup script...
}
```

### Load from Database

```typescript
import { loadSkillFromBuffer } from '~/server/utils/skills/loader'

// Assuming you have a database with skills
const dbSkill = await db.query.skills.findOne({ id: skillId })

// Content stored as SKILL.md text
const skill = await loadSkillFromBuffer(
  Buffer.from(dbSkill.content),
  `db-skill-${skillId}`
)

// Or if stored as .skill ZIP
if (dbSkill.skillZip) {
  const skill = await loadSkillFromBuffer(
    dbSkill.skillZip,
    `db-skill-${skillId}`
  )
}
```

### Parse and Validate

```typescript
import { parseSkillMd } from '~/server/utils/skills/loader'

const content = `---
name: my-skill
description: Does something useful
---

# Instructions

...
`

try {
  const { metadata, body } = parseSkillMd(content)
  console.log('Valid skill:', metadata.name)
} catch (error) {
  console.error('Invalid SKILL.md format:', error.message)
}
```

## Dependencies

- **yauzl**: ZIP file reading
- **gray-matter**: YAML frontmatter parsing
- **Node.js built-ins**: fs, path, stream

## Installation

Add required dependencies:

```bash
pnpm add yauzl gray-matter
pnpm add -D @types/yauzl
```

## Testing

Run the test suite:

```bash
pnpm test packages/blog/server/utils/skills/
```

Tests cover:
- SKILL.md parsing with various frontmatter formats
- Loading from directories and ZIP files
- Resource extraction
- Error handling and edge cases
- Buffer-based loading
