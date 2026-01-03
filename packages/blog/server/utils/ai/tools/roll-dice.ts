import { tool } from '@anthropic-ai/claude-agent-sdk'
import { z } from 'zod'
import { toolResult, toolError } from './helpers'

interface DiceRoll {
    sides: number
    result: number
    kept: boolean
}

/**
 * Normalize natural language dice notation to formal notation
 * "4d6 drop lowest" → "4d6kh3", "2d20 advantage" → "2d20kh1"
 */
function normalizeNotation(input: string): string {
    let notation = input.toLowerCase().trim()

    // Extract base dice pattern
    const baseMatch = notation.match(/^(\d+)d(\d+)/)
    if (!baseMatch) return notation

    const count = parseInt(baseMatch[1]!, 10)

    // Handle "drop lowest [n]" → keep highest (count - n)
    const dropLowestMatch = notation.match(/drop\s+(?:the\s+)?lowest(?:\s+(\d+))?/)
    if (dropLowestMatch) {
        const dropCount = dropLowestMatch[1] ? parseInt(dropLowestMatch[1], 10) : 1
        const keepCount = count - dropCount
        if (keepCount > 0) {
            notation = `${baseMatch[0]}kh${keepCount}`
        }
    }

    // Handle "drop highest [n]" → keep lowest (count - n)
    const dropHighestMatch = notation.match(/drop\s+(?:the\s+)?highest(?:\s+(\d+))?/)
    if (dropHighestMatch) {
        const dropCount = dropHighestMatch[1] ? parseInt(dropHighestMatch[1], 10) : 1
        const keepCount = count - dropCount
        if (keepCount > 0) {
            notation = `${baseMatch[0]}kl${keepCount}`
        }
    }

    // Handle "advantage" → keep highest 1 (for 2d20)
    if (/\b(advantage|adv)\b/.test(notation) && !notation.includes('kh')) {
        notation = `${baseMatch[0]}kh1`
    }

    // Handle "disadvantage" → keep lowest 1 (for 2d20)
    if (/\b(disadvantage|disadv|dis)\b/.test(notation) && !notation.includes('kl')) {
        notation = `${baseMatch[0]}kl1`
    }

    // Handle "keep highest [n]" that's not already kh format
    const keepHighestMatch = notation.match(/keep\s+(?:the\s+)?highest(?:\s+(\d+))?/)
    if (keepHighestMatch && !notation.includes('kh')) {
        const keepCount = keepHighestMatch[1] ? parseInt(keepHighestMatch[1], 10) : 1
        notation = `${baseMatch[0]}kh${keepCount}`
    }

    // Handle "keep lowest [n]" that's not already kl format
    const keepLowestMatch = notation.match(/keep\s+(?:the\s+)?lowest(?:\s+(\d+))?/)
    if (keepLowestMatch && !notation.includes('kl')) {
        const keepCount = keepLowestMatch[1] ? parseInt(keepLowestMatch[1], 10) : 1
        notation = `${baseMatch[0]}kl${keepCount}`
    }

    // Extract modifier if present (e.g., "+5", "- 3")
    const modMatch = input.match(/([+-])\s*(\d+)\s*$/)
    if (modMatch) {
        // Remove any existing modifier pattern from notation first
        notation = notation.replace(/\s*[+-]\s*\d+\s*$/, '')
        notation += `${modMatch[1]}${modMatch[2]}`
    }

    return notation
}

/**
 * Roll dice for tabletop gaming
 * Supports standard notation: "2d6", "1d20+5", "4d6kh3" (keep highest), "2d20kl1" (keep lowest)
 * Also supports natural language: "4d6 drop lowest", "2d20 advantage"
 */
export const rollDice = tool(
    'rollDice',
    'Roll dice for tabletop gaming (D&D, etc). Use when users want to roll dice. Supports notation like "2d6", "1d20+5", "4d6kh3", "4d6 drop lowest", "2d20 advantage".',
    {
        notation: z.string().describe('Dice notation (e.g., "2d6", "1d20+5", "4d6kh3", "4d6 drop lowest", "2d20 advantage")'),
        label: z.string().optional().describe('Optional label for the roll (e.g., "Attack roll", "Fireball damage")')
    },
    async (args) => {
        // Normalize natural language to formal notation
        const normalized = normalizeNotation(args.notation)

        // Parse notation like "2d6+5", "4d6kh3", "2d20kl1"
        const match = normalized.match(/^(\d+)d(\d+)(kh\d+|kl\d+)?([+-]\d+)?$/)

        if (!match) {
            return toolError(`Invalid dice notation: "${args.notation}". Use format like "2d6", "1d20+5", "4d6kh3"`)
        }

        const [, countStr, sidesStr, keepStr, modifierStr] = match
        const count = parseInt(countStr!, 10)
        const sides = parseInt(sidesStr!, 10)
        const modifier = modifierStr ? parseInt(modifierStr, 10) : 0

        if (count < 1 || count > 100) {
            return toolError('Number of dice must be between 1 and 100')
        }
        if (sides < 2 || sides > 100) {
            return toolError('Dice sides must be between 2 and 100')
        }

        // Roll all dice
        const rolls: DiceRoll[] = []
        for (let i = 0; i < count; i++) {
            rolls.push({
                sides,
                result: Math.floor(Math.random() * sides) + 1,
                kept: true
            })
        }

        // Handle keep highest/lowest
        if (keepStr) {
            const keepCount = parseInt(keepStr.slice(2), 10)
            const keepHighest = keepStr.startsWith('kh')

            const sorted = [...rolls].sort((a, b) =>
                keepHighest ? b.result - a.result : a.result - b.result
            )

            rolls.forEach((roll) => {
                roll.kept = sorted.slice(0, keepCount).includes(roll)
            })
        }

        // Calculate total from kept dice
        const keptRolls = rolls.filter(r => r.kept)
        const diceTotal = keptRolls.reduce((sum, r) => sum + r.result, 0)
        const total = diceTotal + modifier

        // Build breakdown string
        const rollsStr = rolls.map(r =>
            r.kept ? r.result.toString() : `~~${r.result}~~`
        ).join(' + ')
        const breakdown = modifier !== 0
            ? `(${rollsStr}) ${modifier >= 0 ? '+' : ''}${modifier} = ${total}`
            : `${rollsStr} = ${total}`

        // Check for crits on d20
        const isCriticalHit = sides === 20 && keptRolls.some(r => r.result === 20)
        const isCriticalMiss = sides === 20 && keptRolls.some(r => r.result === 1)

        return toolResult({
            notation: args.notation,
            label: args.label,
            rolls,
            modifier,
            total,
            breakdown,
            isCriticalHit,
            isCriticalMiss
        })
    }
)
