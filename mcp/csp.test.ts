/**
 * Tests for CSP parsing and header construction in the sandbox proxy.
 *
 * Security-critical: the plan mandates directive-name allowlist + structured JSON
 * parsing (not character-stripping) + length capping. See plan line 774.
 */

import { describe, expect, it } from 'vitest';
import {
  buildCspHeader,
  DEFAULT_CSP_HEADER,
  MAX_CSP_PARAM_LENGTH,
  parseCspParam,
  sanitizeCspDomains,
} from './csp.ts';

describe('sanitizeCspDomains', () => {
  it('returns [] for undefined', () => {
    expect(sanitizeCspDomains(undefined)).toEqual([]);
  });

  it('keeps valid https domains', () => {
    expect(sanitizeCspDomains(['https://example.com', 'https://a.b.co'])).toEqual([
      'https://example.com',
      'https://a.b.co',
    ]);
  });

  it('strips entries containing injection chars', () => {
    const input = [
      'https://ok.com',
      "https://evil.com;script-src 'unsafe-eval'",
      'https://evil.com\n',
      'https://evil.com\r',
      "https://evil.com'",
      'https://evil.com"',
      'https://evil.com other',
    ];
    expect(sanitizeCspDomains(input)).toEqual(['https://ok.com']);
  });

  it('drops non-string values', () => {
    // @ts-expect-error — testing runtime robustness
    expect(sanitizeCspDomains([null, 42, undefined, 'https://ok.com'])).toEqual(['https://ok.com']);
  });

  it('rejects schemeless or non-http(s) entries', () => {
    expect(
      sanitizeCspDomains([
        'example.com',
        'javascript:alert(1)',
        'data:text/html,foo',
        'http://ok.com',
        'https://ok.com',
      ]),
    ).toEqual(['http://ok.com', 'https://ok.com']);
  });
});

describe('parseCspParam', () => {
  it('returns undefined when missing', () => {
    expect(parseCspParam(null)).toBeUndefined();
    expect(parseCspParam(undefined)).toBeUndefined();
  });

  it('rejects malformed JSON and returns undefined (falls through to restrictive default)', () => {
    expect(parseCspParam('not json')).toBeUndefined();
    expect(parseCspParam('{broken')).toBeUndefined();
  });

  it('caps param length', () => {
    const big = 'x'.repeat(MAX_CSP_PARAM_LENGTH + 1);
    expect(parseCspParam(big)).toBeUndefined();
  });

  it('only keeps whitelisted directive keys', () => {
    const input = JSON.stringify({
      connectDomains: ['https://api.example.com'],
      resourceDomains: ['https://cdn.example.com'],
      frameDomains: ['https://frame.example.com'],
      baseUriDomains: ['https://base.example.com'],
      // Disallowed keys below — must be dropped silently.
      scriptSrc: ["'unsafe-eval'"],
      evil: ["'unsafe-inline'"],
    });
    const parsed = parseCspParam(input)!;
    expect(parsed).toEqual({
      connectDomains: ['https://api.example.com'],
      resourceDomains: ['https://cdn.example.com'],
      frameDomains: ['https://frame.example.com'],
      baseUriDomains: ['https://base.example.com'],
    });
  });

  it('sanitizes injection attempts inside a whitelisted key', () => {
    const input = JSON.stringify({
      connectDomains: ['https://ok.com', "https://evil.com; script-src 'unsafe-eval'"],
    });
    const parsed = parseCspParam(input)!;
    expect(parsed.connectDomains).toEqual(['https://ok.com']);
  });

  it('rejects non-array values for a whitelisted key', () => {
    const input = JSON.stringify({
      connectDomains: 'https://ok.com',
    });
    const parsed = parseCspParam(input);
    expect(parsed).toEqual({});
  });
});

describe('buildCspHeader', () => {
  it('returns the restrictive default when csp is undefined', () => {
    expect(buildCspHeader(undefined)).toBe(DEFAULT_CSP_HEADER);
  });

  it('is a single-line string (no embedded CR/LF — header-injection-safe)', () => {
    const header = buildCspHeader({
      connectDomains: ['https://api.example.com'],
      resourceDomains: ['https://cdn.example.com'],
    });
    expect(header).not.toMatch(/[\r\n]/);
  });

  it('includes connect-src with declared domains and frame-src none by default', () => {
    const header = buildCspHeader({
      connectDomains: ['https://api.example.com'],
    });
    expect(header).toContain("connect-src 'self' https://api.example.com");
    expect(header).toContain("frame-src 'none'");
    expect(header).toContain("object-src 'none'");
    expect(header).toContain("base-uri 'none'");
  });

  it('uses frameDomains for frame-src when provided', () => {
    const header = buildCspHeader({
      frameDomains: ['https://frame.example.com'],
    });
    expect(header).toContain('frame-src https://frame.example.com');
    expect(header).not.toContain("frame-src 'none'");
  });

  it('uses baseUriDomains for base-uri when provided', () => {
    const header = buildCspHeader({
      baseUriDomains: ['https://base.example.com'],
    });
    expect(header).toContain('base-uri https://base.example.com');
    expect(header).not.toContain("base-uri 'none'");
  });

  it('injection in a CSP domain value does not break out of the directive', () => {
    const header = buildCspHeader({
      // Note: buildCspHeader re-sanitizes defensively, so even an unsanitized
      // input must not corrupt the output header shape.
      connectDomains: ["https://evil.com; script-src 'unsafe-eval'"],
    });
    // The injected literal must be absent from the connect-src directive.
    const connectSrcMatch = header.match(/connect-src [^;]*/);
    expect(connectSrcMatch).not.toBeNull();
    expect(connectSrcMatch![0]).not.toContain('evil');
    expect(connectSrcMatch![0]).toBe("connect-src 'self'");
    // The header always has the same number of directives regardless of input.
    const directives = header
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean);
    expect(directives).toHaveLength(11);
  });
});
