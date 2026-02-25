import { describe, it, expect } from 'vitest';
import { loanChatTools, executeLoanTool } from './loan-tools';
import type { LoanApplicationData } from '~~/shared/loan-types';

describe('loanChatTools', () => {
  it('defines updateApplication and checkCompleteness tools', () => {
    const names = loanChatTools.map((t) => t.name);
    expect(names).toContain('updateApplication');
    expect(names).toContain('checkCompleteness');
  });
});

describe('executeLoanTool', () => {
  describe('checkCompleteness', () => {
    it('returns incomplete when fields are missing', () => {
      const result = executeLoanTool('checkCompleteness', {}, { applicationData: {} });
      expect(result).toMatchObject({ complete: false });
      expect((result.missingFields as string[]).length).toBeGreaterThan(0);
    });

    it('returns complete when all fields present', () => {
      const fullData: LoanApplicationData = {
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
      const result = executeLoanTool('checkCompleteness', {}, { applicationData: fullData });
      expect(result).toMatchObject({ complete: true, missingFields: [] });
    });
  });

  describe('updateApplication', () => {
    it('returns the merged fields', () => {
      const result = executeLoanTool(
        'updateApplication',
        { fields: { fullName: 'Jane Doe', income: 95000 } },
        { applicationData: { fullName: 'Old Name' } },
      );
      expect(result.updated).toEqual({ fullName: 'Jane Doe', income: 95000 });
    });

    it('rejects unknown fields', () => {
      const result = executeLoanTool(
        'updateApplication',
        { fields: { fullName: 'Jane', socialSecurityNumber: '123' } },
        { applicationData: {} },
      );
      expect(result.updated).toEqual({ fullName: 'Jane' });
      expect(result.rejected).toContain('socialSecurityNumber');
    });
  });
});
