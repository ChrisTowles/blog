import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join, basename } from 'node:path'
import type { SlotConfig } from './slots.js'

export interface EnvVar {
    key: string
    value: string
    type: 'slot' | 'copy' | 'static'
}

export function getTemplateFiles(configDir: string): string[] {
    if (!existsSync(configDir)) return []
    return readdirSync(configDir)
        .filter(f => f.startsWith('.env') && f.endsWith('.template'))
        .map(f => join(configDir, f))
}

export function getOutputFileName(templatePath: string): string {
    const name = basename(templatePath)
    return name.replace(/\.template$/, '')
}

export function parseTemplate(content: string): EnvVar[] {
    const lines = content.split('\n')
    const vars: EnvVar[] = []

    for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed === '' || trimmed.startsWith('#')) continue

        const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
        if (!match) continue

        const [, key, value] = match

        if (value.match(/\{\{[A-Z_][A-Z0-9_]*\}\}/)) {
            vars.push({ key, value, type: 'slot' })
        } else if (value.match(/\{\{COPY:[A-Z_][A-Z0-9_]*\}\}/)) {
            vars.push({ key, value, type: 'copy' })
        } else {
            vars.push({ key, value, type: 'static' })
        }
    }

    return vars
}

export function extractSlotVars(content: string): string[] {
    const matches = content.matchAll(/\{\{([A-Z_][A-Z0-9_]*)\}\}/g)
    const vars = new Set<string>()
    for (const match of matches) {
        if (!match[1].startsWith('COPY:')) {
            vars.add(match[1])
        }
    }
    return [...vars]
}

export function extractCopyVars(content: string): string[] {
    const matches = content.matchAll(/\{\{COPY:([A-Z_][A-Z0-9_]*)\}\}/g)
    const vars = new Set<string>()
    for (const match of matches) {
        vars.add(match[1])
    }
    return [...vars]
}

export function readEnvFile(path: string): Map<string, string> {
    const vars = new Map<string, string>()
    if (!existsSync(path)) return vars

    const content = readFileSync(path, 'utf-8')
    for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (trimmed === '' || trimmed.startsWith('#')) continue

        const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
        if (match) {
            vars.set(match[1], match[2])
        }
    }
    return vars
}

export function processTemplate(
    templateContent: string,
    slotConfig: SlotConfig,
    mainEnvVars: Map<string, string>
): { content: string; warnings: string[] } {
    const warnings: string[] = []
    let result = templateContent

    // Replace slot vars {{VAR}}
    result = result.replace(/\{\{([A-Z_][A-Z0-9_]*)\}\}/g, (match, varName) => {
        if (varName.startsWith('COPY:')) return match
        const value = slotConfig[varName]
        if (value === undefined) {
            warnings.push(`Template has {{${varName}}} but not defined in slots.yaml`)
            return match
        }
        return String(value)
    })

    // Replace copy vars {{COPY:VAR}}
    result = result.replace(/\{\{COPY:([A-Z_][A-Z0-9_]*)\}\}/g, (match, varName) => {
        const value = mainEnvVars.get(varName)
        if (value === undefined) {
            warnings.push(`{{COPY:${varName}}} not found in main .env, leaving empty`)
            return ''
        }
        return value
    })

    return { content: result, warnings }
}

export function writeEnvFile(path: string, content: string): void {
    writeFileSync(path, content)
}

export function findMainEnvFiles(mainRepoDir: string): string[] {
    if (!existsSync(mainRepoDir)) return []
    return readdirSync(mainRepoDir)
        .filter(f => f.startsWith('.env') && !f.endsWith('.template') && !f.endsWith('.example'))
        .map(f => join(mainRepoDir, f))
}
