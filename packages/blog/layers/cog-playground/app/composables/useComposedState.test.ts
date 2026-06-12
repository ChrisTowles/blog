// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { useComposedState } from './useComposedState';

describe('useComposedState — orientation local scoring', () => {
  it('grades full match 4/4 (date YYYY-MM-DD + place)', () => {
    const s = useComposedState();
    s.startIntro();
    s.beginAssessment(['River', 'Honest', 'Tunnel', 'Eagle', 'Garden']);
    s.toOrientation();
    s.submitOrientation(
      { date: '2024-03-15', place: 'San Francisco' },
      new Date('2024-03-15T12:00:00Z'),
    );
    expect(s.orientation.value?.total).toBe(4);
    expect(s.orientation.value?.fields.day.correct).toBe(true);
    expect(s.orientation.value?.fields.month.correct).toBe(true);
    expect(s.orientation.value?.fields.year.correct).toBe(true);
    expect(s.orientation.value?.fields.place.provided).toBe(true);
    expect(s.phase.value).toBe('fluency');
  });

  it('grades wrong year alone as 3/4', () => {
    const s = useComposedState();
    s.startIntro();
    s.beginAssessment(['River', 'Honest', 'Tunnel', 'Eagle', 'Garden']);
    s.toOrientation();
    s.submitOrientation(
      { date: '2023-03-15', place: 'Anywhere' },
      new Date('2024-03-15T12:00:00Z'),
    );
    expect(s.orientation.value?.total).toBe(3);
    expect(s.orientation.value?.fields.year.correct).toBe(false);
  });

  it('grades empty place as missing', () => {
    const s = useComposedState();
    s.startIntro();
    s.beginAssessment(['River', 'Honest', 'Tunnel', 'Eagle', 'Garden']);
    s.toOrientation();
    s.submitOrientation({ date: '2024-03-15', place: '  ' }, new Date('2024-03-15T12:00:00Z'));
    expect(s.orientation.value?.fields.place.provided).toBe(false);
    expect(s.orientation.value?.total).toBe(3);
  });

  it('grades unparseable date as 0 across day/month/year', () => {
    const s = useComposedState();
    s.startIntro();
    s.beginAssessment(['River', 'Honest', 'Tunnel', 'Eagle', 'Garden']);
    s.toOrientation();
    s.submitOrientation({ date: 'not-a-date', place: 'Somewhere' }, new Date('2024-03-15'));
    expect(s.orientation.value?.fields.day.correct).toBe(false);
    expect(s.orientation.value?.fields.month.correct).toBe(false);
    expect(s.orientation.value?.fields.year.correct).toBe(false);
    expect(s.orientation.value?.fields.place.provided).toBe(true);
    expect(s.orientation.value?.total).toBe(1);
  });
});

describe('useComposedState — digit span local scoring', () => {
  it('caps at 3 with forward=8 backward=6', () => {
    const s = useComposedState();
    s.submitDigitSpan(8, 6);
    expect(s.digitSpan.value?.total).toBe(3);
  });

  it('forward=4 alone scores 1', () => {
    const s = useComposedState();
    s.submitDigitSpan(4, 0);
    expect(s.digitSpan.value?.total).toBe(1);
  });

  it('forward=6 backward=4 scores 3', () => {
    const s = useComposedState();
    s.submitDigitSpan(6, 4);
    expect(s.digitSpan.value?.total).toBe(3);
  });

  it('forward=3 backward=0 scores 0', () => {
    const s = useComposedState();
    s.submitDigitSpan(3, 0);
    expect(s.digitSpan.value?.total).toBe(0);
  });
});
