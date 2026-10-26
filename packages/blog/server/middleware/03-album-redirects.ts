// Song pages lost their track numbers in #335, and people type the album name from memory.
import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

const ALBUM = '/i-cant-clap';

const ALBUM_SPELLINGS = new Set(['icantclap', 'icanclap', 'icantcalp', 'icancalp']);

const MOVED_SONGS = {
  '02-never-again': `${ALBUM}/never-again`,
  '04-read-the-diff': `${ALBUM}/read-the-diff`,
  '08-explain-the-function': `${ALBUM}/explain-the-function`,
  '24-the-steep-part': `${ALBUM}/the-steep-part`,
  '25-data-here-data-there': `${ALBUM}/data-here-data-there`,
  '27-youre-absolutely-right': ALBUM,
} satisfies Record<string, string>;

function isMovedSong(song: string): song is keyof typeof MOVED_SONGS {
  return Object.hasOwn(MOVED_SONGS, song);
}

export function albumRedirect(pathname: string): string | undefined {
  const [, first = '', ...rest] = pathname.split('/');

  let letters: string;

  try {
    letters = decodeURIComponent(first)
      .toLowerCase()
      .replace(/[^a-z]/g, '');
  } catch {
    return undefined;
  }

  if (!ALBUM_SPELLINGS.has(letters)) return undefined;

  const song = rest.join('/');

  let target = ALBUM;

  if (isMovedSong(song)) target = MOVED_SONGS[song];
  else if (song) target = `${ALBUM}/${song}`;

  return target === pathname ? undefined : target;
}

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  const target = albumRedirect(url.pathname);

  if (target) return sendRedirect(event, target + url.search, 301);
});
