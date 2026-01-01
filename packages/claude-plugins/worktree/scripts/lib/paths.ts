import { resolve, dirname, basename, relative } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'

export function getWorktreesDir(mainRepoDir: string): string {
    const repoName = basename(mainRepoDir)
    return resolve(dirname(mainRepoDir), `${repoName}-worktrees`)
}

export function getConfigDir(worktreesDir: string): string {
    return resolve(worktreesDir, 'config')
}

export function getWorktreePath(worktreesDir: string, worktreeName: string): string {
    return resolve(worktreesDir, worktreeName)
}

export function getRelativePath(from: string, to: string): string {
    return relative(from, to)
}

export function ensureDir(path: string): void {
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true })
    }
}

export function worktreeNameFromBranch(branch: string): string {
    // feature/142-add-feature -> 142-add-feature
    return branch.replace(/^feature\//, '').replace(/^[^/]+\//, '')
}

export function configExists(worktreesDir: string): boolean {
    const configDir = getConfigDir(worktreesDir)
    return existsSync(configDir)
}
