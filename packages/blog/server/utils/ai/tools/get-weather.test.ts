/**
 * Unit tests for getWeather tool
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'


import { getWeather } from './get-weather'

describe('getWeather', () => {
    const mockGeoResponse = {
        results: [{
            latitude: 51.5074,
            longitude: -0.1278,
            name: 'London',
            country: 'United Kingdom'
        }]
    }



    const mockWeatherResponse = {
        current: {
            temperature_2m: 18.5,
            relative_humidity_2m: 65,
            weather_code: 2,
            wind_speed_10m: 12.3
        },
        daily: {
            time: ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'],
            weather_code: [2, 3, 61, 0, 1],
            temperature_2m_max: [20.5, 18.2, 15.8, 22.1, 21.0],
            temperature_2m_min: [12.3, 10.1, 8.5, 14.2, 13.8]
        }
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return formatted weather data for valid location', async () => {
     

       const result = await getWeather.handler({ location: 'London' }, undefined ) as { content: Array<{ text: string }> }
        const data = JSON.parse(result.content[0].text)

        expect(data.location).toBe('London, United Kingdom')
        expect(data.temperature).toBeLessThan(100)
        expect(data.temperatureHigh).toBeLessThan(100)
        expect(data.temperatureLow).toBeLessThan(100)   
        expect(data.humidity).toBeLessThan(200)
        expect(data.windSpeed).toBeLessThan(100)
        expect(data.condition.text).toBeDefined()
        expect(data.dailyForecast).toHaveLength(5)
    })

    it('should format daily forecast correctly', async () => {

        const result = await getWeather.handler({ location: 'London' }, undefined ) as { content: Array<{ text: string }> }
        const data = JSON.parse(result.content[0].text)

        expect(data.dailyForecast[0].day).toBe('Today')
        expect(data.dailyForecast[0].high).toBeLessThan(100)
        expect(data.dailyForecast[0].low).toBeLessThan(100)
        expect(data.dailyForecast[0].condition.text).toBeDefined()
        // Second day should be weekday name
        expect(data.dailyForecast[1].day).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/)
    })

    it('should return error for unknown location', async () => {
 

        const result = await getWeather.handler({ location: 'Nonexistent City XYZ' }, undefined ) as { isError: boolean, content: Array<{ text: string }> }
        const data = JSON.parse(result.content[0].text)

        expect(result.isError).toBe(true)
        expect(data.error).toContain('Nonexistent City XYZ')
        expect(data.error).toContain('not found')
    })

   
})
