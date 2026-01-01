import { tool } from '@anthropic-ai/claude-agent-sdk'
import { z } from 'zod'
import { toolResult, toolError } from './helpers'

interface DiceRoll {
    sides: number
    result: number
    kept: boolean
}

/**
 * Roll dice for tabletop gaming
 * Supports standard notation: "2d6", "1d20+5", "4d6kh3" (keep highest), "2d20kl1" (keep lowest)
 */
export const rollDice = tool(
    'rollDice',
    'Roll dice for tabletop gaming (D&D, etc). Use when users want to roll dice. Supports standard notation like "2d6", "1d20+5", "4d6 drop lowest".',
    {
        notation: z.string().describe('Dice notation (e.g., "2d6", "1d20+5", "4d6kh3" for keep highest 3, "2d20kl1" for keep lowest/disadvantage)'),
        label: z.string().optional().describe('Optional label for the roll (e.g., "Attack roll", "Fireball damage")')
    },
    async (args) => {
        // Parse notation like "2d6+5", "4d6kh3", "2d20kl1"
        const match = args.notation.toLowerCase().match(/^(\d+)d(\d+)(kh\d+|kl\d+)?([+-]\d+)?$/)

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
