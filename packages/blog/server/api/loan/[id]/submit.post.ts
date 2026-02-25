import { z } from 'zod';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { LoanApplicationData, ReviewerName, ReviewDecision, LoanReviewSSEEvent } from '~~/shared/loan-types';
import { REVIEWERS, isApplicationComplete } from '~~/shared/loan-types';

defineRouteMeta({
  openAPI: {
    description: 'Submit loan application for review. Streams sequential approver reviews via SSE.',
    tags: ['loan'],
  },
});

const encoder = new TextEncoder();

function sendReviewSSE(controller: ReadableStreamDefaultController, event: LoanReviewSSEEvent): void {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

const REVIEWER_DISPLAY_NAMES: Record<ReviewerName, string> = {
  'the-bank': 'The Bank — Financial Risk',
  'loan-market': 'Loan Market — Deal Structure',
  'background-checks': 'Background Checks — Fraud Detection',
};

const REVIEWER_SKILL_DIRS: Record<ReviewerName, string> = {
  'the-bank': 'loan-the-bank',
  'loan-market': 'loan-market',
  'background-checks': 'loan-background',
};

function loadApproverPrompt(reviewer: ReviewerName): string {
  const skillDir = REVIEWER_SKILL_DIRS[reviewer];
  const skillPath = join(process.cwd(), '.claude', 'skills', skillDir, 'SKILL.md');

  if (!existsSync(skillPath)) {
    throw new Error(`Skill file not found for reviewer ${reviewer}: ${skillPath}`);
  }

  const content = readFileSync(skillPath, 'utf-8');
  const match = content.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/);
  return match ? match[1]!.trim() : content;
}

function formatApplicationForReview(data: LoanApplicationData): string {
  const monthlyIncome = (data.income || 0) / 12;
  const dti = monthlyIncome > 0 ? (((data.monthlyDebt || 0) / monthlyIncome) * 100).toFixed(1) : 'N/A';
  const ltv = (data.propertyValue || 0) > 0 ? (((data.loanAmount || 0) / (data.propertyValue || 1)) * 100).toFixed(1) : 'N/A';
  const downPct = (data.propertyValue || 0) > 0 ? (((data.downPayment || 0) / (data.propertyValue || 1)) * 100).toFixed(1) : 'N/A';

  return `## Loan Application Data

**Applicant:** ${data.fullName}
**Employment:** ${data.employmentType} at ${data.employer} (${data.yearsEmployed} years)
**Annual Income:** $${(data.income || 0).toLocaleString()}
**Monthly Income:** $${Math.round(monthlyIncome).toLocaleString()}
**Monthly Debt:** $${(data.monthlyDebt || 0).toLocaleString()}
**Credit Score Range:** ${data.creditScoreRange}

**Property Type:** ${data.propertyType}
**Property Value:** $${(data.propertyValue || 0).toLocaleString()}
**Loan Amount:** $${(data.loanAmount || 0).toLocaleString()}
**Down Payment:** $${(data.downPayment || 0).toLocaleString()} (${downPct}%)
**Loan Purpose:** ${data.loanPurpose}

**Calculated Ratios:**
- DTI (Debt-to-Income): ${dti}%
- LTV (Loan-to-Value): ${ltv}%
- Down Payment: ${downPct}%`;
}

interface ApproverResponse {
  decision: ReviewDecision;
  flags: string[];
  analysis: string;
}

function parseApproverResponse(text: string): ApproverResponse {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        decision: parsed.decision || 'flagged',
        flags: Array.isArray(parsed.flags) ? parsed.flags : [],
        analysis: parsed.analysis || text,
      };
    }
  } catch {
    // Fall through
  }
  return { decision: 'flagged', flags: ['Could not parse structured response'], analysis: text };
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
            if (streamEvent.type === 'content_block_delta' && streamEvent.delta.type === 'text_delta') {
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
        if (overallDecision === 'approved') summaryParts.push('All reviewers approved the application.');
        else if (overallDecision === 'denied') summaryParts.push('One or more reviewers denied the application.');
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
