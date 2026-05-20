// @vitest-environment nuxt
import { describe, it, expect } from 'vitest';
import { effectScope } from 'vue';
import { useMiniCogState } from './useMiniCogState';
import type { WordTriplet } from '../../../../blog/shared/cog-playground/mini-cog-types';

function run<T>(fn: () => T): T {
  const scope = effectScope();
  const result = scope.run(fn)!;
  return result;
}

const TRIPLET = ['Banana', 'Sunrise', 'Chair'] as unknown as WordTriplet;

describe('useMiniCogState', () => {
  it('walks the happy path through to a result', () => {
    run(() => {
      const s = useMiniCogState();
      expect(s.phase.value).toBe('idle');

      s.startIntro();
      expect(s.phase.value).toBe('intro');

      s.beginAssessment(TRIPLET);
      expect(s.phase.value).toBe('presenting_words');
      expect(s.words.value).toEqual(TRIPLET);

      s.toRegistrationCheck();
      expect(s.phase.value).toBe('registration_check');

      s.registrationAttempt();
      s.toClockDrawing();
      expect(s.phase.value).toBe('clock_drawing');

      s.submitClock('data:image/png;base64,AAAA');
      expect(s.phase.value).toBe('delayed_recall');
      expect(s.clockImage.value).toContain('base64');

      s.setScoring(true);
      expect(s.phase.value).toBe('scoring');

      s.setRecall({
        scores: [
          { word: 'Banana', recalled: true, evidence: 'x' },
          { word: 'Sunrise', recalled: true, evidence: 'x' },
          { word: 'Chair', recalled: false, evidence: 'x' },
        ],
        totalRecalled: 2,
      });
      s.setClock({
        criteria: {
          closedCircle: true,
          allNumbersPresent: true,
          numbersCorrectlyPositioned: true,
          twoHands: true,
          hourHandAt11: true,
          minuteHandAt2: true,
        },
        normal: true,
        score: 2,
        explanation: 'ok',
      });
      s.toResult();

      expect(s.phase.value).toBe('result');
      expect(s.result.value?.total).toBe(4);
      expect(s.suggestsFollowUp.value).toBe(false);
    });
  });

  it('flags follow-up when the total is below the threshold', () => {
    run(() => {
      const s = useMiniCogState();
      s.setRecall({ scores: [], totalRecalled: 1 });
      s.setClock({
        criteria: {
          closedCircle: false,
          allNumbersPresent: false,
          numbersCorrectlyPositioned: false,
          twoHands: false,
          hourHandAt11: false,
          minuteHandAt2: false,
        },
        normal: false,
        score: 0,
        explanation: 'blank',
      });
      expect(s.result.value?.total).toBe(1);
      expect(s.suggestsFollowUp.value).toBe(true);
    });
  });

  it('stops registration after the max number of attempts', () => {
    run(() => {
      const s = useMiniCogState();
      s.beginAssessment(TRIPLET);
      expect(s.registrationAttempt().proceed).toBe(false);
      expect(s.registrationAttempt().proceed).toBe(false);
      expect(s.registrationAttempt().proceed).toBe(true);
    });
  });

  it('reset returns to idle and clears state', () => {
    run(() => {
      const s = useMiniCogState();
      s.beginAssessment(TRIPLET);
      s.submitClock('img');
      s.reset();
      expect(s.phase.value).toBe('idle');
      expect(s.words.value).toBeNull();
      expect(s.clockImage.value).toBeNull();
    });
  });
});
