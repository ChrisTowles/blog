/**
 * Nitro startup plugin — initialize OpenTelemetry NodeSDK once at server boot.
 *
 * Replaces the prior log-only OTLP drain with a full SDK pipeline: traces from
 * auto-instrumentations (HTTP, pg, undici, dns…) plus manual spans wrapped at
 * the Anthropic/RAG/tool seams in later units.
 *
 * Wide-events philosophy: every span IS the wide event. Logs become span
 * events on the active span via the evlog bridge (see
 * `server/utils/observability/evlog-bridge.ts`).
 *
 * Cloud Run lifecycle: SIGTERM gives ~10s before SIGKILL. We hook
 * `sdk.shutdown()` (not `forceFlush()`) so the BatchSpanProcessor's last
 * batch lands in New Relic before the instance dies.
 *
 * Hard requirement: throws on missing OTEL_EXPORTER_OTLP_ENDPOINT — silent
 * skip masks misconfig (memory: feedback_otlp_required.md).
 */

import { defineNitroPlugin } from 'nitropack/runtime';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes, type Resource } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_INSTANCE_ID,
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_NAMESPACE,
} from '@opentelemetry/semantic-conventions';
import {
  AlwaysOnSampler,
  BatchSpanProcessor,
  ParentBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { bridgeDrainHandler } from '../utils/observability/evlog-bridge';

const ATTR_DEPLOYMENT_ENVIRONMENT_NAME = 'deployment.environment.name';

interface OtelEnv {
  OTEL_EXPORTER_OTLP_ENDPOINT?: string;
  OTEL_SERVICE_NAME?: string;
  K_REVISION?: string;
  OTEL_DEPLOYMENT_ENV?: string;
  NODE_ENV?: string;
}

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
  env: OtelEnv,
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

let sdk: NodeSDK | null = null;

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.prerender) return;
  if (sdk) return;

  const attrs = resolveOtelResourceAttrs(process.env as OtelEnv);

  if (process.env.OTEL_LOG_LEVEL?.toUpperCase() === 'DEBUG') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  }

  const traceExporter = new OTLPTraceExporter();

  sdk = new NodeSDK({
    resource: buildOtelResource(attrs),
    traceExporter,
    spanProcessors: [new BatchSpanProcessor(traceExporter)],
    sampler: new ParentBasedSampler({ root: new AlwaysOnSampler() }),
    instrumentations: [
      getNodeAutoInstrumentations({
        // fs spams every file read during SSR — useless noise.
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  });

  sdk.start();
  console.info(
    `[otel] NodeSDK started → ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT} ` +
      `(service.name=${attrs.serviceName}, instance=${attrs.serviceInstanceId}, env=${attrs.deploymentEnv})`,
  );

  // Route evlog wide events into the active span as events. Replaces the
  // prior log-only OTLP drain — see U3 in the plan.
  nitroApp.hooks.hook('evlog:drain', bridgeDrainHandler);

  const shutdown = async () => {
    if (!sdk) return;
    const current = sdk;
    sdk = null;
    try {
      await current.shutdown();
    } catch (err) {
      console.error('[otel] shutdown failed', err);
    }
  };

  nitroApp.hooks.hookOnce('close', shutdown);
  process.once('SIGTERM', () => {
    void shutdown();
  });
});
