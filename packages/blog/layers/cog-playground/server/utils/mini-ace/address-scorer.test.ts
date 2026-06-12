import { describe, expect, it, vi } from 'vitest';
import type { MiniAceAddress } from '../../../../../shared/cog-playground/mini-ace-types';
import {
  type MiniAceAddressAnthropicLike,
  parseMiniAceAddress,
  scoreMiniAceAddress,
} from './address-scorer';

const TARGET: MiniAceAddress = {
  name: 'Patrick Holloway',
  houseNumber: '47',
  street: 'Hawthorn Lane',
  area: 'Edgewater',
  city: 'Portland',
  state: 'Oregon',
  country: 'United States',
};

function stubClient(...replies: string[]): MiniAceAddressAnthropicLike {
  const create = vi.fn();
  for (const r of replies) {
    create.mockResolvedValueOnce({ content: [{ type: 'text', text: r }] });
  }
  return { messages: { create } };
}

function fullScores(recalled: boolean) {
  return [
    { field: 'name', recalled, evidence: '' },
    { field: 'houseNumber', recalled, evidence: '' },
    { field: 'street', recalled, evidence: '' },
    { field: 'area', recalled, evidence: '' },
    { field: 'city', recalled, evidence: '' },
    { field: 'state', recalled, evidence: '' },
    { field: 'country', recalled, evidence: '' },
  ];
}

describe('parseMiniAceAddress', () => {
  it('accepts a well-formed 7-field response and re-derives total', () => {
    const raw = JSON.stringify({ scores: fullScores(true), totalRecalled: 0 /* lied */ });
    const r = parseMiniAceAddress(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.totalRecalled).toBe(7);
  });

  it('fails when fewer than 7 unique fields are scored', () => {
    const raw = JSON.stringify({
      scores: [
        { field: 'name', recalled: true, evidence: '' },
        { field: 'city', recalled: true, evidence: '' },
      ],
      totalRecalled: 2,
    });
    expect(parseMiniAceAddress(raw).ok).toBe(false);
  });

  it('dedupes duplicate field entries from the model', () => {
    const raw = JSON.stringify({
      scores: [
        ...fullScores(true),
        { field: 'name', recalled: false, evidence: 'second attempt' }, // dup, dropped
      ],
      totalRecalled: 7,
    });
    const r = parseMiniAceAddress(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.scores).toHaveLength(7);
  });

  it('rejects unknown field names', () => {
    const raw = JSON.stringify({
      scores: [
        ...fullScores(true).slice(0, 6),
        { field: 'zip', recalled: true, evidence: '' }, // not in enum
      ],
      totalRecalled: 7,
    });
    expect(parseMiniAceAddress(raw).ok).toBe(false);
  });
});

describe('scoreMiniAceAddress', () => {
  it('returns scored data', async () => {
    const good = JSON.stringify({ scores: fullScores(true), totalRecalled: 7 });
    const res = await scoreMiniAceAddress(
      { target: TARGET, spokenText: 'patrick holloway 47 hawthorn ...' },
      stubClient(good),
    );
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.totalRecalled).toBe(7);
  });

  it('does not throw when the model errors', async () => {
    const create = vi.fn().mockRejectedValue(new Error('transient'));
    const res = await scoreMiniAceAddress(
      { target: TARGET, spokenText: 'x' },
      { messages: { create } },
    );
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toContain('model request failed');
  });
});
