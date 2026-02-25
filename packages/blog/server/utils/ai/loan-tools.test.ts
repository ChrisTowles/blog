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

    it('returns correct missingFields list for partially filled app', () => {
      const partial: LoanApplicationData = { fullName: 'Jane', income: 50000 };
      const result = executeLoanTool('checkCompleteness', {}, { applicationData: partial });
      expect(result.complete).toBe(false);
      expect(result.missingFields).toHaveLength(10);
      expect(result.filledFields).toEqual(['fullName', 'income']);
    });

    it('returns exactly 1 missing field when all except one filled', () => {
      const almostComplete: LoanApplicationData = {
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
        // loanPurpose intentionally missing
      };
      const result = executeLoanTool('checkCompleteness', {}, { applicationData: almostComplete });
      expect(result.complete).toBe(false);
      expect(result.missingFields).toEqual(['loanPurpose']);
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

    it('returns empty updated and rejected for empty fields object', () => {
      const result = executeLoanTool('updateApplication', { fields: {} }, { applicationData: {} });
      expect(result.updated).toEqual({});
      expect(result.rejected).toEqual([]);
    });

    it('accepts all valid fields at once', () => {
      const allFields = {
        fullName: 'Test User',
        income: 100000,
        employmentType: 'self-employed',
        employer: 'Self',
        yearsEmployed: 10,
        creditScoreRange: '670-739',
        monthlyDebt: 500,
        propertyValue: 300000,
        loanAmount: 240000,
        downPayment: 60000,
        propertyType: 'condo',
        loanPurpose: 'refinance',
      };
      const result = executeLoanTool(
        'updateApplication',
        { fields: allFields },
        { applicationData: {} },
      );
      expect(result.updated).toEqual(allFields);
      expect(result.rejected).toEqual([]);
    });

    it('separates valid and invalid fields in mixed input', () => {
      const result = executeLoanTool(
        'updateApplication',
        { fields: { fullName: 'Test', income: 80000, ssn: '999', favoriteColor: 'blue' } },
        { applicationData: {} },
      );
      expect(result.updated).toEqual({ fullName: 'Test', income: 80000 });
      expect(result.rejected).toContain('ssn');
      expect(result.rejected).toContain('favoriteColor');
      expect(result.rejected).toHaveLength(2);
    });

    it('accepts numeric fields with number values', () => {
      const result = executeLoanTool(
        'updateApplication',
        { fields: { income: 50000, loanAmount: 200000, monthlyDebt: 1500 } },
        { applicationData: {} },
      );
      expect(result.updated).toEqual({ income: 50000, loanAmount: 200000, monthlyDebt: 1500 });
    });

    it('accepts string enum fields with valid values', () => {
      const result = executeLoanTool(
        'updateApplication',
        {
          fields: {
            employmentType: 'self-employed',
            creditScoreRange: '670-739',
            propertyType: 'townhouse',
          },
        },
        { applicationData: {} },
      );
      expect(result.updated).toEqual({
        employmentType: 'self-employed',
        creditScoreRange: '670-739',
        propertyType: 'townhouse',
      });
    });
  });

  describe('unknown tool', () => {
    it('returns error for unknown tool name', () => {
      const result = executeLoanTool('unknownTool', {}, { applicationData: {} });
      expect(result.error).toBe('Unknown loan tool: unknownTool');
    });
  });
});
