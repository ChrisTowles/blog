import type { ReviewerName, ReviewDecision, LoanReviewSSEEvent } from '~~/shared/loan-types';

export interface ReviewState {
  reviewer: ReviewerName;
  displayName: string;
  status: 'pending' | 'streaming' | 'complete';
  text: string;
  decision?: ReviewDecision;
  flags: string[];
}

interface UseLoanReviewOptions {
  applicationId: string;
  onError?: (error: Error) => void;
  onComplete?: (overallDecision: ReviewDecision) => void;
}

export function useLoanReview(options: UseLoanReviewOptions) {
  const reviews = ref<ReviewState[]>([
    {
      reviewer: 'the-bank',
      displayName: 'The Bank — Financial Risk',
      status: 'pending',
      text: '',
      flags: [],
    },
    {
      reviewer: 'loan-market',
      displayName: 'Loan Market — Deal Structure',
      status: 'pending',
      text: '',
      flags: [],
    },
    {
      reviewer: 'background-checks',
      displayName: 'Background Checks — Fraud Detection',
      status: 'pending',
      text: '',
      flags: [],
    },
  ]);
  const status = ref<'idle' | 'reviewing' | 'complete'>('idle');
  const overallDecision = ref<ReviewDecision | null>(null);
  const summary = ref('');

  async function startReview(): Promise<void> {
    status.value = 'reviewing';

    try {
      const response = await fetch(`/api/loan/${options.applicationId}/submit`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

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
            const event: LoanReviewSSEEvent = JSON.parse(line.slice(6));
            handleEvent(event);
          } catch (e) {
            console.error('Error parsing review SSE:', e, line);
          }
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      options.onError?.(error);
    }
  }

  function handleEvent(event: LoanReviewSSEEvent): void {
    if (event.type === 'review_start') {
      const review = reviews.value.find((r) => r.reviewer === event.reviewer);
      if (review) {
        review.status = 'streaming';
        review.displayName = event.displayName;
      }
    } else if (event.type === 'review_text') {
      const review = reviews.value.find((r) => r.reviewer === event.reviewer);
      if (review) review.text += event.text;
    } else if (event.type === 'review_complete') {
      const review = reviews.value.find((r) => r.reviewer === event.reviewer);
      if (review) {
        review.status = 'complete';
        review.decision = event.decision;
        review.flags = event.flags;
        review.text = event.analysis;
      }
    } else if (event.type === 'all_reviews_complete') {
      status.value = 'complete';
      overallDecision.value = event.overallDecision;
      summary.value = event.summary;
      options.onComplete?.(event.overallDecision);
    } else if (event.type === 'error') {
      options.onError?.(new Error(event.error));
    }
  }

  return {
    reviews: computed(() => reviews.value),
    status: computed(() => status.value),
    overallDecision: computed(() => overallDecision.value),
    summary: computed(() => summary.value),
    startReview,
  };
}
