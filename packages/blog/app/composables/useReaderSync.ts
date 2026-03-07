/**
 * Cross-panel communication composable for the split-panel reader.
 * Phase 1: Tracks active slug and provides context for chat.
 * Phase 2: Will add highlight/cross-reference support.
 */
export function useReaderSync() {
  const activeSlug = useState<string>('reader-active-slug', () => '');
  const postTitle = useState<string>('reader-post-title', () => '');

  function setActivePost(slug: string, title: string) {
    activeSlug.value = slug;
    postTitle.value = title;
  }

  /** Build a system-level context hint for the chat based on the active post */
  const chatContext = computed(() => {
    if (!postTitle.value) return '';
    return `The user is currently reading the blog post "${postTitle.value}". You can search the blog for related content using the searchBlog tool.`;
  });

  return {
    activeSlug: computed(() => activeSlug.value),
    postTitle: computed(() => postTitle.value),
    chatContext,
    setActivePost,
  };
}
