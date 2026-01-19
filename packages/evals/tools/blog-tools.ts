/**
 * Blog tools for Promptfoo testing
 * Standalone implementations that don't depend on blog package
 * Using Anthropic API tool format
 */

// TODO: FOr starting out with Promptfoo, we are using a simplified fake tool implementation here.
// In the future, we can switch to using the real RAG pipeline and real implementations.

/**
 * Get tool definitions for Promptfoo
 * This function is called by Promptfoo to get the list of tools
 */
export function getTools() {
  return [
    {
      name: 'mcp__blog-tools__searchBlogContent',
      description:
        'Search blog posts for relevant information. Use this when users ask about topics that might be covered in the blog, such as AI/Claude, Vue/Nuxt, DevOps, best practices, or any technical topic. Returns relevant excerpts with source URLs.',
      input_schema: {
        type: 'object' as const,
        properties: {
          query: {
            type: 'string',
            description: 'The search query to find relevant blog content',
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'mcp__blog-tools__getCurrentDateTime',
      description:
        'Get the current date and time. Use when user asks about today, current time, or needs temporal context.',
      input_schema: {
        type: 'object' as const,
        properties: {},
      },
    },
    {
      name: 'mcp__blog-tools__getAuthorInfo',
      description:
        'Get information about Chris Towles, the blog author. Use when users ask about the author, his background, or expertise.',
      input_schema: {
        type: 'object' as const,
        properties: {},
      },
    },
    {
      name: 'mcp__blog-tools__getBlogTopics',
      description:
        'Get a list of topics covered on the blog. Use to help users discover content areas.',
      input_schema: {
        type: 'object' as const,
        properties: {},
      },
    },
    {
      name: 'mcp__blog-tools__getWeather',
      description:
        'Get current weather and forecast for a location. Use when the user asks about weather conditions.',
      input_schema: {
        type: 'object' as const,
        properties: {
          location: {
            type: 'string',
            description: 'City name (e.g., "London", "New York", "Tokyo")',
          },
        },
        required: ['location'],
      },
    },
    {
      name: 'mcp__blog-tools__rollDice',
      description:
        'Roll dice for tabletop gaming (D&D, etc). Use when users want to roll dice. Supports notation like "2d6", "1d20+5", "4d6kh3", "4d6 drop lowest", "2d20 advantage".',
      input_schema: {
        type: 'object' as const,
        properties: {
          notation: {
            type: 'string',
            description:
              'Dice notation (e.g., "2d6", "1d20+5", "4d6kh3", "4d6 drop lowest", "2d20 advantage")',
          },
          label: {
            type: 'string',
            description: 'Optional label for the roll (e.g., "Attack roll", "Fireball damage")',
          },
        },
        required: ['notation'],
      },
    },
  ];
}

/**
 * Tool execution handlers
 * These actually execute when the model calls the tools
 */
export async function executeToolCall(toolName: string, toolInput: any): Promise<any> {
  switch (toolName) {
    case 'mcp__blog-tools__searchBlogContent':
      return executeSearchBlogContent(toolInput.query);

    case 'mcp__blog-tools__getCurrentDateTime':
      return executeGetCurrentDateTime();

    case 'mcp__blog-tools__getAuthorInfo':
      return executeGetAuthorInfo();

    case 'mcp__blog-tools__getBlogTopics':
      return executeGetBlogTopics();

    case 'mcp__blog-tools__getWeather':
      return executeGetWeather(toolInput.location);

    case 'mcp__blog-tools__rollDice':
      return executeRollDice(toolInput.notation, toolInput.label);

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

/**
 * Search blog content - uses real RAG pipeline
 */
async function executeSearchBlogContent(query: string) {
  try {
    // Import RAG dynamically to avoid circular deps
    const { retrieveRAG } = await import('../../blog/server/utils/rag/retrieve.ts');

    const results = await retrieveRAG(query, { topK: 5 });

    if (!results || results.length === 0) {
      return {
        results: [],
        hint: 'No blog content found for this query. The database may be empty or no content matches the search terms.',
      };
    }

    return {
      results: results.map((r) => ({
        content: r.content,
        source: r.documentTitle,
        url: r.documentUrl,
      })),
      hint: 'When referencing these results, use markdown links like [Title](url) to cite sources.',
    };
  } catch (error) {
    console.error('Search failed:', error);
    return {
      results: [],
      hint: 'Search temporarily unavailable. The database may not be accessible.',
    };
  }
}

/**
 * Get current date and time
 */
async function executeGetCurrentDateTime() {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: now.toLocaleTimeString('en-US'),
    iso: now.toISOString(),
    timestamp: now.getTime(),
  };
}

/**
 * Get author information
 */
async function executeGetAuthorInfo() {
  return {
    name: 'Chris Towles',
    role: 'Software Engineer',
    topics: ['Vue', 'Nuxt', 'TypeScript', 'AI/ML', 'DevOps', 'Cloud Infrastructure'],
    blogUrl: 'https://chris.towles.dev',
    github: 'https://github.com/christowles',
  };
}

/**
 * Get blog topics
 */
async function executeGetBlogTopics() {
  return {
    topics: [
      {
        name: 'AI & Machine Learning',
        keywords: ['Claude', 'Anthropic', 'AI SDK', 'Ollama', 'ComfyUI', 'context engineering'],
      },
      {
        name: 'Vue & Nuxt',
        keywords: ['Vue 3', 'Nuxt', 'Vite', 'Vitest', 'composition API'],
      },
      {
        name: 'DevOps & Infrastructure',
        keywords: ['Terraform', 'GCP', 'AWS', 'Docker', 'CI/CD'],
      },
      {
        name: 'Developer Tools',
        keywords: ['VS Code', 'Git', 'pnpm', 'conventional commits', 'dotfiles'],
      },
      {
        name: 'Best Practices',
        keywords: ['testing', 'TypeScript', 'code review', 'ITIL'],
      },
    ],
    blogPath: '/blog',
  };
}

/**
 * Get weather - uses Open-Meteo API
 */
async function executeGetWeather(location: string) {
  try {
    // Geocode location
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`,
    );
    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return { error: `Location "${location}" not found` };
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Fetch weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`,
    );
    const weather = await weatherRes.json();

    const current = weather.current;
    const daily = weather.daily;

    return {
      location: `${name}, ${country}`,
      temperature: Math.round(current.temperature_2m),
      temperatureHigh: Math.round(daily.temperature_2m_max[0]),
      temperatureLow: Math.round(daily.temperature_2m_min[0]),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      condition: getWeatherCondition(current.weather_code),
      dailyForecast: daily.time.map((date: string, i: number) => ({
        day: i === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(daily.temperature_2m_max[i]),
        low: Math.round(daily.temperature_2m_min[i]),
        condition: getWeatherCondition(daily.weather_code[i]),
      })),
    };
  } catch (error) {
    return { error: 'Failed to fetch weather data', details: (error as Error).message };
  }
}

function getWeatherCondition(code: number): { icon: string; text: string } {
  const conditions: Record<number, { icon: string; text: string }> = {
    0: { icon: 'i-lucide-sun', text: 'Clear sky' },
    1: { icon: 'i-lucide-sun', text: 'Mainly clear' },
    2: { icon: 'i-lucide-cloud-sun', text: 'Partly cloudy' },
    3: { icon: 'i-lucide-cloud', text: 'Overcast' },
  };
  return conditions[code] || { icon: 'i-lucide-cloud', text: 'Unknown' };
}

/**
 * Roll dice
 */
async function executeRollDice(notation: string, label?: string) {
  // Simple implementation - just parse basic XdY format
  const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/);

  if (!match) {
    return { error: `Invalid dice notation: "${notation}"` };
  }

  const count = parseInt(match[1]!);
  const sides = parseInt(match[2]!);
  const modifier = match[3] ? parseInt(match[3]) : 0;

  if (count < 1 || count > 100 || sides < 2 || sides > 100) {
    return { error: 'Invalid dice parameters' };
  }

  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push({
      sides,
      result: Math.floor(Math.random() * sides) + 1,
      kept: true,
    });
  }

  const total = rolls.reduce((sum, r) => sum + r.result, 0) + modifier;

  return {
    notation,
    label,
    rolls,
    modifier,
    total,
    breakdown:
      rolls.map((r) => r.result).join(' + ') +
      (modifier !== 0 ? ` ${modifier >= 0 ? '+' : ''}${modifier}` : '') +
      ` = ${total}`,
  };
}
