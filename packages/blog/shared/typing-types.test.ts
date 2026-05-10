// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { stageTargetWpm } from './typing-types';

describe('stageTargetWpm', () => {
  it('returns 5 WPM for stages 1-3', () => {
    expect(stageTargetWpm(1)).toBe(5);
    expect(stageTargetWpm(2)).toBe(5);
    expect(stageTargetWpm(3)).toBe(5);
  });

  it('returns 8 WPM for stages 4-6', () => {
    expect(stageTargetWpm(4)).toBe(8);
    expect(stageTargetWpm(5)).toBe(8);
    expect(stageTargetWpm(6)).toBe(8);
  });

  it('returns 12 WPM for stages 7-9', () => {
    expect(stageTargetWpm(7)).toBe(12);
    expect(stageTargetWpm(8)).toBe(12);
    expect(stageTargetWpm(9)).toBe(12);
  });

  it('returns 16 WPM for stages 10-12', () => {
    expect(stageTargetWpm(10)).toBe(16);
    expect(stageTargetWpm(11)).toBe(16);
    expect(stageTargetWpm(12)).toBe(16);
  });

  it('returns 20 WPM for stages 13-15', () => {
    expect(stageTargetWpm(13)).toBe(20);
    expect(stageTargetWpm(14)).toBe(20);
    expect(stageTargetWpm(15)).toBe(20);
  });

  it('returns 25 WPM for stages 16-18', () => {
    expect(stageTargetWpm(16)).toBe(25);
    expect(stageTargetWpm(17)).toBe(25);
    expect(stageTargetWpm(18)).toBe(25);
  });

  it('returns 30 WPM for stages 19-20', () => {
    expect(stageTargetWpm(19)).toBe(30);
    expect(stageTargetWpm(20)).toBe(30);
  });
});
