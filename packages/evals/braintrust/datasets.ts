/**
 * Eval datasets for Braintrust evaluations.
 * Each dataset entry has: input, expected output/metadata for scoring.
 */

export interface ChatbotEvalCase {
  input: string;
  expected: {
    shouldCallTool?: string;
    shouldMentionTopic?: string;
    shouldNotContain?: string[];
    category: 'tool-use' | 'format' | 'quality' | 'edge-case';
  };
}

export interface RAGEvalCase {
  input: string;
  expected: {
    relevantTerms: string[];
    minResults: number;
    category: 'retrieval' | 'ranking';
  };
}

export const chatbotDataset: ChatbotEvalCase[] = [
  // Tool-use accuracy
  {
    input: 'What has Chris written about Claude?',
    expected: {
      shouldCallTool: 'searchBlogContent',
      shouldMentionTopic: 'Claude',
      category: 'tool-use',
    },
  },
  {
    input: "What's the weather in London?",
    expected: {
      shouldCallTool: 'getWeather',
      shouldMentionTopic: 'London',
      category: 'tool-use',
    },
  },
  {
    input: 'Tell me about the blog author',
    expected: {
      shouldCallTool: 'getAuthorInfo',
      shouldMentionTopic: 'Chris',
      category: 'tool-use',
    },
  },
  // Format compliance
  {
    input: 'Explain Vue 3 composition API in detail',
    expected: {
      shouldCallTool: 'searchBlogContent',
      shouldNotContain: ['\n#', '\n##', '\n###'],
      category: 'format',
    },
  },
  {
    input: 'Give me a tutorial on Terraform with GCP',
    expected: {
      shouldCallTool: 'searchBlogContent',
      shouldNotContain: ['\n#'],
      category: 'format',
    },
  },
  // Quality
  {
    input: 'How do I deploy a Nuxt app with Docker?',
    expected: {
      shouldCallTool: 'searchBlogContent',
      shouldMentionTopic: 'Docker',
      category: 'quality',
    },
  },
  // Edge cases
  {
    input: 'Hi!',
    expected: {
      category: 'edge-case',
    },
  },
  {
    input: '',
    expected: {
      category: 'edge-case',
    },
  },
];

export const ragDataset: RAGEvalCase[] = [
  {
    input: 'Claude AI SDK',
    expected: {
      relevantTerms: ['claude', 'ai', 'sdk', 'anthropic'],
      minResults: 1,
      category: 'retrieval',
    },
  },
  {
    input: 'Vue Nuxt TypeScript',
    expected: {
      relevantTerms: ['vue', 'nuxt', 'typescript'],
      minResults: 1,
      category: 'retrieval',
    },
  },
  {
    input: 'Terraform GCP Cloud Run deployment',
    expected: {
      relevantTerms: ['terraform', 'gcp', 'cloud run', 'deploy'],
      minResults: 1,
      category: 'retrieval',
    },
  },
  {
    input: 'Docker container CI CD pipeline',
    expected: {
      relevantTerms: ['docker', 'container', 'ci', 'cd'],
      minResults: 1,
      category: 'retrieval',
    },
  },
  {
    input: 'context engineering prompt caching',
    expected: {
      relevantTerms: ['context', 'prompt', 'caching'],
      minResults: 1,
      category: 'retrieval',
    },
  },
];
