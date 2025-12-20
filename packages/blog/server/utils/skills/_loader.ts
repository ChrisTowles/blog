import matter from 'gray-matter'
import type { SkillMetadata, LoadedSkill } from './_types'

export type SkillLoaderErrorCode =
    | 'INVALID_FRONTMATTER'
    | 'MISSING_SKILL_MD'
    | 'PARSE_ERROR'
    | 'PATH_ERROR'
    | 'INVALID_FILE_TYPE'
    | 'ZIP_ERROR'

export class SkillLoaderError extends Error {
    constructor(message: string, public code: SkillLoaderErrorCode) {
        super(message)
        this.name = 'SkillLoaderError'
    }
}

export function parseSkillMd(content: string): { metadata: SkillMetadata; body: string } {
    if (!content || content.trim() === '') {
        throw new SkillLoaderError('SKILL.md content is empty', 'PARSE_ERROR')
    }

    try {
        const { data, content: body } = matter(content)

        if (!data.name || typeof data.name !== 'string') {
            throw new SkillLoaderError('Missing required "name" field', 'INVALID_FRONTMATTER')
        }

        if (!data.description || typeof data.description !== 'string') {
            throw new SkillLoaderError('Missing required "description" field', 'INVALID_FRONTMATTER')
        }

        return {
            metadata: { name: data.name.trim(), description: data.description.trim() },
            body: body.trim()
        }
    } catch (error) {
        if (error instanceof SkillLoaderError) throw error
        throw new SkillLoaderError(`Failed to parse: ${error}`, 'PARSE_ERROR')
    }
}

export async function loadSkillFromPath(path: string): Promise<LoadedSkill> {
    const fs = await import('fs/promises')
    const pathModule = await import('path')

    let stat
    try {
        stat = await fs.stat(path)
    } catch {
        throw new SkillLoaderError(`Path not found: ${path}`, 'PATH_ERROR')
    }

    if (stat.isDirectory()) {
        const skillMdPath = pathModule.join(path, 'SKILL.md')
        let content
        try {
            content = await fs.readFile(skillMdPath, 'utf-8')
        } catch {
            throw new SkillLoaderError('SKILL.md not found in directory', 'MISSING_SKILL_MD')
        }
        const { metadata, body } = parseSkillMd(content)
        const resources = new Map<string, Buffer>()

        for (const dir of ['scripts', 'references', 'assets']) {
            try {
                const files = await fs.readdir(pathModule.join(path, dir))
                for (const file of files) {
                    const filePath = pathModule.join(path, dir, file)
                    if ((await fs.stat(filePath)).isFile()) {
                        resources.set(`${dir}/${file}`, await fs.readFile(filePath))
                    }
                }
            } catch { /* skip */ }
        }

        return { metadata, body, resources, source: path }
    }

    if (path.endsWith('.skill') || path.endsWith('.zip')) {
        const buffer = await fs.readFile(path)
        return loadSkillFromBuffer(buffer, path)
    }

    throw new SkillLoaderError(`Invalid file type: ${path}`, 'INVALID_FILE_TYPE')
}

export async function loadSkillFromBuffer(buffer: Buffer, source = 'buffer'): Promise<LoadedSkill> {
    if (!buffer || buffer.length === 0) {
        throw new SkillLoaderError('Buffer is empty', 'PARSE_ERROR')
    }

    const isZip = buffer[0] === 0x50 && buffer[1] === 0x4B

    if (isZip) {
        const yauzl = await import('yauzl')
        return new Promise((resolve, reject) => {
            yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, zipfile) => {
                if (err) return reject(new SkillLoaderError(`ZIP error: ${err}`, 'ZIP_ERROR'))

                let skillMdContent: string | null = null
                const resources = new Map<string, Buffer>()
                const chunks: Record<string, Buffer[]> = {}

                zipfile.readEntry()

                zipfile.on('entry', (entry) => {
                    const fileName = entry.fileName
                    if (fileName.endsWith('/')) { zipfile.readEntry(); return }

                    const isSkillMd = fileName === 'SKILL.md' || fileName.endsWith('/SKILL.md')
                    const isResource = ['scripts/', 'references/', 'assets/'].some(d => fileName.startsWith(d))

                    if (!isSkillMd && !isResource) { zipfile.readEntry(); return }

                    zipfile.openReadStream(entry, (err, stream) => {
                        if (err) return reject(new SkillLoaderError(`Stream error: ${err}`, 'ZIP_ERROR'))
                        chunks[fileName] = []
                        stream.on('data', (chunk) => chunks[fileName].push(chunk))
                        stream.on('end', () => {
                            const content = Buffer.concat(chunks[fileName])
                            if (isSkillMd) skillMdContent = content.toString('utf-8')
                            else resources.set(fileName, content)
                            zipfile.readEntry()
                        })
                    })
                })

                zipfile.on('end', () => {
                    if (!skillMdContent) return reject(new SkillLoaderError('SKILL.md not found', 'MISSING_SKILL_MD'))
                    try {
                        const { metadata, body } = parseSkillMd(skillMdContent)
                        resolve({ metadata, body, resources, source })
                    } catch (e) { reject(e) }
                })

                zipfile.on('error', (e) => reject(new SkillLoaderError(`ZIP error: ${e}`, 'ZIP_ERROR')))
            })
        })
    }

    const { metadata, body } = parseSkillMd(buffer.toString('utf-8'))
    return { metadata, body, resources: new Map(), source }
}
