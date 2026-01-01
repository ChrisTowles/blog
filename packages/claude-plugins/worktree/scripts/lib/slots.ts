import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

export interface SlotConfig {
    slot: number
    [key: string]: string | number
}

export interface SlotsConfig {
    slots: SlotConfig[]
}

export function getSlotsPath(worktreesDir: string): string {
    return join(worktreesDir, 'config', 'slots.yaml')
}

export function slotsExist(worktreesDir: string): boolean {
    return existsSync(getSlotsPath(worktreesDir))
}

export function readSlots(worktreesDir: string): SlotsConfig {
    const path = getSlotsPath(worktreesDir)
    if (!existsSync(path)) {
        throw new Error(`Slots config not found at ${path}. Run /worktree:init first.`)
    }
    const content = readFileSync(path, 'utf-8')
    return parseYaml(content) as SlotsConfig
}

export function getSlotConfig(slotsConfig: SlotsConfig, slotNumber: number): SlotConfig | null {
    return slotsConfig.slots.find(s => s.slot === slotNumber) ?? null
}

export function getSlotValue(slotConfig: SlotConfig, key: string): string | number | undefined {
    return slotConfig[key]
}

export function getSlotVariableNames(slotsConfig: SlotsConfig): string[] {
    if (slotsConfig.slots.length === 0) return []
    const firstSlot = slotsConfig.slots[0]
    return Object.keys(firstSlot).filter(k => k !== 'slot')
}

export function validateSlotConfig(slotsConfig: SlotsConfig): string[] {
    const errors: string[] = []
    if (!slotsConfig.slots || slotsConfig.slots.length === 0) {
        errors.push('No slots defined in slots.yaml')
        return errors
    }

    const varNames = getSlotVariableNames(slotsConfig)
    for (const slot of slotsConfig.slots) {
        for (const varName of varNames) {
            if (!(varName in slot)) {
                errors.push(`Slot ${slot.slot} missing variable: ${varName}`)
            }
        }
    }

    return errors
}
