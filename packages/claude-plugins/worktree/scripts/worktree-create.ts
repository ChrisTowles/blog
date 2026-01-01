#!/usr/bin/env tsx
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
    readRegistry,
    writeRegistry,
    findFreeSlot,
    findSlotByIssue,
    findSlotByBranch,
    allocateSlot
} from './lib/registry.js'
import { readSlots, getSlotConfig } from './lib/slots.js'
import {
    getTemplateFiles,
    getOutputFileName,
    processTemplate,
    readEnvFile,
    findMainEnvFiles
} from './lib/env.js'
import {
    getRepoName,
    getMainBranch,
    branchExists,
    createBranch,
    createWorktree
} from './lib/git.js'
import { fetchIssue, createBranchName, isGithubRepo } from './lib/github.js'
import { checkPorts, extractPortsFromSlot } from './lib/ports.js'
import {
    getWorktreesDir,
    getConfigDir,
    getWorktreePath,
    getRelativePath,
    worktreeNameFromBranch,
    configExists
} from './lib/paths.js'

interface CreateOptions {
    dryRun?: boolean
}

interface CreateResult {
    success: boolean
    slot: number
    branch: string
    worktreePath: string
    relativePath: string
    portWarnings: string[]
    envWarnings: string[]
}

export async function create(
    mainRepoDir: string,
    input: string | number,
    options: CreateOptions = {}
): Promise<CreateResult> {
    const worktreesDir = getWorktreesDir(mainRepoDir)
    const configDir = getConfigDir(worktreesDir)

    // Check config exists
    if (!configExists(worktreesDir)) {
        throw new Error('No worktree config found. Run /worktree:init first.')
    }

    // Read registry and slots
    const registry = readRegistry(worktreesDir)
    const slotsConfig = readSlots(worktreesDir)

    // Determine branch name
    let branch: string
    let issueNumber: number | null = null

    if (typeof input === 'number' || /^\d+$/.test(String(input))) {
        issueNumber = typeof input === 'number' ? input : parseInt(input, 10)

        // Check if already exists
        const existing = findSlotByIssue(registry, issueNumber)
        if (existing) {
            throw new Error(`Worktree for issue #${issueNumber} already exists (slot ${existing.slot})`)
        }

        // Fetch issue from GitHub
        const issue = fetchIssue(issueNumber)
        if (!issue) {
            throw new Error(`GitHub issue #${issueNumber} not found`)
        }
        branch = createBranchName(issueNumber, issue.title)
        console.log(`Issue #${issueNumber}: ${issue.title}`)
    } else {
        branch = String(input)
        // Check if branch already has worktree
        const existing = findSlotByBranch(registry, branch)
        if (existing) {
            throw new Error(`Worktree for branch "${branch}" already exists (slot ${existing.slot})`)
        }
    }

    // Find free slot
    const freeSlot = findFreeSlot(registry)
    if (!freeSlot) {
        throw new Error(`All ${registry.slotCount} slots in use. Remove a worktree first.`)
    }

    const slotConfig = getSlotConfig(slotsConfig, freeSlot.slot)
    if (!slotConfig) {
        throw new Error(`Slot ${freeSlot.slot} not defined in slots.yaml`)
    }

    // Check ports
    const ports = extractPortsFromSlot(slotConfig)
    const portStatus = await checkPorts(ports)
    const portWarnings: string[] = []
    for (const [port, inUse] of portStatus) {
        if (inUse) {
            portWarnings.push(`Port ${port} appears to be in use`)
        }
    }

    const worktreeName = worktreeNameFromBranch(branch)
    const worktreePath = getWorktreePath(worktreesDir, worktreeName)
    const relativePath = getRelativePath(mainRepoDir, worktreePath)

    console.log(`\nCreating worktree:`)
    console.log(`  Branch: ${branch}`)
    console.log(`  Slot: ${freeSlot.slot}`)
    console.log(`  Path: ${relativePath}`)

    if (options.dryRun) {
        console.log('\n[DRY RUN] Would create worktree and process templates')
        return {
            success: true,
            slot: freeSlot.slot,
            branch,
            worktreePath,
            relativePath,
            portWarnings,
            envWarnings: []
        }
    }

    // Create branch if needed
    const mainBranch = getMainBranch(mainRepoDir)
    if (!branchExists(branch, mainRepoDir)) {
        console.log(`Creating branch from ${mainBranch}...`)
        createBranch(branch, mainBranch, mainRepoDir)
    }

    // Create worktree
    console.log('Creating worktree...')
    createWorktree(worktreePath, branch, mainRepoDir)

    // Process templates
    console.log('Processing .env templates...')
    const templateFiles = getTemplateFiles(configDir)
    const mainEnvFiles = findMainEnvFiles(mainRepoDir)
    const mainEnvVars = new Map<string, string>()
    for (const envFile of mainEnvFiles) {
        const vars = readEnvFile(envFile)
        for (const [k, v] of vars) {
            mainEnvVars.set(k, v)
        }
    }

    const envWarnings: string[] = []
    for (const templatePath of templateFiles) {
        const templateContent = readFileSync(templatePath, 'utf-8')
        const { content, warnings } = processTemplate(templateContent, slotConfig, mainEnvVars)
        envWarnings.push(...warnings)

        const outputName = getOutputFileName(templatePath)
        const outputPath = join(worktreePath, outputName)
        writeFileSync(outputPath, content)
        console.log(`  ✓ Created ${outputName}`)
    }

    // Update registry
    allocateSlot(registry, freeSlot.slot, issueNumber, branch, worktreeName)
    writeRegistry(worktreesDir, registry)

    return {
        success: true,
        slot: freeSlot.slot,
        branch,
        worktreePath,
        relativePath,
        portWarnings,
        envWarnings
    }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2)
    const dryRun = args.includes('--dry-run')
    const input = args.find(a => !a.startsWith('--'))

    if (!input) {
        console.error('Usage: worktree-create <issue-number|branch-name> [--dry-run]')
        process.exit(1)
    }

    create(process.cwd(), input, { dryRun })
        .then(result => {
            console.log('\n✅ Worktree created!')
            console.log(`\nSlot ${result.slot} assigned`)
            console.log(`Path: ${result.relativePath}`)

            if (result.portWarnings.length > 0) {
                console.log('\n⚠️  Port warnings:')
                result.portWarnings.forEach(w => console.log(`  - ${w}`))
            }

            if (result.envWarnings.length > 0) {
                console.log('\n⚠️  Template warnings:')
                result.envWarnings.forEach(w => console.log(`  - ${w}`))
            }

            console.log('\nNext steps:')
            console.log(`  cd ${result.relativePath}`)
            console.log('  pnpm install  # or npm install')
            console.log('  pnpm dev      # start development')
        })
        .catch(err => {
            console.error(`\n❌ Error: ${err.message}`)
            process.exit(1)
        })
}
