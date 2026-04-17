/**
 * Strict CSP parsing for the sandbox proxy's `?csp=<url-encoded-json>` query param.
 *
 * Security design (plan line 774):
 *  - Whitelist the allowed directive KEYS (connectDomains, resourceDomains,
 *    frameDomains, baseUriDomains). Unknown keys are silently dropped — this is
 *    stronger than the ext-apps reference impl, which would character-strip
 *    arbitrary directives.
 *  - Inside a whitelisted key, require each entry to be an http(s) URL with no
 *    injection characters. This is BOTH the structured check (is it a URL?) AND
 *    the character strip (does it contain `;`, quotes, spaces, control chars?).
 *  - Cap the raw query-param length before JSON.parse so a 10MB `?csp=...` can't
 *    stall the CPU or bloat memory.
 *  - Header output MUST NOT contain CR/LF — enforced by the tests.
 */

export const MAX_CSP_PARAM_LENGTH = 4096;

const ALLOWED_DOMAIN_KEYS = [
  'connectDomains',
  'resourceDomains',
  'frameDomains',
  'baseUriDomains',
] as const;

export type CspDomainKey = (typeof ALLOWED_DOMAIN_KEYS)[number];

export type CspConfig = Partial<Record<CspDomainKey, string[]>>;

const DOMAIN_PATTERN = /^https?:\/\/[^\s;'"<>\\/]+(?:\/[^\s;'"<>\\]*)?$/;

export function sanitizeCspDomains(domains: unknown): string[] {
  if (!Array.isArray(domains)) return [];
  const out: string[] = [];
  for (const d of domains) {
    if (typeof d !== 'string') continue;
    if (d.length === 0 || d.length > 512) continue;
    if (!DOMAIN_PATTERN.test(d)) continue;
    // Re-check for control chars belt-and-suspenders (regex already forbids, but
    // an explicit second pass catches encoding shenanigans).
    if (/[;\r\n'"\s<>]/.test(d)) continue;
    out.push(d);
  }
  return out;
}

export function parseCspParam(raw: string | null | undefined): CspConfig | undefined {
  if (typeof raw !== 'string') return undefined;
  if (raw.length === 0) return undefined;
  if (raw.length > MAX_CSP_PARAM_LENGTH) return undefined;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return undefined;
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return undefined;
  }

  const out: CspConfig = {};
  for (const key of ALLOWED_DOMAIN_KEYS) {
    const value = (parsed as Record<string, unknown>)[key];
    if (value === undefined) continue;
    if (!Array.isArray(value)) continue; // non-array → drop
    out[key] = sanitizeCspDomains(value);
  }
  return out;
}

function directive(name: string, sources: string[]): string {
  return `${name} ${sources.join(' ')}`.trim();
}

export function buildCspHeader(csp: CspConfig | undefined): string {
  // Defense in depth: always re-sanitize, even if the caller claims to have
  // already done so. This guarantees that buildCspHeader cannot emit a header
  // with injection content regardless of call path.
  const connectDomains = sanitizeCspDomains(csp?.connectDomains);
  const resourceDomains = sanitizeCspDomains(csp?.resourceDomains);
  const frameDomains = sanitizeCspDomains(csp?.frameDomains);
  const baseUriDomains = sanitizeCspDomains(csp?.baseUriDomains);

  const directives: string[] = [
    "default-src 'self' 'unsafe-inline'",
    directive('script-src', [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'blob:',
      'data:',
      ...resourceDomains,
    ]),
    directive('style-src', ["'self'", "'unsafe-inline'", 'blob:', 'data:', ...resourceDomains]),
    directive('img-src', ["'self'", 'data:', 'blob:', ...resourceDomains]),
    directive('font-src', ["'self'", 'data:', 'blob:', ...resourceDomains]),
    directive('media-src', ["'self'", 'data:', 'blob:', ...resourceDomains]),
    directive('connect-src', ["'self'", ...connectDomains]),
    directive('worker-src', ["'self'", 'blob:', ...resourceDomains]),
    frameDomains.length > 0 ? directive('frame-src', frameDomains) : "frame-src 'none'",
    "object-src 'none'",
    baseUriDomains.length > 0 ? directive('base-uri', baseUriDomains) : "base-uri 'none'",
  ];

  const header = directives.join('; ');
  // Defense-in-depth: header MUST NOT contain CR/LF.
  if (/[\r\n]/.test(header)) {
    return DEFAULT_CSP_HEADER;
  }
  return header;
}

export const DEFAULT_CSP_HEADER = buildCspHeader(undefined);
