/**
 * Unit tests for getWeather tool. Network is mocked so CI doesn't depend on
 * Open-Meteo's availability.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import type { JsonValue } from '~~/shared/json-types';
import { getWeather } from './get-weather';
import { toolText } from './test-utils';

const londonGeocode = {
  results: [
    {
      latitude: 51.5074,
      longitude: -0.1278,
      name: 'London',
      country: 'United Kingdom',
    },
  ],
};

const londonForecast = {
  current: {
    temperature_2m: 14,
    relative_humidity_2m: 70,
    weather_code: 3,
    wind_speed_10m: 8,
  },
  daily: {
    time: ['2026-05-05', '2026-05-06', '2026-05-07', '2026-05-08', '2026-05-09'],
    weather_code: [3, 61, 1, 2, 3],
    temperature_2m_max: [16, 15, 18, 17, 14],
    temperature_2m_min: [9, 10, 11, 9, 8],
  },
};

function jsonResponse(body: JsonValue): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

describe('getWeather', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = input instanceof Request ? input.url : String(input);

      if (url.includes('geocoding-api.open-meteo.com')) {
        if (url.includes('Nonexistent')) {
          return jsonResponse({ results: [] });
        }

        return jsonResponse(londonGeocode);
      }

      if (url.includes('api.open-meteo.com/v1/forecast')) {
        return jsonResponse(londonForecast);
      }

      throw new Error(`unexpected fetch: ${url}`);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return formatted weather data for valid location', async () => {
    const result = await getWeather.handler({ location: 'London' }, undefined);
    const data = JSON.parse(toolText(result));

    expect(data.location).toBe('London, United Kingdom');
    expect(data.temperature).toBe(14);
    expect(data.temperatureHigh).toBe(16);
    expect(data.temperatureLow).toBe(9);
    expect(data.humidity).toBe(70);
    expect(data.windSpeed).toBe(8);
    expect(data.condition.text).toBeDefined();
    expect(data.dailyForecast).toHaveLength(5);
  });

  it('should format daily forecast correctly', async () => {
    const result = await getWeather.handler({ location: 'London' }, undefined);
    const data = JSON.parse(toolText(result));

    expect(data.dailyForecast[0].day).toBe('Today');
    expect(data.dailyForecast[0].high).toBe(16);
    expect(data.dailyForecast[0].low).toBe(9);
    expect(data.dailyForecast[0].condition.text).toBeDefined();
    expect(data.dailyForecast[1].day).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/);
  });

  it('should return error for unknown location', async () => {
    const result = await getWeather.handler({ location: 'Nonexistent City XYZ' }, undefined);

    const data = JSON.parse(toolText(result));

    expect(result.isError).toBe(true);
    expect(data.error).toContain('Nonexistent City XYZ');
    expect(data.error).toContain('not found');
  });
});
