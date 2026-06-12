/**
 * GET /api/cog-playground/mini-ace/address
 *
 * One randomly-chosen 7-element fictional address for the delayed-recall
 * task. Custom addresses — not the canonical ACE address.
 */
import { pickMiniAceAddress } from '../../../utils/mini-ace/address-bank';

export default defineEventHandler(() => {
  return { address: pickMiniAceAddress() };
});
