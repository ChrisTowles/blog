import { describe, expect, it, vi } from 'vitest';
import { type FluencyAnthropicLike, parseFluency, scoreFluency } from './fluency-scorer';

function stubClient(...replies: string[]): FluencyAnthropicLike {
  const create = vi.fn();
  for (const r of replies) {
    create.mockResolvedValueOnce({ content: [{ type: 'text', text: r }] });
  }
  return { messages: { create } };
}

describe('parseFluency', () => {
  it('dedupes validAnimals and bands at 3 when >= 15', () => {
    const fifteen = [
      'cat',
      'dog',
      'cow',
      'pig',
      'horse',
      'sheep',
      'goat',
      'duck',
      'goose',
      'chicken',
      'rabbit',
      'hamster',
      'fox',
      'wolf',
      'bear',
      'cat', // duplicate at boundary — must be dropped here too
    ];
    const r = parseFluency(JSON.stringify({ validAnimals: fifteen, rejected: [], duplicates: [] }));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.uniqueCount).toBe(15);
      expect(r.data.bandedScore).toBe(3);
    }
  });

  it('bands at 2 for 10-14 unique', () => {
    const ten = ['cat', 'dog', 'cow', 'pig', 'horse', 'sheep', 'goat', 'duck', 'goose', 'chicken'];
    const r = parseFluency(JSON.stringify({ validAnimals: ten, rejected: [], duplicates: [] }));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.bandedScore).toBe(2);
  });

  it('bands at 1 for 5-9 unique', () => {
    const five = ['cat', 'dog', 'cow', 'pig', 'horse'];
    const r = parseFluency(JSON.stringify({ validAnimals: five, rejected: [], duplicates: [] }));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.bandedScore).toBe(1);
  });

  it('bands at 0 for fewer than 5 unique', () => {
    const r = parseFluency(
      JSON.stringify({ validAnimals: ['cat', 'dog'], rejected: [], duplicates: [] }),
    );
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.bandedScore).toBe(0);
  });

  it('rejects non-JSON', () => {
    expect(parseFluency('sorry').ok).toBe(false);
  });
});

describe('scoreFluency', () => {
  it('returns banded result from the client', async () => {
    const good = JSON.stringify({
      validAnimals: ['cat', 'dog', 'cow', 'horse', 'pig'],
      rejected: [],
      duplicates: [],
    });
    const res = await scoreFluency('cat dog cow horse pig', stubClient(good));
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.bandedScore).toBe(1);
  });

  it('does not throw when the model request errors', async () => {
    const create = vi.fn().mockRejectedValue(new Error('500 transient'));
    const res = await scoreFluency('cat dog', { messages: { create } });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toContain('model request failed');
    expect(create).toHaveBeenCalledTimes(2);
  });

  it('recovers on the second attempt when the first throws', async () => {
    const good = JSON.stringify({
      validAnimals: ['cat', 'dog'],
      rejected: [{ word: 'dragon', reason: 'mythical' }],
      duplicates: [],
    });
    const create = vi
      .fn()
      .mockRejectedValueOnce(new Error('transient'))
      .mockResolvedValueOnce({ content: [{ type: 'text', text: good }] });
    const res = await scoreFluency('cat dog dragon', { messages: { create } });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.validAnimals).toEqual(['cat', 'dog']);
  });
});
