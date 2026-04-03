import { describe, it, expect } from 'vitest';
import { topologicalSort, resolveTemplate } from './workflow-engine';

describe('topologicalSort', () => {
  it('returns single node unchanged', () => {
    const result = topologicalSort([{ id: 'a' }], []);
    expect(result.map((n) => n.id)).toEqual(['a']);
  });

  it('sorts A→B correctly (A before B)', () => {
    const nodes = [{ id: 'b' }, { id: 'a' }];
    const edges = [{ source: 'a', target: 'b' }];
    const result = topologicalSort(nodes, edges);
    expect(result.map((n) => n.id)).toEqual(['a', 'b']);
  });

  it('sorts A→B→C correctly', () => {
    const nodes = [{ id: 'c' }, { id: 'a' }, { id: 'b' }];
    const edges = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
    ];
    const result = topologicalSort(nodes, edges);
    expect(result.map((n) => n.id)).toEqual(['a', 'b', 'c']);
  });

  it('handles diamond shape (A→B, A→C, B→D, C→D)', () => {
    const nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
    const edges = [
      { source: 'a', target: 'b' },
      { source: 'a', target: 'c' },
      { source: 'b', target: 'd' },
      { source: 'c', target: 'd' },
    ];
    const result = topologicalSort(nodes, edges);
    expect(result.map((n) => n.id)).toContain('a');
    expect(result.map((n) => n.id)).toContain('d');
    // a must be first, d must be last
    expect(result[0].id).toBe('a');
    expect(result[result.length - 1].id).toBe('d');
  });

  it('throws on cycle', () => {
    const nodes = [{ id: 'a' }, { id: 'b' }];
    const edges = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'a' },
    ];
    expect(() => topologicalSort(nodes, edges)).toThrow('Cycle');
  });
});

describe('resolveTemplate', () => {
  const outputs = new Map([
    ['node_1', { answer: 'Paris', confidence: 0.99 }],
    ['node_2', { category: 'geography' }],
  ]);
  const input = { query: 'What is the capital of France?' };

  it('replaces {{input.field}} references', () => {
    const result = resolveTemplate('Question: {{input.query}}', outputs, input);
    expect(result).toBe('Question: What is the capital of France?');
  });

  it('replaces {{nodeId.field}} references', () => {
    const result = resolveTemplate('Answer: {{node_1.answer}}', outputs, input);
    expect(result).toBe('Answer: Paris');
  });

  it('replaces multiple references', () => {
    const result = resolveTemplate(
      'Q: {{input.query}} A: {{node_1.answer}} Cat: {{node_2.category}}',
      outputs,
      input,
    );
    expect(result).toBe('Q: What is the capital of France? A: Paris Cat: geography');
  });

  it('leaves unknown references intact', () => {
    const result = resolveTemplate('{{unknown.field}}', outputs, input);
    expect(result).toBe('{{unknown.field}}');
  });

  it('handles nested object values by JSON-stringifying', () => {
    const out = new Map([['n', { data: { nested: true } }]]);
    const result = resolveTemplate('{{n.data}}', out, {});
    expect(result).toBe('{"nested":true}');
  });
});
