import { tool } from '@anthropic-ai/claude-agent-sdk'
import { z } from 'zod'
import { toolResult, toolError } from './helpers'
import { fetchWithTimeout, isTimeoutError, API_TIMEOUT_MS } from './timeout'

/**
 * Weather condition codes to icons and text (Open-Meteo WMO codes)
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

/**
 * Get weather for a location using Open-Meteo API
 * Includes timeout protection for external API calls.
 */
export const getWeather = tool(
    'getWeather',
    `Get current weather and forecast for a location. Use when the user asks about weather conditions. (${API_TIMEOUT_MS / 1000}s timeout)`,
    {
        location: z.string().describe('City name (e.g., "London", "New York", "Tokyo")')
    },
    async (args) => {
        try {
            // Geocode location with timeout
            const geoRes = await fetchWithTimeout(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(args.location)}&count=1`,
                {},
                API_TIMEOUT_MS
            )
            if (!geoRes.ok) {
                return toolError('Failed to geocode location')
            }
            const geoData = await geoRes.json()

            if (!geoData.results?.length) {
                return toolError(`Location "${args.location}" not found`)
            }

            const { latitude, longitude, name, country } = geoData.results[0]

            // Fetch weather with timeout
            const weatherRes = await fetchWithTimeout(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`,
                {},
                API_TIMEOUT_MS
            )
            if (!weatherRes.ok) {
                return toolError('Failed to fetch weather data')
            }
            const weather = await weatherRes.json()

            const current = weather.current
            const daily = weather.daily

            return toolResult({
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
            })
        } catch (error) {
            console.error('Weather fetch error:', error)
            if (isTimeoutError(error)) {
                return toolError('Weather service timed out. Please try again.')
            }
            return toolError('Failed to fetch weather data')
        }
    }
)
