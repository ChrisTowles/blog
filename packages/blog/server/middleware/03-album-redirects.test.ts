import { describe, expect, it } from 'vitest';
import { albumRedirect } from './03-album-redirects';

describe('albumRedirect', () => {
  it('sends misspelled album names to the album', () => {
    expect(albumRedirect('/i-can-t-clap')).toBe('/i-cant-clap');
    expect(albumRedirect("/i-can't-calp")).toBe('/i-cant-clap');
    expect(albumRedirect('/i-can%27t-clap')).toBe('/i-cant-clap');
    expect(albumRedirect('/I-Cant-Clap')).toBe('/i-cant-clap');
  });

  it('drops the track number from old song URLs', () => {
    expect(albumRedirect('/i-cant-clap/24-the-steep-part')).toBe('/i-cant-clap/the-steep-part');
    expect(albumRedirect('/i-can-t-clap/04-read-the-diff')).toBe('/i-cant-clap/read-the-diff');
  });

  it('sends songs that left the album to the album', () => {
    expect(albumRedirect('/i-cant-clap/27-youre-absolutely-right')).toBe('/i-cant-clap');
  });

  it('keeps a misspelled album path on the same song', () => {
    expect(albumRedirect('/i-can-t-clap/the-steep-part')).toBe('/i-cant-clap/the-steep-part');
  });

  it('leaves correct and unrelated URLs alone', () => {
    expect(albumRedirect('/i-cant-clap')).toBeUndefined();
    expect(albumRedirect('/i-cant-clap/the-steep-part')).toBeUndefined();
    expect(albumRedirect('/blog/how-i-cant-clap-gets-made')).toBeUndefined();
    expect(albumRedirect('/%E0%A4%A')).toBeUndefined();
  });
});
