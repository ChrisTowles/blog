import { describe, it, expect, vi } from 'vitest';
import { extractJson, parseRecall, scoreRecall, type RecallAnthropicLike } from './recall-scorer';

const TARGETS = ['Banana', 'Sunrise', 'Chair'];

function stubClient(...replies: string[]): RecallAnthropicLike {
  const create = vi.fn();
  for (const r of replies) {
    create.mockResolvedValueOnce({ content: [{ type: 'text', text: r }] });
  }
  return { messages: { create } };
}

describe('extractJson', () => {
  it('pulls a balanced object out of surrounding prose', () => {
    expect(extractJson('here you go {"a":{"b":1}} thanks')).toBe('{"a":{"b":1}}');
  });
  it('returns null when there is no object', () => {
    expect(extractJson('no json here')).toBeNull();
  });
});

describe('parseRecall', () => {
  it('accepts a well-formed response and re-derives the count', () => {
    const raw = JSON.stringify({
      scores: [
        { word: 'Banana', recalled: true, evidence: 'said banana' },
        { word: 'Sunrise', recalled: true, evidence: 'said sunrise' },
        { word: 'Chair', recalled: false, evidence: 'not said' },
      ],
      totalRecalled: 3, // model lied; we recompute to 2
    });
    const r = parseRecall(raw, TARGETS);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.totalRecalled).toBe(2);
  });

  it('drops invented words and fails if not every target is scored', () => {
    const raw = JSON.stringify({
      scores: [
        { word: 'Banana', recalled: true, evidence: 'x' },
        { word: 'Apple', recalled: true, evidence: 'invented' },
      ],
      totalRecalled: 2,
    });
    const r = parseRecall(raw, TARGETS);
    expect(r.ok).toBe(false);
  });

  it('rejects non-JSON', () => {
    expect(parseRecall('sorry I cannot', TARGETS).ok).toBe(false);
  });
});

describe('scoreRecall', () => {
  it('returns scored data from the client', async () => {
    const good = JSON.stringify({
      scores: [
        { word: 'Banana', recalled: true, evidence: 'banana' },
        { word: 'Sunrise', recalled: true, evidence: 'sunrise' },
        { word: 'Chair', recalled: true, evidence: 'chair' },
      ],
      totalRecalled: 3,
    });
    const res = await scoreRecall(
      { targetWords: TARGETS, spokenText: 'banana sunrise chair' },
      stubClient(good),
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(3);
  });

  it('retries once on a bad first reply', async () => {
    const good = JSON.stringify({
      scores: [
        { word: 'Banana', recalled: false, evidence: 'no' },
        { word: 'Sunrise', recalled: false, evidence: 'no' },
        { word: 'Chair', recalled: false, evidence: 'no' },
      ],
      totalRecalled: 0,
    });
    const res = await scoreRecall(
      { targetWords: TARGETS, spokenText: 'apple orange' },
      stubClient('garbage', good),
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(0);
  });

  it('fails after retries are exhausted', async () => {
    const res = await scoreRecall(
      { targetWords: TARGETS, spokenText: 'x' },
      stubClient('nope', 'still nope'),
    );
    expect(res.ok).toBe(false);
  });

  it('does not throw when the model request errors, and surfaces the reason', async () => {
    const create = vi
      .fn()
      .mockRejectedValue(new Error('400 You have reached your specified API usage limits.'));
    const res = await scoreRecall(
      { targetWords: TARGETS, spokenText: 'x' },
      { messages: { create } },
    );
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toContain('model request failed');
    expect(create).toHaveBeenCalledTimes(2);
  });

  it('recovers on the second attempt when the first request throws', async () => {
    const good = JSON.stringify({
      scores: [
        { word: 'Banana', recalled: true, evidence: 'banana' },
        { word: 'Sunrise', recalled: true, evidence: 'sunrise' },
        { word: 'Chair', recalled: true, evidence: 'chair' },
      ],
      totalRecalled: 3,
    });
    const create = vi
      .fn()
      .mockRejectedValueOnce(new Error('transient network error'))
      .mockResolvedValueOnce({ content: [{ type: 'text', text: good }] });
    const res = await scoreRecall(
      { targetWords: TARGETS, spokenText: 'banana sunrise chair' },
      { messages: { create } },
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(3);
  });
});
