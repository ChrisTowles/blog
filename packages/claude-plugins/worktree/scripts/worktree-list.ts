#!/usr/bin/env tsx
import { readRegistry, registryExists } from './lib/registry.js'
import { readSlots, getSlotConfig } from './lib/slots.js'
import { listWorktrees } from './lib/git.js'
import { getWorktreesDir, getRelativePath, configExists } from './lib/paths.js'

interface SlotDisplay {
    slot: number
    issue: string
    branch: string
    path: string
    port: string
    status: 'active' | 'free' | 'stale'
}

export function list(mainRepoDir: string): SlotDisplay[] {
    const worktreesDir = getWorktreesDir(mainRepoDir)

    if (!configExists(worktreesDir)) {
        throw new Error('No worktree config found. Run /worktree:init first.')
    }

    if (!registryExists(worktreesDir)) {
        throw new Error('No registry found. Run /worktree:init first.')
    }

    const registry = readRegistry(worktreesDir)
    const slotsConfig = readSlots(worktreesDir)
    const gitWorktrees = listWorktrees(mainRepoDir)

    const results: SlotDisplay[] = []

    for (const assignment of registry.assignments) {
        const slotConfig = getSlotConfig(slotsConfig, assignment.slot)
        const port = slotConfig?.PORT ?? '-'

        if (assignment.worktree === null) {
            // Free slot
            results.push({
                slot: assignment.slot,
                issue: '-',
                branch: '-',
                path: '-',
                port: String(port),
                status: 'free'
            })
        } else {
            // Check if worktree actually exists
            const worktreePath = `${worktreesDir}/${assignment.worktree}`
            const exists = gitWorktrees.some(w => w.path === worktreePath)

            results.push({
                slot: assignment.slot,
                issue: assignment.issue ? `#${assignment.issue}` : '-',
                branch: assignment.branch ?? '-',
                path: getRelativePath(mainRepoDir, worktreePath),
                port: String(port),
                status: exists ? 'active' : 'stale'
            })
        }
    }

    return results
}

function formatTable(slots: SlotDisplay[]): string {
    const header = 'Slot | Issue | Branch                    | Path                              | PORT | Status'
    const separator = '-----|-------|---------------------------|-----------------------------------|------|--------'

    const rows = slots.map(s => {
        const issue = s.issue.padEnd(5)
        const branch = s.branch.slice(0, 25).padEnd(25)
        const path = s.path.slice(0, 33).padEnd(33)
        const port = String(s.port).padEnd(4)
        const status = s.status === 'stale' ? 'stale ⚠️' : s.status
        return `${s.slot}    | ${issue} | ${branch} | ${path} | ${port} | ${status}`
    })

    return [header, separator, ...rows].join('\n')
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    try {
        const slots = list(process.cwd())
        console.log('\nWorktree Slots:\n')
        console.log(formatTable(slots))

        const active = slots.filter(s => s.status === 'active').length
        const free = slots.filter(s => s.status === 'free').length
        const stale = slots.filter(s => s.status === 'stale').length

        console.log(`\nSummary: ${active} active, ${free} free${stale > 0 ? `, ${stale} stale` : ''}`)

        if (stale > 0) {
            console.log('\n⚠️  Stale entries exist. The worktree was removed outside this tool.')
            console.log('   Use /worktree:remove to clean up the registry.')
        }
    } catch (err) {
        console.error(`\n❌ Error: ${(err as Error).message}`)
        process.exit(1)
    }
}
