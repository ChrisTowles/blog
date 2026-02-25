/**
 * Shared types for home loan workflow
 * Used by both client and server
 */

// --- Const arrays + derived types ---

export const EMPLOYMENT_TYPES = ['employed', 'self-employed', 'retired', 'unemployed'] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const CREDIT_SCORE_RANGES = ['300-579', '580-669', '670-739', '740-799', '800-850'] as const;
export type CreditScoreRange = (typeof CREDIT_SCORE_RANGES)[number];

export const PROPERTY_TYPES = ['single-family', 'condo', 'townhouse', 'multi-family'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const LOAN_PURPOSES = ['purchase', 'refinance'] as const;
export type LoanPurpose = (typeof LOAN_PURPOSES)[number];

// --- Loan application data ---

export interface LoanApplicationData {
  fullName?: string;
  income?: number;
  employmentType?: EmploymentType;
  employer?: string;
  yearsEmployed?: number;
  creditScoreRange?: CreditScoreRange;
  monthlyDebt?: number;
  propertyValue?: number;
  loanAmount?: number;
  downPayment?: number;
  propertyType?: PropertyType;
  loanPurpose?: LoanPurpose;
}

export const LOAN_APPLICATION_FIELDS: (keyof LoanApplicationData)[] = [
  'fullName',
  'income',
  'employmentType',
  'employer',
  'yearsEmployed',
  'creditScoreRange',
  'monthlyDebt',
  'propertyValue',
  'loanAmount',
  'downPayment',
  'propertyType',
  'loanPurpose',
];

export function isApplicationComplete(data: LoanApplicationData): boolean {
  return LOAN_APPLICATION_FIELDS.every(
    (field) => data[field] !== undefined && data[field] !== null,
  );
}

// --- Loan status ---

export const LOAN_STATUSES = ['intake', 'reviewing', 'approved', 'denied', 'flagged'] as const;
export type LoanStatus = (typeof LOAN_STATUSES)[number];

// --- Reviewers ---

export const REVIEWERS = ['the-bank', 'loan-market', 'background-checks'] as const;
export type ReviewerName = (typeof REVIEWERS)[number];

// --- Review decisions ---

export const REVIEW_DECISIONS = ['approved', 'denied', 'flagged'] as const;
export type ReviewDecision = (typeof REVIEW_DECISIONS)[number];

// --- SSE event types for review phase ---

export interface LoanReviewStartEvent {
  type: 'review_start';
  reviewer: ReviewerName;
  displayName: string;
}

export interface LoanReviewTextEvent {
  type: 'review_text';
  reviewer: ReviewerName;
  text: string;
}

export interface LoanReviewCompleteEvent {
  type: 'review_complete';
  reviewer: ReviewerName;
  decision: ReviewDecision;
  flags: string[];
}

export interface LoanAllReviewsCompleteEvent {
  type: 'all_reviews_complete';
  overallDecision: ReviewDecision;
  summary: string;
}

export interface LoanReviewErrorEvent {
  type: 'error';
  error: string;
}

export type LoanReviewSSEEvent =
  | LoanReviewStartEvent
  | LoanReviewTextEvent
  | LoanReviewCompleteEvent
  | LoanAllReviewsCompleteEvent
  | LoanReviewErrorEvent;
