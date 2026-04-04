import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { log } from 'evlog';
import { getProjectRoot } from './skill-config';

export interface CustomSkill {
  name: string;
  description: string;
  body: string;
}

let cachedSkills: CustomSkill[] | null = null;

/**
 * Load custom SKILL.md files from .claude/skills/ directories.
 * Results are cached at the module level (skills only change on deploy).
 */
export function loadCustomSkills(): CustomSkill[] {
  if (cachedSkills) return cachedSkills;

  const skillsDir = join(getProjectRoot(), '.claude', 'skills');

  if (!existsSync(skillsDir)) {
    cachedSkills = [];
    return cachedSkills;
  }

  const entries = readdirSync(skillsDir, { withFileTypes: true });
  const skills: CustomSkill[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillFile = join(skillsDir, entry.name, 'SKILL.md');
    if (!existsSync(skillFile)) continue;

    try {
      const parsed = parseFrontmatter(readFileSync(skillFile, 'utf-8'));
      if (parsed.name && parsed.description) {
        skills.push(parsed);
      }
    } catch {
      log.warn('skills-loader', `Failed to parse ${skillFile}`);
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
export function getSkillsForAPI(): Array<{
  type: string;
  skill_id: string;
  version?: string;
}> {
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
export function getSkillsSystemPrompt(): string {
  const lines = [
    '**CAPABILITIES:**',
    'You have code execution in a sandboxed container. You can:',
    '- Generate PDF, PPTX, XLSX, DOCX documents',
    '- Execute Python code for data analysis and visualization',
    '- Create charts, diagrams, and data exports',
  ];

  const skills = loadCustomSkills();
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
