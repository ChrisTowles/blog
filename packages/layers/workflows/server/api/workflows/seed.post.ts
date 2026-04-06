import { eq, and } from 'drizzle-orm';
import { MODEL_HAIKU } from '~~/shared/models';

defineRouteMeta({
  openAPI: {
    description: 'Seed example workflows for the authenticated user',
    tags: ['workflows'],
  },
});

interface SeedNode {
  id: string;
  type: 'prompt' | 'transform' | 'classifier' | 'validator';
  label: string;
  x: number;
  y: number;
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  outputSchema: Record<string, unknown>;
}

interface SeedEdge {
  source: string;
  target: string;
}

interface SeedWorkflow {
  name: string;
  description: string;
  nodes: SeedNode[];
  edges: SeedEdge[];
}

const EXAMPLES: SeedWorkflow[] = [
  // ── 1. Product Idea Evaluator (5 nodes, diamond + merge) ──
  {
    name: 'Product Idea Evaluator',
    description:
      'Evaluate a product idea across market, technical, and risk dimensions, then score it.',
    nodes: [
      {
        id: 'define',
        type: 'prompt',
        label: 'Define Idea',
        x: 300,
        y: 0,
        prompt:
          'Define this product idea concisely: {{input.idea}}. Identify the target audience and core value proposition in 2-3 sentences.',
        outputSchema: {
          type: 'object',
          properties: {
            definition: { type: 'string', description: 'Concise product definition' },
            targetAudience: { type: 'string', description: 'Who is this for' },
            valueProposition: { type: 'string', description: 'Core value' },
          },
          required: ['definition', 'targetAudience', 'valueProposition'],
        },
      },
      {
        id: 'market',
        type: 'classifier',
        label: 'Market Analysis',
        x: 100,
        y: 200,
        prompt:
          'Analyze the market for: {{define.definition}}. Target: {{define.targetAudience}}. Estimate market size and competition.',
        temperature: 0.3,
        outputSchema: {
          type: 'object',
          properties: {
            marketSize: {
              type: 'string',
              description: 'Market size estimate',
              enum: ['small', 'medium', 'large'],
            },
            competition: {
              type: 'string',
              description: 'Competition level',
              enum: ['low', 'medium', 'high'],
            },
            opportunity: { type: 'string', description: 'Brief opportunity statement' },
          },
          required: ['marketSize', 'competition', 'opportunity'],
        },
      },
      {
        id: 'technical',
        type: 'classifier',
        label: 'Technical Feasibility',
        x: 500,
        y: 200,
        prompt:
          'Assess technical feasibility of: {{define.definition}}. Value: {{define.valueProposition}}. Consider complexity and available technology.',
        temperature: 0.3,
        outputSchema: {
          type: 'object',
          properties: {
            feasibility: {
              type: 'string',
              description: 'How hard to build',
              enum: ['easy', 'moderate', 'hard', 'very_hard'],
            },
            challenges: { type: 'array', description: 'Key technical challenges' },
            timeToMvp: { type: 'string', description: 'Estimated time to MVP' },
          },
          required: ['feasibility', 'challenges', 'timeToMvp'],
        },
      },
      {
        id: 'risk',
        type: 'validator',
        label: 'Risk Assessment',
        x: 300,
        y: 400,
        prompt:
          'Assess risks. Market: size={{market.marketSize}}, competition={{market.competition}}. Technical: feasibility={{technical.feasibility}}, challenges={{technical.challenges}}. List top 2 risks.',
        temperature: 0.2,
        outputSchema: {
          type: 'object',
          properties: {
            riskLevel: {
              type: 'string',
              description: 'Overall risk',
              enum: ['low', 'medium', 'high'],
            },
            topRisks: { type: 'array', description: 'Top 2 risks' },
          },
          required: ['riskLevel', 'topRisks'],
        },
      },
      {
        id: 'score',
        type: 'prompt',
        label: 'Final Score',
        x: 300,
        y: 600,
        prompt:
          'Score this product idea 1-10. Market: {{market.marketSize}} size, {{market.competition}} competition. Tech: {{technical.feasibility}}, MVP in {{technical.timeToMvp}}. Risk: {{risk.riskLevel}} ({{risk.topRisks}}). Give score and recommendation.',
        outputSchema: {
          type: 'object',
          properties: {
            score: { type: 'number', description: 'Score 1-10' },
            recommendation: { type: 'string', description: 'One-sentence recommendation' },
            goNoGo: {
              type: 'string',
              description: 'Final verdict',
              enum: ['go', 'no-go', 'pivot'],
            },
          },
          required: ['score', 'recommendation', 'goNoGo'],
        },
      },
    ],
    edges: [
      { source: 'define', target: 'market' },
      { source: 'define', target: 'technical' },
      { source: 'market', target: 'risk' },
      { source: 'technical', target: 'risk' },
      { source: 'risk', target: 'score' },
    ],
  },

  // ── 2. Translation Quality Check (4 nodes, linear) ──
  {
    name: 'Translation Quality Check',
    description:
      'Translate text to Spanish, back-translate to English, then score the round-trip quality.',
    nodes: [
      {
        id: 'detect',
        type: 'classifier',
        label: 'Detect Language',
        x: 300,
        y: 0,
        prompt: 'Detect the language of: "{{input.text}}"',
        temperature: 0.1,
        outputSchema: {
          type: 'object',
          properties: {
            language: { type: 'string', description: 'ISO language code (e.g. en, es, fr)' },
            confidence: { type: 'number', description: 'Confidence 0-1' },
          },
          required: ['language', 'confidence'],
        },
      },
      {
        id: 'translate',
        type: 'transform',
        label: 'Translate to Spanish',
        x: 300,
        y: 180,
        prompt:
          'Translate this {{detect.language}} text to Spanish: "{{input.text}}". Return only the translation.',
        temperature: 0.3,
        outputSchema: {
          type: 'object',
          properties: {
            translation: { type: 'string', description: 'Spanish translation' },
          },
          required: ['translation'],
        },
      },
      {
        id: 'backtranslate',
        type: 'transform',
        label: 'Back-translate',
        x: 300,
        y: 360,
        prompt:
          'Translate this Spanish text back to English: "{{translate.translation}}". Return only the translation.',
        temperature: 0.3,
        outputSchema: {
          type: 'object',
          properties: {
            translation: { type: 'string', description: 'English back-translation' },
          },
          required: ['translation'],
        },
      },
      {
        id: 'compare',
        type: 'prompt',
        label: 'Quality Score',
        x: 300,
        y: 540,
        prompt:
          'Compare the original "{{input.text}}" with the back-translation "{{backtranslate.translation}}". Rate quality and note differences.',
        outputSchema: {
          type: 'object',
          properties: {
            quality: {
              type: 'string',
              description: 'Translation quality',
              enum: ['excellent', 'good', 'fair', 'poor'],
            },
            differences: { type: 'string', description: 'Notable differences' },
            preservedMeaning: { type: 'boolean', description: 'Core meaning preserved' },
          },
          required: ['quality', 'differences', 'preservedMeaning'],
        },
      },
    ],
    edges: [
      { source: 'detect', target: 'translate' },
      { source: 'translate', target: 'backtranslate' },
      { source: 'backtranslate', target: 'compare' },
    ],
  },

  // ── 4. Blog Post Generator (4 nodes, linear) ──
  {
    name: 'Blog Post Generator',
    description: 'Generate a blog post from a topic: title → outline → draft → SEO metadata.',
    nodes: [
      {
        id: 'title',
        type: 'prompt',
        label: 'Generate Title',
        x: 300,
        y: 0,
        prompt:
          'Generate a compelling blog post title about: {{input.topic}}. Make it specific and engaging.',
        outputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Blog post title' },
            hook: { type: 'string', description: 'One-sentence hook for the reader' },
          },
          required: ['title', 'hook'],
        },
      },
      {
        id: 'outline',
        type: 'prompt',
        label: 'Write Outline',
        x: 300,
        y: 180,
        prompt:
          'Write a 4-section outline for: "{{title.title}}". Hook: {{title.hook}}. Each section should have a heading and 1-sentence description.',
        outputSchema: {
          type: 'object',
          properties: {
            sections: { type: 'array', description: 'Outline sections with headings' },
          },
          required: ['sections'],
        },
      },
      {
        id: 'draft',
        type: 'prompt',
        label: 'Draft Post',
        x: 300,
        y: 360,
        prompt:
          'Write a short blog post (~200 words) based on this outline: {{outline.sections}}. Title: "{{title.title}}". Use a conversational, developer-friendly tone.',
        maxTokens: 2048,
        outputSchema: {
          type: 'object',
          properties: {
            markdown: { type: 'string', description: 'Blog post in markdown' },
            wordCount: { type: 'number', description: 'Approximate word count' },
          },
          required: ['markdown', 'wordCount'],
        },
      },
      {
        id: 'seo',
        type: 'transform',
        label: 'SEO Metadata',
        x: 300,
        y: 540,
        prompt:
          'Generate SEO metadata for this blog post. Title: "{{title.title}}". Content: {{draft.markdown}}',
        temperature: 0.3,
        outputSchema: {
          type: 'object',
          properties: {
            metaDescription: {
              type: 'string',
              description: 'SEO meta description (under 160 chars)',
            },
            keywords: { type: 'array', description: '5-8 SEO keywords' },
            ogTitle: { type: 'string', description: 'Open Graph title' },
          },
          required: ['metaDescription', 'keywords', 'ogTitle'],
        },
      },
    ],
    edges: [
      { source: 'title', target: 'outline' },
      { source: 'outline', target: 'draft' },
      { source: 'draft', target: 'seo' },
    ],
  },

  // ── 5. Customer Feedback Analyzer (4 nodes, diamond) ──
  {
    name: 'Customer Feedback Analyzer',
    description:
      'Parse customer feedback, analyze sentiment and topics in parallel, then synthesize a report.',
    nodes: [
      {
        id: 'parse',
        type: 'transform',
        label: 'Parse Feedback',
        x: 300,
        y: 0,
        prompt:
          'Parse this customer feedback into structured form: "{{input.feedback}}". Extract the core complaint or praise, and any specific product/feature mentioned.',
        temperature: 0.2,
        outputSchema: {
          type: 'object',
          properties: {
            coreMessage: { type: 'string', description: 'Core complaint or praise' },
            productMentioned: { type: 'string', description: 'Product or feature mentioned' },
            customerIntent: { type: 'string', description: 'What the customer wants' },
          },
          required: ['coreMessage', 'productMentioned', 'customerIntent'],
        },
      },
      {
        id: 'sentiment',
        type: 'classifier',
        label: 'Sentiment Analysis',
        x: 100,
        y: 200,
        prompt:
          'Classify the sentiment of: "{{parse.coreMessage}}". Customer intent: {{parse.customerIntent}}.',
        temperature: 0.1,
        outputSchema: {
          type: 'object',
          properties: {
            sentiment: {
              type: 'string',
              description: 'Overall sentiment',
              enum: ['very_negative', 'negative', 'neutral', 'positive', 'very_positive'],
            },
            urgency: {
              type: 'string',
              description: 'Response urgency',
              enum: ['low', 'medium', 'high', 'critical'],
            },
          },
          required: ['sentiment', 'urgency'],
        },
      },
      {
        id: 'topics',
        type: 'classifier',
        label: 'Topic Extraction',
        x: 500,
        y: 200,
        prompt:
          'Extract topics from: "{{parse.coreMessage}}". Product: {{parse.productMentioned}}. Categorize into department.',
        temperature: 0.2,
        outputSchema: {
          type: 'object',
          properties: {
            topics: { type: 'array', description: 'Key topics mentioned' },
            department: {
              type: 'string',
              description: 'Responsible department',
              enum: ['engineering', 'support', 'product', 'billing', 'other'],
            },
          },
          required: ['topics', 'department'],
        },
      },
      {
        id: 'report',
        type: 'prompt',
        label: 'Synthesis Report',
        x: 300,
        y: 420,
        prompt:
          'Synthesize a feedback report. Core: {{parse.coreMessage}}. Sentiment: {{sentiment.sentiment}} (urgency: {{sentiment.urgency}}). Topics: {{topics.topics}}. Department: {{topics.department}}. Write a 2-sentence summary and suggest a response action.',
        outputSchema: {
          type: 'object',
          properties: {
            summary: { type: 'string', description: 'Two-sentence feedback summary' },
            suggestedAction: { type: 'string', description: 'Recommended response action' },
            priority: {
              type: 'string',
              description: 'Priority level',
              enum: ['low', 'medium', 'high'],
            },
          },
          required: ['summary', 'suggestedAction', 'priority'],
        },
      },
    ],
    edges: [
      { source: 'parse', target: 'sentiment' },
      { source: 'parse', target: 'topics' },
      { source: 'sentiment', target: 'report' },
      { source: 'topics', target: 'report' },
    ],
  },
  // ── 6. Dad Joke Generator (3 nodes, linear) ──
  {
    name: 'Dad Joke Generator',
    description: 'Generate a dad joke on a topic, rate its quality, then refine it.',
    nodes: [
      {
        id: 'generate',
        type: 'prompt',
        label: 'Generate Joke',
        x: 300,
        y: 0,
        prompt:
          'Write an original dad joke about: {{input.topic}}. It should be family-friendly, use a pun or wordplay, and make someone groan. Do NOT use the atoms joke ("they make up everything") or any other overused classic. Be creative.',
        temperature: 0.9,
        outputSchema: {
          type: 'object',
          properties: {
            joke: { type: 'string', description: 'The dad joke' },
          },
          required: ['joke'],
        },
      },
      {
        id: 'rate',
        type: 'validator',
        label: 'Rate Joke',
        x: 300,
        y: 250,
        prompt:
          'Rate this dad joke on a scale of 1-10 for groan-worthiness and explain why:\n\n{{generate.joke}}',
        temperature: 0.3,
        maxTokens: 256,
        outputSchema: {
          type: 'object',
          properties: {
            score: { type: 'number', description: 'Groan-worthiness score 1-10' },
            reason: { type: 'string', description: 'Why this score' },
          },
          required: ['score', 'reason'],
        },
      },
      {
        id: 'refine',
        type: 'prompt',
        label: 'Refine Joke',
        x: 300,
        y: 500,
        prompt:
          'Here is a dad joke that scored {{rate.score}}/10:\n\n{{generate.joke}}\n\nFeedback: {{rate.reason}}\n\nIf the score is below 7, improve it. If 7 or above, keep it but add a bonus follow-up joke. Return the final joke(s).',
        temperature: 0.8,
        outputSchema: {
          type: 'object',
          properties: {
            finalJoke: { type: 'string', description: 'The final dad joke' },
            bonusJoke: { type: 'string', description: 'Optional bonus joke' },
          },
          required: ['finalJoke'],
        },
      },
    ],
    edges: [
      { source: 'generate', target: 'rate' },
      { source: 'rate', target: 'refine' },
    ],
  },
];

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();
  const created: Array<{ id: string; name: string }> = [];

  for (const example of EXAMPLES) {
    // Skip if this user already has a workflow with this name
    const [existing] = await db
      .select()
      .from(tables.workflows)
      .where(
        and(eq(tables.workflows.name, example.name), eq(tables.workflows.ownerId, session.user.id)),
      )
      .limit(1);

    if (existing) {
      // Ensure existing seeded workflows are marked as templates
      if (!existing.isPublished) {
        await db
          .update(tables.workflows)
          .set({ isPublished: 1 })
          .where(eq(tables.workflows.id, existing.id));
      }
      continue;
    }

    // Create workflow
    const [workflow] = await db
      .insert(tables.workflows)
      .values({
        name: example.name,
        description: example.description,
        ownerId: session.user.id,
        isPublished: 1,
        viewport: JSON.stringify({ x: 0, y: 0, zoom: 0.85 }),
      })
      .returning();

    if (!workflow) continue;

    // Insert nodes
    await db.insert(tables.workflowNodes).values(
      example.nodes.map((n) => ({
        workflowId: workflow.id,
        nodeId: n.id,
        type: n.type,
        label: n.label,
        positionX: n.x,
        positionY: n.y,
        prompt: n.prompt,
        model: n.model ?? MODEL_HAIKU,
        temperature: n.temperature ?? 0.7,
        maxTokens: n.maxTokens ?? 1024,
        outputSchema: JSON.stringify(n.outputSchema),
        inputMapping: '{}',
      })),
    );

    // Insert edges
    if (example.edges.length > 0) {
      await db.insert(tables.workflowEdges).values(
        example.edges.map((e) => ({
          workflowId: workflow.id,
          edgeId: `e_${e.source}_${e.target}`,
          sourceNode: e.source,
          targetNode: e.target,
        })),
      );
    }

    created.push({ id: workflow.id, name: workflow.name });
  }

  return { seeded: created.length, workflows: created };
});
