import { beforeEach, describe, expect, it } from 'vitest';
import { join } from 'node:path';
import { createFsAssets } from '../../test-utils/server-assets';
import { __resetSkillsCache, loadCustomSkills } from './skills-loader';

const assets = createFsAssets(join(process.cwd(), '..', '..', '.claude', 'skills'), /SKILL\.md$/);

describe('loadCustomSkills', () => {
  beforeEach(() => {
    __resetSkillsCache();
  });

  it('parses name, description and body from bundled SKILL.md files', async () => {
    const skills = await loadCustomSkills(assets);
    const bank = skills.find((s) => s.name === 'loan-the-bank');

    expect(bank?.description).toBeTruthy();
    expect(bank?.body.length).toBeGreaterThan(0);
  });
});
