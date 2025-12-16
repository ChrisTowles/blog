import type Anthropic from '@anthropic-ai/sdk'
import { retrieveRAG } from '../rag/retrieve'

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
  }
]

/**
 * Execute a tool by name
 * Some tools are async (like searchBlogContent)
 */
export async function executeTool(name: string, args?: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'searchBlogContent': {
      const query = args?.query as string
      if (!query) {
        return { error: 'Query is required' }
      }
      const results = await retrieveRAG(query, { topK: 5 })
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
        blogUrl: 'https://emmer.dev',
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
