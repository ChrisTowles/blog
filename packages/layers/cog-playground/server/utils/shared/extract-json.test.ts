import { describe, expect, it } from 'vitest';
import { extractJson } from './extract-json';

describe('extractJson', () => {
  it('pulls a balanced object out of surrounding prose', () => {
    expect(extractJson('here you go {"a":{"b":1}} thanks')).toBe('{"a":{"b":1}}');
  });
  it('returns null when there is no object', () => {
    expect(extractJson('no json here')).toBeNull();
  });
});
