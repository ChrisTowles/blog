import { describe, expect, it } from 'vitest';
import { MINI_ACE_ADDRESSES, pickMiniAceAddress } from './address-bank';

describe('pickMiniAceAddress', () => {
  it('returns the first address at rng=0', () => {
    expect(pickMiniAceAddress(() => 0)).toBe(MINI_ACE_ADDRESSES[0]);
  });

  it('every address has all seven fields populated', () => {
    for (const a of MINI_ACE_ADDRESSES) {
      expect(a.name.length).toBeGreaterThan(0);
      expect(a.houseNumber).toMatch(/^\d+$/);
      expect(a.street.length).toBeGreaterThan(0);
      expect(a.area.length).toBeGreaterThan(0);
      expect(a.city.length).toBeGreaterThan(0);
      expect(a.state.length).toBeGreaterThan(0);
      expect(a.country.length).toBeGreaterThan(0);
    }
  });
});
