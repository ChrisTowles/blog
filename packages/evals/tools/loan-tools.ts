import type Anthropic from '@anthropic-ai/sdk';
import {
  LOAN_APPLICATION_FIELDS,
  EMPLOYMENT_TYPES,
  CREDIT_SCORE_RANGES,
  PROPERTY_TYPES,
  LOAN_PURPOSES,
} from '../../blog/shared/loan-types.js';

const applicationData: Record<string, unknown> = {};

export function getTools(): Anthropic.Tool[] {
  return [
    {
      name: 'updateApplication',
      description:
        'Save or update fields on the loan application. Call this as soon as the user provides information. Pass only the fields the user just provided.',
      input_schema: {
        type: 'object' as const,
        properties: {
          fields: {
            type: 'object',
            description: 'Key-value pairs of application fields to update',
            properties: {
              fullName: { type: 'string' },
              income: { type: 'number', description: 'Annual income in dollars' },
              employmentType: { type: 'string', enum: [...EMPLOYMENT_TYPES] },
              employer: { type: 'string' },
              yearsEmployed: { type: 'number' },
              creditScoreRange: { type: 'string', enum: [...CREDIT_SCORE_RANGES] },
              monthlyDebt: {
                type: 'number',
                description: 'Total monthly debt payments in dollars',
              },
              propertyValue: { type: 'number', description: 'Estimated property value in dollars' },
              loanAmount: { type: 'number', description: 'Requested loan amount in dollars' },
              downPayment: { type: 'number', description: 'Down payment amount in dollars' },
              propertyType: { type: 'string', enum: [...PROPERTY_TYPES] },
              loanPurpose: { type: 'string', enum: [...LOAN_PURPOSES] },
            },
          },
        },
        required: ['fields'],
      },
    },
    {
      name: 'checkCompleteness',
      description:
        'Check which application fields are still missing. Call this periodically to see what information you still need to collect.',
      input_schema: {
        type: 'object' as const,
        properties: {},
        required: [],
      },
    },
  ];
}

export function executeToolCall(
  name: string,
  input: Record<string, unknown>,
): Record<string, unknown> {
  switch (name) {
    case 'updateApplication': {
      const fields = (input.fields || {}) as Record<string, unknown>;
      const validFields = new Set<string>(LOAN_APPLICATION_FIELDS);
      const updated: Record<string, unknown> = {};
      const rejected: string[] = [];

      for (const [key, value] of Object.entries(fields)) {
        if (validFields.has(key)) {
          applicationData[key] = value;
          updated[key] = value;
        } else {
          rejected.push(key);
        }
      }

      return { updated, rejected, message: 'Fields saved successfully.' };
    }
    case 'checkCompleteness': {
      const filledFields = LOAN_APPLICATION_FIELDS.filter((f) => applicationData[f] != null);
      const missingFields = LOAN_APPLICATION_FIELDS.filter((f) => applicationData[f] == null);

      return {
        complete: missingFields.length === 0,
        filledFields,
        missingFields,
        progress: `${filledFields.length}/${LOAN_APPLICATION_FIELDS.length}`,
      };
    }
    default:
      return { error: `Unknown loan tool: ${name}` };
  }
}
