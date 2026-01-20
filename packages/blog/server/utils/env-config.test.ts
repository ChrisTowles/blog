import { describe, it, expect } from 'vitest';
import { envSchema, maskValue, getMaskedConfig } from './env-config';

describe('envSchema', () => {
  const validEnv = {
    DATABASE_URL: 'postgres://localhost:5432/test',
    NUXT_SESSION_PASSWORD: 'a'.repeat(32),
    ANTHROPIC_API_KEY: 'sk-ant-test-key',
    BRAINTRUST_API_KEY: 'sk-braintrust-test-key',
    BRAINTRUST_PROJECT_NAME: 'blog-towles-test',
    NUXT_OAUTH_GITHUB_CLIENT_ID: 'github-client-id',
    NUXT_OAUTH_GITHUB_CLIENT_SECRET: 'github-secret',
    AWS_ACCESS_KEY_ID: 'AKIAIOSFODNN7EXAMPLE',
    AWS_SECRET_ACCESS_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  };

  it('parses valid env', () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
  });

  it('applies default build metadata', () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.GIT_SHA).toBe('dev');
      expect(result.data.BUILD_TAG).toBe('local');
    }
  });

  it('fails on missing required field', () => {
    const { DATABASE_URL: _, ...envWithoutDb } = validEnv;
    const result = envSchema.safeParse(envWithoutDb);
    expect(result.success).toBe(false);
  });

  it('fails on short session password', () => {
    const result = envSchema.safeParse({
      ...validEnv,
      NUXT_SESSION_PASSWORD: 'too-short',
    });
    expect(result.success).toBe(false);
  });
});

describe('maskValue', () => {
  it('masks sensitive keys with first 2 and last 4 chars', () => {
    expect(maskValue('DATABASE_URL', 'postgres://user:pass@host/db')).toBe('po***t/db');
    expect(maskValue('NUXT_SESSION_PASSWORD', 'supersecretpassword123')).toBe('su***d123');
    expect(maskValue('ANTHROPIC_API_KEY', 'sk-ant-api03-xxxxx')).toBe('sk***xxxx');
    expect(maskValue('NUXT_OAUTH_GITHUB_CLIENT_SECRET', 'ghsecret123')).toBe('gh***t123');
    expect(maskValue('AWS_SECRET_ACCESS_KEY', 'wJalrXUtnFEMI')).toBe('wJ***FEMI');
  });

  it('returns *** for short sensitive values', () => {
    expect(maskValue('DATABASE_URL', 'short')).toBe('***');
    expect(maskValue('ANTHROPIC_API_KEY', 'abc')).toBe('***');
  });

  it('does not mask non-sensitive keys', () => {
    expect(maskValue('AWS_REGION', 'us-east-1')).toBe('us-east-1');
    expect(maskValue('NUXT_OAUTH_GITHUB_CLIENT_ID', 'my-client-id')).toBe('my-client-id');
  });
});

describe('getMaskedConfig', () => {
  it('returns sorted masked config', () => {
    const config = {
      GIT_SHA: 'abc1234',
      BUILD_TAG: '2025-01-15-12-30',
      DATABASE_URL: 'postgres://localhost:5432/test',
      NUXT_SESSION_PASSWORD: 'a'.repeat(32),
      ANTHROPIC_API_KEY: 'sk-ant-test-key',
      BRAINTRUST_API_KEY: 'sk-braintrust-test-key',
      BRAINTRUST_PROJECT_NAME: 'blog-towles',
      NUXT_OAUTH_GITHUB_CLIENT_ID: 'github-client-id',
      NUXT_OAUTH_GITHUB_CLIENT_SECRET: 'github-secret',
      AWS_REGION: 'us-east-1',
      AWS_ACCESS_KEY_ID: 'AKIAIOSFODNN7EXAMPLE',
      AWS_SECRET_ACCESS_KEY: 'wJalrXUtnFEMI/K7MDENG',
    };

    const masked = getMaskedConfig(config);
    const keys = Object.keys(masked);

    // Verify sorted alphabetically
    expect(keys).toEqual([...keys].sort());

    // Verify sensitive values are masked
    expect(masked.DATABASE_URL).toBe('po***test');
    expect(masked.ANTHROPIC_API_KEY).toBe('sk***-key');

    // Verify non-sensitive values are not masked
    expect(masked.AWS_REGION).toBe('us-east-1');
    expect(masked.NUXT_OAUTH_GITHUB_CLIENT_ID).toBe('github-client-id');
    expect(masked.GIT_SHA).toBe('abc1234');
    expect(masked.BUILD_TAG).toBe('2025-01-15-12-30');
  });
});
