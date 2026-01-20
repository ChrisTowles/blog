import { resolve } from 'path';
import { homedir } from 'os';

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
  const sources: ('project' | 'user')[] = [];

  if (config.enabled.project) {
    sources.push('project');
  }

  if (config.enabled.global) {
    sources.push('user');
  }

  return sources;
}

/**
 * Get runtime skill configuration from environment/runtime config
 */
export function getSkillConfigFromEnv(): SkillConfig {
  const config = useRuntimeConfig();

  return {
    projectPath: (config.skillProjectPath as string) || defaultSkillConfig.projectPath,
    globalPath: (config.skillGlobalPath as string) || defaultSkillConfig.globalPath,
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
