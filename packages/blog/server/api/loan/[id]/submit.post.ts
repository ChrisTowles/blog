import { z } from 'zod';
import type { LoanApplicationData, ReviewDecision, LoanReviewSSEEvent } from '~~/shared/loan-types';
import { REVIEWERS, isApplicationComplete } from '~~/shared/loan-types';
import {
  REVIEWER_DISPLAY_NAMES,
  loadApproverPrompt,
  formatApplicationForReview,
  parseApproverResponse,
} from '~~/server/utils/ai/loan-review-utils';

defineRouteMeta({
  openAPI: {
    description: 'Submit loan application for review. Streams sequential approver reviews via SSE.',
    tags: ['loan'],
  },
});

const encoder = new TextEncoder();

function sendReviewSSE(
  controller: ReadableStreamDefaultController,
  event: LoanReviewSSEEvent,
): void {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userId = session.user?.id || session.id;

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);

  const db = useDrizzle();
  const application = await db.query.loanApplications.findFirst({
    where: (app, { eq: e }) => and(e(app.id, id), e(app.userId, userId)),
  });

  if (!application) {
    throw createError({ statusCode: 404, statusMessage: 'Application not found' });
  }

  const appData = application.applicationData as LoanApplicationData;
  if (!isApplicationComplete(appData)) {
    throw createError({ statusCode: 400, statusMessage: 'Application is incomplete' });
  }

  await db
    .update(tables.loanApplications)
    .set({ status: 'reviewing' })
    .where(eq(tables.loanApplications.id, id));

  const formattedApplication = formatApplicationForReview(appData);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const client = getAnthropicClient();
        const config = useRuntimeConfig();
        const decisions: ReviewDecision[] = [];

        for (const reviewer of REVIEWERS) {
          sendReviewSSE(controller, {
            type: 'review_start',
            reviewer,
            displayName: REVIEWER_DISPLAY_NAMES[reviewer],
          });

          const systemPrompt = loadApproverPrompt(reviewer);
          let fullText = '';

          const streamResponse = client.messages.stream({
            model: config.public.model as string,
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{ role: 'user', content: formattedApplication }],
          });

          for await (const streamEvent of streamResponse) {
            if (
              streamEvent.type === 'content_block_delta' &&
              streamEvent.delta.type === 'text_delta'
            ) {
              fullText += streamEvent.delta.text;
              sendReviewSSE(controller, {
                type: 'review_text',
                reviewer,
                text: streamEvent.delta.text,
              });
            }
          }

          const parsed = parseApproverResponse(fullText);
          decisions.push(parsed.decision);

          await db.insert(tables.loanReviews).values({
            applicationId: id,
            reviewer,
            decision: parsed.decision,
            analysis: parsed.analysis,
            flags: parsed.flags,
          });

          sendReviewSSE(controller, {
            type: 'review_complete',
            reviewer,
            decision: parsed.decision,
            flags: parsed.flags,
          });
        }

        let overallDecision: ReviewDecision = 'approved';
        if (decisions.includes('denied')) overallDecision = 'denied';
        else if (decisions.includes('flagged')) overallDecision = 'flagged';

        const statusMap: Record<ReviewDecision, 'approved' | 'denied' | 'flagged'> = {
          approved: 'approved',
          denied: 'denied',
          flagged: 'flagged',
        };
        await db
          .update(tables.loanApplications)
          .set({ status: statusMap[overallDecision] })
          .where(eq(tables.loanApplications.id, id));

        const summaryParts: string[] = [];
        if (overallDecision === 'approved')
          summaryParts.push('All reviewers approved the application.');
        else if (overallDecision === 'denied')
          summaryParts.push('One or more reviewers denied the application.');
        else summaryParts.push('One or more reviewers flagged issues requiring further review.');

        sendReviewSSE(controller, {
          type: 'all_reviews_complete',
          overallDecision,
          summary: summaryParts.join(' '),
        });

        controller.close();
      } catch (error) {
        console.error('Review stream error:', error);
        sendReviewSSE(controller, {
          type: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        controller.close();
      }
    },
  });

  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');
  return stream;
});
