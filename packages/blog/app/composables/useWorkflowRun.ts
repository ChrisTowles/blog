import type { NodeRunStatus } from '~~/shared/workflow-types';

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
      ({ runId } = await $fetch<{ runId: string }>(`/api/workflows/${workflowId}/run`, {
        method: 'POST',
        body: { input },
      }));
    } catch (err) {
      runError.value = err instanceof Error ? err.message : 'Failed to start run';
      isRunning.value = false;
      return;
    }

    currentRunId.value = runId;

    const es = new EventSource(`/api/workflows/${workflowId}/runs/${runId}/stream`);
    eventSource.value = es;

    es.addEventListener('node:start', (e) => {
      const { nodeId } = JSON.parse(e.data) as { nodeId: string };
      const next = new Map(runStatus.value);
      next.set(nodeId, { status: 'running' });
      runStatus.value = next;
    });

    es.addEventListener('node:complete', (e) => {
      const data = JSON.parse(e.data) as {
        nodeId: string;
        output: Record<string, unknown>;
        tokensIn: number;
        tokensOut: number;
        latencyMs: number;
      };
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
      const { nodeId, error } = JSON.parse(e.data) as { nodeId: string; error: string };
      const next = new Map(runStatus.value);
      next.set(nodeId, { status: 'failed', error });
      runStatus.value = next;
    });

    es.addEventListener('run:complete', (e) => {
      finalOutput.value = (
        JSON.parse(e.data) as { output: Record<string, Record<string, unknown>> }
      ).output;
      isRunning.value = false;
      closeEventSource();
    });

    es.addEventListener('run:error', (e) => {
      runError.value = (JSON.parse(e.data) as { error: string }).error;
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
