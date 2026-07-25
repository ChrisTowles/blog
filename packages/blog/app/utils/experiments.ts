import { TEST_IDS } from '~~/shared/test-ids';

export type Experiment = {
  title: string;
  description: string;
  icon: string;
  to: string;
  testId: string;
  /**
   * The language it's actually written in. Rendered as the lead badge on each
   * card so the grid says something about the work, not just what it does.
   */
  language: string;
  /**
   * The notable tech behind it, beyond the language. Keep these to things
   * that are load-bearing and checkable in the repo — the point is to be
   * specific ("DuckDB", "pgvector") rather than to list every dependency.
   */
  stack: string[];
  /**
   * Set for projects that live off this domain. The "What's running here" list
   * on /about filters these out — it only claims things this Cloud Run service
   * actually serves.
   */
  external?: boolean;
  /** Takes a wider cell in the home grid. Nothing else about the card changes. */
  featured?: boolean;
};

/**
 * Single source of truth for the experiment grid. The home page renders all of
 * these; /about renders the subset hosted on this domain. Adding an entry here
 * is what makes a route discoverable now that the header nav is down to four
 * items — there is no other index of these pages.
 */
export const experiments: Experiment[] = [
  {
    title: 'Towles Tool',
    description:
      "Where I test out interface ideas for working with coding agents. One git worktree per task, a kanban board instead of tabbing through terminals to find the one that's stuck, a loop that keeps going unattended. A CLI and a Claude Code plugin.",
    icon: 'i-lucide-terminal',
    to: 'https://github.com/ChrisTowles/towles-tool',
    testId: TEST_IDS.HOME.EXPERIMENT_TOWLES_TOOL,
    language: 'Rust',
    stack: ['Tauri', 'TypeScript'],
    external: true,
    featured: true,
  },
  {
    title: 'Agentic chat',
    description:
      'Streaming chat over SSE with tool use, sandboxed code execution, and document generation. The agent discovers MCP tools at runtime instead of hardcoding them.',
    icon: 'i-heroicons-chat-bubble-left-right',
    to: '/chat',
    testId: TEST_IDS.HOME.EXPERIMENT_CHAT,
    language: 'TypeScript',
    stack: ['Nuxt', 'Anthropic SDK', 'SSE'],
  },
  {
    title: 'Aviation MCP server',
    description:
      'An MCP server co-hosted with the blog, answering questions over FAA registry and BTS flight data. Same iframe renders here and in Claude Desktop.',
    icon: 'i-heroicons-paper-airplane',
    to: '/aviation',
    testId: TEST_IDS.HOME.EXPERIMENT_AVIATION,
    language: 'TypeScript',
    stack: ['MCP', 'DuckDB', 'Parquet'],
  },
  {
    title: 'Hybrid RAG search',
    description:
      'Every post is chunked, contextualized, and embedded. Search runs pgvector cosine and BM25 in parallel, then fuses the rankings.',
    icon: 'i-heroicons-magnifying-glass',
    to: '/search',
    testId: TEST_IDS.HOME.EXPERIMENT_SEARCH,
    language: 'TypeScript',
    stack: ['Postgres', 'pgvector', 'Bedrock'],
  },
  {
    title: 'Typing tutor',
    description:
      'A 20-stage typing curriculum for my kids, with PixiJS games, AI-generated lessons, and mastery gates that refuse to advance until the accuracy is real.',
    icon: 'i-lucide-keyboard',
    to: '/typing',
    testId: TEST_IDS.HOME.EXPERIMENT_TYPING,
    language: 'TypeScript',
    stack: ['Vue', 'PixiJS', 'Cloud TTS'],
  },
  {
    title: 'Workflows',
    description:
      'A node-based editor for chaining prompts into multi-step pipelines with typed schemas between the steps.',
    icon: 'i-lucide-workflow',
    to: '/workflows',
    testId: TEST_IDS.HOME.EXPERIMENT_WORKFLOWS,
    language: 'TypeScript',
    stack: ['Vue Flow', 'Postgres'],
  },
  {
    title: 'Poker',
    description:
      "Heads-up Texas Hold'em against LLM personas that each bet differently and talk trash between hands. Rendered with PixiJS.",
    icon: 'i-lucide-spade',
    to: '/poker',
    testId: TEST_IDS.HOME.EXPERIMENT_POKER,
    language: 'TypeScript',
    stack: ['PixiJS', 'Anthropic SDK'],
  },
  {
    title: 'Apps',
    description:
      'Most of my work lives in private repos. These are the public ones I can point at.',
    icon: 'i-lucide-layout-grid',
    to: '/apps',
    testId: TEST_IDS.HOME.EXPERIMENT_APPS,
    language: 'Mixed',
    stack: [],
  },
];

/** The experiments this site actually serves — used by the /about page. */
export const hostedExperiments = experiments.filter((item) => !item.external);
