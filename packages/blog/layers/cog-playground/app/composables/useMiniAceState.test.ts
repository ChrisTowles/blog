// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { useMiniAceState } from './useMiniAceState';

const NOW = new Date('2024-03-15T12:00:00Z'); // Friday, March 15, 2024 — spring

describe('useMiniAceState — time orientation local scoring', () => {
  it('grades full match 5/5', () => {
    const s = useMiniAceState();
    s.submitTimeOrientation({ dayOfWeek: 'Friday', date: '2024-03-15', season: 'spring' }, NOW);
    expect(s.timeOrientation.value?.total).toBe(5);
  });

  it('accepts "autumn" interchangeably with "fall"', () => {
    const fallDate = new Date('2024-10-15T12:00:00Z'); // October -> fall
    const s = useMiniAceState();
    s.submitTimeOrientation(
      { dayOfWeek: 'Tuesday', date: '2024-10-15', season: 'autumn' },
      fallDate,
    );
    expect(s.timeOrientation.value?.fields.season.correct).toBe(true);
  });

  it('grades wrong year alone as 4/5', () => {
    const s = useMiniAceState();
    s.submitTimeOrientation({ dayOfWeek: 'Friday', date: '2023-03-15', season: 'spring' }, NOW);
    expect(s.timeOrientation.value?.total).toBe(4);
    expect(s.timeOrientation.value?.fields.year.correct).toBe(false);
  });

  it('case-insensitive day-of-week and season', () => {
    const s = useMiniAceState();
    s.submitTimeOrientation({ dayOfWeek: '  FRIDAY  ', date: '2024-03-15', season: 'SPRING' }, NOW);
    expect(s.timeOrientation.value?.fields.dayOfWeek.correct).toBe(true);
    expect(s.timeOrientation.value?.fields.season.correct).toBe(true);
  });

  it('blank answers grade to 0', () => {
    const s = useMiniAceState();
    s.submitTimeOrientation({ dayOfWeek: '', date: '', season: '' }, NOW);
    expect(s.timeOrientation.value?.total).toBe(0);
  });
});
