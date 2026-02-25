import { describe, it, expect } from 'vitest';
import {
  isApplicationComplete,
  REVIEWERS,
  LOAN_APPLICATION_FIELDS,
  REVIEW_DECISIONS,
} from './loan-types';
import type { LoanApplicationData } from './loan-types';

const completeApplication: LoanApplicationData = {
  fullName: 'John Doe',
  income: 85000,
  employmentType: 'employed',
  employer: 'Acme Corp',
  yearsEmployed: 5,
  creditScoreRange: '740-799',
  monthlyDebt: 1200,
  propertyValue: 350000,
  loanAmount: 280000,
  downPayment: 70000,
  propertyType: 'single-family',
  loanPurpose: 'purchase',
};

describe('isApplicationComplete', () => {
  it('returns false for empty object', () => {
    expect(isApplicationComplete({})).toBe(false);
  });

  it('returns false for partial data (missing 1 field)', () => {
    const { loanPurpose: _, ...partial } = completeApplication;
    expect(isApplicationComplete(partial)).toBe(false);
  });

  it('returns true when all fields present', () => {
    expect(isApplicationComplete(completeApplication)).toBe(true);
  });

  it('returns false when fields have null values', () => {
    const withNulls = {
      ...completeApplication,
      income: null as unknown as number,
    };
    expect(isApplicationComplete(withNulls)).toBe(false);
  });

  it('returns true when fields have 0 or empty string (valid values)', () => {
    const withZeroAndEmpty: LoanApplicationData = {
      ...completeApplication,
      income: 0,
      fullName: '',
    };
    expect(isApplicationComplete(withZeroAndEmpty)).toBe(true);
  });

  it('returns true when extra unrelated fields are present', () => {
    const withExtras = {
      ...completeApplication,
      socialSecurityNumber: '123-45-6789',
      favoriteColor: 'blue',
    };
    expect(isApplicationComplete(withExtras)).toBe(true);
  });
});

describe('const arrays', () => {
  it('REVIEWERS has 3 entries', () => {
    expect(REVIEWERS).toHaveLength(3);
  });

  it('LOAN_APPLICATION_FIELDS has 12 entries', () => {
    expect(LOAN_APPLICATION_FIELDS).toHaveLength(12);
  });

  it('REVIEW_DECISIONS has 3 entries', () => {
    expect(REVIEW_DECISIONS).toHaveLength(3);
  });
});
