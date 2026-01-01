#!/usr/bin/env tsx
import { existsSync } from 'node:fs'
import {
    readRegistry,
    writeRegistry,
    findSlotByIssue,
    findSlotByBranch,
    freeSlot
} from './lib/registry.js'
import {
    getMainBranch,
    isBranchMerged,
    deleteBranch,
    removeWorktree,
    hasUncommittedChanges,
    stashChanges
} from './lib/git.js'
import {
    getWorktreesDir,
    getWorktreePath,
    getRelativePath,
    configExists
} from './lib/paths.js'

interface RemoveOptions {
    dryRun?: boolean
    force?: boolean
    stash?: boolean
    deleteBranch?: boolean
}

interface RemoveResult {
    success: boolean
    slot: number
    branch: string
    worktreePath: string
    stashed: boolean
    branchDeleted: boolean
}

export async function remove(
    mainRepoDir: string,
    input: string | number,
    options: RemoveOptions = {}
): Promise<RemoveResult> {
    const worktreesDir = getWorktreesDir(mainRepoDir)

    if (!configExists(worktreesDir)) {
        throw new Error('No worktree config found. Run /worktree:init first.')
    }

    const registry = readRegistry(worktreesDir)

    // Find slot by issue number or branch name
    let assignment
    if (typeof input === 'number' || /^\d+$/.test(String(input))) {
        const issueNumber = typeof input === 'number' ? input : parseInt(input, 10)
        assignment = findSlotByIssue(registry, issueNumber)
        if (!assignment) {
            throw new Error(`No worktree found for issue #${issueNumber}`)
        }
    } else {
        assignment = findSlotByBranch(registry, String(input))
        if (!assignment) {
            throw new Error(`No worktree found for branch "${input}"`)
        }
    }

    if (!assignment.worktree || !assignment.branch) {
        throw new Error(`Slot ${assignment.slot} is not assigned`)
    }

    const worktreePath = getWorktreePath(worktreesDir, assignment.worktree)
    const relativePath = getRelativePath(mainRepoDir, worktreePath)
    const branch = assignment.branch

    console.log(`\nRemoving worktree:`)
    console.log(`  Slot: ${assignment.slot}`)
    console.log(`  Branch: ${branch}`)
    console.log(`  Path: ${relativePath}`)

    // Check for uncommitted changes
    let stashed = false
    if (existsSync(worktreePath) && hasUncommittedChanges(worktreePath)) {
        if (options.stash) {
            console.log('\nStashing uncommitted changes...')
            if (!options.dryRun) {
                stashChanges(worktreePath, `worktree-remove: ${branch}`)
                stashed = true
            }
        } else if (!options.force) {
            throw new Error(
                `Worktree has uncommitted changes. Use --stash to stash them or --force to discard.`
            )
        }
    }

    // Check if branch is merged
    const mainBranch = getMainBranch(mainRepoDir)
    const merged = isBranchMerged(branch, mainBranch, mainRepoDir)
    let branchDeleted = false

    if (!merged && options.deleteBranch && !options.force) {
        throw new Error(
            `Branch "${branch}" is not merged into ${mainBranch}. Use --force to delete anyway.`
        )
    }

    if (options.dryRun) {
        console.log('\n[DRY RUN] Would remove worktree and free slot')
        if (options.deleteBranch) {
            console.log(`[DRY RUN] Would delete branch: ${branch}`)
        }
        return {
            success: true,
            slot: assignment.slot,
            branch,
            worktreePath,
            stashed,
            branchDeleted: false
        }
    }

    // Remove worktree
    if (existsSync(worktreePath)) {
        console.log('Removing worktree...')
        removeWorktree(worktreePath, options.force, mainRepoDir)
    } else {
        console.log('Worktree path does not exist (stale entry)')
    }

    // Delete branch if requested
    if (options.deleteBranch) {
        console.log(`Deleting branch ${branch}...`)
        deleteBranch(branch, options.force || !merged, mainRepoDir)
        branchDeleted = true
    }

    // Free slot in registry
    freeSlot(registry, assignment.slot)
    writeRegistry(worktreesDir, registry)

    return {
        success: true,
        slot: assignment.slot,
        branch,
        worktreePath,
        stashed,
        branchDeleted
    }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2)
    const dryRun = args.includes('--dry-run')
    const force = args.includes('--force')
    const stash = args.includes('--stash')
    const deleteBranchFlag = args.includes('--delete-branch')
    const input = args.find(a => !a.startsWith('--'))

    if (!input) {
        console.error('Usage: worktree-remove <issue-number|branch-name> [options]')
        console.error('\nOptions:')
        console.error('  --dry-run        Preview without removing')
        console.error('  --stash          Stash uncommitted changes')
        console.error('  --force          Force removal even with uncommitted changes')
        console.error('  --delete-branch  Also delete the git branch')
        process.exit(1)
    }

    remove(process.cwd(), input, { dryRun, force, stash, deleteBranch: deleteBranchFlag })
        .then(result => {
            console.log('\n✅ Worktree removed!')
            console.log(`\nSlot ${result.slot} freed`)

            if (result.stashed) {
                console.log('Changes stashed. Recover with: git stash list')
            }
            if (result.branchDeleted) {
                console.log(`Branch ${result.branch} deleted`)
            }
        })
        .catch(err => {
            console.error(`\n❌ Error: ${err.message}`)
            process.exit(1)
        })
}
