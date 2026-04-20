import { describe, it, expect } from 'vitest';
import { executeAskAviation, executeListQuestions, executeSchemaTool } from './aviation-tools';
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

describe('ask_aviation fast return', () => {
  const queryUrl = 'https://example.test/mcp/aviation/query';

  it('returns a small text+structuredContent pair, no inline resource', () => {
    const result = executeAskAviation({ question: 'which operators fly 737s?' }, queryUrl);
    expect(result.content).toHaveLength(1);
    expect(result.content[0]?.type).toBe('text');
    const hasEmbeddedResource = result.content.some((c) => c.type === 'resource');
    expect(hasEmbeddedResource).toBe(false);
  });

  it('tells the LLM the answer is already delivered (no "pending" or "trouble" phrasing)', () => {
    const result = executeAskAviation({ question: 'test' }, queryUrl);
    const text = result.content[0]?.type === 'text' ? result.content[0].text : '';
    expect(text.toLowerCase()).not.toContain('pending');
    expect(text.toLowerCase()).not.toContain('trouble');
    expect(text.toLowerCase()).toMatch(/visible to the user|rendered/);
  });

  it('echoes the question and queryUrl into structuredContent', () => {
    const result = executeAskAviation({ question: 'how many aircraft in CA?' }, queryUrl);
    expect(result.structuredContent).toEqual({
      pending: true,
      question: 'how many aircraft in CA?',
      queryUrl,
    });
  });

  it('serializes under 2 KB so claude.ai does not truncate the response', () => {
    const result = executeAskAviation({ question: 'x'.repeat(500) }, queryUrl);
    expect(JSON.stringify(result).length).toBeLessThan(2_000);
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
