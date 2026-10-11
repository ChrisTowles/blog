/**
 * Initialize OpenTelemetry NodeSDK once at server boot.
 *
 * Cloud Run lifecycle: SIGTERM gives ~10s before SIGKILL. Nitro's `close`
 * hook fires from its own SIGTERM handler and awaits, so we hook there
 * (not directly on SIGTERM) — `sdk.shutdown()` (not `forceFlush()`) flushes
 * the BatchSpanProcessor's last batch.
 *
 * Hard requirement: throws on missing OTEL_EXPORTER_OTLP_ENDPOINT — silent
 * skip masks misconfig (memory: feedback_otlp_required.md).
 */

import { defineNitroPlugin } from 'nitropack/runtime';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
  AlwaysOnSampler,
  BatchSpanProcessor,
  ParentBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { bridgeDrainHandler } from '../utils/observability/evlog-bridge';
import { buildOtelResource, resolveOtelResourceAttrs } from '../utils/observability/otel-resource';

let sdk: NodeSDK | null = null;

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.prerender) return;

  if (sdk) return;

  const attrs = resolveOtelResourceAttrs(process.env);

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

  nitroApp.hooks.hookOnce('close', async () => {
    if (!sdk) return;
    const current = sdk;
    sdk = null;

    try {
      await current.shutdown();
    } catch (err) {
      console.error('[otel] shutdown failed', err);
    }
  });
});
