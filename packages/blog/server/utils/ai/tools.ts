/**
 * THREAD SAFETY WARNING: This module handles tool execution in a server context where multiple
 * requests may be processed concurrently. ALL STATE MUST BE REQUEST-SCOPED, never module-level.
 *
 * - Do NOT create module-level mutable state (e.g., currentFilters variables)
 * - Pass filters and context as parameters through function calls
 * - See Issue #8 for context on request isolation requirements
 */

import type Anthropic from '@anthropic-ai/sdk'
import { retrieveRAG } from '../rag/retrieve'

/**
 * Tool Registry - lookup tools by name for capability-based filtering
 */
export const toolRegistry = new Map<string, Anthropic.Tool>()

/**
 * Get tools by their names (for capability-based tool filtering)
 */
export function getToolsByNames(names: string[]): Anthropic.Tool[] {
  return names
    .map((name) => {
      const tool = toolRegistry.get(name)
      if (!tool) {
        console.warn(`[tools] Tool "${name}" not found in registry. Check capability configuration.`)
      }
      return tool
    })
    .filter((t): t is Anthropic.Tool => t !== undefined)
}

/**
 * Get all available tool names
 */
export function getAllToolNames(): string[] {
  return Array.from(toolRegistry.keys())
}

/**
 * Tool definitions for Anthropic SDK
 */
export const chatTools: Anthropic.Tool[] = [
  {
    name: 'searchBlogContent',
    description: 'Search blog posts for relevant information. Use this when users ask about topics that might be covered in the blog, such as AI/Claude, Vue/Nuxt, DevOps, best practices, or any technical topic. Returns relevant excerpts with source URLs.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'The search query to find relevant blog content'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'getCurrentDateTime',
    description: 'Get the current date and time. Use when user asks about today, current time, or needs temporal context.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: []
    }
  },
  {
    name: 'getAuthorInfo',
    description: 'Get information about Chris Towles, the blog author. Use when users ask about the author, his background, or expertise.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: []
    }
  },
  {
    name: 'getBlogTopics',
    description: 'Get a list of topics covered on the blog. Use to help users discover content areas.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: []
    }
  },
  {
    name: 'getWeather',
    description: 'Get current weather and forecast for a location. Use when the user asks about weather conditions.',
    input_schema: {
      type: 'object' as const,
      properties: {
        location: {
          type: 'string',
          description: 'City name (e.g., "London", "New York", "Tokyo")'
        }
      },
      required: ['location']
    }
  },
  {
    name: 'rollDice',
    description: 'Roll dice for tabletop gaming (D&D, etc). Use when users want to roll dice. Supports standard notation like "2d6", "1d20+5", "4d6 drop lowest".',
    input_schema: {
      type: 'object' as const,
      properties: {
        notation: {
          type: 'string',
          description: 'Dice notation (e.g., "2d6", "1d20+5", "4d6kh3" for keep highest 3, "2d20kl1" for keep lowest/disadvantage)'
        },
        label: {
          type: 'string',
          description: 'Optional label for the roll (e.g., "Attack roll", "Fireball damage")'
        }
      },
      required: ['notation']
    }
  }
]

/**
 * Execute a tool by name
 * Some tools are async (like searchBlogContent)
 */
export async function executeTool(
  name: string,
  args?: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case 'searchBlogContent': {
      const query = args?.query as string
      if (!query) {
        return { error: 'Query is required' }
      }
      const results = await retrieveRAG(query, {
        topK: 5
      })
      return {
        results: results.map(r => ({
          content: r.content,
          source: r.documentTitle,
          url: r.documentUrl // e.g., "/blog/tips-for-claude-code"
        })),
        hint: 'When referencing these results, use markdown links like [Title](url) to cite sources.'
      }
    }
    case 'getCurrentDateTime': {
      const now = new Date()
      return {
        date: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US'),
        iso: now.toISOString(),
        timestamp: now.getTime()
      }
    }
    case 'getAuthorInfo': {
      return {
        name: 'Chris Towles',
        role: 'Software Engineer',
        topics: ['Vue', 'Nuxt', 'TypeScript', 'AI/ML', 'DevOps', 'Cloud Infrastructure'],
        blogUrl: 'https://chris.towles.dev',
        github: 'https://github.com/christowles'
      }
    }
    case 'getBlogTopics': {
      return {
        topics: [
          { name: 'AI & Machine Learning', keywords: ['Claude', 'Anthropic', 'AI SDK', 'Ollama', 'ComfyUI', 'context engineering'] },
          { name: 'Vue & Nuxt', keywords: ['Vue 3', 'Nuxt', 'Vite', 'Vitest', 'composition API'] },
          { name: 'DevOps & Infrastructure', keywords: ['Terraform', 'GCP', 'AWS', 'Docker', 'CI/CD'] },
          { name: 'Developer Tools', keywords: ['VS Code', 'Git', 'pnpm', 'conventional commits', 'dotfiles'] },
          { name: 'Best Practices', keywords: ['testing', 'TypeScript', 'code review', 'ITIL'] }
        ],
        blogPath: '/blog'
      }
    }
    case 'getWeather': {
      const location = args?.location as string
      if (!location) {
        return { error: 'Location is required' }
      }
      return await fetchWeather(location)
    }
    case 'rollDice': {
      const notation = args?.notation as string
      const label = args?.label as string | undefined
      if (!notation) {
        return { error: 'Dice notation is required' }
      }
      return rollDice(notation, label)
    }
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

/**
 * Weather condition codes to icons and text
 */
const weatherConditions: Record<number, { icon: string, text: string }> = {
  0: { icon: 'i-lucide-sun', text: 'Clear sky' },
  1: { icon: 'i-lucide-sun', text: 'Mainly clear' },
  2: { icon: 'i-lucide-cloud-sun', text: 'Partly cloudy' },
  3: { icon: 'i-lucide-cloud', text: 'Overcast' },
  45: { icon: 'i-lucide-cloud-fog', text: 'Fog' },
  48: { icon: 'i-lucide-cloud-fog', text: 'Depositing rime fog' },
  51: { icon: 'i-lucide-cloud-drizzle', text: 'Light drizzle' },
  53: { icon: 'i-lucide-cloud-drizzle', text: 'Moderate drizzle' },
  55: { icon: 'i-lucide-cloud-drizzle', text: 'Dense drizzle' },
  61: { icon: 'i-lucide-cloud-rain', text: 'Slight rain' },
  63: { icon: 'i-lucide-cloud-rain', text: 'Moderate rain' },
  65: { icon: 'i-lucide-cloud-rain', text: 'Heavy rain' },
  71: { icon: 'i-lucide-cloud-snow', text: 'Slight snow' },
  73: { icon: 'i-lucide-cloud-snow', text: 'Moderate snow' },
  75: { icon: 'i-lucide-cloud-snow', text: 'Heavy snow' },
  80: { icon: 'i-lucide-cloud-rain', text: 'Slight showers' },
  81: { icon: 'i-lucide-cloud-rain', text: 'Moderate showers' },
  82: { icon: 'i-lucide-cloud-rain', text: 'Violent showers' },
  95: { icon: 'i-lucide-cloud-lightning', text: 'Thunderstorm' },
  96: { icon: 'i-lucide-cloud-lightning', text: 'Thunderstorm with hail' },
  99: { icon: 'i-lucide-cloud-lightning', text: 'Thunderstorm with heavy hail' }
}

function getCondition(code: number): { icon: string, text: string } {
  return weatherConditions[code] || { icon: 'i-lucide-cloud', text: 'Unknown' }
}

function getDayName(dateStr: string, index: number): string {
  if (index === 0) return 'Today'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export interface WeatherResult {
  location: string
  temperature: number
  temperatureHigh: number
  temperatureLow: number
  humidity: number
  windSpeed: number
  condition: { icon: string, text: string }
  dailyForecast: Array<{
    day: string
    high: number
    low: number
    condition: { icon: string, text: string }
  }>
}

async function fetchWeather(location: string): Promise<WeatherResult | { error: string }> {
  try {
    // Geocode location using Open-Meteo
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
    )
    const geoData = await geoRes.json()

    if (!geoData.results?.length) {
      return { error: `Location "${location}" not found` }
    }

    const { latitude, longitude, name, country } = geoData.results[0]

    // Fetch weather from Open-Meteo
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    )
    const weather = await weatherRes.json()

    const current = weather.current
    const daily = weather.daily

    return {
      location: `${name}, ${country}`,
      temperature: Math.round(current.temperature_2m),
      temperatureHigh: Math.round(daily.temperature_2m_max[0]),
      temperatureLow: Math.round(daily.temperature_2m_min[0]),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      condition: getCondition(current.weather_code),
      dailyForecast: daily.time.map((date: string, i: number) => ({
        day: getDayName(date, i),
        high: Math.round(daily.temperature_2m_max[i]),
        low: Math.round(daily.temperature_2m_min[i]),
        condition: getCondition(daily.weather_code[i])
      }))
    }
  } catch (error) {
    console.error('Weather fetch error:', error)
    return { error: 'Failed to fetch weather data' }
  }
}

/**
 * Dice rolling types and functions
 */
export interface DiceRoll {
  sides: number
  result: number
  kept: boolean
}

export interface DiceResult {
  notation: string
  label?: string
  rolls: DiceRoll[]
  modifier: number
  total: number
  breakdown: string
  isCriticalHit?: boolean
  isCriticalMiss?: boolean
}

function rollDice(notation: string, label?: string): DiceResult | { error: string } {
  try {
    // Parse notation like "2d6+5", "4d6kh3", "2d20kl1"
    const match = notation.toLowerCase().match(/^(\d+)d(\d+)(kh\d+|kl\d+)?([+-]\d+)?$/)

    if (!match) {
      return { error: `Invalid dice notation: "${notation}". Use format like "2d6", "1d20+5", "4d6kh3"` }
    }

    const [, countStr, sidesStr, keepStr, modifierStr] = match
    const count = parseInt(countStr!, 10)
    const sides = parseInt(sidesStr!, 10)
    const modifier = modifierStr ? parseInt(modifierStr, 10) : 0

    if (count < 1 || count > 100) {
      return { error: 'Number of dice must be between 1 and 100' }
    }
    if (sides < 2 || sides > 100) {
      return { error: 'Dice sides must be between 2 and 100' }
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

      // Sort by result
      const sorted = [...rolls].sort((a, b) =>
        keepHighest ? b.result - a.result : a.result - b.result
      )

      // Mark which dice to keep
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

    return {
      notation,
      label,
      rolls,
      modifier,
      total,
      breakdown,
      isCriticalHit,
      isCriticalMiss
    }
  } catch (error) {
    console.error('Dice roll error:', error)
    return { error: 'Failed to roll dice' }
  }
}

// Populate the tool registry
chatTools.forEach(tool => toolRegistry.set(tool.name, tool))
