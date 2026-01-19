/**
 * Unit tests for tool helpers
 */
import { describe, it, expect } from 'vitest';
import { toolResult, toolError } from './helpers';

describe('tool helpers', () => {
  describe('toolResult', () => {
    it('should wrap data in Agent SDK content format', () => {
      const data = { foo: 'bar', count: 42 };
      const result = toolResult(data);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(JSON.parse(result.content[0].text)).toEqual(data);
    });

    it('should format JSON with indentation', () => {
      const result = toolResult({ a: 1 });
      expect(result.content[0].text).toContain('\n');
    });

    it('should handle arrays', () => {
      const data = [1, 2, 3];
      const result = toolResult(data);
      expect(JSON.parse(result.content[0].text)).toEqual(data);
    });

    it('should handle null and primitives', () => {
      expect(JSON.parse(toolResult(null).content[0].text)).toBeNull();
      expect(JSON.parse(toolResult('string').content[0].text)).toBe('string');
      expect(JSON.parse(toolResult(123).content[0].text)).toBe(123);
    });
  });

  describe('toolError', () => {
    it('should wrap error message in Agent SDK format', () => {
      const result = toolError('Something went wrong');

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(JSON.parse(result.content[0].text)).toEqual({ error: 'Something went wrong' });
    });

    it('should set isError flag', () => {
      const result = toolError('Error');
      expect(result.isError).toBe(true);
    });
  });
});
