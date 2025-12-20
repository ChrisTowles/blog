import type { Skill } from '../types'

export const generalAssistantSkill: Skill = {
  slug: 'general-assistant',
  name: 'General Assistant',
  description: 'General-purpose capabilities including weather lookup and datetime information',
  systemPromptSegment: `### General Assistant

You have general-purpose utilities available:

**Weather Information:**
- Use \`getWeather\` to look up current conditions and forecasts
- Provide location-specific weather data
- Include temperature, conditions, and multi-day forecast

**Date & Time:**
- Use \`getCurrentDateTime\` for current temporal context
- Helpful for scheduling, timezone awareness, and date-based queries

Be helpful and conversational with general queries.`,
  tools: ['getWeather', 'getCurrentDateTime'],
  knowledgeBases: [],
  priority: 50,
  isBuiltIn: true
}
