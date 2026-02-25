import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { LoanApplicationData, ReviewerName, ReviewDecision } from '~~/shared/loan-types';

export const REVIEWER_SKILL_DIRS: Record<ReviewerName, string> = {
  'the-bank': 'loan-the-bank',
  'loan-market': 'loan-market',
  'background-checks': 'loan-background',
};

export interface ApproverResponse {
  decision: ReviewDecision;
  flags: string[];
  analysis: string;
}

export function loadApproverPrompt(reviewer: ReviewerName): string {
  const skillDir = REVIEWER_SKILL_DIRS[reviewer];
  // Skills live at repo root (.claude/skills/), not in packages/blog/
  const cwd = process.cwd();
  const base = cwd.endsWith('packages/blog') ? join(cwd, '..', '..') : cwd;
  const skillPath = join(base, '.claude', 'skills', skillDir, 'SKILL.md');

  if (!existsSync(skillPath)) {
    throw new Error(`Skill file not found for reviewer ${reviewer}: ${skillPath}`);
  }

  const content = readFileSync(skillPath, 'utf-8');
  const match = content.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/);
  return match ? match[1]!.trim() : content;
}

export function formatApplicationForReview(data: LoanApplicationData): string {
  const monthlyIncome = (data.income || 0) / 12;
  const dti =
    monthlyIncome > 0 ? (((data.monthlyDebt || 0) / monthlyIncome) * 100).toFixed(1) : 'N/A';
  const ltv =
    (data.propertyValue || 0) > 0
      ? (((data.loanAmount || 0) / (data.propertyValue || 1)) * 100).toFixed(1)
      : 'N/A';
  const downPct =
    (data.propertyValue || 0) > 0
      ? (((data.downPayment || 0) / (data.propertyValue || 1)) * 100).toFixed(1)
      : 'N/A';

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

export function parseApproverResponse(text: string): ApproverResponse {
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
