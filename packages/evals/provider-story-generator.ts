/**
 * Custom promptfoo provider for reading app story generation evals.
 * Calls generateStory() directly and returns quality metrics.
 */
import {
  PHONICS_SEED,
  SIGHT_WORDS_BY_PHASE,
} from '../layers/reading/server/utils/reading/phonics-seed.ts';
import { generateStory } from '../layers/reading/server/utils/reading/story-generator.ts';
import type { PhonicsPhase } from '../layers/reading/shared/reading-types.ts';

interface StoryProviderConfig {
  phase: PhonicsPhase;
  theme?: string;
  wordCount?: number;
}

class StoryGeneratorProvider {
  private config: StoryProviderConfig;

  constructor(options: { id?: string; config?: StoryProviderConfig }) {
    if (!options?.config?.phase) {
      throw new Error('phase (1-4) must be specified in provider config');
    }
    this.config = options.config;
  }

  id() {
    return 'story-generator';
  }

  async callApi(prompt: string, context?: { vars?: Record<string, any> }) {
    const phase = (context?.vars?.phase ?? this.config.phase) as PhonicsPhase;
    const theme = (context?.vars?.theme ?? this.config.theme ?? 'adventure') as string;
    const wordCount = (context?.vars?.wordCount ?? this.config.wordCount ?? 75) as number;

    // Collect patterns for this phase and all lower phases
    const allowedPatterns = PHONICS_SEED.filter((unit) => unit.phase <= phase).flatMap(
      (unit) => unit.patterns,
    );

    // Collect sight words for this phase and all lower phases
    const sightWords: string[] = [];
    for (let p = 1; p <= phase; p++) {
      sightWords.push(...SIGHT_WORDS_BY_PHASE[p as PhonicsPhase]);
    }

    const result = await generateStory({
      allowedPatterns,
      sightWords,
      targetWords: [],
      theme,
      wordCount,
    });

    const output = JSON.stringify({
      title: result.title,
      rawText: result.rawText,
      decodabilityScore: result.decodabilityScore,
      fleschKincaid: result.fleschKincaid,
      wordCount: result.rawText.split(/\s+/).filter(Boolean).length,
      pageCount: result.content.pages.length,
    });

    return { output };
  }
}

export default StoryGeneratorProvider;
