import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

export interface WorktreeInfo {
    path: string
    branch: string
    head: string
}

function exec(cmd: string, args: string[], cwd: string = process.cwd()): string {
    return execFileSync(cmd, args, { cwd, encoding: 'utf-8' }).trim()
}

function execSilent(cmd: string, args: string[], cwd: string = process.cwd()): string | null {
    try {
        return execFileSync(cmd, args, { cwd, encoding: 'utf-8', stdio: 'pipe' }).trim()
    } catch {
        return null
    }
}

export function getRepoName(cwd: string = process.cwd()): string {
    try {
        const remote = exec('git', ['remote', 'get-url', 'origin'], cwd)
        const match = remote.match(/\/([^/]+?)(?:\.git)?$/)
        if (match) return match[1]
    } catch {
        // Fall back to folder name
    }
    return cwd.split('/').pop() ?? 'unknown'
}

export function getMainBranch(cwd: string = process.cwd()): string {
    // Check if main or master exists
    if (execSilent('git', ['rev-parse', '--verify', 'main'], cwd) !== null) {
        return 'main'
    }
    if (execSilent('git', ['rev-parse', '--verify', 'master'], cwd) !== null) {
        return 'master'
    }
    return 'main'
}

export function branchExists(branch: string, cwd: string = process.cwd()): boolean {
    return execSilent('git', ['rev-parse', '--verify', branch], cwd) !== null
}

export function createBranch(branch: string, baseBranch: string, cwd: string = process.cwd()): void {
    execFileSync('git', ['branch', branch, baseBranch], { cwd, stdio: 'pipe' })
}

export function createWorktree(path: string, branch: string, cwd: string = process.cwd()): void {
    execFileSync('git', ['worktree', 'add', path, branch], { cwd, stdio: 'inherit' })
}

export function removeWorktree(path: string, force: boolean = false, cwd: string = process.cwd()): void {
    const args = force ? ['worktree', 'remove', '--force', path] : ['worktree', 'remove', path]
    execFileSync('git', args, { cwd, stdio: 'inherit' })
}

export function listWorktrees(cwd: string = process.cwd()): WorktreeInfo[] {
    const output = exec('git', ['worktree', 'list', '--porcelain'], cwd)
    const worktrees: WorktreeInfo[] = []
    let current: Partial<WorktreeInfo> = {}

    for (const line of output.split('\n')) {
        if (line.startsWith('worktree ')) {
            if (current.path) worktrees.push(current as WorktreeInfo)
            current = { path: line.slice(9) }
        } else if (line.startsWith('HEAD ')) {
            current.head = line.slice(5)
        } else if (line.startsWith('branch ')) {
            current.branch = line.slice(7).replace('refs/heads/', '')
        }
    }
    if (current.path) worktrees.push(current as WorktreeInfo)

    return worktrees
}

export function worktreeExists(path: string, cwd: string = process.cwd()): boolean {
    const worktrees = listWorktrees(cwd)
    return worktrees.some(w => w.path === path)
}

export function isBranchMerged(branch: string, baseBranch: string, cwd: string = process.cwd()): boolean {
    try {
        const merged = exec('git', ['branch', '--merged', baseBranch], cwd)
        return merged.split('\n').some(b => b.trim() === branch)
    } catch {
        return false
    }
}

export function deleteBranch(branch: string, force: boolean = false, cwd: string = process.cwd()): void {
    const flag = force ? '-D' : '-d'
    execFileSync('git', ['branch', flag, branch], { cwd, stdio: 'inherit' })
}

export function hasUncommittedChanges(worktreePath: string): boolean {
    if (!existsSync(worktreePath)) return false
    try {
        const status = exec('git', ['status', '--porcelain'], worktreePath)
        return status.length > 0
    } catch {
        return false
    }
}

export function stashChanges(worktreePath: string, message: string): void {
    execFileSync('git', ['stash', 'push', '-m', message], { cwd: worktreePath, stdio: 'inherit' })
}

export function getCurrentBranch(cwd: string = process.cwd()): string {
    return exec('git', ['branch', '--show-current'], cwd)
}
