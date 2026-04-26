/**
 * Unit tests for the OTel resource resolver.
 *
 * Drives the pure logic (`resolveOtelResourceAttrs`, `buildOtelResource`)
 * directly — the Nitro plugin is a thin adapter around it. Mirrors the
 * mcp-rate-limit test style.
 */

import { describe, expect, it, vi } from 'vitest';
import {
  ATTR_SERVICE_INSTANCE_ID,
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_NAMESPACE,
} from '@opentelemetry/semantic-conventions';

// `defineNitroPlugin` runs at module import time; stub it so the file's
// pure exports can be loaded without standing up a Nitro runtime.
vi.mock('nitropack/runtime', () => ({ defineNitroPlugin: () => undefined }));

const { buildOtelResource, resolveOtelResourceAttrs } = await import('./00-otel-sdk');

describe('resolveOtelResourceAttrs', () => {
  it('returns service name from OTEL_SERVICE_NAME and instance from K_REVISION', () => {
    const attrs = resolveOtelResourceAttrs({
      OTEL_EXPORTER_OTLP_ENDPOINT: 'https://otlp.nr-data.net',
      OTEL_SERVICE_NAME: 'blog-staging',
      K_REVISION: 'blog-staging-00042-abc',
      NODE_ENV: 'production',
    });
    expect(attrs).toEqual({
      serviceName: 'blog-staging',
      serviceNamespace: 'towles',
      serviceInstanceId: 'blog-staging-00042-abc',
      deploymentEnv: 'production',
    });
  });

  it('falls back to dev-${pid} when K_REVISION is absent', () => {
    const attrs = resolveOtelResourceAttrs(
      {
        OTEL_EXPORTER_OTLP_ENDPOINT: 'https://otlp.nr-data.net',
        OTEL_SERVICE_NAME: 'blog-local',
      },
      31415,
    );
    expect(attrs.serviceInstanceId).toBe('dev-31415');
  });

  it('defaults service name to blog-local when OTEL_SERVICE_NAME is absent', () => {
    const attrs = resolveOtelResourceAttrs({
      OTEL_EXPORTER_OTLP_ENDPOINT: 'https://otlp.nr-data.net',
    });
    expect(attrs.serviceName).toBe('blog-local');
  });

  it('prefers OTEL_DEPLOYMENT_ENV over NODE_ENV', () => {
    const attrs = resolveOtelResourceAttrs({
      OTEL_EXPORTER_OTLP_ENDPOINT: 'https://otlp.nr-data.net',
      OTEL_DEPLOYMENT_ENV: 'staging',
      NODE_ENV: 'production',
    });
    expect(attrs.deploymentEnv).toBe('staging');
  });

  it('defaults deploymentEnv to development when nothing is set', () => {
    const attrs = resolveOtelResourceAttrs({
      OTEL_EXPORTER_OTLP_ENDPOINT: 'https://otlp.nr-data.net',
    });
    expect(attrs.deploymentEnv).toBe('development');
  });

  it('throws when OTEL_EXPORTER_OTLP_ENDPOINT is missing', () => {
    expect(() => resolveOtelResourceAttrs({})).toThrowError(
      /OTEL_EXPORTER_OTLP_ENDPOINT is required/,
    );
  });

  it('throws when endpoint is empty string', () => {
    expect(() => resolveOtelResourceAttrs({ OTEL_EXPORTER_OTLP_ENDPOINT: '' })).toThrowError(
      /OTEL_EXPORTER_OTLP_ENDPOINT is required/,
    );
  });
});

describe('buildOtelResource', () => {
  it('emits service.name, service.namespace, service.instance.id, deployment.environment.name', () => {
    const resource = buildOtelResource({
      serviceName: 'blog-prod',
      serviceNamespace: 'towles',
      serviceInstanceId: 'blog-prod-00007-x',
      deploymentEnv: 'production',
    });
    const attrs = resource.attributes;
    expect(attrs[ATTR_SERVICE_NAME]).toBe('blog-prod');
    expect(attrs[ATTR_SERVICE_NAMESPACE]).toBe('towles');
    expect(attrs[ATTR_SERVICE_INSTANCE_ID]).toBe('blog-prod-00007-x');
    expect(attrs['deployment.environment.name']).toBe('production');
  });
});
