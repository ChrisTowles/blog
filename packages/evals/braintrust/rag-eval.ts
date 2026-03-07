/**
 * Braintrust eval: RAG search relevance
 *
 * Tests RAG retrieval pipeline for:
 * - Result relevance to query
 * - Minimum result count
 * - Term coverage in retrieved content
 *
 * Requires a running PostgreSQL with ingested blog content.
 * If database is unavailable, tests score 0 with a warning.
 */
import { Eval } from 'braintrust';
import { ragDataset } from './datasets.ts';

interface RAGResult {
  content: string;
  documentTitle: string;
  documentUrl: string;
}

interface RAGOutput {
  results: RAGResult[];
  query: string;
  error?: string;
}

/**
 * Run RAG retrieval for a query.
 */
async function runRAGSearch(query: string): Promise<RAGOutput> {
  try {
    const { retrieveRAG } = await import('../../blog/server/utils/rag/retrieve.ts');
    const results = await retrieveRAG(query, { topK: 5 });

    return {
      query,
      results: (results || []).map((r) => ({
        content: r.content,
        documentTitle: r.documentTitle,
        documentUrl: r.documentUrl,
      })),
    };
  } catch (error) {
    return {
      query,
      results: [],
      error: `RAG search failed: ${(error as Error).message}`,
    };
  }
}

export async function runRAGEval() {
  return Eval('blog-rag', {
    data: () =>
      ragDataset.map((c) => ({
        input: c.input,
        expected: c.expected,
      })),

    task: async (input: string) => {
      return runRAGSearch(input);
    },

    scores: [
      // Result count: did we get enough results?
      ({ output, expected }) => {
        const { results, error } = output as RAGOutput;
        if (error) {
          return {
            name: 'ResultCount',
            score: 0,
            metadata: { error },
          };
        }
        const minResults = expected?.minResults ?? 1;
        const score = results.length >= minResults ? 1 : results.length / minResults;
        return {
          name: 'ResultCount',
          score,
          metadata: { resultCount: results.length, minRequired: minResults },
        };
      },

      // Term coverage: how many expected terms appear in results?
      ({ output, expected }) => {
        const { results, error } = output as RAGOutput;
        if (error || !expected?.relevantTerms?.length) {
          return { name: 'TermCoverage', score: error ? 0 : 1 };
        }

        const allContent = results
          .map((r) => `${r.content} ${r.documentTitle}`)
          .join(' ')
          .toLowerCase();

        const terms = expected.relevantTerms as string[];
        const matchCount = terms.filter((term) => allContent.includes(term.toLowerCase())).length;
        const score = matchCount / terms.length;

        return {
          name: 'TermCoverage',
          score,
          metadata: {
            matchedTerms: matchCount,
            totalTerms: terms.length,
            terms: terms.filter((t) => allContent.includes(t.toLowerCase())),
          },
        };
      },

      // Result diversity: are results from different documents?
      ({ output }) => {
        const { results, error } = output as RAGOutput;
        if (error || results.length === 0) {
          return { name: 'ResultDiversity', score: error ? 0 : 1 };
        }

        const uniqueDocs = new Set(results.map((r) => r.documentUrl));
        const score = uniqueDocs.size / results.length;

        return {
          name: 'ResultDiversity',
          score,
          metadata: { uniqueDocuments: uniqueDocs.size, totalResults: results.length },
        };
      },
    ],
  });
}
