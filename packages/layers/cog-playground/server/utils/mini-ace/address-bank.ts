/**
 * Fictional 7-element addresses for the Mini-ACE-inspired address-recall
 * task. NOT the canonical ACE address (e.g. "Harry Barnes, 73 Orchard
 * Close, Kingsbridge, Devon"); these are our own composed addresses
 * that nobody has memorized from a published instrument.
 *
 * Each element is graded independently against the user's recall after
 * a delay (fluency + clock fall between present and recall).
 */
import type { MiniAceAddress } from '../../../../../blog/shared/cog-playground/mini-ace-types';

export const MINI_ACE_ADDRESSES: readonly MiniAceAddress[] = [
  {
    name: 'Patrick Holloway',
    houseNumber: '47',
    street: 'Hawthorn Lane',
    area: 'Edgewater',
    city: 'Portland',
    state: 'Oregon',
    country: 'United States',
  },
  {
    name: 'Margaret Sinclair',
    houseNumber: '82',
    street: 'Birchwood Drive',
    area: 'Riverbend',
    city: 'Charleston',
    state: 'South Carolina',
    country: 'United States',
  },
  {
    name: 'Daniel Pemberton',
    houseNumber: '15',
    street: 'Olive Grove Road',
    area: 'Westvale',
    city: 'Boise',
    state: 'Idaho',
    country: 'United States',
  },
  {
    name: 'Eleanor Whitfield',
    houseNumber: '64',
    street: 'Cedar Hollow Way',
    area: 'Northgate',
    city: 'Asheville',
    state: 'North Carolina',
    country: 'United States',
  },
] as const;

const FALLBACK: MiniAceAddress = MINI_ACE_ADDRESSES[0]!;

export function pickMiniAceAddress(rng: () => number = Math.random): MiniAceAddress {
  const idx = Math.floor(rng() * MINI_ACE_ADDRESSES.length);
  return MINI_ACE_ADDRESSES[idx] ?? FALLBACK;
}
