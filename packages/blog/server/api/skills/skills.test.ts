import { describe, it, expect } from 'vitest'
import { parseSkillMd, loadSkillFromBuffer, SkillLoaderError } from '../../utils/skills/loader'
import type { SkillMetadata, LoadedSkill } from '../../utils/skills/types'

describe('Skills API - Integration Tests', () => {
  describe('parseSkillMd - SKILL.md Format Variations', () => {
    it('parses minimal SKILL.md with required fields only', () => {
      const content = `---
name: minimal-skill
description: A minimal skill
---
`
      const { metadata, body } = parseSkillMd(content)

      expect(metadata.name).toBe('minimal-skill')
      expect(metadata.description).toBe('A minimal skill')
      expect(body).toBe('')
    })

    it('parses SKILL.md with simple markdown body', () => {
      const content = `---
name: markdown-skill
description: Skill with markdown
---

# Introduction

This is a simple markdown body.

- Item 1
- Item 2

**Bold text** and *italic*.
`
      const { metadata, body } = parseSkillMd(content)

      expect(metadata.name).toBe('markdown-skill')
      expect(metadata.description).toBe('Skill with markdown')
      expect(body).toContain('# Introduction')
      expect(body).toContain('- Item 1')
      expect(body).toContain('**Bold text**')
    })

    it('parses SKILL.md with multiline description', () => {
      const content = `---
name: multiline-skill
description: |
  This is a multiline
  description that spans
  multiple lines
  with detailed information
---

Body content.
`
      const { metadata, body } = parseSkillMd(content)

      expect(metadata.name).toBe('multiline-skill')
      expect(metadata.description).toContain('multiline')
      expect(metadata.description).toContain('multiple lines')
      expect(metadata.description).toContain('detailed information')
    })

    it('parses SKILL.md with special characters in metadata', () => {
      const content = `---
name: special-chars-skill
description: "Description with: colons, commas, [brackets], and 'quotes'"
---

Body
`
      const { metadata } = parseSkillMd(content)

      expect(metadata.name).toBe('special-chars-skill')
      expect(metadata.description).toContain('colons')
      expect(metadata.description).toContain('[brackets]')
      expect(metadata.description).toContain("'quotes'")
    })

    it('parses SKILL.md with code blocks in body', () => {
      const content = `---
name: code-skill
description: Skill with code
---

# Code Examples

\`\`\`javascript
const example = 'code block';
console.log(example);
\`\`\`

\`\`\`bash
#!/bin/bash
echo "Another code block"
\`\`\`
`
      const { body } = parseSkillMd(content)

      expect(body).toContain('```javascript')
      expect(body).toContain("const example = 'code block'")
      expect(body).toContain('```bash')
      expect(body).toContain('#!/bin/bash')
    })

    it('parses SKILL.md with unicode and emoji characters', () => {
      const content = `---
name: unicode-skill
description: "Unicode test: 你好 مرحبا 🚀 ✨"
---

Content with emoji 🎉
`
      const { metadata, body } = parseSkillMd(content)

      expect(metadata.description).toContain('你好')
      expect(metadata.description).toContain('مرحبا')
      expect(metadata.description).toContain('🚀')
      expect(body).toContain('🎉')
    })

    it('parses SKILL.md with trimmed whitespace', () => {
      const content = `---
name:   padded-skill
description:   Padded description
---

   Body with leading spaces
`
      const { metadata, body } = parseSkillMd(content)

      expect(metadata.name).toBe('padded-skill')
      expect(metadata.description).toBe('Padded description')
      expect(body).toBe('Body with leading spaces')
    })

    it('rejects SKILL.md with missing name', () => {
      const content = `---
description: Only description
---
Body`
      expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
    })

    it('rejects SKILL.md with missing description', () => {
      const content = `---
name: no-description
---
Body`
      expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
    })

    it('rejects SKILL.md with no frontmatter', () => {
      const content = 'Just plain text, no frontmatter'
      expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
    })
  })

  describe('loadSkillFromBuffer - Buffer Loading', () => {
    it('loads skill from plain SKILL.md buffer', async () => {
      const content = `---
name: buffer-skill
description: Loaded from buffer
---

# Buffer Skill

This content is loaded from a buffer.
`
      const buffer = Buffer.from(content, 'utf-8')
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.name).toBe('buffer-skill')
      expect(skill.metadata.description).toBe('Loaded from buffer')
      expect(skill.body).toContain('# Buffer Skill')
      expect(skill.source).toBe('buffer')
    })

    it('loads skill with custom source identifier', async () => {
      const content = `---
name: custom-source-skill
description: Test
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer, 'database-id-42')

      expect(skill.source).toBe('database-id-42')
    })

    it('loads skill with UTF-8 encoded buffer', async () => {
      const content = `---
name: utf8-skill
description: "Contains unicode: 你好 🌍"
---
# Content`
      const buffer = Buffer.from(content, 'utf-8')
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.description).toContain('你好')
      expect(skill.metadata.description).toContain('🌍')
    })

    it('loads skill preserving markdown formatting', async () => {
      const content = `---
name: markdown-skill
description: Full markdown support
---

# Heading 1

## Heading 2

**Bold** *italic* \`code\`

- List item 1
- List item 2
  - Nested item

[Link](https://example.com)

> Blockquote text
`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.body).toContain('# Heading 1')
      expect(skill.body).toContain('## Heading 2')
      expect(skill.body).toContain('**Bold**')
      expect(skill.body).toContain('[Link](https://example.com)')
      expect(skill.body).toContain('> Blockquote')
    })

    it('loads skill with empty resources map for plain text', async () => {
      const content = `---
name: no-resources
description: No resources included
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.resources).toBeInstanceOf(Map)
      expect(skill.resources.size).toBe(0)
    })

    it('rejects buffer with invalid SKILL.md format', async () => {
      const invalidContent = `---
description: Missing name field
---
Body`
      const buffer = Buffer.from(invalidContent)

      await expect(loadSkillFromBuffer(buffer)).rejects.toThrow(SkillLoaderError)
    })
  })

  describe('Skill Metadata Extraction', () => {
    it('extracts correct metadata structure', async () => {
      const content = `---
name: test-skill
description: A test skill
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      const metadata = skill.metadata
      expect(metadata).toHaveProperty('name')
      expect(metadata).toHaveProperty('description')
      expect(typeof metadata.name).toBe('string')
      expect(typeof metadata.description).toBe('string')
    })

    it('preserves metadata integrity across loading', async () => {
      const skillName = 'integration-test-skill'
      const skillDesc = 'Test description for integration'
      const content = `---
name: ${skillName}
description: ${skillDesc}
---
Body content`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.name).toBe(skillName)
      expect(skill.metadata.description).toBe(skillDesc)
    })

    it('extracts metadata with complex names', async () => {
      const content = `---
name: complex-skill-name-with-dashes-123
description: Complex name test
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.name).toBe('complex-skill-name-with-dashes-123')
    })

    it('separates metadata from markdown body', async () => {
      const content = `---
name: separator-test
description: Test metadata separation
---

# This is the body

It should not be in metadata.

- Body content
- More content
`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.name).toBe('separator-test')
      expect(skill.body).toContain('# This is the body')
      expect(skill.body).not.toContain('separator-test')
    })

    it('handles metadata with newlines in description', async () => {
      const content = `---
name: newline-skill
description: |
  Line 1
  Line 2
  Line 3
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.description).toContain('Line 1')
      expect(skill.metadata.description).toContain('Line 2')
      expect(skill.metadata.description).toContain('Line 3')
    })
  })

  describe('LoadedSkill Interface Compliance', () => {
    it('returns LoadedSkill with all required fields', async () => {
      const content = `---
name: complete-skill
description: Complete skill test
---
Content here`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill).toHaveProperty('metadata')
      expect(skill).toHaveProperty('body')
      expect(skill).toHaveProperty('resources')
      expect(skill).toHaveProperty('source')
    })

    it('metadata is SkillMetadata type', async () => {
      const content = `---
name: type-test
description: Type test
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      const metadata: SkillMetadata = skill.metadata
      expect(metadata.name).toBeDefined()
      expect(metadata.description).toBeDefined()
    })

    it('resources is a Map instance', async () => {
      const content = `---
name: map-test
description: Map test
---
Body`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.resources instanceof Map).toBe(true)
    })

    it('source is a string', async () => {
      const content = `---
name: source-test
description: Source test
---
Body`
      const buffer = Buffer.from(content, 'utf-8')
      const skill = await loadSkillFromBuffer(buffer, 'test-source')

      expect(typeof skill.source).toBe('string')
      expect(skill.source).toBe('test-source')
    })

    it('body is a string', async () => {
      const content = `---
name: body-test
description: Body test
---
# Body Content

Some text here.
`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(typeof skill.body).toBe('string')
      expect(skill.body).toContain('# Body Content')
    })
  })

  describe('End-to-End Skill Loading', () => {
    it('loads realistic skill with all components', async () => {
      const content = `---
name: real-world-skill
description: A realistic skill with comprehensive content
---

# Real World Skill

This skill demonstrates a complete, realistic skill definition.

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

\`\`\`bash
skill-command --option value
\`\`\`

## Configuration

| Option | Type | Default |
|--------|------|---------|
| debug | boolean | false |
| timeout | number | 30 |

## Examples

### Example 1

Some example content here.

### Example 2

More example content.
`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer, 'skill-123')

      expect(skill.metadata.name).toBe('real-world-skill')
      expect(skill.metadata.description).toBe('A realistic skill with comprehensive content')
      expect(skill.body).toContain('## Features')
      expect(skill.body).toContain('## Usage')
      expect(skill.body).toContain('## Configuration')
      expect(skill.source).toBe('skill-123')
    })

    it('successfully loads and parses skill with complex structure', async () => {
      const content = `---
name: complex-skill-structure
description: Skill with nested sections and code
---

# Overview

## Background

Technical background here.

## Implementation

\`\`\`python
def function():
    return "implementation"
\`\`\`

### Subsection

Additional details.

## See Also

- Related topic 1
- Related topic 2

[External Link](https://example.com)
`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.name).toBe('complex-skill-structure')
      expect(skill.body).toContain('## Background')
      expect(skill.body).toContain('```python')
      expect(skill.body).toContain('[External Link]')
    })

    it('handles large skill content efficiently', async () => {
      const largeBody = '# Large Content\n\n' + 'Line of content\n'.repeat(1000)
      const content = `---
name: large-skill
description: Skill with large content
---
${largeBody}`
      const buffer = Buffer.from(content)
      const skill = await loadSkillFromBuffer(buffer)

      expect(skill.metadata.name).toBe('large-skill')
      expect(skill.body.length).toBeGreaterThan(10000)
      expect(skill.body).toContain('Line of content')
    })
  })

  describe('Error Handling', () => {
    it('provides informative error for missing name', () => {
      const content = `---
description: Missing name
---
Body`
      try {
        parseSkillMd(content)
        expect.fail('Should throw error')
      } catch (error) {
        expect(error).toBeInstanceOf(SkillLoaderError)
        expect((error as SkillLoaderError).code).toBe('INVALID_FRONTMATTER')
      }
    })

    it('provides informative error for missing description', () => {
      const content = `---
name: no-description
---
Body`
      try {
        parseSkillMd(content)
        expect.fail('Should throw error')
      } catch (error) {
        expect(error).toBeInstanceOf(SkillLoaderError)
        expect((error as SkillLoaderError).code).toBe('INVALID_FRONTMATTER')
      }
    })

    it('provides informative error for invalid SKILL.md', async () => {
      const invalidContent = `---
name: test
---
Body`
      const buffer = Buffer.from(invalidContent)
      try {
        await loadSkillFromBuffer(buffer)
        expect.fail('Should throw error')
      } catch (error) {
        expect(error).toBeInstanceOf(SkillLoaderError)
        expect((error as SkillLoaderError).code).toBe('INVALID_FRONTMATTER')
      }
    })

    it('rejects empty buffer', async () => {
      const buffer = Buffer.alloc(0)
      await expect(loadSkillFromBuffer(buffer)).rejects.toThrow(SkillLoaderError)
    })
  })
})
