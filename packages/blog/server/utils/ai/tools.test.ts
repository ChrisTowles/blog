import { describe, it, expect, beforeEach } from 'vitest';
import { chatTools, toolRegistry, executeTool, getToolsByNames, getAllToolNames } from './tools';

// Register tools before tests
beforeEach(() => {
  chatTools.forEach((tool) => toolRegistry.set(tool.name, tool));
});

describe('executeTool', () => {
  describe('searchBlogContent', () => {
    it('returns error when query is missing', async () => {
      const result = await executeTool('searchBlogContent', {});
      expect(result).toEqual({ error: 'Query is required' });
    });

    it('returns error when args undefined', async () => {
      const result = await executeTool('searchBlogContent', undefined);
      expect(result).toEqual({ error: 'Query is required' });
    });
  });

  describe('getCurrentDateTime', () => {
    it('returns date time info', async () => {
      const result = (await executeTool('getCurrentDateTime')) as Record<string, unknown>;
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('time');
      expect(result).toHaveProperty('iso');
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.timestamp).toBe('number');
    });
  });

  describe('getAuthorInfo', () => {
    it('returns author information', async () => {
      const result = (await executeTool('getAuthorInfo')) as Record<string, unknown>;
      expect(result).toHaveProperty('name', 'Chris Towles');
      expect(result).toHaveProperty('role');
      expect(result).toHaveProperty('topics');
      expect(Array.isArray(result.topics)).toBe(true);
    });
  });

  describe('getBlogTopics', () => {
    it('returns blog topics', async () => {
      const result = (await executeTool('getBlogTopics')) as Record<string, unknown>;
      expect(result).toHaveProperty('topics');
      expect(result).toHaveProperty('blogPath', '/blog');
      expect(Array.isArray(result.topics)).toBe(true);
    });
  });

  describe('getWeather', () => {
    it('returns error when location is missing', async () => {
      const result = await executeTool('getWeather', {});
      expect(result).toEqual({ error: 'Location is required' });
    });

    it('returns error when args undefined', async () => {
      const result = await executeTool('getWeather', undefined);
      expect(result).toEqual({ error: 'Location is required' });
    });
  });

  describe('rollDice', () => {
    it('returns error when notation is missing', async () => {
      const result = await executeTool('rollDice', {});
      expect(result).toEqual({ error: 'Dice notation is required' });
    });

    it('rolls dice with valid notation', async () => {
      const result = (await executeTool('rollDice', { notation: '2d6' })) as Record<
        string,
        unknown
      >;
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('rolls');
      expect(result).toHaveProperty('notation', '2d6');
      expect(typeof result.total).toBe('number');
      expect(result.total as number).toBeGreaterThanOrEqual(2);
      expect(result.total as number).toBeLessThanOrEqual(12);
    });

    it('includes label when provided', async () => {
      const result = (await executeTool('rollDice', {
        notation: '1d20',
        label: 'Attack roll',
      })) as Record<string, unknown>;
      expect(result).toHaveProperty('label', 'Attack roll');
    });
  });

  describe('unknown tool', () => {
    it('throws error for unknown tool name', async () => {
      await expect(executeTool('unknownTool', {})).rejects.toThrow('Unknown tool: unknownTool');
    });
  });

  describe('options.baseUrl', () => {
    it('passes baseUrl through to tool execution context', async () => {
      // Verify executeTool accepts options parameter without error
      const result = await executeTool(
        'getCurrentDateTime',
        {},
        { baseUrl: 'https://example.com' },
      );
      expect(result).toHaveProperty('date');
    });

    it('works with undefined options', async () => {
      const result = await executeTool('getCurrentDateTime', {});
      expect(result).toHaveProperty('date');
    });
  });
});

describe('getToolsByNames', () => {
  it('returns tools for valid names', () => {
    const tools = getToolsByNames(['getCurrentDateTime', 'getAuthorInfo']);
    expect(tools).toHaveLength(2);
    expect(tools.map((t) => t.name)).toContain('getCurrentDateTime');
    expect(tools.map((t) => t.name)).toContain('getAuthorInfo');
  });

  it('filters out invalid tool names', () => {
    const tools = getToolsByNames(['getCurrentDateTime', 'invalidTool']);
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe('getCurrentDateTime');
  });

  it('returns empty array for empty input', () => {
    const tools = getToolsByNames([]);
    expect(tools).toHaveLength(0);
  });
});

describe('getAllToolNames', () => {
  it('returns all registered tool names', () => {
    const names = getAllToolNames();
    expect(names).toContain('searchBlogContent');
    expect(names).toContain('getCurrentDateTime');
    expect(names).toContain('getAuthorInfo');
    expect(names).toContain('getBlogTopics');
    expect(names).toContain('getWeather');
    expect(names).toContain('rollDice');
  });

  it('returns same count as chatTools', () => {
    expect(getAllToolNames().length).toBe(chatTools.length);
  });
});

describe('chatTools structure', () => {
  it('has expected tool count', () => {
    expect(chatTools.length).toBe(6);
  });

  it('each tool has name, description, and input_schema', () => {
    for (const tool of chatTools) {
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.input_schema).toBeDefined();
      expect(tool.input_schema.type).toBe('object');
    }
  });

  it('tools with required params declare them in input_schema', () => {
    const searchTool = chatTools.find((t) => t.name === 'searchBlogContent');
    expect(searchTool?.input_schema.required).toContain('query');

    const weatherTool = chatTools.find((t) => t.name === 'getWeather');
    expect(weatherTool?.input_schema.required).toContain('location');

    const diceTool = chatTools.find((t) => t.name === 'rollDice');
    expect(diceTool?.input_schema.required).toContain('notation');
  });
});

describe('toolRegistry', () => {
  it('contains all chat tools after registration', () => {
    expect(toolRegistry.size).toBe(chatTools.length);
  });

  it('has searchBlogContent tool', () => {
    expect(toolRegistry.has('searchBlogContent')).toBe(true);
  });

  it('has getCurrentDateTime tool', () => {
    expect(toolRegistry.has('getCurrentDateTime')).toBe(true);
  });

  it('has rollDice tool', () => {
    expect(toolRegistry.has('rollDice')).toBe(true);
  });
});
