/**
 * Unit tests for dice rolling tool
 */
import { describe, it, expect } from 'vitest';
import { rollDice } from './roll-dice';

describe('rollDice', () => {
  it('should parse simple dice notation', async () => {
    const result = (await rollDice.handler({ notation: '1d6', label: undefined }, undefined)) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.notation).toBe('1d6');
    expect(data.total).toBeGreaterThanOrEqual(1);
    expect(data.total).toBeLessThanOrEqual(6);
    expect(data.rolls).toHaveLength(1);
  });

  it('should handle modifier notation', async () => {
    const result = (await rollDice.handler(
      { notation: '1d20+5', label: undefined },
      undefined,
    )) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.modifier).toBe(5);
    expect(data.total).toBeGreaterThanOrEqual(6);
    expect(data.total).toBeLessThanOrEqual(25);
  });

  it('should handle negative modifiers', async () => {
    const result = (await rollDice.handler(
      { notation: '1d20-2', label: undefined },
      undefined,
    )) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.modifier).toBe(-2);
  });

  it('should handle multiple dice', async () => {
    const result = (await rollDice.handler({ notation: '3d6', label: undefined }, undefined)) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.rolls).toHaveLength(3);
    expect(data.total).toBeGreaterThanOrEqual(3);
    expect(data.total).toBeLessThanOrEqual(18);
  });

  it('should handle keep highest notation', async () => {
    const result = (await rollDice.handler(
      { notation: '4d6kh3', label: undefined },
      undefined,
    )) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.rolls).toHaveLength(4);
    const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
    expect(keptRolls).toHaveLength(3);
  });

  it('should handle keep lowest notation (disadvantage)', async () => {
    const result = (await rollDice.handler(
      { notation: '2d20kl1', label: undefined },
      undefined,
    )) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.rolls).toHaveLength(2);
    const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
    expect(keptRolls).toHaveLength(1);
  });

  it('should include label when provided', async () => {
    const result = (await rollDice.handler(
      { notation: '1d20', label: 'Attack roll' },
      undefined,
    )) as { content: Array<{ text: string }> };
    const data = JSON.parse(result.content[0].text);

    expect(data.label).toBe('Attack roll');
  });

  it('should reject invalid notation', async () => {
    const result = (await rollDice.handler(
      { notation: 'invalid', label: undefined },
      undefined,
    )) as {
      isError: boolean;
      content: Array<{ text: string }>;
    };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Invalid dice notation');
  });

  it('should reject too many dice', async () => {
    const result = (await rollDice.handler({ notation: '101d6', label: undefined }, undefined)) as {
      isError: boolean;
      content: Array<{ text: string }>;
    };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('between 1 and 100');
  });

  it('should reject invalid die sides', async () => {
    const result = (await rollDice.handler({ notation: '1d1', label: undefined }, undefined)) as {
      isError: boolean;
      content: Array<{ text: string }>;
    };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('between 2 and 100');
  });

  it('should generate breakdown string', async () => {
    const result = (await rollDice.handler({ notation: '2d6+3', label: undefined }, undefined)) as {
      content: Array<{ text: string }>;
    };
    const data = JSON.parse(result.content[0].text);

    expect(data.breakdown).toMatch(/\d+ \+ \d+.*\+3 = \d+/);
  });

  // Natural language tests
  describe('natural language notation', () => {
    it('should handle "4d6 drop lowest"', async () => {
      const result = (await rollDice.handler(
        { notation: '4d6 drop lowest', label: undefined },
        undefined,
      )) as {
        content: Array<{ text: string }>;
      };
      const data = JSON.parse(result.content[0].text);

      expect(data.rolls).toHaveLength(4);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(3);
    });

    it('should handle "4d6 drop the lowest"', async () => {
      const result = (await rollDice.handler(
        { notation: '4d6 drop the lowest', label: undefined },
        undefined,
      )) as {
        content: Array<{ text: string }>;
      };
      const data = JSON.parse(result.content[0].text);

      expect(data.rolls).toHaveLength(4);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(3);
    });

    it('should handle "2d20 advantage"', async () => {
      const result = (await rollDice.handler(
        { notation: '2d20 advantage', label: undefined },
        undefined,
      )) as {
        content: Array<{ text: string }>;
      };
      const data = JSON.parse(result.content[0].text);

      expect(data.rolls).toHaveLength(2);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(1);
    });

    it('should handle "2d20 disadvantage"', async () => {
      const result = (await rollDice.handler(
        { notation: '2d20 disadvantage', label: undefined },
        undefined,
      )) as {
        content: Array<{ text: string }>;
      };
      const data = JSON.parse(result.content[0].text);

      expect(data.rolls).toHaveLength(2);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(1);
    });

    it('should handle "4d6 keep highest 3"', async () => {
      const result = (await rollDice.handler(
        { notation: '4d6 keep highest 3', label: undefined },
        undefined,
      )) as {
        content: Array<{ text: string }>;
      };
      const data = JSON.parse(result.content[0].text);

      expect(data.rolls).toHaveLength(4);
      const keptRolls = data.rolls.filter((r: { kept: boolean }) => r.kept);
      expect(keptRolls).toHaveLength(3);
    });

    it('should handle "1d20 + 5" with spaces', async () => {
      const result = (await rollDice.handler(
        { notation: '1d20 + 5', label: undefined },
        undefined,
      )) as {
        content: Array<{ text: string }>;
      };
      const data = JSON.parse(result.content[0].text);

      expect(data.modifier).toBe(5);
      expect(data.total).toBeGreaterThanOrEqual(6);
    });
  });
});
