import { TEST_IDS } from '~~/shared/test-ids';

export type Experiment = {
  title: string;
  description: string;
  icon: string;
  to: string;
  testId: string;
  /**
   * Set for projects that live off this domain. The "What's running here" list
   * on /about filters these out — it only claims things this Cloud Run service
   * actually serves.
   */
  external?: boolean;
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
      'A CLI and Claude Code plugin for running several coding agents at once — git worktree tasks, a kanban board to see which agent needs input, and an autonomous loop that keeps going without me.',
    icon: 'i-lucide-terminal',
    to: 'https://github.com/ChrisTowles/towles-tool',
    testId: TEST_IDS.HOME.EXPERIMENT_TOWLES_TOOL,
    external: true,
  },
  {
    title: 'Agentic chat',
    description:
      'Streaming chat over SSE with tool use, sandboxed code execution, and document generation. The agent discovers MCP tools at runtime instead of hardcoding them.',
    icon: 'i-heroicons-chat-bubble-left-right',
    to: '/chat',
    testId: TEST_IDS.HOME.EXPERIMENT_CHAT,
  },
  {
    title: 'Aviation MCP server',
    description:
      'An MCP server co-hosted with the blog, answering questions over FAA registry and BTS flight data. Same iframe renders here and in Claude Desktop.',
    icon: 'i-heroicons-paper-airplane',
    to: '/aviation',
    testId: TEST_IDS.HOME.EXPERIMENT_AVIATION,
  },
  {
    title: 'Hybrid RAG search',
    description:
      'Every post is chunked, contextualized, and embedded. Search runs pgvector cosine and BM25 in parallel, then fuses the rankings.',
    icon: 'i-heroicons-magnifying-glass',
    to: '/search',
    testId: TEST_IDS.HOME.EXPERIMENT_SEARCH,
  },
  {
    title: 'Typing tutor',
    description:
      'A 20-stage typing curriculum for my kids, with PixiJS games, AI-generated lessons, and mastery gates that refuse to advance until the accuracy is real.',
    icon: 'i-lucide-keyboard',
    to: '/typing',
    testId: TEST_IDS.HOME.EXPERIMENT_TYPING,
  },
  {
    title: 'Workflows',
    description:
      'A node-based editor for chaining prompts into multi-step pipelines with typed schemas between the steps.',
    icon: 'i-lucide-workflow',
    to: '/workflows',
    testId: TEST_IDS.HOME.EXPERIMENT_WORKFLOWS,
  },
  {
    title: 'Poker',
    description:
      "Heads-up Texas Hold'em against LLM personas that each bet differently and talk trash between hands. Rendered with PixiJS.",
    icon: 'i-lucide-spade',
    to: '/poker',
    testId: TEST_IDS.HOME.EXPERIMENT_POKER,
  },
  {
    title: 'Apps',
    description:
      'Most of my work lives in private repos. These are the public ones I can point at.',
    icon: 'i-lucide-layout-grid',
    to: '/apps',
    testId: TEST_IDS.HOME.EXPERIMENT_APPS,
  },
];

/** The experiments this site actually serves — used by the /about page. */
export const hostedExperiments = experiments.filter((item) => !item.external);
