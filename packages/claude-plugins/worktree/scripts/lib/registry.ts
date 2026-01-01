import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export interface SlotAssignment {
    slot: number
    issue: number | null
    branch: string | null
    worktree: string | null
    createdAt: string | null
}

export interface WorktreeRegistry {
    repoName: string
    slotCount: number
    assignments: SlotAssignment[]
}

export function getRegistryPath(worktreesDir: string): string {
    return join(worktreesDir, '.worktree-registry.json')
}

export function registryExists(worktreesDir: string): boolean {
    return existsSync(getRegistryPath(worktreesDir))
}

export function readRegistry(worktreesDir: string): WorktreeRegistry {
    const path = getRegistryPath(worktreesDir)
    if (!existsSync(path)) {
        throw new Error(`Registry not found at ${path}. Run /worktree:init first.`)
    }
    const content = readFileSync(path, 'utf-8')
    return JSON.parse(content) as WorktreeRegistry
}

export function writeRegistry(worktreesDir: string, registry: WorktreeRegistry): void {
    const path = getRegistryPath(worktreesDir)
    writeFileSync(path, JSON.stringify(registry, null, 2) + '\n')
}

export function createEmptyRegistry(repoName: string, slotCount: number): WorktreeRegistry {
    const assignments: SlotAssignment[] = []
    for (let i = 1; i <= slotCount; i++) {
        assignments.push({
            slot: i,
            issue: null,
            branch: null,
            worktree: null,
            createdAt: null
        })
    }
    return { repoName, slotCount, assignments }
}

export function findFreeSlot(registry: WorktreeRegistry): SlotAssignment | null {
    return registry.assignments.find(a => a.worktree === null) ?? null
}

export function findSlotByIssue(registry: WorktreeRegistry, issue: number): SlotAssignment | null {
    return registry.assignments.find(a => a.issue === issue) ?? null
}

export function findSlotByBranch(registry: WorktreeRegistry, branch: string): SlotAssignment | null {
    return registry.assignments.find(a => a.branch === branch) ?? null
}

export function allocateSlot(
    registry: WorktreeRegistry,
    slotNumber: number,
    issue: number | null,
    branch: string,
    worktreeName: string
): void {
    const slot = registry.assignments.find(a => a.slot === slotNumber)
    if (!slot) throw new Error(`Slot ${slotNumber} not found`)
    if (slot.worktree !== null) throw new Error(`Slot ${slotNumber} already in use`)

    slot.issue = issue
    slot.branch = branch
    slot.worktree = worktreeName
    slot.createdAt = new Date().toISOString()
}

export function freeSlot(registry: WorktreeRegistry, slotNumber: number): void {
    const slot = registry.assignments.find(a => a.slot === slotNumber)
    if (!slot) throw new Error(`Slot ${slotNumber} not found`)

    slot.issue = null
    slot.branch = null
    slot.worktree = null
    slot.createdAt = null
}
