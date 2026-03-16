import { eq, asc } from 'drizzle-orm';
import { SIGHT_WORDS_BY_PHASE } from './phonics-seed';

/**
 * Maps pattern codes to human-readable names and example words for SRS card generation.
 */
const PATTERN_EXAMPLES: Record<string, { name: string; example: string }> = {
  // Phase 1: Single consonants
  'C-b': { name: 'b', example: 'bat' },
  'C-c': { name: 'c', example: 'cat' },
  'C-d': { name: 'd', example: 'dog' },
  'C-f': { name: 'f', example: 'fan' },
  'C-g': { name: 'g', example: 'go' },
  'C-h': { name: 'h', example: 'hat' },
  'C-k': { name: 'k', example: 'kit' },
  'C-l': { name: 'l', example: 'log' },
  'C-m': { name: 'm', example: 'map' },
  'C-n': { name: 'n', example: 'net' },
  'C-p': { name: 'p', example: 'pig' },
  'C-s': { name: 's', example: 'sun' },
  'C-t': { name: 't', example: 'top' },
  'C-j': { name: 'j', example: 'jam' },
  'C-r': { name: 'r', example: 'run' },
  'C-v': { name: 'v', example: 'van' },
  'C-w': { name: 'w', example: 'wet' },
  'C-x': { name: 'x', example: 'fox' },
  'C-y': { name: 'y', example: 'yes' },
  'C-z': { name: 'z', example: 'zip' },
  'C-qu': { name: 'qu', example: 'quit' },
  // CVC patterns
  'CVC-short-a': { name: 'short a', example: 'cat' },
  'CVC-short-i': { name: 'short i', example: 'sit' },
  'CVC-short-o': { name: 'short o', example: 'hot' },
  'CVC-short-u': { name: 'short u', example: 'cup' },
  'CVC-short-e': { name: 'short e', example: 'bed' },
  // Digraphs
  'DG-sh': { name: 'sh', example: 'ship' },
  'DG-th': { name: 'th', example: 'thin' },
  'DG-ch': { name: 'ch', example: 'chop' },
  'DG-ck': { name: 'ck', example: 'back' },
};

/**
 * Seeds phonics progress and initial SRS cards for a newly created child.
 * - Creates child_phonics_progress rows for all Phase 1 units (first = active, rest = locked)
 * - Creates phoneme SRS cards for the first active unit's patterns
 * - Creates sight word SRS cards for Phase 1 sight words
 */
export async function seedChildPhonicsAndCards(childId: number): Promise<void> {
  const db = useDrizzle();

  // Get all Phase 1 phonics units ordered by position
  const phase1Units = await db
    .select()
    .from(tables.phonicsUnits)
    .where(eq(tables.phonicsUnits.phase, 1))
    .orderBy(asc(tables.phonicsUnits.orderIndex));

  if (phase1Units.length === 0) return;

  const activeUnit = phase1Units[0];
  if (!activeUnit) return;

  // Insert child_phonics_progress: first unit active, rest locked
  const progressRows = phase1Units.map((unit, i) => ({
    childId,
    phonicsUnitId: unit.id,
    status: i === 0 ? 'active' : 'locked',
  }));

  await db.insert(tables.childPhonicsProgress).values(progressRows);
  const phonemeCards = activeUnit.patterns
    .map((pattern) => {
      const info = PATTERN_EXAMPLES[pattern];
      if (!info) return null;
      return {
        childId,
        cardType: 'phoneme' as const,
        front: `What sound does '${info.name}' make?`,
        back: `${info.name} as in ${info.example}`,
        relatedPhonicsUnitId: activeUnit.id,
      };
    })
    .filter((card): card is NonNullable<typeof card> => card !== null);

  // Create SRS sight word cards for Phase 1
  const sightWordCards = SIGHT_WORDS_BY_PHASE[1].map((word) => ({
    childId,
    cardType: 'sight_word' as const,
    front: `Read this word: ${word}`,
    back: word,
    relatedPhonicsUnitId: activeUnit.id,
  }));

  const allCards = [...phonemeCards, ...sightWordCards];
  if (allCards.length > 0) {
    await db.insert(tables.srsCards).values(allCards);
  }
}
