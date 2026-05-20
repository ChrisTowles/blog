import { describe, expect, it, vi } from 'vitest';
import {
  type ComposedRecallAnthropicLike,
  parseComposedRecall,
  scoreComposedRecall,
} from './recall-scorer';

const TARGETS = ['River', 'Honest', 'Tunnel', 'Eagle', 'Garden'];

function stubClient(...replies: string[]): ComposedRecallAnthropicLike {
  const create = vi.fn();
  for (const r of replies) {
    create.mockResolvedValueOnce({ content: [{ type: 'text', text: r }] });
  }
  return { messages: { create } };
}

describe('parseComposedRecall', () => {
  it('accepts a well-formed response and re-derives the count', () => {
    const raw = JSON.stringify({
      scores: [
        { word: 'River', recalled: true, evidence: 'said river' },
        { word: 'Honest', recalled: true, evidence: 'said honest' },
        { word: 'Tunnel', recalled: false, evidence: 'not said' },
        { word: 'Eagle', recalled: true, evidence: 'said eagle' },
        { word: 'Garden', recalled: false, evidence: 'not said' },
      ],
      totalRecalled: 5, // model lied; we recompute to 3
    });
    const r = parseComposedRecall(raw, TARGETS);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.totalRecalled).toBe(3);
  });

  it('drops invented words and fails if not every target is scored', () => {
    const raw = JSON.stringify({
      scores: [
        { word: 'River', recalled: true, evidence: 'x' },
        { word: 'Apple', recalled: true, evidence: 'invented' },
      ],
      totalRecalled: 2,
    });
    expect(parseComposedRecall(raw, TARGETS).ok).toBe(false);
  });

  it('rejects non-JSON', () => {
    expect(parseComposedRecall('sorry I cannot', TARGETS).ok).toBe(false);
  });
});

describe('scoreComposedRecall', () => {
  it('returns scored data from the client', async () => {
    const good = JSON.stringify({
      scores: TARGETS.map((w) => ({ word: w, recalled: true, evidence: w.toLowerCase() })),
      totalRecalled: 5,
    });
    const res = await scoreComposedRecall(
      { targetWords: TARGETS, spokenText: TARGETS.join(' ').toLowerCase() },
      stubClient(good),
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(5);
  });

  it('retries once on a bad first reply', async () => {
    const good = JSON.stringify({
      scores: TARGETS.map((w) => ({ word: w, recalled: false, evidence: 'no' })),
      totalRecalled: 0,
    });
    const res = await scoreComposedRecall(
      { targetWords: TARGETS, spokenText: 'apple orange' },
      stubClient('garbage', good),
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(0);
  });

  it('does not throw when the model request errors', async () => {
    const create = vi.fn().mockRejectedValue(new Error('400 spend cap'));
    const res = await scoreComposedRecall(
      { targetWords: TARGETS, spokenText: 'x' },
      { messages: { create } },
    );
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toContain('model request failed');
    expect(create).toHaveBeenCalledTimes(2);
  });

  it('recovers on the second attempt when the first request throws', async () => {
    const good = JSON.stringify({
      scores: TARGETS.map((w) => ({ word: w, recalled: true, evidence: w.toLowerCase() })),
      totalRecalled: 5,
    });
    const create = vi
      .fn()
      .mockRejectedValueOnce(new Error('transient network error'))
      .mockResolvedValueOnce({ content: [{ type: 'text', text: good }] });
    const res = await scoreComposedRecall(
      { targetWords: TARGETS, spokenText: TARGETS.join(' ').toLowerCase() },
      { messages: { create } },
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(5);
  });
});
