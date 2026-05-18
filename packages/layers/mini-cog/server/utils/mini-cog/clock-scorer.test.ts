import { describe, it, expect, vi } from 'vitest';
import { stripDataUrl, parseClock, scoreClock, type VisionAnthropicLike } from './clock-scorer';

function stubClient(...replies: string[]): VisionAnthropicLike {
  const create = vi.fn();
  for (const r of replies) {
    create.mockResolvedValueOnce({ content: [{ type: 'text', text: r }] });
  }
  return { messages: { create } };
}

function criteria(all: boolean) {
  return {
    closedCircle: all,
    allNumbersPresent: all,
    numbersCorrectlyPositioned: all,
    twoHands: all,
    hourHandAt11: all,
    minuteHandAt2: all,
  };
}

describe('stripDataUrl', () => {
  it('strips a data URL prefix', () => {
    expect(stripDataUrl('data:image/png;base64,AAAA')).toBe('AAAA');
  });
  it('leaves a bare base64 string untouched', () => {
    expect(stripDataUrl('AAAA')).toBe('AAAA');
  });
});

describe('parseClock', () => {
  it('derives normal=true / score=2 when all criteria pass', () => {
    const raw = JSON.stringify({
      criteria: criteria(true),
      normal: false, // model disagrees with itself; we override
      score: 0,
      explanation: 'looks good',
    });
    const r = parseClock(raw);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.normal).toBe(true);
      expect(r.data.score).toBe(2);
    }
  });

  it('derives score=0 when any criterion fails', () => {
    const c = criteria(true);
    c.twoHands = false;
    const r = parseClock(JSON.stringify({ criteria: c, normal: true, score: 2, explanation: 'x' }));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.normal).toBe(false);
      expect(r.data.score).toBe(0);
    }
  });

  it('rejects malformed JSON', () => {
    expect(parseClock('not json').ok).toBe(false);
  });
});

describe('scoreClock', () => {
  const bigImage = 'A'.repeat(200);

  it('rejects an empty / tiny canvas without calling the model', async () => {
    const client = stubClient();
    const res = await scoreClock('data:image/png;base64,AA', client);
    expect(res.ok).toBe(false);
  });

  it('returns a parsed score from the client', async () => {
    const raw = JSON.stringify({
      criteria: criteria(true),
      normal: true,
      score: 2,
      explanation: 'a clear clock',
    });
    const res = await scoreClock(bigImage, stubClient(raw));
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.score).toBe(2);
  });

  it('retries then fails when the model never returns valid JSON', async () => {
    const res = await scoreClock(bigImage, stubClient('nope', 'nope again'));
    expect(res.ok).toBe(false);
  });
});
