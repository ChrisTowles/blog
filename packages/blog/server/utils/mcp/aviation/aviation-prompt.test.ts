import { describe, it, expect } from 'vitest';
import {
  AVIATION_SCHEMA_BLOCK,
  AVIATION_STARTER_QUESTIONS,
  AVIATION_STRUCTURED_OUTPUT_SCHEMA,
  buildAviationSystemPrompt,
} from './aviation-prompt';

describe('aviation-prompt', () => {
  it('starter questions: 10 non-empty strings', () => {
    expect(AVIATION_STARTER_QUESTIONS.length).toBe(10);
    for (const q of AVIATION_STARTER_QUESTIONS) {
      expect(q).toBeTruthy();
      expect(q.length).toBeGreaterThan(15);
      expect(q.endsWith('?')).toBe(true);
    }
  });

  it('schema block mentions every allowlisted Parquet path', () => {
    const required = [
      'dims/aircraft.parquet',
      'dims/aircraft_types.parquet',
      'dims/airports.parquet',
      'dims/airlines.parquet',
      'facts/bts_t100',
      'ref/carrier_to_operator.parquet',
    ];
    for (const p of required) {
      expect(AVIATION_SCHEMA_BLOCK).toContain(p);
    }
  });

  it('system prompt embeds the schema block and banned keywords', () => {
    const prompt = buildAviationSystemPrompt();
    expect(prompt).toContain('ask_aviation');
    expect(prompt).toContain(AVIATION_SCHEMA_BLOCK);
    for (const kw of ['ATTACH', 'INSTALL', 'LOAD', 'PRAGMA', 'SET']) {
      expect(prompt).toContain(kw);
    }
    // Chart selection should forbid geo at launch
    expect(prompt.toLowerCase()).toContain('no geo');
  });

  it('structured-output schema exposes the expected top-level fields', () => {
    const s = AVIATION_STRUCTURED_OUTPUT_SCHEMA;
    expect(s.type).toBe('object');
    expect(s.required).toEqual(['sql', 'answer', 'chart_option', 'followups']);
    const props = s.properties;
    expect(props.followups.minItems).toBe(3);
    expect(props.followups.maxItems).toBe(3);
  });
});
