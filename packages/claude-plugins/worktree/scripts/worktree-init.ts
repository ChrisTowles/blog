#!/usr/bin/env tsx
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { stringify as stringifyYaml } from 'yaml'
import { getRepoName } from './lib/git.js'
import { getWorktreesDir, getConfigDir, ensureDir } from './lib/paths.js'
import { createEmptyRegistry, writeRegistry } from './lib/registry.js'
import { findMainEnvFiles, readEnvFile } from './lib/env.js'

interface InitConfig {
    slotCount: number
    slotVars: string[]
    slotValues: Array<Record<string, string | number>>
    envTemplates: Array<{
        source: string
        slotVars: string[]
        copyVars: string[]
    }>
}

function generateSlotsYaml(config: InitConfig): string {
    const slots = config.slotValues.map((values, i) => ({
        slot: i + 1,
        ...values
    }))
    return stringifyYaml({ slots })
}

function generateEnvTemplate(
    envContent: string,
    slotVars: string[],
    copyVars: string[]
): string {
    let result = envContent

    // Replace slot vars with placeholders
    for (const varName of slotVars) {
        const regex = new RegExp(`^(${varName})=.*$`, 'gm')
        result = result.replace(regex, `$1={{${varName}}}`)
    }

    // Replace copy vars with placeholders
    for (const varName of copyVars) {
        const regex = new RegExp(`^(${varName})=.*$`, 'gm')
        result = result.replace(regex, `$1={{COPY:${varName}}}`)
    }

    return result
}

export async function init(mainRepoDir: string, config: InitConfig): Promise<void> {
    const repoName = getRepoName(mainRepoDir)
    const worktreesDir = getWorktreesDir(mainRepoDir)
    const configDir = getConfigDir(worktreesDir)

    console.log(`\nInitializing worktree config for: ${repoName}`)
    console.log(`Config location: ${worktreesDir}/config/`)

    // Create directories
    ensureDir(configDir)

    // Write slots.yaml
    const slotsYaml = generateSlotsYaml(config)
    writeFileSync(join(configDir, 'slots.yaml'), slotsYaml)
    console.log('✓ Created slots.yaml')

    // Write .env templates
    for (const template of config.envTemplates) {
        const envContent = await import('node:fs').then(fs =>
            fs.readFileSync(template.source, 'utf-8')
        )
        const templateContent = generateEnvTemplate(
            envContent,
            template.slotVars,
            template.copyVars
        )
        const outputName = template.source.split('/').pop() + '.template'
        writeFileSync(join(configDir, outputName), templateContent)
        console.log(`✓ Created ${outputName}`)
    }

    // Initialize registry
    const registry = createEmptyRegistry(repoName, config.slotCount)
    writeRegistry(worktreesDir, registry)
    console.log('✓ Created .worktree-registry.json')

    console.log('\n✅ Worktree config initialized!')
    console.log('\nNext steps:')
    console.log('1. Review and edit config/slots.yaml with your slot values')
    console.log('2. Review config/*.template files')
    console.log('3. Use /worktree:create <issue> to create worktrees')
}

// CLI interface - config is passed via skill prompts
if (import.meta.url === `file://${process.argv[1]}`) {
    const cwd = process.cwd()
    const mainEnvFiles = findMainEnvFiles(cwd)

    console.log('Git Worktree Init')
    console.log('=================')
    console.log(`Repository: ${getRepoName(cwd)}`)
    console.log(`Found .env files: ${mainEnvFiles.length}`)
    mainEnvFiles.forEach(f => console.log(`  - ${f}`))
    console.log('\nThis script is meant to be called by the /worktree:init skill.')
    console.log('The skill will gather configuration interactively and call init().')
}
