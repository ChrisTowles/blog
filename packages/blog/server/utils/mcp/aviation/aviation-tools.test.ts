import { describe, it, expect } from 'vitest';
import { executeListQuestions, executeSchemaTool } from './aviation-tools';
import { AVIATION_STARTER_QUESTIONS } from './aviation-prompt';

describe('list_questions tool', () => {
  it('returns a CallToolResult with the 10 starter questions in text form', () => {
    const result = executeListQuestions();
    expect(result.content).toHaveLength(1);
    const content = result.content[0];
    expect(content?.type).toBe('text');
    if (content?.type !== 'text') throw new Error('type narrow');
    for (const q of AVIATION_STARTER_QUESTIONS) {
      expect(content.text).toContain(q);
    }
    const structured = result.structuredContent as { questions: string[] };
    expect(structured.questions).toEqual(AVIATION_STARTER_QUESTIONS);
  });
});

describe('schema tool', () => {
  it('returns a CallToolResult describing the dataset', () => {
    const result = executeSchemaTool();
    const content = result.content[0];
    expect(content?.type).toBe('text');
    if (content?.type !== 'text') throw new Error('type narrow');
    expect(content.text).toContain('dims/aircraft.parquet');
    expect(content.text).toContain('bts_t100');
  });
});
