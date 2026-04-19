/**
 * Vitest + @vue/test-utils for StarterQuestions.vue.
 *
 * Covers:
 *   - Renders a pill for each curated aviation question.
 *   - Emits `click` with the exact question text on button click.
 *   - Mirror integrity: the compile-time list matches the server's
 *     `AVIATION_STARTER_QUESTIONS` constant (caught at compile time if
 *     contents diverge, enforced as runtime equality here as a belt-and-
 *     suspenders guard).
 */

import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import StarterQuestions from './StarterQuestions.vue';
import { AVIATION_STARTER_QUESTIONS as CLIENT_LIST } from '~/utils/aviation-starter-questions';
import { AVIATION_STARTER_QUESTIONS as SERVER_LIST } from '~~/server/utils/mcp/aviation/aviation-prompt';

describe('StarterQuestions', () => {
  it('renders a button per curated question', async () => {
    const wrapper = await mountSuspended(StarterQuestions);
    const buttons = wrapper.findAll('[data-testid="aviation-starter-question"]');
    expect(buttons.length).toBe(CLIENT_LIST.length);
    const labels = buttons.map((b) => b.text().trim());
    for (const q of CLIENT_LIST) {
      expect(labels).toContain(q);
    }
  });

  it('emits `click` with the exact question text', async () => {
    const wrapper = await mountSuspended(StarterQuestions);
    const first = wrapper.find('[data-testid="aviation-starter-question"]');
    await first.trigger('click');
    const emitted = wrapper.emitted('click');
    expect(emitted).toBeDefined();
    expect(emitted![0]).toEqual([CLIENT_LIST[0]]);
  });

  it('disables all buttons when `disabled` prop is true', async () => {
    const wrapper = await mountSuspended(StarterQuestions, {
      props: { disabled: true },
    });
    const buttons = wrapper.findAll('[data-testid="aviation-starter-question"]');
    for (const b of buttons) {
      expect(b.attributes('disabled')).toBeDefined();
    }
  });

  it('mirrors the server-side starter-question list verbatim', () => {
    // If this ever diverges, update both lists in the same change set.
    expect(CLIENT_LIST).toEqual(SERVER_LIST);
  });
});
