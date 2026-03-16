import type { StoryContent } from '~~/shared/reading-types';

interface DemoStory {
  id: string;
  title: string;
  theme: string;
  phase: number;
  patterns: string[];
  content: StoryContent;
  illustrationUrls?: string[];
}

function w(
  text: string,
  pattern: string,
): { text: string; decodable: true; pattern: string; sightWord: false } {
  return { text, decodable: true, pattern, sightWord: false };
}

function sw(text: string): { text: string; decodable: false; pattern: null; sightWord: true } {
  return { text, decodable: false, pattern: null, sightWord: true };
}

export const DEMO_STORIES: DemoStory[] = [
  {
    id: 'the-big-cat',
    title: 'The Big Cat',
    theme: 'animals',
    phase: 1,
    patterns: ['CVC-short-a', 'CVC-short-i', 'CVC-short-o'],
    content: {
      pages: [
        {
          words: [
            sw('The'),
            w('big', 'CVC-short-i'),
            w('cat', 'CVC-short-a'),
            w('sat', 'CVC-short-a'),
            sw('on'),
            sw('a'),
            w('mat', 'CVC-short-a'),
          ],
        },
        {
          words: [
            sw('The'),
            w('cat', 'CVC-short-a'),
            sw('is'),
            w('sad', 'CVC-short-a'),
            sw('He'),
            w('can', 'CVC-short-a'),
            sw('not'),
            w('nap', 'CVC-short-a'),
          ],
        },
        {
          words: [
            sw('A'),
            w('dog', 'CVC-short-o'),
            w('ran', 'CVC-short-a'),
            sw('to'),
            sw('the'),
            w('cat', 'CVC-short-a'),
            sw('The'),
            w('cat', 'CVC-short-a'),
            w('hid', 'CVC-short-i'),
          ],
        },
        {
          words: [
            sw('The'),
            w('dog', 'CVC-short-o'),
            w('sat', 'CVC-short-a'),
            sw('The'),
            w('cat', 'CVC-short-a'),
            w('sat', 'CVC-short-a'),
            sw('They'),
            sw('are'),
            w('pals', 'CVC-short-a'),
          ],
        },
      ],
    },
  },
  {
    id: 'the-red-hen',
    title: 'The Red Hen',
    theme: 'farm',
    phase: 1,
    patterns: ['CVC-short-e', 'CVC-short-a', 'CVC-short-u'],
    content: {
      pages: [
        {
          words: [
            sw('The'),
            w('red', 'CVC-short-e'),
            w('hen', 'CVC-short-e'),
            w('got', 'CVC-short-o'),
            sw('a'),
            w('bug', 'CVC-short-u'),
          ],
        },
        {
          words: [
            sw('She'),
            w('fed', 'CVC-short-e'),
            sw('the'),
            w('bug', 'CVC-short-u'),
            sw('to'),
            sw('the'),
            w('ten', 'CVC-short-e'),
            w('chicks', 'CVC-short-i'),
          ],
        },
        {
          words: [
            sw('The'),
            w('sun', 'CVC-short-u'),
            sw('is'),
            w('hot', 'CVC-short-o'),
            sw('The'),
            w('hen', 'CVC-short-e'),
            w('dug', 'CVC-short-u'),
            sw('a'),
            w('pit', 'CVC-short-i'),
          ],
        },
        {
          words: [
            sw('The'),
            w('hen', 'CVC-short-e'),
            sw('and'),
            sw('the'),
            w('chicks', 'CVC-short-i'),
            w('sat', 'CVC-short-a'),
            sw('in'),
            sw('the'),
            w('mud', 'CVC-short-u'),
            sw('They'),
            sw('are'),
            sw('so'),
            w('wet', 'CVC-short-e'),
          ],
        },
      ],
    },
  },
  {
    id: 'dan-and-the-ship',
    title: 'Dan and the Ship',
    theme: 'adventure',
    phase: 1,
    patterns: ['CVC-short-a', 'CVC-short-i', 'DG-sh'],
    content: {
      pages: [
        {
          words: [
            w('Dan', 'CVC-short-a'),
            w('has', 'CVC-short-a'),
            sw('a'),
            w('big', 'CVC-short-i'),
            w('ship', 'DG-sh'),
          ],
        },
        {
          words: [
            sw('He'),
            w('ran', 'CVC-short-a'),
            sw('to'),
            sw('the'),
            w('ship', 'DG-sh'),
            sw('and'),
            w('sat', 'CVC-short-a'),
            sw('in'),
            sw('it'),
          ],
        },
        {
          words: [
            sw('The'),
            w('ship', 'DG-sh'),
            w('hit', 'CVC-short-i'),
            sw('a'),
            w('big', 'CVC-short-i'),
            w('fish', 'DG-sh'),
            w('Splash', 'DG-sh'),
          ],
        },
        {
          words: [
            w('Dan', 'CVC-short-a'),
            w('is', 'CVC-short-i'),
            sw('so'),
            w('glad', 'CVC-short-a'),
            sw('He'),
            w('did', 'CVC-short-i'),
            sw('it'),
            sw('He'),
            w('can', 'CVC-short-a'),
            w('wish', 'DG-sh'),
            sw('and'),
            w('wish', 'DG-sh'),
          ],
        },
      ],
    },
  },
];
