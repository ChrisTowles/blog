/**
 * Unit tests for getWeather tool
 */
import { describe, it, expect } from 'vitest';

import { getWeather } from './get-weather';

describe('getWeather', () => {
  it('should return formatted weather data for valid location', async () => {
    const result = (await getWeather.handler({ location: 'London' }, undefined)) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.location).toBe('London, United Kingdom');
    expect(data.temperature).toBeLessThan(100);
    expect(data.temperatureHigh).toBeLessThan(100);
    expect(data.temperatureLow).toBeLessThan(100);
    expect(data.humidity).toBeLessThan(200);
    expect(data.windSpeed).toBeLessThan(100);
    expect(data.condition.text).toBeDefined();
    expect(data.dailyForecast).toHaveLength(5);
  });

  it('should format daily forecast correctly', async () => {
    const result = (await getWeather.handler({ location: 'London' }, undefined)) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.dailyForecast[0].day).toBe('Today');
    expect(data.dailyForecast[0].high).toBeLessThan(100);
    expect(data.dailyForecast[0].low).toBeLessThan(100);
    expect(data.dailyForecast[0].condition.text).toBeDefined();
    // Second day should be weekday name
    expect(data.dailyForecast[1].day).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/);
  });

  it('should return error for unknown location', async () => {
    const result = (await getWeather.handler({ location: 'Nonexistent City XYZ' }, undefined)) as {
      isError: boolean;
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(result.isError).toBe(true);
    expect(data.error).toContain('Nonexistent City XYZ');
    expect(data.error).toContain('not found');
  });
});
