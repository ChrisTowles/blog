import type { KnowledgeBase } from './types'

/**
 * All Posts - Full blog content access
 */
export const allPostsKB: KnowledgeBase = {
  slug: 'all-posts',
  name: 'All Blog Posts',
  description: 'Access to all blog content without filtering',
  filter: {
    // No filter = all documents
  },
  isBuiltIn: true
}

/**
 * AI/Claude Posts - AI-focused content
 */
export const aiPostsKB: KnowledgeBase = {
  slug: 'ai-posts',
  name: 'AI & Claude Posts',
  description: 'Blog posts about AI, Claude, and machine learning',
  filter: {
    slugPatterns: ['*claude*', '*ai*', '*anthropic*', '*ollama*', '*comfy*'],
    titlePatterns: ['AI', 'Claude', 'Anthropic', 'Machine Learning', 'LLM']
  },
  isBuiltIn: true
}

/**
 * Vue/Nuxt Posts - Frontend focused content
 */
export const vueNuxtPostsKB: KnowledgeBase = {
  slug: 'vue-nuxt-posts',
  name: 'Vue & Nuxt Posts',
  description: 'Blog posts about Vue.js, Nuxt, and frontend development',
  filter: {
    slugPatterns: ['*vue*', '*nuxt*', '*vite*'],
    titlePatterns: ['Vue', 'Nuxt', 'Vite', 'Frontend', 'Component']
  },
  isBuiltIn: true
}

/**
 * DevOps Posts - Infrastructure and tooling
 */
export const devopsPostsKB: KnowledgeBase = {
  slug: 'devops-posts',
  name: 'DevOps & Infrastructure',
  description: 'Blog posts about DevOps, cloud, and infrastructure',
  filter: {
    slugPatterns: ['*terraform*', '*gcp*', '*aws*', '*docker*', '*devops*'],
    titlePatterns: ['Terraform', 'GCP', 'AWS', 'Docker', 'Cloud', 'CI/CD']
  },
  isBuiltIn: true
}

/**
 * All default knowledge bases
 */
export const defaultKnowledgeBases: KnowledgeBase[] = [
  allPostsKB,
  aiPostsKB,
  vueNuxtPostsKB,
  devopsPostsKB
]
