# Skill Loader Usage Examples

Practical examples for using the skill loader utility in your application.

## Basic SKILL.md Parsing

```typescript
import { parseSkillMd } from '~/server/utils/skills'

const skillContent = `---
name: ai-assistant
description: Provides AI assistance for answering questions
---

# AI Assistant Skill

Use this skill to answer user questions using AI models.

## Instructions

When triggered, the skill will:
1. Accept user input
2. Send to Claude API
3. Return formatted response

## Example

\`\`\`
Input: "What is TypeScript?"
Output: "TypeScript is a typed superset of JavaScript..."
\`\`\`
`

try {
  const { metadata, body } = parseSkillMd(skillContent)
  console.log('Skill Name:', metadata.name)
  console.log('Description:', metadata.description)
  console.log('Body length:', body.length)
} catch (error) {
  console.error('Failed to parse skill:', error.message)
}
```

## Loading from Distribution Archive

```typescript
import { loadSkillFromPath } from '~/server/utils/skills'

// User downloads a .skill file
const downloadedSkillPath = '/downloads/my-assistant-skill.skill'

const skill = await loadSkillFromPath(downloadedSkillPath)

console.log(skill.metadata.name)
console.log(skill.metadata.description)
console.log(skill.body)

// Check for additional resources
if (skill.resources.has('scripts/setup.sh')) {
  const setupScript = skill.resources.get('scripts/setup.sh')
  console.log('Found setup script:', setupScript.toString())
}

if (skill.resources.has('assets/icon.svg')) {
  const icon = skill.resources.get('assets/icon.svg')
  // Use as icon for skill in UI
}
```

## Loading from Development Directory

```typescript
import { loadSkillFromPath } from '~/server/utils/skills'

// During development, load from source directory
const skillDir = '/projects/my-skill'

const skill = await loadSkillFromPath(skillDir)

// Load all reference materials
const references = Array.from(skill.resources.entries()).filter(
  ([path]) => path.startsWith('references/')
)

for (const [path, buffer] of references) {
  const filename = path.split('/').pop()
  console.log(`Reference: ${filename}`)
}
```

## Loading from Database

```typescript
import { loadSkillFromBuffer, SkillLoaderError } from '~/server/utils/skills'

// Retrieve skill from database
const dbSkill = await db.query.skills.findOne({ id: skillId })

try {
  // If stored as plain SKILL.md content
  const skill = await loadSkillFromBuffer(
    Buffer.from(dbSkill.content, 'utf-8'),
    `skill-${skillId}`
  )

  // Save metadata for quick access
  const skillRecord = {
    id: skillId,
    slug: dbSkill.slug,
    name: skill.metadata.name,
    description: skill.metadata.description,
    content: skill.body
  }

  await db.query.skills.update(skillRecord)
} catch (error) {
  if (error instanceof SkillLoaderError) {
    console.error(`Failed to load skill ${skillId}:`, error.code)
  }
}
```

## Processing Skill Resources

```typescript
import { loadSkillFromPath } from '~/server/utils/skills'

async function processSkillResources(skillPath: string) {
  const skill = await loadSkillFromPath(skillPath)

  // Extract all resources by category
  const resources = {
    scripts: new Map<string, string>(),
    references: new Map<string, string>(),
    assets: new Map<string, Buffer>()
  }

  for (const [path, buffer] of skill.resources) {
    const [category, filename] = path.split('/')
    const name = filename

    if (category === 'scripts' || category === 'references') {
      resources[category].set(name, buffer.toString('utf-8'))
    } else if (category === 'assets') {
      resources[category].set(name, buffer)
    }
  }

  return {
    metadata: skill.metadata,
    body: skill.body,
    resources
  }
}

// Usage
const processedSkill = await processSkillResources('/skills/my-skill')

// Execute setup script if present
if (processedSkill.resources.scripts.has('setup.sh')) {
  const setupScript = processedSkill.resources.scripts.get('setup.sh')
  // Run setup...
}
```

## Validating and Storing Skills

```typescript
import { parseSkillMd, loadSkillFromPath, SkillLoaderError } from '~/server/utils/skills'

async function validateAndStoreSkill(skillPath: string) {
  try {
    // Load and parse the skill
    const skill = await loadSkillFromPath(skillPath)

    // Validate metadata
    if (!skill.metadata.name.match(/^[a-z0-9-]+$/)) {
      throw new Error('Skill name must contain only lowercase letters, numbers, and hyphens')
    }

    if (skill.metadata.description.length < 10) {
      throw new Error('Skill description too short (minimum 10 characters)')
    }

    if (skill.body.length < 50) {
      throw new Error('Skill body too short (minimum 50 characters)')
    }

    // Store in database
    const skillRecord = {
      slug: skill.metadata.name,
      name: skill.metadata.name,
      description: skill.metadata.description,
      content: skill.body,
      resourceCount: skill.resources.size,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const stored = await db.query.skills.insert(skillRecord)
    return { success: true, skillId: stored.id }
  } catch (error) {
    if (error instanceof SkillLoaderError) {
      return {
        success: false,
        error: error.message,
        code: error.code
      }
    }
    return {
      success: false,
      error: error.message
    }
  }
}

// Usage
const result = await validateAndStoreSkill('/downloads/new-skill.skill')
if (result.success) {
  console.log('Skill stored with ID:', result.skillId)
} else {
  console.error('Validation failed:', result.error)
}
```

## Building Skill Archives

Example of creating a .skill ZIP for distribution:

```typescript
import { createWriteStream } from 'fs'
import archiver from 'archiver'

async function createSkillArchive(skillDir: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    const output = createWriteStream(outputPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    archive.on('error', reject)
    output.on('close', resolve)

    archive.pipe(output)

    // Add all skill files
    archive.directory(skillDir, false)

    archive.finalize()
  })
}

// Usage
await createSkillArchive('/projects/my-skill', '/dist/my-skill.skill')
```

## Error Handling Patterns

```typescript
import { loadSkillFromPath, SkillLoaderError } from '~/server/utils/skills'

async function robustSkillLoader(path: string) {
  try {
    return await loadSkillFromPath(path)
  } catch (error) {
    if (error instanceof SkillLoaderError) {
      switch (error.code) {
        case 'MISSING_SKILL_MD':
          console.error('SKILL.md not found - skill archive may be corrupted')
          break

        case 'INVALID_FRONTMATTER':
          console.error('SKILL.md frontmatter is invalid - check YAML syntax')
          break

        case 'ZIP_OPEN_ERROR':
        case 'ZIP_READ_ERROR':
          console.error('Failed to read skill archive - file may be corrupted')
          break

        case 'INVALID_PATH':
          console.error('Skill path is neither file nor directory')
          break

        default:
          console.error('Skill loading failed:', error.message)
      }

      // Log error for debugging
      console.error(`[${error.code}] ${error.message}`)
    } else {
      console.error('Unexpected error:', error)
    }
    return null
  }
}
```

## Integration with API Endpoint

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
      return {
        success: false,
        error: error.message,
        code: error.code
      }
    }

    setResponseStatus(event, 500)
    return {
      success: false,
      error: 'Internal server error'
    }
  }
})
```

## Batch Loading Skills

```typescript
import { loadSkillFromPath, SkillLoaderError } from '~/server/utils/skills'

async function loadSkillsFromDirectory(skillsDir: string) {
  const fs = await import('fs').then(m => m.promises)
  const path = await import('path')

  const skillDirs = await fs.readdir(skillsDir, { withFileTypes: true })
  const skills = []
  const errors = []

  for (const entry of skillDirs) {
    if (!entry.isDirectory() && !entry.name.endsWith('.skill')) {
      continue
    }

    const skillPath = path.join(skillsDir, entry.name)

    try {
      const skill = await loadSkillFromPath(skillPath)
      skills.push(skill)
    } catch (error) {
      errors.push({
        path: skillPath,
        error: error instanceof SkillLoaderError
          ? error.message
          : 'Unknown error'
      })
    }
  }

  return { skills, errors }
}

// Usage
const { skills, errors } = await loadSkillsFromDirectory('/skills')
console.log(`Loaded ${skills.length} skills`)
if (errors.length > 0) {
  console.warn(`Failed to load ${errors.length} skills`)
}
```
