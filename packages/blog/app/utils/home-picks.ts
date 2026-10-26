// Chosen by hand, not by traffic: what I'd hand someone who wants to see how I
// work with Claude. The first two are also linked from the intro.
export const START_HERE_PATHS = [
  '/blog/multi-agent-loan-approval-human-in-the-loop',
  '/blog/were-not-asking-enough-of-these-models',
  '/blog/mcp-ext-apps-claude-desktop-developer-mode',
  '/blog/claude-code-skills-guide',
  '/blog/two-weeks-with-cloudflare-ai-and-tools',
  '/blog/what-i-tell-teams-about-claude-code',
] as const;

export type Printable = { path: string; label: string; detail: string };

export const PRINTABLES: Printable[] = [
  {
    path: '/blog/free-printable-number-chart-and-coin-sheets',
    label: 'Math',
    detail: 'Number chart, skip counting, multiplication, coins',
  },
  {
    path: '/blog/free-printable-sight-words-and-grammar-sheets',
    label: 'Language arts',
    detail: 'Sight words, parts of speech, homophones',
  },
  {
    path: '/blog/free-printable-telling-time-worksheet',
    label: 'Telling time',
    detail: 'Clock reference and 12 practice clocks',
  },
];
