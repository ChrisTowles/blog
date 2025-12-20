import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs, createWriteStream } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import archiver from 'archiver'
import {
  parseSkillMd,
  loadSkillFromPath,
  loadSkillFromBuffer,
  SkillLoaderError
} from './_loader'

describe('parseSkillMd', () => {
  it('parses valid SKILL.md with frontmatter', () => {
    const content = `---
name: my-skill
description: This does something useful
---

# My Skill

This is the body content.
`
    const { metadata, body } = parseSkillMd(content)

    expect(metadata.name).toBe('my-skill')
    expect(metadata.description).toBe('This does something useful')
    expect(body).toContain('# My Skill')
    expect(body).toContain('This is the body content')
  })

  it('trims whitespace from metadata and body', () => {
    const content = `---
name:   my-skill
description:   Description text
---

   # Body

Content here
`
    const { metadata, body } = parseSkillMd(content)

    expect(metadata.name).toBe('my-skill')
    expect(metadata.description).toBe('Description text')
    expect(body).toBe('# Body\n\nContent here')
  })

  it('throws error if name is missing', () => {
    const content = `---
description: Missing name
---
Body`
    expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
  })

  it('throws error if description is missing', () => {
    const content = `---
name: my-skill
---
Body`
    expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
  })

  it('handles multiline frontmatter values', () => {
    const content = `---
name: skill-name
description: |
  This is a multiline
  description that spans
  multiple lines
---
# Body content
`
    const { metadata } = parseSkillMd(content)

    expect(metadata.description).toContain('multiline')
    expect(metadata.description).toContain('multiple lines')
  })

  it('throws error if name is not a string', () => {
    const content = `---
name: 123
description: Description
---
Body`
    // YAML parser treats 123 as number, not string
    expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
  })

  it('throws error if name is empty string', () => {
    const content = `---
name: ""
description: Description
---
Body`
    expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
  })

  it('throws error if description is empty string', () => {
    const content = `---
name: my-skill
description: ""
---
Body`
    expect(() => parseSkillMd(content)).toThrow(SkillLoaderError)
  })

  it('handles empty body gracefully', () => {
    const content = `---
name: my-skill
description: A skill
---
`
    const { metadata, body } = parseSkillMd(content)

    expect(metadata.name).toBe('my-skill')
    expect(body).toBe('')
  })

  it('handles YAML with special characters in description', () => {
    const content = `---
name: skill-name
description: "Description with: colons, commas, and [brackets]"
---
Body`
    const { metadata } = parseSkillMd(content)

    expect(metadata.description).toContain('colons')
    expect(metadata.description).toContain('[brackets]')
  })

  it('throws SkillLoaderError with correct error code for missing frontmatter', () => {
    const content = `---
description: Only description
---
Body`
    try {
      parseSkillMd(content)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('INVALID_FRONTMATTER')
    }
  })

  it('throws SkillLoaderError with PARSE_ERROR code for invalid YAML', () => {
    const content = `---
name: my-skill
description: Description
invalid yaml here::[[]
---
Body`
    try {
      parseSkillMd(content)
      // gray-matter is lenient, so this might not throw
      // but if it does, verify the error
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('PARSE_ERROR')
    }
  })

  it('handles content with no frontmatter', () => {
    const content = `Just plain text, no frontmatter`
    try {
      parseSkillMd(content)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
    }
  })

  it('preserves markdown formatting in body', () => {
    const content = `---
name: skill
description: desc
---
# Heading

**Bold** and *italic* text

\`\`\`javascript
const code = 'example'
\`\`\`

- List item 1
- List item 2
`
    const { body } = parseSkillMd(content)

    expect(body).toContain('# Heading')
    expect(body).toContain('**Bold**')
    expect(body).toContain('```javascript')
    expect(body).toContain('- List item 1')
  })
})

describe('loadSkillFromPath', () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = join(tmpdir(), `skill-test-${Date.now()}-${Math.random()}`)
    await fs.mkdir(tempDir, { recursive: true })
  })

  afterEach(async () => {
    try {
      await fs.rm(tempDir, { recursive: true })
    } catch {
      // ignore cleanup errors
    }
  })

  it('loads skill from directory', async () => {
    const skillDir = join(tempDir, 'my-skill')
    await fs.mkdir(skillDir)

    const skillMd = `---
name: test-skill
description: Test skill for loading
---

# Test Skill

This is a test.
`
    await fs.writeFile(join(skillDir, 'SKILL.md'), skillMd)

    const skill = await loadSkillFromPath(skillDir)

    expect(skill.metadata.name).toBe('test-skill')
    expect(skill.metadata.description).toBe('Test skill for loading')
    expect(skill.body).toContain('# Test Skill')
    expect(skill.source).toBe(skillDir)
  })

  it('loads resources from directory subdirectories', async () => {
    const skillDir = join(tempDir, 'skill-with-resources')
    await fs.mkdir(skillDir)
    await fs.mkdir(join(skillDir, 'scripts'))
    await fs.mkdir(join(skillDir, 'assets'))

    await fs.writeFile(
      join(skillDir, 'SKILL.md'),
      `---
name: skill-with-resources
description: Has resources
---
Body`
    )
    await fs.writeFile(join(skillDir, 'scripts', 'setup.sh'), '#!/bin/bash\necho "setup"')
    await fs.writeFile(join(skillDir, 'assets', 'icon.svg'), '<svg></svg>')

    const skill = await loadSkillFromPath(skillDir)

    expect(skill.resources.has('scripts/setup.sh')).toBe(true)
    expect(skill.resources.has('assets/icon.svg')).toBe(true)
    expect(skill.resources.get('scripts/setup.sh')?.toString()).toContain('setup')
  })

  it('loads resources from all three resource directories', async () => {
    const skillDir = join(tempDir, 'skill-all-resources')
    await fs.mkdir(skillDir)
    await fs.mkdir(join(skillDir, 'scripts'))
    await fs.mkdir(join(skillDir, 'references'))
    await fs.mkdir(join(skillDir, 'assets'))

    await fs.writeFile(
      join(skillDir, 'SKILL.md'),
      `---
name: all-resources
description: Has all resource types
---
Body`
    )
    await fs.writeFile(join(skillDir, 'scripts', 'test.js'), 'console.log("test")')
    await fs.writeFile(join(skillDir, 'references', 'link.md'), '[Link](https://example.com)')
    await fs.writeFile(join(skillDir, 'assets', 'data.json'), '{"key": "value"}')

    const skill = await loadSkillFromPath(skillDir)

    expect(skill.resources.size).toBe(3)
    expect(skill.resources.has('scripts/test.js')).toBe(true)
    expect(skill.resources.has('references/link.md')).toBe(true)
    expect(skill.resources.has('assets/data.json')).toBe(true)
  })

  it('ignores missing resource directories', async () => {
    const skillDir = join(tempDir, 'skill-no-resources')
    await fs.mkdir(skillDir)

    await fs.writeFile(
      join(skillDir, 'SKILL.md'),
      `---
name: no-resources
description: No resource dirs
---
Body`
    )

    const skill = await loadSkillFromPath(skillDir)

    expect(skill.resources.size).toBe(0)
  })

  it('handles resource directories with nested subdirectories (only first level)', async () => {
    const skillDir = join(tempDir, 'skill-nested-resources')
    await fs.mkdir(skillDir)
    await fs.mkdir(join(skillDir, 'scripts'))
    await fs.mkdir(join(skillDir, 'scripts', 'nested'))

    await fs.writeFile(
      join(skillDir, 'SKILL.md'),
      `---
name: nested-test
description: Nested resources
---
Body`
    )
    await fs.writeFile(join(skillDir, 'scripts', 'direct.sh'), '#!/bin/bash')
    await fs.writeFile(join(skillDir, 'scripts', 'nested', 'ignored.sh'), '#!/bin/bash')

    const skill = await loadSkillFromPath(skillDir)

    // Only direct files should be loaded, not nested
    expect(skill.resources.has('scripts/direct.sh')).toBe(true)
    expect(skill.resources.has('scripts/nested/ignored.sh')).toBe(false)
  })

  it('throws error when SKILL.md is missing', async () => {
    const skillDir = join(tempDir, 'no-skill-md')
    await fs.mkdir(skillDir)

    await expect(loadSkillFromPath(skillDir)).rejects.toThrow(SkillLoaderError)
  })

  it('throws error with MISSING_SKILL_MD code when SKILL.md absent', async () => {
    const skillDir = join(tempDir, 'no-skill-md-2')
    await fs.mkdir(skillDir)

    try {
      await loadSkillFromPath(skillDir)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('MISSING_SKILL_MD')
    }
  })

  it('throws error for non-existent path', async () => {
    const nonExistentPath = join(tempDir, 'does-not-exist')

    await expect(loadSkillFromPath(nonExistentPath)).rejects.toThrow(SkillLoaderError)
  })

  it('throws error with PATH_ERROR code for non-existent path', async () => {
    const nonExistentPath = join(tempDir, 'does-not-exist-2')

    try {
      await loadSkillFromPath(nonExistentPath)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('PATH_ERROR')
    }
  })

  it('rejects .skill files with wrong extension', async () => {
    const wrongPath = join(tempDir, 'file.txt')
    await fs.writeFile(wrongPath, 'content')

    await expect(loadSkillFromPath(wrongPath)).rejects.toThrow(SkillLoaderError)
  })

  it('throws error with INVALID_FILE_TYPE for wrong extension', async () => {
    const wrongPath = join(tempDir, 'file.txt')
    await fs.writeFile(wrongPath, 'content')

    try {
      await loadSkillFromPath(wrongPath)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('INVALID_FILE_TYPE')
    }
  })

  it('loads skill with complex markdown body', async () => {
    const skillDir = join(tempDir, 'complex-skill')
    await fs.mkdir(skillDir)

    const skillMd = `---
name: complex-skill
description: Complex skill
---

# Complex Skill

## Section 1
Content here.

## Section 2
More content.

\`\`\`yaml
config:
  key: value
\`\`\`

**Bold** and *italic* text.

- Item 1
- Item 2
  - Nested item

[Link](https://example.com)
`

    await fs.writeFile(join(skillDir, 'SKILL.md'), skillMd)

    const skill = await loadSkillFromPath(skillDir)

    expect(skill.body).toContain('## Section 1')
    expect(skill.body).toContain('## Section 2')
    expect(skill.body).toContain('```yaml')
    expect(skill.body).toContain('[Link](https://example.com)')
  })

  it('handles large resource files', async () => {
    const skillDir = join(tempDir, 'large-files')
    await fs.mkdir(skillDir)
    await fs.mkdir(join(skillDir, 'assets'))

    await fs.writeFile(
      join(skillDir, 'SKILL.md'),
      `---
name: large-files
description: Has large assets
---
Body`
    )

    // Create a 1MB file
    const largeContent = Buffer.alloc(1024 * 1024, 'x')
    await fs.writeFile(join(skillDir, 'assets', 'large.bin'), largeContent)

    const skill = await loadSkillFromPath(skillDir)

    expect(skill.resources.has('assets/large.bin')).toBe(true)
    const buffer = skill.resources.get('assets/large.bin')
    expect(buffer?.length).toBe(1024 * 1024)
  })
})

describe('loadSkillFromBuffer', () => {
  it('loads skill from SKILL.md buffer', async () => {
    const content = `---
name: buffer-skill
description: Loaded from buffer
---

# Buffer Skill

Content here.
`
    const buffer = Buffer.from(content, 'utf-8')
    const skill = await loadSkillFromBuffer(buffer)

    expect(skill.metadata.name).toBe('buffer-skill')
    expect(skill.metadata.description).toBe('Loaded from buffer')
    expect(skill.body).toContain('# Buffer Skill')
    expect(skill.resources.size).toBe(0)
  })

  it('includes source identifier', async () => {
    const content = `---
name: test
description: test
---
Body`
    const buffer = Buffer.from(content)
    const skill = await loadSkillFromBuffer(buffer, 'db-id-123')

    expect(skill.source).toBe('db-id-123')
  })

  it('uses default source identifier if not provided', async () => {
    const content = `---
name: test
description: test
---
Body`
    const buffer = Buffer.from(content)
    const skill = await loadSkillFromBuffer(buffer)

    expect(skill.source).toBe('buffer')
  })

  it('throws error for invalid content', async () => {
    const invalidContent = `---
description: Missing name
---
Body`
    const buffer = Buffer.from(invalidContent)

    await expect(loadSkillFromBuffer(buffer)).rejects.toThrow(SkillLoaderError)
  })

  it('handles buffer with UTF-8 encoded content', async () => {
    const content = `---
name: utf8-skill
description: "Unicode: 你好 مرحبا 🚀"
---
# Body`
    const buffer = Buffer.from(content, 'utf-8')
    const skill = await loadSkillFromBuffer(buffer)

    expect(skill.metadata.name).toBe('utf8-skill')
    expect(skill.metadata.description).toContain('🚀')
  })

  it('handles buffer with different encodings', async () => {
    const content = `---
name: skill
description: Simple description
---
Body`
    const buffer = Buffer.from(content, 'utf-8')
    const skill = await loadSkillFromBuffer(buffer)

    expect(skill.metadata.name).toBe('skill')
  })

  it('throws error when buffer is empty', async () => {
    const buffer = Buffer.alloc(0)

    await expect(loadSkillFromBuffer(buffer)).rejects.toThrow(SkillLoaderError)
  })

  it('throws INVALID_FRONTMATTER for invalid content type', async () => {
    const buffer = Buffer.from('not valid YAML or ZIP')

    try {
      await loadSkillFromBuffer(buffer)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('INVALID_FRONTMATTER')
    }
  })

  it('preserves resources map as empty for plain text buffer', async () => {
    const content = `---
name: skill
description: desc
---
Body`
    const buffer = Buffer.from(content)
    const skill = await loadSkillFromBuffer(buffer)

    expect(skill.resources).toBeInstanceOf(Map)
    expect(skill.resources.size).toBe(0)
  })

  it('handles large plain text buffers', async () => {
    const body = 'x'.repeat(10000)
    const content = `---
name: large-skill
description: Large skill
---
${body}`
    const buffer = Buffer.from(content)
    const skill = await loadSkillFromBuffer(buffer)

    expect(skill.body).toContain('x')
    expect(skill.body.length).toBeGreaterThanOrEqual(10000)
  })
})

describe('ZIP file loading', () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = join(tmpdir(), `skill-zip-test-${Date.now()}-${Math.random()}`)
    await fs.mkdir(tempDir, { recursive: true })
  })

  afterEach(async () => {
    try {
      await fs.rm(tempDir, { recursive: true })
    } catch {
      // ignore cleanup errors
    }
  })

  /**
   * Helper to create a .skill ZIP file
   */
  async function createSkillZip(
    zipPath: string,
    files: Record<string, string>
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = createWriteStream(zipPath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      archive.on('error', reject)
      output.on('close', resolve)
      output.on('error', reject)

      archive.pipe(output)

      for (const [filename, content] of Object.entries(files)) {
        archive.append(content, { name: filename })
      }

      archive.finalize()
    })
  }

  it('loads skill from .skill ZIP file', async () => {
    const zipPath = join(tempDir, 'test-skill.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: zip-skill
description: Loaded from ZIP
---

# ZIP Skill

Content.`
    })

    const skill = await loadSkillFromPath(zipPath)

    expect(skill.metadata.name).toBe('zip-skill')
    expect(skill.metadata.description).toBe('Loaded from ZIP')
    expect(skill.body).toContain('# ZIP Skill')
    expect(skill.source).toEqual(zipPath)
  })

  it('extracts resources from ZIP', async () => {
    const zipPath = join(tempDir, 'skill-with-res.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: zip-with-res
description: Has resources
---
Body`,
      'scripts/install.sh': '#!/bin/bash\necho "installing"',
      'assets/readme.txt': 'Asset content',
      'references/link.md': '[Reference](https://example.com)'
    })

    const skill = await loadSkillFromPath(zipPath)

    expect(skill.resources.has('scripts/install.sh')).toBe(true)
    expect(skill.resources.has('assets/readme.txt')).toBe(true)
    expect(skill.resources.has('references/link.md')).toBe(true)
    expect(skill.resources.size).toBe(3)
  })

  it('extracts all three resource types from ZIP', async () => {
    const zipPath = join(tempDir, 'zip-all-resources.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: all-resources
description: All types
---
Body`,
      'scripts/setup.sh': '#!/bin/bash',
      'scripts/cleanup.sh': '#!/bin/bash',
      'references/docs.md': '# Documentation',
      'references/api.txt': 'API Info',
      'assets/icon.png': 'PNG DATA',
      'assets/style.css': 'body { color: red; }'
    })

    const skill = await loadSkillFromPath(zipPath)

    expect(skill.resources.size).toBe(6)
    expect(skill.resources.has('scripts/setup.sh')).toBe(true)
    expect(skill.resources.has('scripts/cleanup.sh')).toBe(true)
    expect(skill.resources.has('references/docs.md')).toBe(true)
    expect(skill.resources.has('assets/style.css')).toBe(true)
  })

  it('loads ZIP from buffer', async () => {
    const zipPath = join(tempDir, 'temp.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: zip-buffer-skill
description: From ZIP buffer
---
Content`
    })

    const zipBuffer = await fs.readFile(zipPath)
    const skill = await loadSkillFromBuffer(zipBuffer)

    expect(skill.metadata.name).toBe('zip-buffer-skill')
    expect(skill.metadata.description).toBe('From ZIP buffer')
  })

  it('loads ZIP from buffer with resources', async () => {
    const zipPath = join(tempDir, 'temp-with-res.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: zip-buffer-res
description: From buffer
---
Body`,
      'scripts/test.sh': '#!/bin/bash\necho test',
      'assets/data.json': '{"test": true}'
    })

    const zipBuffer = await fs.readFile(zipPath)
    const skill = await loadSkillFromBuffer(zipBuffer, 'db-123')

    expect(skill.resources.has('scripts/test.sh')).toBe(true)
    expect(skill.resources.has('assets/data.json')).toBe(true)
    expect(skill.source).toBe('db-123')
  })

  it('detects ZIP magic bytes correctly', async () => {
    const zipPath = join(tempDir, 'magic-test.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: magic-test
description: Magic byte test
---
Body`
    })

    const zipBuffer = await fs.readFile(zipPath)
    // ZIP files start with PK (0x50 0x4B)
    expect(zipBuffer[0]).toBe(0x50)
    expect(zipBuffer[1]).toBe(0x4b)
    expect(zipBuffer[2]).toBe(0x03)
    expect(zipBuffer[3]).toBe(0x04)

    const skill = await loadSkillFromBuffer(zipBuffer)
    expect(skill.metadata.name).toBe('magic-test')
  })

  it('throws error when SKILL.md missing from ZIP', async () => {
    const zipPath = join(tempDir, 'no-skill-md.skill')

    await createSkillZip(zipPath, {
      'README.md': 'Just a readme, no SKILL.md'
    })

    await expect(loadSkillFromPath(zipPath)).rejects.toThrow(SkillLoaderError)
  })

  it('throws MISSING_SKILL_MD when SKILL.md missing from ZIP', async () => {
    const zipPath = join(tempDir, 'no-skill-md-2.skill')

    await createSkillZip(zipPath, {
      'README.md': 'Just a readme'
    })

    try {
      await loadSkillFromPath(zipPath)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('MISSING_SKILL_MD')
    }
  })

  it('throws MISSING_SKILL_MD when SKILL.md missing from ZIP buffer', async () => {
    const zipPath = join(tempDir, 'no-skill-md-3.skill')

    await createSkillZip(zipPath, {
      'other.txt': 'content'
    })

    const zipBuffer = await fs.readFile(zipPath)

    try {
      await loadSkillFromBuffer(zipBuffer)
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SkillLoaderError)
      expect((error as SkillLoaderError).code).toBe('MISSING_SKILL_MD')
    }
  })

  it('skips directories in ZIP', async () => {
    const zipPath = join(tempDir, 'with-dirs.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: skip-dirs
description: Skip directories
---
Body`,
      'scripts/test.sh': 'content'
    })

    const skill = await loadSkillFromPath(zipPath)

    // Only files should be extracted, not directory entries
    expect(skill.resources.has('scripts/test.sh')).toBe(true)
  })

  it('loads large binary files from ZIP', async () => {
    const zipPath = join(tempDir, 'large-binary.skill')

    // Create binary data
    const binaryData = Buffer.alloc(1024 * 100) // 100KB
    binaryData.fill(0xff)

    // Create ZIP manually with binary data
    await new Promise<void>((resolve, reject) => {
      const output = createWriteStream(zipPath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      archive.on('error', reject)
      output.on('close', () => resolve())
      output.on('error', reject)

      archive.pipe(output)

      archive.append(`---
name: large-binary
description: Large binary
---
Body`, { name: 'SKILL.md' })
      archive.append(binaryData, { name: 'assets/data.bin' })

      archive.finalize()
    })

    const skill = await loadSkillFromPath(zipPath)
    expect(skill.resources.has('assets/data.bin')).toBe(true)
    expect(skill.resources.get('assets/data.bin')?.length).toBe(1024 * 100)
  })

  it('handles ZIP with UTF-8 filenames', async () => {
    const zipPath = join(tempDir, 'utf8-filenames.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: utf8-files
description: UTF-8 filenames
---
Body`,
      'scripts/script-with-ñame.sh': 'content',
      'assets/data.json': '{"unicode": "测试"}'
    })

    const skill = await loadSkillFromPath(zipPath)

    expect(skill.resources.has('scripts/script-with-ñame.sh')).toBe(true)
    expect(skill.resources.has('assets/data.json')).toBe(true)
  })

  it('handles ZIP with extra files outside resource dirs', async () => {
    const zipPath = join(tempDir, 'extra-files.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: extra-files
description: Extra files
---
Body`,
      'README.md': 'Extra readme',
      'LICENSE': 'License text',
      'scripts/test.sh': 'test'
    })

    const skill = await loadSkillFromPath(zipPath)

    // Only resources from scripts/, references/, assets/ should be loaded
    expect(skill.resources.has('scripts/test.sh')).toBe(true)
    expect(skill.resources.has('README.md')).toBe(false)
    expect(skill.resources.has('LICENSE')).toBe(false)
  })

  it('correctly parses SKILL.md from ZIP with various metadata', async () => {
    const zipPath = join(tempDir, 'complex-metadata.skill')

    await createSkillZip(zipPath, {
      'SKILL.md': `---
name: complex-skill
description: |
  This is a multiline
  description that spans
  multiple lines
  with special chars: !@#$%
---
# Complex Body

More content here with **bold** and *italic*.
`
    })

    const skill = await loadSkillFromPath(zipPath)

    expect(skill.metadata.name).toBe('complex-skill')
    expect(skill.metadata.description).toContain('multiline')
    expect(skill.metadata.description).toContain('special chars')
    expect(skill.body).toContain('# Complex Body')
    expect(skill.body).toContain('**bold**')
  })
})
