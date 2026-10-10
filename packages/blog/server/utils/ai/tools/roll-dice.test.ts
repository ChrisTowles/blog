/**
 * Unit tests for dice rolling tool
 */
import { describe, it, expect } from 'vitest';
import { rollDice } from './roll-dice';

async function rollResult(notation: string, label?: string) {
  const result = await rollDice.handler({ notation, label }, undefined);
  const block = result.content[0];

  if (block?.type !== 'text') throw new Error('expected a text content block');

  return { isError: result.isError, text: block.text };
}

async function roll(notation: string, label?: string) {
  return JSON.parse((await rollResult(notation, label)).text);
}

describe('rollDice', () => {
  it('should parse simple dice notation', async () => {
    const data = await roll('1d6');

    expect(data.notation).toBe('1d6');
    expect(data.total).toBeGreaterThanOrEqual(1);
    expect(data.total).toBeLessThanOrEqual(6);
    expect(data.rolls).toHaveLength(1);
  });

  it('should handle modifier notation', async () => {
    const data = await roll('1d20+5');

    expect(data.modifier).toBe(5);
    expect(data.total).toBeGreaterThanOrEqual(6);
    expect(data.total).toBeLessThanOrEqual(25);
  });

  it('should handle negative modifiers', async () => {
    const data = await roll('1d20-2');

    expect(data.modifier).toBe(-2);
  });

  it('should handle multiple dice', async () => {
    const data = await roll('3d6');

    expect(data.rolls).toHaveLength(3);
    expect(data.total).toBeGreaterThanOrEqual(3);
    expect(data.total).toBeLessThanOrEqual(18);
  });

  it('should handle keep highest notation', async () => {
    const data = await roll('4d6kh3');

    expect(data.rolls).toHaveLength(4);
    const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
    expect(keptRolls).toHaveLength(3);
  });

  it('should handle keep lowest notation (disadvantage)', async () => {
    const data = await roll('2d20kl1');

    expect(data.rolls).toHaveLength(2);
    const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
    expect(keptRolls).toHaveLength(1);
  });

  it('should include label when provided', async () => {
    const data = await roll('1d20', 'Attack roll');

    expect(data.label).toBe('Attack roll');
  });

  it('should reject invalid notation', async () => {
    const result = await rollResult('invalid');

    expect(result.isError).toBe(true);
    expect(result.text).toContain('Invalid dice notation');
  });

  it('should reject too many dice', async () => {
    const result = await rollResult('101d6');

    expect(result.isError).toBe(true);
    expect(result.text).toContain('between 1 and 100');
  });

  it('should reject invalid die sides', async () => {
    const result = await rollResult('1d1');

    expect(result.isError).toBe(true);
    expect(result.text).toContain('between 2 and 100');
  });

  it('should generate breakdown string', async () => {
    const data = await roll('2d6+3');

    expect(data.breakdown).toMatch(/\d+ \+ \d+.*\+3 = \d+/);
  });

  // Natural language tests
  describe('natural language notation', () => {
    it('should handle "4d6 drop lowest"', async () => {
      const data = await roll('4d6 drop lowest');

      expect(data.rolls).toHaveLength(4);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(3);
    });

    it('should handle "4d6 drop the lowest"', async () => {
      const data = await roll('4d6 drop the lowest');

      expect(data.rolls).toHaveLength(4);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(3);
    });

    it('should handle "2d20 advantage"', async () => {
      const data = await roll('2d20 advantage');

      expect(data.rolls).toHaveLength(2);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(1);
    });

    it('should handle "2d20 disadvantage"', async () => {
      const data = await roll('2d20 disadvantage');

      expect(data.rolls).toHaveLength(2);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(1);
    });

    it('should handle "4d6 keep highest 3"', async () => {
      const data = await roll('4d6 keep highest 3');

      expect(data.rolls).toHaveLength(4);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(3);
    });

    it('should handle "1d20 + 5" with spaces', async () => {
      const data = await roll('1d20 + 5');

      expect(data.modifier).toBe(5);
      expect(data.total).toBeGreaterThanOrEqual(6);
    });
  });
});
