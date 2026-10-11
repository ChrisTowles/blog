import { resourceFromAttributes, type Resource } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_INSTANCE_ID,
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_NAMESPACE,
} from '@opentelemetry/semantic-conventions';

const ATTR_DEPLOYMENT_ENVIRONMENT_NAME = 'deployment.environment.name';

export interface ResolvedOtelResourceAttrs {
  serviceName: string;
  serviceNamespace: string;
  serviceInstanceId: string;
  deploymentEnv: string;
}

/**
 * Pure resolver for the OTel resource attributes. Exported so the unit test
 * can verify defaults (K_REVISION fallback, env naming) without standing up
 * the SDK. Throws on missing endpoint to match the strict-fail rule.
 */
export function resolveOtelResourceAttrs(
  env: NodeJS.ProcessEnv,
  pid = process.pid,
): ResolvedOtelResourceAttrs {
  if (!env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    throw new Error(
      '[otel] OTEL_EXPORTER_OTLP_ENDPOINT is required. Copy values from ' +
        '.env.example (points at New Relic OTLP) or wire the secret via ' +
        'infra/terraform/environments/<env>.tfvars (new_relic_enabled = true).',
    );
  }

  return {
    serviceName: env.OTEL_SERVICE_NAME ?? 'blog-local',
    serviceNamespace: 'towles',
    serviceInstanceId: env.K_REVISION ?? `dev-${pid}`,
    deploymentEnv: env.OTEL_DEPLOYMENT_ENV ?? env.NODE_ENV ?? 'development',
  };
}

export function buildOtelResource(attrs: ResolvedOtelResourceAttrs): Resource {
  return resourceFromAttributes({
    [ATTR_SERVICE_NAME]: attrs.serviceName,
    [ATTR_SERVICE_NAMESPACE]: attrs.serviceNamespace,
    [ATTR_SERVICE_INSTANCE_ID]: attrs.serviceInstanceId,
    [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: attrs.deploymentEnv,
  });
}
