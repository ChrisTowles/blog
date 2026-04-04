import { log } from 'evlog';
import { z } from 'zod';
import type { NodeRunStatus } from '../../shared/workflow-types';
import {
  startRunResponseSchema,
  sseNodeStartSchema,
  sseNodeCompleteSchema,
  sseNodeErrorSchema,
  sseRunCompleteSchema,
  sseRunErrorSchema,
} from '../../shared/workflow-schemas';

function safeParse<T>(schema: z.ZodType<T>, raw: string, eventName: string): T | null {
  try {
    const json = JSON.parse(raw);
    const result = schema.safeParse(json);
    if (!result.success) {
      log.warn('workflow-run', `Invalid ${eventName} SSE payload: ${String(result.error)}`);
      return null;
    }
    return result.data;
  } catch {
    log.warn('workflow-run', `Failed to parse ${eventName} SSE data`);
    return null;
  }
}

export function useWorkflowRun(workflowId: string) {
  const runStatus = ref(new Map<string, NodeRunStatus>());
  const isRunning = ref(false);
  const finalOutput = ref<Record<string, Record<string, unknown>> | null>(null);
  const runError = ref<string | null>(null);
  const currentRunId = ref<string | null>(null);
  const eventSource = ref<EventSource | null>(null);

  function closeEventSource() {
    eventSource.value?.close();
    eventSource.value = null;
  }

  async function startRun(input?: Record<string, unknown>) {
    closeEventSource();
    runStatus.value = new Map();
    finalOutput.value = null;
    runError.value = null;
    isRunning.value = true;

    let runId: string;
    try {
      const raw = await $fetch(`/api/workflows/${workflowId}/run`, {
        method: 'POST',
        body: { input },
      });
      const parsed = startRunResponseSchema.parse(raw);
      runId = parsed.runId;
    } catch (err) {
      runError.value = err instanceof Error ? err.message : 'Failed to start run';
      isRunning.value = false;
      return;
    }

    currentRunId.value = runId;

    const es = new EventSource(`/api/workflows/${workflowId}/runs/${runId}/stream`);
    eventSource.value = es;

    es.addEventListener('node:start', (e) => {
      const data = safeParse(sseNodeStartSchema, e.data, 'node:start');
      if (!data) return;
      const next = new Map(runStatus.value);
      next.set(data.nodeId, { status: 'running' });
      runStatus.value = next;
    });

    es.addEventListener('node:complete', (e) => {
      const data = safeParse(sseNodeCompleteSchema, e.data, 'node:complete');
      if (!data) return;
      const next = new Map(runStatus.value);
      next.set(data.nodeId, {
        status: 'completed',
        output: data.output,
        tokensIn: data.tokensIn,
        tokensOut: data.tokensOut,
        latencyMs: data.latencyMs,
      });
      runStatus.value = next;
    });

    es.addEventListener('node:error', (e) => {
      const data = safeParse(sseNodeErrorSchema, e.data, 'node:error');
      if (!data) return;
      const next = new Map(runStatus.value);
      next.set(data.nodeId, { status: 'failed', error: data.error });
      runStatus.value = next;
    });

    es.addEventListener('run:complete', (e) => {
      const data = safeParse(sseRunCompleteSchema, e.data, 'run:complete');
      if (!data) return;
      finalOutput.value = data.output;
      isRunning.value = false;
      closeEventSource();
    });

    es.addEventListener('run:error', (e) => {
      const data = safeParse(sseRunErrorSchema, e.data, 'run:error');
      if (!data) return;
      runError.value = data.error;
      isRunning.value = false;
      closeEventSource();
    });

    es.onerror = () => {
      isRunning.value = false;
      closeEventSource();
    };
  }

  onUnmounted(closeEventSource);

  return { startRun, runStatus, isRunning, finalOutput, runError, currentRunId };
}
