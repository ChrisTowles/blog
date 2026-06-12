import { describe, expect, it, vi } from 'vitest';
import {
  type MiniAceRegistrationAnthropicLike,
  parseMiniAceRegistration,
  scoreMiniAceRegistration,
} from './registration-scorer';

const TARGETS = ['Compass', 'Lemon', 'Pillow'];

function stubClient(...replies: string[]): MiniAceRegistrationAnthropicLike {
  const create = vi.fn();
  for (const r of replies) {
    create.mockResolvedValueOnce({ content: [{ type: 'text', text: r }] });
  }
  return { messages: { create } };
}

describe('parseMiniAceRegistration', () => {
  it('accepts a well-formed 3-word response', () => {
    const raw = JSON.stringify({
      scores: TARGETS.map((w) => ({ word: w, recalled: true, evidence: w.toLowerCase() })),
      totalRecalled: 3,
    });
    const r = parseMiniAceRegistration(raw, TARGETS);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.totalRecalled).toBe(3);
  });

  it('fails when not every target is scored', () => {
    const raw = JSON.stringify({
      scores: [{ word: 'Compass', recalled: true, evidence: 'x' }],
      totalRecalled: 1,
    });
    expect(parseMiniAceRegistration(raw, TARGETS).ok).toBe(false);
  });
});

describe('scoreMiniAceRegistration', () => {
  it('returns scored data from the client', async () => {
    const good = JSON.stringify({
      scores: TARGETS.map((w) => ({ word: w, recalled: true, evidence: w.toLowerCase() })),
      totalRecalled: 3,
    });
    const res = await scoreMiniAceRegistration(
      { targetWords: TARGETS, spokenText: 'compass lemon pillow' },
      stubClient(good),
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(3);
  });

  it('does not throw when the model errors', async () => {
    const create = vi.fn().mockRejectedValue(new Error('400 spend cap'));
    const res = await scoreMiniAceRegistration(
      { targetWords: TARGETS, spokenText: 'x' },
      { messages: { create } },
    );
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toContain('model request failed');
  });
});
