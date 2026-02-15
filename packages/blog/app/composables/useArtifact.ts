import type {
  ArtifactStatus,
  ArtifactFile,
  ArtifactSSEEvent,
  ArtifactExecuteRequest,
  CodeExecutionResult,
} from '~~/shared/artifact-types';

interface UseArtifactOptions {
  /** Initial code to display in the editor */
  initialCode?: string;
  /** Language for the code (default: python) */
  language?: string;
  /** Skills to load into the container */
  skills?: ArtifactExecuteRequest['skills'];
  onError?: (error: string) => void;
}

export function useArtifact(options: UseArtifactOptions = {}) {
  const status = ref<ArtifactStatus>('idle');
  const code = ref(options.initialCode || '');
  const language = ref(options.language || 'python');
  const explanation = ref('');
  const executedCode = ref('');
  const execution = ref<CodeExecutionResult | null>(null);
  const files = ref<ArtifactFile[]>([]);
  const error = ref<string | null>(null);
  const containerId = ref<string | null>(null);
  const abortController = ref<AbortController | null>(null);

  /** Clear expired containers and append a retry hint to the message */
  function handleContainerError(msg: string): string {
    if (/container|expired|not found/i.test(msg) && containerId.value) {
      containerId.value = null;
      return `${msg} (container cleared — try again)`;
    }
    return msg;
  }

  /**
   * Execute code or a prompt in the artifact container.
   * If `prompt` is provided, Claude decides what code to run.
   * If only `code` is set, it runs the code directly.
   */
  async function execute(prompt?: string) {
    if (status.value === 'executing' || status.value === 'streaming') return;

    status.value = 'executing';
    error.value = null;
    explanation.value = '';
    executedCode.value = '';
    execution.value = null;
    files.value = [];
    abortController.value = new AbortController();

    const body: ArtifactExecuteRequest = {
      prompt: prompt || `Execute the following ${language.value} code and show the output.`,
      code: code.value || undefined,
      language: language.value,
      containerId: containerId.value || undefined,
      skills: options.skills,
    };

    try {
      const response = await fetch('/api/artifacts/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: abortController.value.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      status.value = 'streaming';
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;

          try {
            const event: ArtifactSSEEvent = JSON.parse(line.slice(6));
            processEvent(event);
          } catch (e) {
            console.error('Error parsing artifact SSE event:', e, line);
          }
        }
      }

      status.value = 'complete';
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        status.value = 'idle';
        return;
      }
      const msg = handleContainerError(err instanceof Error ? err.message : 'Unknown error');
      error.value = msg;
      status.value = 'error';
      options.onError?.(msg);
    } finally {
      abortController.value = null;
    }
  }

  function processEvent(event: ArtifactSSEEvent) {
    switch (event.type) {
      case 'artifact_text':
        explanation.value += event.text;
        break;
      case 'artifact_code':
        executedCode.value += event.code;
        break;
      case 'artifact_execution_start':
        break;
      case 'artifact_execution_result':
        execution.value = {
          stdout: event.stdout,
          stderr: event.stderr,
          exitCode: event.exitCode,
        };
        break;
      case 'artifact_file':
        files.value = [...files.value, event.file];
        break;
      case 'artifact_container':
        containerId.value = event.containerId;
        break;
      case 'artifact_done':
        status.value = 'complete';
        break;
      case 'artifact_error': {
        const errMsg = handleContainerError(event.error);
        error.value = errMsg;
        status.value = 'error';
        options.onError?.(errMsg);
        break;
      }
    }
  }

  function stop() {
    abortController.value?.abort();
    status.value = 'idle';
  }

  function reset() {
    stop();
    explanation.value = '';
    executedCode.value = '';
    execution.value = null;
    files.value = [];
    error.value = null;
    // Keep containerId for reuse
  }

  return {
    // State
    status: computed(() => status.value),
    code,
    language: computed(() => language.value),
    explanation: computed(() => explanation.value),
    executedCode: computed(() => executedCode.value),
    execution: computed(() => execution.value),
    files: computed(() => files.value),
    error: computed(() => error.value),
    containerId: computed(() => containerId.value),

    // Actions
    execute,
    stop,
    reset,
  };
}
