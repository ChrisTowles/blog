/**
 * Unit tests for skill configuration
 */
import { describe, it, expect } from 'vitest';
import { resolve } from 'path';
import { homedir } from 'os';
import {
  defaultSkillConfig,
  getSkillSources,
  getProjectRoot,
  type SkillConfig,
} from './skill-config';

describe('skill-config', () => {
  describe('defaultSkillConfig', () => {
    it('should have correct project path', () => {
      expect(defaultSkillConfig.projectPath).toBe('.claude/skills');
    });

    it('should have correct global path', () => {
      const expectedPath = resolve(homedir(), '.claude/skills');
      expect(defaultSkillConfig.globalPath).toBe(expectedPath);
    });

    it('should enable both project and global by default', () => {
      expect(defaultSkillConfig.enabled.project).toBe(true);
      expect(defaultSkillConfig.enabled.global).toBe(true);
    });
  });

  describe('getSkillSources', () => {
    it('should return both sources when both enabled', () => {
      const config: SkillConfig = {
        projectPath: '.claude/skills',
        globalPath: '~/.claude/skills',
        enabled: { project: true, global: true },
      };

      const sources = getSkillSources(config);

      expect(sources).toContain('project');
      expect(sources).toContain('user');
      expect(sources.length).toBe(2);
    });

    it('should return only project when global disabled', () => {
      const config: SkillConfig = {
        projectPath: '.claude/skills',
        globalPath: '~/.claude/skills',
        enabled: { project: true, global: false },
      };

      const sources = getSkillSources(config);

      expect(sources).toContain('project');
      expect(sources).not.toContain('user');
      expect(sources.length).toBe(1);
    });

    it('should return only user when project disabled', () => {
      const config: SkillConfig = {
        projectPath: '.claude/skills',
        globalPath: '~/.claude/skills',
        enabled: { project: false, global: true },
      };

      const sources = getSkillSources(config);

      expect(sources).not.toContain('project');
      expect(sources).toContain('user');
      expect(sources.length).toBe(1);
    });

    it('should return empty array when both disabled', () => {
      const config: SkillConfig = {
        projectPath: '.claude/skills',
        globalPath: '~/.claude/skills',
        enabled: { project: false, global: false },
      };

      const sources = getSkillSources(config);

      expect(sources.length).toBe(0);
    });

    it('should use default config when none provided', () => {
      const sources = getSkillSources();

      expect(sources).toContain('project');
      expect(sources).toContain('user');
    });
  });

  describe('getProjectRoot', () => {
    it('should return process.cwd()', () => {
      const root = getProjectRoot();
      expect(root).toBe(process.cwd());
    });
  });
});
