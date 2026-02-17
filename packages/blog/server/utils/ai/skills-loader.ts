import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
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

  const skills: CustomSkill[] = [];
  const skillsDir = join(getProjectRoot(), '.claude', 'skills');

  if (!existsSync(skillsDir)) {
    cachedSkills = skills;
    return skills;
  }

  const entries = readdirSync(skillsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillFile = join(skillsDir, entry.name, 'SKILL.md');
    if (!existsSync(skillFile)) continue;

    try {
      const content = readFileSync(skillFile, 'utf-8');
      const parsed = parseFrontmatter(content);
      if (parsed.name && parsed.description) {
        skills.push({
          name: parsed.name,
          description: parsed.description,
          body: parsed.body,
        });
      }
    } catch (e) {
      console.warn(`[skills-loader] Failed to parse ${skillFile}:`, e);
    }
  }

  cachedSkills = skills;
  return skills;
}

/**
 * Format loaded skills as container skills config for the Anthropic API.
 * Returns pre-built Anthropic skills + custom skills from SKILL.md files.
 */
export function getSkillsForAPI(): Array<{
  type: string;
  skill_id: string;
  version?: string;
  instructions?: string;
}> {
  // Pre-built Anthropic document generation skills
  const prebuiltSkills = [
    { type: 'anthropic', skill_id: 'create-pdf', version: 'latest' },
    { type: 'anthropic', skill_id: 'create-pptx', version: 'latest' },
    { type: 'anthropic', skill_id: 'create-xlsx', version: 'latest' },
    { type: 'anthropic', skill_id: 'create-docx', version: 'latest' },
  ];

  const customSkills = loadCustomSkills().map((skill) => ({
    type: 'custom' as const,
    skill_id: skill.name,
    instructions: skill.body,
  }));

  return [...prebuiltSkills, ...customSkills];
}

/**
 * Get a system prompt snippet describing available skills.
 */
export function getSkillsSystemPrompt(): string {
  const skills = loadCustomSkills();
  const skillList = skills.map((s) => `- ${s.name}: ${s.description}`).join('\n');

  return `
**CAPABILITIES:**
You have code execution in a sandboxed container. You can:
- Generate PDF, PPTX, XLSX, DOCX documents
- Execute Python code for data analysis and visualization
- Create charts, diagrams, and data exports

${skillList ? `Custom skills available:\n${skillList}` : ''}`.trim();
}

/** Simple YAML frontmatter parser for SKILL.md files */
function parseFrontmatter(content: string): {
  name: string;
  description: string;
  body: string;
} {
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
