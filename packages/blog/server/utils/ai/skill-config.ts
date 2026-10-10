import { resolve } from 'path';
import { homedir } from 'os';
import { z } from 'zod';

/**
 * Skill source configuration
 */
export interface SkillConfig {
  /** Project skills directory (relative to cwd) */
  projectPath: string;
  /** Global user skills directory */
  globalPath: string;
  /** Which sources are enabled */
  enabled: {
    project: boolean;
    global: boolean;
  };
}

/**
 * Default skill configuration
 */
export const defaultSkillConfig: SkillConfig = {
  projectPath: '.claude/skills',
  globalPath: resolve(homedir(), '.claude/skills'),
  enabled: {
    project: true,
    global: true,
  },
};

/**
 * Get skill sources for Agent SDK settingSources option
 * Returns array of sources based on configuration
 */
export function getSkillSources(config: SkillConfig = defaultSkillConfig): ('project' | 'user')[] {
  const mapping: Array<{ enabled: boolean; source: 'project' | 'user' }> = [
    { enabled: config.enabled.project, source: 'project' },
    { enabled: config.enabled.global, source: 'user' },
  ];

  return mapping.flatMap((m) => (m.enabled ? [m.source] : []));
}

const optionalPath = z.string().catch('');

/**
 * Get runtime skill configuration from environment/runtime config
 */
export function getSkillConfigFromEnv(): SkillConfig {
  const config = useRuntimeConfig();

  return {
    projectPath: optionalPath.parse(config.skillProjectPath) || defaultSkillConfig.projectPath,
    globalPath: optionalPath.parse(config.skillGlobalPath) || defaultSkillConfig.globalPath,
    enabled: {
      project: config.skillProjectEnabled !== false,
      global: config.skillGlobalEnabled !== false,
    },
  };
}

/**
 * Get the project root directory for Agent SDK cwd
 * This is needed for skill discovery
 */
export function getProjectRoot(): string {
  // In Nuxt, we can use process.cwd() or a configured path
  // The project root should contain .claude/skills/
  return process.cwd();
}
