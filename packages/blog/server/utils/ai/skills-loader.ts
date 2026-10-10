import type Anthropic from '@anthropic-ai/sdk';
import { log } from 'evlog';
import { bundledAssets, type ServerAssets } from '../server-assets';

export interface CustomSkill {
  name: string;
  description: string;
  body: string;
}

let cachedSkills: CustomSkill[] | null = null;

/** @internal test-only cache reset. */
export function __resetSkillsCache(): void {
  cachedSkills = null;
}

/**
 * Load the bundled `.claude/skills/<name>/SKILL.md` files (shipped via `nitro.serverAssets`).
 * Cached per isolate: skills only change on deploy.
 */
export async function loadCustomSkills(
  assets: ServerAssets = bundledAssets,
): Promise<CustomSkill[]> {
  if (cachedSkills) return cachedSkills;

  const keys = (await assets.listKeys('skills')).filter((key) => key.endsWith(':SKILL.md'));
  const skills: CustomSkill[] = [];

  for (const key of keys) {
    try {
      const content = await assets.readText('skills', key);
      const parsed = content ? parseFrontmatter(content) : null;

      if (parsed?.name && parsed.description) skills.push(parsed);
    } catch {
      log.warn('skills-loader', `Failed to parse ${key}`);
    }
  }

  cachedSkills = skills;

  return cachedSkills;
}

/**
 * Format loaded skills as container skills config for the Anthropic API.
 * Returns pre-built Anthropic skills only. Custom skills from SKILL.md files
 * are included in the system prompt via getSkillsSystemPrompt() instead,
 * since the Skills API requires custom skills to be uploaded and referenced
 * by generated skill_id — inline instructions are not supported.
 */
export function getSkillsForAPI(): Anthropic.Beta.Messages.BetaSkillParams[] {
  return [
    { type: 'anthropic', skill_id: 'pdf', version: 'latest' },
    { type: 'anthropic', skill_id: 'pptx', version: 'latest' },
    { type: 'anthropic', skill_id: 'xlsx', version: 'latest' },
    { type: 'anthropic', skill_id: 'docx', version: 'latest' },
  ];
}

/**
 * Get a system prompt snippet describing available skills.
 */
export async function getSkillsSystemPrompt(): Promise<string> {
  const lines = [
    '**CAPABILITIES:**',
    'You have code execution in a sandboxed container. You can:',
    '- Generate PDF, PPTX, XLSX, DOCX documents',
    '- Execute Python code for data analysis and visualization',
    '- Create charts, diagrams, and data exports',
  ];

  const skills = await loadCustomSkills();

  if (skills.length > 0) {
    lines.push('');
    lines.push('Custom skills available:');

    for (const s of skills) {
      lines.push(`- ${s.name}: ${s.description}`);
    }
  }

  return lines.join('\n');
}

/** Simple YAML frontmatter parser for SKILL.md files */
function parseFrontmatter(content: string): CustomSkill {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!match) return { name: '', description: '', body: content };

  const frontmatter = match[1]!;
  const body = match[2]!.trim();

  let name = '';
  let description = '';

  for (const line of frontmatter.split('\n')) {
    const nameMatch = line.match(/^name:\s*(.+)$/);

    if (nameMatch) name = nameMatch[1]!.trim();

    const descMatch = line.match(/^description:\s*(.+)$/);

    if (descMatch) description = descMatch[1]!.trim();
  }

  return { name, description, body };
}
