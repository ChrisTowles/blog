#!/usr/bin/env -S pnpx tsx

/**
 * Git Worktree Manager
 *
 * Manages isolated git worktrees with slot-based environment configuration.
 * Each slot has pre-configured ports, OAuth apps, etc. that can't be shared.
 *
 * Usage:
 *   worktree.ts init                    - Initialize config for this repo
 *   worktree.ts create <issue|branch>   - Create worktree with auto slot allocation
 *   worktree.ts list                    - Show all slots and their status
 *   worktree.ts delete <issue|branch>   - Delete worktree and free slot
 */

import { $, fs, chalk } from 'zx'
import path from 'node:path'
import stripJsonComments from 'strip-json-comments'
import Table from 'cli-table3'

$.verbose = false

// ============================================================================
// Types
// ============================================================================

interface SlotConfig {
    [key: string]: string | number
}

interface SlotsConfig {
    slots: Record<string, SlotConfig>
    copyFromRootRepo?: string[]
}

interface Assignment {
    slot: string
    issue: number | null
    branch: string
    worktree: string
    createdAt: string
}

interface Registry {
    repoName: string
    assignments: Assignment[]
}

// ============================================================================
// Paths & Constants
// ============================================================================

function getRepoRoot(): string {
    const result = $.sync`git rev-parse --show-toplevel`
    return result.stdout.trim()
}

function getRepoName(): string {
    return path.basename(getRepoRoot())
}

function getWorktreesDir(): string {
    const root = getRepoRoot()
    return path.join(path.dirname(root), `${getRepoName()}-worktrees`)
}

function getConfigDir(): string {
    return path.join(getWorktreesDir(), 'config')
}

function getSlotsConfigPath(): string {
    return path.join(getConfigDir(), 'slots.config.jsonc')
}

function getRegistryPath(): string {
    return path.join(getConfigDir(), '.worktree-registry.json')
}

// ============================================================================
// Config & Registry
// ============================================================================

function readJsonc<T>(filePath: string): T {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(stripJsonComments(content)) as T
}

function readSlotsConfig(): SlotsConfig {
    const configPath = getSlotsConfigPath()
    if (!fs.existsSync(configPath)) {
        console.error(`Config not found: ${configPath}`)
        console.error('Run: worktree.ts init')
        process.exit(1)
    }
    return readJsonc<SlotsConfig>(configPath)
}

function readRegistry(): Registry {
    const registryPath = getRegistryPath()
    if (!fs.existsSync(registryPath)) {
        return { repoName: getRepoName(), assignments: [] }
    }
    return JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
}

function writeRegistry(registry: Registry): void {
    fs.writeFileSync(getRegistryPath(), JSON.stringify(registry, null, 2))
}

// ============================================================================
// GitHub Integration
// ============================================================================

async function fetchIssueTitle(issueNumber: number): Promise<string | null> {
    try {
        // Get remote URL to determine owner/repo
        const remoteUrl = (await $`git remote get-url origin`).stdout.trim()
        const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/)
        if (!match) return null

        const [, owner, repo] = match
        const result = await $`gh issue view ${issueNumber} --repo ${owner}/${repo} --json title --jq .title`
        return result.stdout.trim()
    } catch {
        return null
    }
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 50)
}

// ============================================================================
// Slot Allocation
// ============================================================================

function findAvailableSlot(config: SlotsConfig, registry: Registry): string | null {
    const usedSlots = new Set(registry.assignments.map(a => a.slot))
    for (const slot of Object.keys(config.slots)) {
        if (!usedSlots.has(slot)) {
            return slot
        }
    }
    return null
}

// ============================================================================
// Environment Template Processing
// ============================================================================

function readEnvFile(filePath: string): Record<string, string> {
    if (!fs.existsSync(filePath)) return {}
    const content = fs.readFileSync(filePath, 'utf-8')
    const vars: Record<string, string> = {}
    for (const line of content.split('\n')) {
        const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
        if (match) {
            vars[match[1]] = match[2].replace(/^["']|["']$/g, '')
        }
    }
    return vars
}

function processEnvTemplate(
    templatePath: string,
    slotVars: SlotConfig,
    copyVars: Record<string, string>
): string {
    let content = fs.readFileSync(templatePath, 'utf-8')

    // Replace {{VAR}} with slot values
    content = content.replace(/\{\{([A-Z_][A-Z0-9_]*)\}\}/g, (_, varName: string) => {
        if (varName in slotVars) {
            return String(slotVars[varName])
        }
        console.warn(chalk.yellow(`Warning: {{${varName}}} not found in slot config`))
        return `{{${varName}}}`
    })

    // Replace {{COPY:VAR}} with values from root repo
    content = content.replace(/\{\{COPY:([A-Z_][A-Z0-9_]*)\}\}/g, (_, varName: string) => {
        if (varName in copyVars) {
            return copyVars[varName]
        }
        console.warn(chalk.yellow(`Warning: {{COPY:${varName}}} not found in root repo env files`))
        return `{{COPY:${varName}}}`
    })

    return content
}

// ============================================================================
// Commands
// ============================================================================

async function cmdInit(): Promise<void> {
    const worktreesDir = getWorktreesDir()
    const configDir = getConfigDir()

    if (fs.existsSync(configDir)) {
        console.log(`Config already exists: ${configDir}`)
        return
    }

    fs.mkdirSync(configDir, { recursive: true })

    // Create default slots config with 5 slots
    // Main repo uses DB_PORT=5432, worktrees start at 5433
    const defaultConfig: SlotsConfig = {
        slots: {
            'slot-1': { UI_PORT: 3001, DB_PORT: 5401, DATABASE_URL: 'replace-me' },
            'slot-2': { UI_PORT: 3002, DB_PORT: 5402, DATABASE_URL: 'replace-me' },
            'slot-3': { UI_PORT: 3003, DB_PORT: 5403, DATABASE_URL: 'replace-me' },
            'slot-4': { UI_PORT: 3004, DB_PORT: 5404, DATABASE_URL: 'replace-me' },
            'slot-5': { UI_PORT: 3005, DB_PORT: 5405, DATABASE_URL: 'replace-me' }
        },
        copyFromRootRepo: ['.env', '.env.local']
    }

    const envTemplate = `# Auto-generated from .env.template
# Docker Compose isolation (worktree-specific)

UI_PORT={{UI_PORT}}
DB_PORT={{DB_PORT}}


# PostgreSQL Connection (uses slot-specific port)
DATABASE_URL={{DATABASE_URL}}

# Shared secrets (copied from root repo)
ANTHROPIC_API_KEY={{COPY:ANTHROPIC_API_KEY}}
NUXT_SESSION_PASSWORD={{COPY:NUXT_SESSION_PASSWORD}}
NUXT_OAUTH_GITHUB_CLIENT_ID={{COPY:NUXT_OAUTH_GITHUB_CLIENT_ID}}
NUXT_OAUTH_GITHUB_CLIENT_SECRET={{COPY:NUXT_OAUTH_GITHUB_CLIENT_SECRET}}
AWS_REGION={{COPY:AWS_REGION}}
AWS_ACCESS_KEY_ID={{COPY:AWS_ACCESS_KEY_ID}}
AWS_SECRET_ACCESS_KEY={{COPY:AWS_SECRET_ACCESS_KEY}}
`

    fs.writeFileSync(getSlotsConfigPath(), JSON.stringify(defaultConfig, null, 4))
    fs.writeFileSync(path.join(configDir, '.env.template'), envTemplate)
    writeRegistry({ repoName: getRepoName(), assignments: [] })
    
    console.log(`Initialized worktree config at: ${worktreesDir}`)
    console.log(`\nNext steps:`)
    
    console.log(`  1. Edit ${getSlotsConfigPath()} with your slot values`)
    console.log(`  2. Edit ${path.join(configDir, '.env.template')} with your env template`)
    console.log(`  3. Run: worktree.ts create <issue-number>`)
}

async function cmdCreate(target: string): Promise<void> {
    const config = readSlotsConfig()
    const registry = readRegistry()
    // Determine if target is issue number or branch name
    let issueNumber: number | null = null
    let branchName: string
    let worktreeName: string

    if (/^\d+$/.test(target)) {
        issueNumber = parseInt(target, 10)
        const title = await fetchIssueTitle(issueNumber)
        if (title) {
            const slug = slugify(title)
            branchName = `feature/${issueNumber}-${slug}`
            worktreeName = `${issueNumber}-${slug}`
            console.log(chalk.green(`Issue #${issueNumber}: ${chalk.white(title)}`))
        } else {
            branchName = `feature/${issueNumber}`
            worktreeName = `${issueNumber}`
            console.log(chalk.yellow(`Issue #${issueNumber} (couldn't fetch title)`))
        }
    } else {
        branchName = target
        worktreeName = target.replace(/\//g, '-')
    }

    // Check if already assigned
    const existing = registry.assignments.find(
        a => a.issue === issueNumber || a.branch === branchName
    )
    if (existing) {
        console.error(`Already exists: ${existing.worktree} (${existing.slot})`)
        process.exit(1)
    }

    // Find available slot
    const slot = findAvailableSlot(config, registry)
    if (!slot) {
        console.error('No available slots! Delete an existing worktree first.')
        console.error('Run: worktree.ts list')
        process.exit(1)
    }

    const worktreePath = path.join(getWorktreesDir(), worktreeName)

    // Create git worktree
    console.log(chalk.yellow(`\n🔧 Creating worktree: ${chalk.white(worktreeName)}`))
    console.log(chalk.gray(`  Branch: ${branchName}`))
    console.log(chalk.gray(`  Slot: ${slot}`))
    console.log(chalk.gray(`  Path: ${worktreePath}`))

    // Check if branch exists
    const branchExists = (await $`git branch --list ${branchName}`.nothrow()).stdout.trim() !== ''
    const remoteBranchExists = (await $`git branch -r --list origin/${branchName}`.nothrow()).stdout.trim() !== ''

    if (branchExists || remoteBranchExists) {
        // Check if branch is behind origin/main
        await $`git fetch origin main`.nothrow()
        const branchRef = branchExists ? branchName : `origin/${branchName}`
        const behindCount = (await $`git rev-list --count ${branchRef}..origin/main`.nothrow()).stdout.trim()

        if (behindCount && parseInt(behindCount) > 0) {
            console.log(chalk.yellow(`\n⚠️  Branch is ${behindCount} commit(s) behind origin/main`))

            const readline = await import('node:readline')
            const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
            const answer = await new Promise<string>(resolve =>
                rl.question(chalk.cyan('Rebase onto origin/main? [Y/n] '), resolve)
            )
            rl.close()

            if (answer.toLowerCase() !== 'n') {
                await $`git worktree add ${worktreePath} ${branchName}`
                console.log(chalk.gray('  Rebasing...'))
                const rebaseResult = await $`git -C ${worktreePath} rebase origin/main`.nothrow()
                if (rebaseResult.exitCode !== 0) {
                    console.log(chalk.red('  Rebase failed - resolve conflicts manually'))
                } else {
                    console.log(chalk.green('  Rebased successfully'))
                }
            } else {
                await $`git worktree add ${worktreePath} ${branchName}`
            }
        } else {
            await $`git worktree add ${worktreePath} ${branchName}`
        }
    } else {
        await $`git worktree add -b ${branchName} ${worktreePath} origin/main`
    }

    // Process env templates
    const slotVars = config.slots[slot]
    const copyVars: Record<string, string> = {}

    // Read values from root repo env files
    for (const envFile of config.copyFromRootRepo || []) {
        const envPath = path.join(getRepoRoot(), envFile)
        Object.assign(copyVars, readEnvFile(envPath))
    }

    // Process each template file
    const configDir = getConfigDir()
    for (const file of fs.readdirSync(configDir)) {
        if (file.endsWith('.template')) {
            const templatePath = path.join(configDir, file)
            const outputName = file.replace('.template', '')
            const outputPath = path.join(worktreePath, outputName)
            const content = processEnvTemplate(templatePath, slotVars, copyVars)
            fs.writeFileSync(outputPath, content)
            console.log(chalk.gray(`  Created: ${outputName}`))
        }
    }


    // Update registry
    registry.assignments.push({
        slot,
        issue: issueNumber,
        branch: branchName,
        worktree: worktreeName,
        createdAt: new Date().toISOString()
    })
    writeRegistry(registry)

    console.log(chalk.green(`\n✅ Worktree ready!`))
    console.log(chalk.green(`\n✅ install dependencies!`))
    // Install dependencies
    console.log(chalk.gray('  Running pnpm install...'))
    $.verbose = true
    await $`pnpm install --dir ${worktreePath}`
    await $`cd ${worktreePath} && pnpm docker:reset`
    
    // await $`cd ${worktreePath} && pnpm dev`
    $.verbose = false



    console.log(chalk.yellow(`\nNext steps:`))
    console.log(chalk.cyan(`  cd ${worktreePath}`))
    console.log(chalk.cyan(`  code .`))
    console.log(chalk.cyan(`  pnpm dev`))
}

async function fetchRecentIssues(limit = 10): Promise<Array<{ number: number; title: string; labels: string }>> {
    try {
        const remoteUrl = (await $`git remote get-url origin`).stdout.trim()
        const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/)
        if (!match) return []

        const [, owner, repo] = match
        const result = await $`gh issue list --repo ${owner}/${repo} --limit ${limit} --json number,title,labels --jq '.[] | [.number, .title, ([.labels[].name] | join(","))] | @tsv'`

        return result.stdout.trim().split('\n').filter(Boolean).map(line => {
            const [num, title, labels] = line.split('\t')
            return { number: parseInt(num), title: title || '', labels: labels || '' }
        })
    } catch {
        return []
    }
}

async function cmdList(): Promise<void> {
    const config = readSlotsConfig()
    const registry = readRegistry()
    const worktreesDir = getWorktreesDir()

    console.log(chalk.cyan(`\n📦 Worktree Slots for ${chalk.white(getRepoName())}\n`))

    const table = new Table({
        head: [
            chalk.white('Slot'),
            chalk.white('Status'),
            chalk.white('UI'),
            chalk.white('DB'),
            chalk.white('Issue'),
            chalk.white('Branch')
        ],
        style: { head: [], border: [] }
    })

    const allSlots = Object.keys(config.slots)
    const assignmentMap = new Map(registry.assignments.map(a => [a.slot, a]))

    for (const slot of allSlots) {
        const assignment = assignmentMap.get(slot)
        const slotConfig = config.slots[slot]
        const uiPort = String(slotConfig?.UI_PORT || '?')
        const dbPort = String(slotConfig?.DB_PORT || '?')

        if (assignment && assignment.worktree) {
            const worktreePath = path.join(worktreesDir, assignment.worktree)
            const exists = fs.existsSync(worktreePath)
            const issueStr = assignment.issue ? `#${assignment.issue}` : ''

            if (exists) {
                table.push([
                    chalk.white(slot),
                    chalk.green('active'),
                    chalk.cyan(uiPort),
                    chalk.cyan(dbPort),
                    chalk.yellow(issueStr),
                    chalk.gray(assignment.branch)
                ])
            } else {
                table.push([
                    chalk.white(slot),
                    chalk.red('STALE'),
                    chalk.cyan(uiPort),
                    chalk.cyan(dbPort),
                    chalk.yellow(issueStr),
                    chalk.gray(assignment.branch)
                ])
            }
        } else {
            table.push([
                chalk.white(slot),
                chalk.gray('free'),
                chalk.cyan(uiPort),
                chalk.cyan(dbPort),
                '',
                ''
            ])
        }
    }

    console.log(table.toString())
}

async function cmdDelete(target: string, options: { force?: boolean; stash?: boolean }): Promise<void> {
    const registry = readRegistry()

    // Find assignment by issue number or branch name
    let assignment: Assignment | undefined
    if (/^\d+$/.test(target)) {
        const issueNumber = parseInt(target, 10)
        assignment = registry.assignments.find(a => a.issue === issueNumber)
    } else {
        assignment = registry.assignments.find(
            a => a.branch === target || a.worktree === target
        )
    }

    if (!assignment) {
        console.error(`Worktree not found: ${target}`)
        console.error('Run: worktree.ts list')
        process.exit(1)
    }

    const worktreePath = path.join(getWorktreesDir(), assignment.worktree)

    // Check for uncommitted changes
    if (fs.existsSync(worktreePath)) {
        const status = await $`git -C ${worktreePath} status --porcelain`.nothrow()
        if (status.stdout.trim() && !options.force && !options.stash) {
            console.error(`Uncommitted changes in ${worktreePath}`)
            console.error('Use --stash to stash changes or --force to discard')
            process.exit(1)
        }

        if (options.stash && status.stdout.trim()) {
            console.log('Stashing changes...')
            await $`git -C ${worktreePath} stash push -m "worktree-delete: ${assignment.branch}"`
        }
    }

    // Remove worktree
    console.log(chalk.yellow(`🗑️  Removing worktree: ${chalk.white(assignment.worktree)}`))
    await $`git worktree remove ${worktreePath} --force`.nothrow()
    await $`git worktree prune`

    // Update registry
    registry.assignments = registry.assignments.filter(a => a.slot !== assignment!.slot)
    writeRegistry(registry)

    console.log(chalk.gray(`Freed slot: ${assignment.slot}`))
    console.log(chalk.green(`\n✅ Deleted worktree for ${assignment.branch}`))
}

// ============================================================================
// Main
// ============================================================================

function usage(): void {
    console.log(`
Usage: worktree.ts <command> [options]

Commands:
  init                          Initialize worktree config for this repo
  create|add|c <issue|branch>   Create worktree with auto slot allocation
  list|ls                       Show all slots and their status
  delete|rm|d <issue|branch>    Delete worktree and free slot

Options for delete:
  --force                       Discard uncommitted changes
  --stash                       Stash uncommitted changes before delete

Examples:
  worktree.ts init
  worktree.ts c 142
  worktree.ts create feature/my-branch
  worktree.ts ls
  worktree.ts d 142 --stash
`)
    process.exit(1)
}

interface CommandOptions {
    force?: boolean
    stash?: boolean
}

async function runCommand(command: string, target?: string, options: CommandOptions = {}): Promise<boolean> {
    switch (command) {
        case 'init':
            await cmdInit()
            return true
        case 'create':
        case 'add':
        case 'c':
            if (!target) {
                console.error('Error: create requires issue number or branch name')
                return false
            }
            await cmdCreate(target)
            return true
        case 'list':
        case 'ls':
            await cmdList()
            return true
        case 'delete':
        case 'rm':
        case 'd':
            if (!target) {
                console.error('Error: delete requires issue number or branch name')
                return false
            }
            await cmdDelete(target, options)
            return true
        case 'q':
        case '':
            return true
        default:
            return false
    }
}

async function cmdInteractive(): Promise<void> {
    const config = readSlotsConfig()
    const registry = readRegistry()
    const worktreesDir = getWorktreesDir()

    // Show current status
    console.log(chalk.cyan(`\n📦 Worktree Slots for ${chalk.white(getRepoName())}\n`))

    const table = new Table({
        head: [
            chalk.white('Slot'),
            chalk.white('Status'),
            chalk.white('UI'),
            chalk.white('DB'),
            chalk.white('Issue'),
            chalk.white('Branch')
        ],
        style: { head: [], border: [] }
    })

    const allSlots = Object.keys(config.slots)
    const assignmentMap = new Map(registry.assignments.map(a => [a.slot, a]))
    const activeWorktrees: Assignment[] = []

    for (const slot of allSlots) {
        const assignment = assignmentMap.get(slot)
        const slotConfig = config.slots[slot]
        const uiPort = String(slotConfig?.UI_PORT || '?')
        const dbPort = String(slotConfig?.DB_PORT || '?')

        if (assignment && assignment.worktree) {
            const worktreePath = path.join(worktreesDir, assignment.worktree)
            const exists = fs.existsSync(worktreePath)
            const issueStr = assignment.issue ? `#${assignment.issue}` : ''

            if (exists) {
                activeWorktrees.push(assignment)
                table.push([
                    chalk.white(slot),
                    chalk.green('active'),
                    chalk.cyan(uiPort),
                    chalk.cyan(dbPort),
                    chalk.yellow(issueStr),
                    chalk.gray(assignment.branch)
                ])
            } else {
                table.push([
                    chalk.white(slot),
                    chalk.red('STALE'),
                    chalk.cyan(uiPort),
                    chalk.cyan(dbPort),
                    chalk.yellow(issueStr),
                    chalk.gray(assignment.branch)
                ])
            }
        } else {
            table.push([
                chalk.white(slot),
                chalk.gray('free'),
                chalk.cyan(uiPort),
                chalk.cyan(dbPort),
                '',
                ''
            ])
        }
    }

    console.log(table.toString())

    // Show recent issues
    const issues = await fetchRecentIssues(10)
    if (issues.length > 0) {
        console.log(chalk.cyan(`\n📋 Recent GitHub Issues\n`))

        const issueTable = new Table({
            head: [
                chalk.white('#'),
                chalk.white('Title'),
                chalk.white('Labels')
            ],
            style: { head: [], border: [] },
            colWidths: [8, 50, 20],
            wordWrap: true
        })

        for (const issue of issues) {
            issueTable.push([
                chalk.yellow(`#${issue.number}`),
                chalk.gray(issue.title.slice(0, 47) + (issue.title.length > 47 ? '...' : '')),
                chalk.blue(issue.labels)
            ])
        }

        console.log(issueTable.toString())
    }

    // Prompt for action
    const readline = await import('node:readline')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const question = (prompt: string): Promise<string> => {
        return new Promise(resolve => rl.question(prompt, resolve))
    }

    console.log(chalk.yellow('\nActions:'))
    console.log(chalk.gray('  c <issue|branch>  - Create new worktree'))
    if (activeWorktrees.length > 0) {
        console.log(chalk.gray('  d <issue|branch>  - Delete worktree'))
    }
    console.log(chalk.gray('  q                 - Quit'))

    const answer = await question('\n> ')
    rl.close()

    const parts = answer.trim().split(/\s+/)
    const action = parts[0]?.toLowerCase() || ''
    const target = parts.slice(1).join(' ')

    const handled = await runCommand(action, target || undefined)
    if (!handled) {
        console.error(`Unknown action: ${action}`)
        process.exit(1)
    }
}

async function main(): Promise<void> {
    const args = process.argv.slice(2)
    const command = args[0]

    if (command === '-h' || command === '--help') {
        usage()
    }

    if (!command) {
        await cmdInteractive()
        return
    }

    switch (command) {
        case 'init':
            await cmdInit()
            break
        case 'create':
        case 'add':
        case 'c':
            if (!args[1]) {
                console.error('Error: create requires issue number or branch name')
                usage()
            }
            await cmdCreate(args[1])
            break
        case 'list':
        case 'ls':
            await cmdList()
            break
            
        case 'delete':
        case 'rm':
        case 'd':
            if (!args[1]) {
                console.error('Error: delete requires issue number or branch name')
                usage()
            }
            await cmdDelete(args[1], {
                force: args.includes('--force'),
                stash: args.includes('--stash')
            })
            break
        default:
            console.error(`Unknown command: ${command}`)
            usage()
    }
}

main().catch(err => {
    console.error('Error:', err.message || err)
    process.exit(1)
})
