import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import {
  formatApplicationForReview,
  parseApproverResponse,
  loadApproverPrompt,
} from './loan-review-utils';
import type { LoanApplicationData } from '~~/shared/loan-types';

const fullApplication: LoanApplicationData = {
  fullName: 'Jane Doe',
  income: 120000,
  employmentType: 'employed',
  employer: 'TechCorp',
  yearsEmployed: 8,
  creditScoreRange: '740-799',
  monthlyDebt: 2000,
  propertyValue: 500000,
  loanAmount: 400000,
  downPayment: 100000,
  propertyType: 'single-family',
  loanPurpose: 'purchase',
};

describe('formatApplicationForReview', () => {
  it('formats full application with correct DTI/LTV/down payment %', () => {
    const result = formatApplicationForReview(fullApplication);
    // DTI = (2000 / (120000/12)) * 100 = (2000 / 10000) * 100 = 20.0%
    expect(result).toContain('DTI (Debt-to-Income): 20.0%');
    // LTV = (400000 / 500000) * 100 = 80.0%
    expect(result).toContain('LTV (Loan-to-Value): 80.0%');
    // Down Payment = (100000 / 500000) * 100 = 20.0%
    expect(result).toContain('Down Payment: 20.0%');
  });

  it('handles zero income (DTI = N/A)', () => {
    const result = formatApplicationForReview({ ...fullApplication, income: 0 });
    expect(result).toContain('DTI (Debt-to-Income): N/A%');
  });

  it('handles zero property value (LTV = N/A)', () => {
    const result = formatApplicationForReview({ ...fullApplication, propertyValue: 0 });
    expect(result).toContain('LTV (Loan-to-Value): N/A%');
    expect(result).toContain('Down Payment: N/A%');
  });

  it('output includes applicant name, employer, credit score range', () => {
    const result = formatApplicationForReview(fullApplication);
    expect(result).toContain('Jane Doe');
    expect(result).toContain('TechCorp');
    expect(result).toContain('740-799');
  });
});

describe('parseApproverResponse', () => {
  it('parses valid JSON with decision/flags/analysis', () => {
    const text = JSON.stringify({
      decision: 'approved',
      flags: ['low risk'],
      analysis: 'Looks good.',
    });
    const result = parseApproverResponse(text);
    expect(result.decision).toBe('approved');
    expect(result.flags).toEqual(['low risk']);
    expect(result.analysis).toBe('Looks good.');
  });

  it('extracts JSON embedded in surrounding text', () => {
    const text =
      'Here is my analysis:\n\n{"decision":"denied","flags":["high DTI"],"analysis":"DTI too high."}\n\nThank you.';
    const result = parseApproverResponse(text);
    expect(result.decision).toBe('denied');
    expect(result.flags).toEqual(['high DTI']);
  });

  it('returns flagged for non-JSON text', () => {
    const text = 'This is just plain text with no JSON.';
    const result = parseApproverResponse(text);
    expect(result.decision).toBe('flagged');
    expect(result.flags).toEqual(['Could not parse structured response']);
    expect(result.analysis).toBe(text);
  });

  it('defaults to flagged when decision field is missing', () => {
    const text = JSON.stringify({ flags: ['issue'], analysis: 'Missing decision.' });
    const result = parseApproverResponse(text);
    expect(result.decision).toBe('flagged');
  });

  it('defaults to empty array when flags is not an array', () => {
    const text = JSON.stringify({ decision: 'approved', flags: 'not-an-array', analysis: 'ok' });
    const result = parseApproverResponse(text);
    expect(result.flags).toEqual([]);
  });
});

describe('loadApproverPrompt', () => {
  // process.cwd() in vitest is packages/blog/ but skills live at repo root
  const repoRoot = join(process.cwd(), '..', '..');
  let cwdSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(repoRoot);
  });

  afterEach(() => {
    cwdSpy.mockRestore();
  });

  it('loads the-bank skill and returns content after frontmatter', () => {
    const result = loadApproverPrompt('the-bank');
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toMatch(/^---/);
  });

  it('loads loan-market skill and returns content after frontmatter', () => {
    const result = loadApproverPrompt('loan-market');
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toMatch(/^---/);
  });

  it('loads background-checks skill and returns content after frontmatter', () => {
    const result = loadApproverPrompt('background-checks');
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toMatch(/^---/);
  });

  it('throws for nonexistent reviewer', () => {
    expect(() => loadApproverPrompt('nonexistent' as never)).toThrow();
  });
});
