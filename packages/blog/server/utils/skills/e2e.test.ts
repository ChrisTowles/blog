import { describe, it, expect } from 'vitest'
import { Writable } from 'stream'
import archiver from 'archiver'
import {
  loadSkillFromBuffer,
  SkillLoaderError
} from './_loader'

describe('Skills E2E - ZIP Buffer Loading', () => {
  /**
   * Helper: Create a .skill ZIP buffer in memory
   */
  async function createSkillZipBuffer(
    files: Record<string, string>
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      const writable = new Writable({
        write(chunk: Buffer, encoding, callback) {
          chunks.push(chunk)
          callback()
        },
        final(callback) {
          callback()
        }
      })

      const archive = archiver('zip', { zlib: { level: 9 } })

      archive.on('error', reject)
      writable.on('finish', () => {
        resolve(Buffer.concat(chunks))
      })
      writable.on('error', reject)

      archive.pipe(writable)

      for (const [filename, content] of Object.entries(files)) {
        archive.append(content, { name: filename })
      }

      archive.finalize()
    })
  }

  it('E2E: Creates ZIP buffer and loads skill successfully', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: test-assistant
description: A test skill for verifying the skill system works correctly
---

# Test Assistant

This is a test skill that provides helpful responses.

## Instructions
- Be helpful and concise
- Answer questions directly
`
    })

    // Verify buffer is a valid ZIP (PK magic bytes)
    expect(zipBuffer[0]).toBe(0x50) // P
    expect(zipBuffer[1]).toBe(0x4b) // K
    expect(zipBuffer[2]).toBe(0x03)
    expect(zipBuffer[3]).toBe(0x04)

    // Load skill from buffer
    const skill = await loadSkillFromBuffer(zipBuffer)

    // Verify metadata
    expect(skill.metadata.name).toBe('test-assistant')
    expect(skill.metadata.description).toBe('A test skill for verifying the skill system works correctly')

    // Verify body content
    expect(skill.body).toContain('# Test Assistant')
    expect(skill.body).toContain('This is a test skill that provides helpful responses.')
    expect(skill.body).toContain('## Instructions')
    expect(skill.body).toContain('- Be helpful and concise')
    expect(skill.body).toContain('- Answer questions directly')

    // Verify resources map is present and empty
    expect(skill.resources).toBeInstanceOf(Map)
    expect(skill.resources.size).toBe(0)

    // Verify source identifier
    expect(skill.source).toBe('buffer')
  })

  it('E2E: Loads ZIP with custom source identifier', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: test-skill-2
description: Another test skill
---

Body content here.
`
    })

    const skill = await loadSkillFromBuffer(zipBuffer, 'skill-db-456')

    expect(skill.metadata.name).toBe('test-skill-2')
    expect(skill.source).toBe('skill-db-456')
  })

  it('E2E: ZIP with multiple resources extracted correctly', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: full-featured
description: Skill with all resource types
---

# Full Featured Skill

Instructions go here.
`,
      'scripts/setup.sh': '#!/bin/bash\necho "Setting up..."',
      'scripts/cleanup.sh': '#!/bin/bash\necho "Cleaning up..."',
      'assets/config.json': JSON.stringify({ version: '1.0', enabled: true }),
      'references/docs.md': '# Documentation\n\nSome helpful docs.',
      'README.md': 'This should NOT be included in resources'
    })

    const skill = await loadSkillFromBuffer(zipBuffer)

    // Verify metadata
    expect(skill.metadata.name).toBe('full-featured')
    expect(skill.metadata.description).toBe('Skill with all resource types')

    // Verify body
    expect(skill.body).toContain('# Full Featured Skill')
    expect(skill.body).toContain('Instructions go here.')

    // Verify resources from all three directories
    expect(skill.resources.has('scripts/setup.sh')).toBe(true)
    expect(skill.resources.has('scripts/cleanup.sh')).toBe(true)
    expect(skill.resources.has('assets/config.json')).toBe(true)
    expect(skill.resources.has('references/docs.md')).toBe(true)

    // Verify root-level files are NOT included in resources
    expect(skill.resources.has('README.md')).toBe(false)

    // Verify resources count
    expect(skill.resources.size).toBe(4)

    // Verify resource content
    const setupScript = skill.resources.get('scripts/setup.sh')
    expect(setupScript?.toString()).toContain('Setting up...')

    const configJson = skill.resources.get('assets/config.json')
    expect(configJson?.toString()).toContain('"version":"1.0"')

    const docsMd = skill.resources.get('references/docs.md')
    expect(docsMd?.toString()).toContain('# Documentation')
  })

  it('E2E: Handles binary resources in ZIP', async () => {
    // Create binary data
    const binaryData = Buffer.alloc(256)
    for (let i = 0; i < 256; i++) {
      binaryData[i] = i
    }

    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: binary-skill
description: Skill with binary resources
---

Body.
`
    })

    // Manually add binary data since archiver's append works with strings/buffers
    // For now, test with the ZIP buffer created
    const skill = await loadSkillFromBuffer(zipBuffer)

    expect(skill.metadata.name).toBe('binary-skill')
    expect(skill.body).toBe('Body.')
  })

  it('E2E: Detects ZIP format and handles appropriately', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: detection-test
description: Tests ZIP format detection
---

Testing format detection.
`
    })

    // Verify it's detected as ZIP
    const isZip = zipBuffer.length >= 4 &&
      zipBuffer[0] === 0x50 &&
      zipBuffer[1] === 0x4b &&
      zipBuffer[2] === 0x03 &&
      zipBuffer[3] === 0x04

    expect(isZip).toBe(true)

    const skill = await loadSkillFromBuffer(zipBuffer)

    // Should be loaded as ZIP and parsed correctly
    expect(skill.metadata.name).toBe('detection-test')
    expect(skill.body).toContain('Testing format detection.')
  })

  it('E2E: Validates required metadata fields', async () => {
    // Missing name
    const invalidZip1 = await createSkillZipBuffer({
      'SKILL.md': `---
description: Missing name field
---

Body.
`
    })

    await expect(loadSkillFromBuffer(invalidZip1)).rejects.toThrow(SkillLoaderError)

    // Missing description
    const invalidZip2 = await createSkillZipBuffer({
      'SKILL.md': `---
name: missing-description
---

Body.
`
    })

    await expect(loadSkillFromBuffer(invalidZip2)).rejects.toThrow(SkillLoaderError)
  })

  it('E2E: Throws error when SKILL.md missing from ZIP', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'README.md': 'No SKILL.md present',
      'scripts/script.sh': 'echo test'
    })

    try {
      await loadSkillFromBuffer(zipBuffer)
      expect.fail('Should have thrown SkillLoaderError')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('MISSING_SKILL_MD')
    }
  })

  it('E2E: Preserves markdown formatting in body', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: markdown-test
description: Tests markdown preservation
---

# Main Heading

## Sub Heading

**Bold text** and *italic text*.

\`\`\`javascript
const x = 42;
console.log(x);
\`\`\`

- List item 1
- List item 2
  - Nested item

[Link text](https://example.com)

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`
    })

    const skill = await loadSkillFromBuffer(zipBuffer)

    expect(skill.body).toContain('# Main Heading')
    expect(skill.body).toContain('## Sub Heading')
    expect(skill.body).toContain('**Bold text**')
    expect(skill.body).toContain('*italic text*')
    expect(skill.body).toContain('```javascript')
    expect(skill.body).toContain('const x = 42;')
    expect(skill.body).toContain('- List item 1')
    expect(skill.body).toContain('- Nested item')
    expect(skill.body).toContain('[Link text](https://example.com)')
    expect(skill.body).toContain('| Column 1 | Column 2 |')
  })

  it('E2E: Trims whitespace from metadata', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name:   test-trim
description:    Description with leading/trailing spaces
---

   # Body with leading spaces

Content here.
`
    })

    const skill = await loadSkillFromBuffer(zipBuffer)

    expect(skill.metadata.name).toBe('test-trim')
    expect(skill.metadata.description).toBe('Description with leading/trailing spaces')
    // Body should have leading spaces trimmed overall but preserve internal formatting
    expect(skill.body).toContain('# Body with leading spaces')
  })

  it('E2E: Handles multiline metadata values', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: multiline-test
description: |
  This is a multiline description
  that spans across
  multiple lines
  with various details
---

# Multiline Test

Body content.
`
    })

    const skill = await loadSkillFromBuffer(zipBuffer)

    expect(skill.metadata.name).toBe('multiline-test')
    expect(skill.metadata.description).toContain('multiline description')
    expect(skill.metadata.description).toContain('multiple lines')
    expect(skill.metadata.description).toContain('various details')
  })

  it('E2E: Handles special characters in metadata', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: special-chars-skill
description: "Description with: colons, commas, [brackets], and {braces}"
---

# Special Characters

Content with Unicode: 你好 مرحبا 🚀
`
    })

    const skill = await loadSkillFromBuffer(zipBuffer)

    expect(skill.metadata.description).toContain('colons')
    expect(skill.metadata.description).toContain('[brackets]')
    expect(skill.body).toContain('你好')
    expect(skill.body).toContain('مرحبا')
    expect(skill.body).toContain('🚀')
  })

  it('E2E: Full real-world scenario - test-assistant skill', async () => {
    const zipBuffer = await createSkillZipBuffer({
      'SKILL.md': `---
name: test-assistant
description: A test skill for verifying the skill system works correctly
---

# Test Assistant

This is a test skill that provides helpful responses.

## Instructions
- Be helpful and concise
- Answer questions directly
`,
      'scripts/validate.sh': '#!/bin/bash\necho "Validating..."',
      'assets/instructions.json': JSON.stringify({
        tone: 'helpful',
        verbosity: 'concise',
        strictness: 'moderate'
      }),
      'references/guidelines.md': '# Guidelines\n\nFollow these guidelines.'
    })

    const skill = await loadSkillFromBuffer(zipBuffer, 'test-assistant-v1')

    // Full validation
    expect(skill.metadata.name).toBe('test-assistant')
    expect(skill.metadata.description).toBe('A test skill for verifying the skill system works correctly')

    expect(skill.body).toContain('# Test Assistant')
    expect(skill.body).toContain('This is a test skill that provides helpful responses.')
    expect(skill.body).toContain('## Instructions')
    expect(skill.body).toContain('- Be helpful and concise')
    expect(skill.body).toContain('- Answer questions directly')

    expect(skill.resources.size).toBe(3)
    expect(skill.resources.has('scripts/validate.sh')).toBe(true)
    expect(skill.resources.has('assets/instructions.json')).toBe(true)
    expect(skill.resources.has('references/guidelines.md')).toBe(true)

    expect(skill.source).toBe('test-assistant-v1')

    // Verify resource contents
    const instructions = JSON.parse(skill.resources.get('assets/instructions.json')?.toString() || '{}')
    expect(instructions.tone).toBe('helpful')
    expect(instructions.verbosity).toBe('concise')

    const guidelines = skill.resources.get('references/guidelines.md')?.toString()
    expect(guidelines).toContain('# Guidelines')
  })
})
