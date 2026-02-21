import { getChatSkills } from '~~/server/utils/ai/skills-loader';

defineRouteMeta({
  openAPI: {
    description: 'List custom skills available in the chat UI.',
    tags: ['ai'],
  },
});

export default defineEventHandler(() => {
  return getChatSkills();
});
