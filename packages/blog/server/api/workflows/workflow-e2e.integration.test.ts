/**
 * End-to-end integration tests for the workflow execution engine.
 * Each test creates a multi-node workflow (4+ nodes), saves it to the DB,
 * executes the full pipeline (topological sort → template resolution → Anthropic API),
 * and validates results in the database.
 *
 * Requires: DATABASE_URL and ANTHROPIC_API_KEY environment variables.
 */
import { eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { tables, useDrizzle } from '../../utils/drizzle';
import { cleanupDatabase, createTestUser } from '../../test-utils/db-helper';
import {
  topologicalSort,
  resolveTemplate,
  findTerminalNodes,
  executeNode,
  dbNodeToEngineNode,
} from '../../../../layers/workflows/server/utils/workflow-engine';

const hasDatabase = !!process.env.DATABASE_URL;
const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;

describe.skipIf(!hasDatabase || !hasAnthropicKey)(
  'Workflow E2E Integration (5 workflows × 4+ nodes)',
  () => {
    let db: ReturnType<typeof useDrizzle>;
    let testUser: typeof tables.users.$inferSelect;

    beforeAll(() => {
      db = useDrizzle();
    });

    beforeEach(async () => {
      await cleanupDatabase();
      testUser = await createTestUser();
    });

    afterAll(async () => {
      await cleanupDatabase();
    });

    /**
     * Helper: create a workflow with nodes and edges in the DB, then execute the full pipeline.
     * Returns the run record and all node execution records.
     */
    async function createAndExecuteWorkflow(config: {
      name: string;
      nodes: Array<{
        nodeId: string;
        type: string;
        label: string;
        prompt: string;
        model?: string;
        temperature?: number;
        maxTokens?: number;
        outputSchema: Record<string, unknown>;
      }>;
      edges: Array<{ source: string; target: string }>;
      input?: Record<string, unknown>;
    }) {
      // 1. Create workflow
      const [workflow] = await db
        .insert(tables.workflows)
        .values({ name: config.name, ownerId: testUser.id })
        .returning();
      expect(workflow).toBeDefined();

      // 2. Insert nodes
      for (const n of config.nodes) {
        await db.insert(tables.workflowNodes).values({
          workflowId: workflow!.id,
          nodeId: n.nodeId,
          type: n.type,
          label: n.label,
          prompt: n.prompt,
          model: n.model ?? 'claude-haiku-4-5',
          temperature: n.temperature ?? 0.3,
          maxTokens: n.maxTokens ?? 512,
          outputSchema: JSON.stringify(n.outputSchema),
          inputMapping: '{}',
        });
      }

      // 3. Insert edges
      for (const e of config.edges) {
        await db.insert(tables.workflowEdges).values({
          workflowId: workflow!.id,
          edgeId: `e_${e.source}_${e.target}`,
          sourceNode: e.source,
          targetNode: e.target,
        });
      }

      // 4. Create run
      const [run] = await db
        .insert(tables.workflowRuns)
        .values({
          workflowId: workflow!.id,
          status: 'running',
          inputData: config.input ? JSON.stringify(config.input) : null,
          startedAt: new Date().toISOString(),
        })
        .returning();
      expect(run).toBeDefined();

      // 5. Load nodes from DB and convert to engine format
      const dbNodes = await db
        .select()
        .from(tables.workflowNodes)
        .where(eq(tables.workflowNodes.workflowId, workflow!.id));

      const dbEdges = await db
        .select()
        .from(tables.workflowEdges)
        .where(eq(tables.workflowEdges.workflowId, workflow!.id));

      const engineNodes = dbNodes.map(dbNodeToEngineNode);
      const engineEdges = dbEdges.map((e) => ({
        source: e.sourceNode,
        target: e.targetNode,
      }));

      // 6. Topological sort
      const sortedNodes = topologicalSort(engineNodes, engineEdges);
      expect(sortedNodes).toHaveLength(config.nodes.length);

      // 7. Execute each node in order
      const nodeOutputs = new Map<string, Record<string, unknown>>();
      const workflowInput: Record<string, unknown> = config.input ?? {};

      for (const node of sortedNodes) {
        const result = await executeNode(node, run!.id, nodeOutputs, workflowInput);
        nodeOutputs.set(node.id, result.parsedOutput);

        // Verify execution was recorded
        expect(result.parsedOutput).toBeDefined();
        expect(result.tokensIn).toBeGreaterThan(0);
        expect(result.tokensOut).toBeGreaterThan(0);
        expect(result.latencyMs).toBeGreaterThan(0);
      }

      // 8. Aggregate terminal output
      const terminalNodes = findTerminalNodes(engineNodes, engineEdges);
      const finalOutput: Record<string, Record<string, unknown>> = {};
      for (const node of terminalNodes) {
        finalOutput[node.id] = nodeOutputs.get(node.id) ?? {};
      }

      // 9. Mark run complete
      await db
        .update(tables.workflowRuns)
        .set({
          status: 'completed',
          outputData: JSON.stringify(finalOutput),
          completedAt: new Date().toISOString(),
        })
        .where(eq(tables.workflowRuns.id, run!.id));

      // 10. Verify DB state
      const [completedRun] = await db
        .select()
        .from(tables.workflowRuns)
        .where(eq(tables.workflowRuns.id, run!.id));

      const nodeExecs = await db
        .select()
        .from(tables.nodeExecutions)
        .where(eq(tables.nodeExecutions.runId, run!.id));

      return {
        workflow: workflow!,
        run: completedRun!,
        nodeExecs,
        nodeOutputs,
        finalOutput,
      };
    }

    // ─────────────────────────────────────────────────────────
    // WORKFLOW 1: Content Pipeline (4 nodes, linear chain)
    //   Generate topic → Write outline → Draft paragraph → Summarize
    // ─────────────────────────────────────────────────────────
    it('Workflow 1: content pipeline (4-node linear chain)', async () => {
      const result = await createAndExecuteWorkflow({
        name: 'Content Pipeline',
        input: { subject: 'TypeScript generics' },
        nodes: [
          {
            nodeId: 'topic',
            type: 'prompt',
            label: 'Topic Generator',
            prompt:
              'Generate a specific blog post topic about {{input.subject}}. Be concise — one sentence.',
            outputSchema: {
              type: 'object',
              properties: { topic: { type: 'string', description: 'The blog post topic' } },
              required: ['topic'],
            },
          },
          {
            nodeId: 'outline',
            type: 'prompt',
            label: 'Outline Writer',
            prompt:
              'Write a 3-point outline for a blog post about: {{topic.topic}}. Keep each point under 15 words.',
            outputSchema: {
              type: 'object',
              properties: {
                points: {
                  type: 'array',
                  items: { type: 'string' },
                  description: '3 outline points',
                },
              },
              required: ['points'],
            },
          },
          {
            nodeId: 'draft',
            type: 'prompt',
            label: 'Paragraph Drafter',
            prompt:
              'Write one paragraph (3-4 sentences) about the first point: {{outline.points}}. Topic: {{topic.topic}}',
            outputSchema: {
              type: 'object',
              properties: {
                paragraph: { type: 'string', description: 'The drafted paragraph' },
              },
              required: ['paragraph'],
            },
          },
          {
            nodeId: 'summary',
            type: 'prompt',
            label: 'Summarizer',
            prompt: 'Summarize this paragraph in one sentence: {{draft.paragraph}}',
            outputSchema: {
              type: 'object',
              properties: {
                summary: { type: 'string', description: 'One-sentence summary' },
              },
              required: ['summary'],
            },
          },
        ],
        edges: [
          { source: 'topic', target: 'outline' },
          { source: 'outline', target: 'draft' },
          { source: 'draft', target: 'summary' },
        ],
      });

      // Assertions
      expect(result.run.status).toBe('completed');
      expect(result.nodeExecs).toHaveLength(4);
      expect(result.nodeExecs.every((e) => e.status === 'completed')).toBe(true);
      expect(result.finalOutput.summary?.summary).toBeDefined();
      expect(typeof result.finalOutput.summary?.summary).toBe('string');
      console.log('✓ Workflow 1 output:', JSON.stringify(result.finalOutput.summary, null, 2));
    }, 120_000);

    // ─────────────────────────────────────────────────────────
    // WORKFLOW 2: Data Analysis Pipeline (4 nodes, diamond shape)
    //   Parse data → [Analyze trends, Detect anomalies] → Synthesize report
    // ─────────────────────────────────────────────────────────
    it('Workflow 2: data analysis pipeline (4-node diamond DAG)', async () => {
      const result = await createAndExecuteWorkflow({
        name: 'Data Analysis Pipeline',
        input: {
          dataset: 'Monthly sales: Jan=120, Feb=135, Mar=90, Apr=200, May=180, Jun=310, Jul=150',
        },
        nodes: [
          {
            nodeId: 'parse',
            type: 'transform',
            label: 'Data Parser',
            prompt:
              'Parse this sales data into structured format: {{input.dataset}}. Extract each month and value.',
            outputSchema: {
              type: 'object',
              properties: {
                months: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Month names',
                },
                values: {
                  type: 'array',
                  items: { type: 'number' },
                  description: 'Sales values',
                },
                average: { type: 'number', description: 'Average sales' },
              },
              required: ['months', 'values', 'average'],
            },
          },
          {
            nodeId: 'trends',
            type: 'prompt',
            label: 'Trend Analyzer',
            prompt:
              'Analyze the trend in this monthly sales data. Months: {{parse.months}}, Values: {{parse.values}}, Average: {{parse.average}}. Describe the trend in 2 sentences.',
            outputSchema: {
              type: 'object',
              properties: {
                trend: {
                  type: 'string',
                  enum: ['increasing', 'decreasing', 'stable', 'volatile'],
                },
                description: { type: 'string', description: 'Trend description' },
              },
              required: ['trend', 'description'],
            },
          },
          {
            nodeId: 'anomalies',
            type: 'classifier',
            label: 'Anomaly Detector',
            prompt:
              'Identify anomalies in this data. Months: {{parse.months}}, Values: {{parse.values}}, Average: {{parse.average}}. Flag months where values deviate more than 40% from average.',
            outputSchema: {
              type: 'object',
              properties: {
                anomalies: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Months with anomalies',
                },
                severity: { type: 'string', enum: ['low', 'medium', 'high'] },
              },
              required: ['anomalies', 'severity'],
            },
          },
          {
            nodeId: 'report',
            type: 'prompt',
            label: 'Report Synthesizer',
            prompt:
              'Synthesize a brief report combining: Trend: {{trends.trend}} - {{trends.description}}. Anomalies: {{anomalies.anomalies}} (severity: {{anomalies.severity}}). Write 2-3 sentences.',
            outputSchema: {
              type: 'object',
              properties: {
                report: { type: 'string', description: 'Final synthesized report' },
                recommendation: { type: 'string', description: 'Action recommendation' },
              },
              required: ['report', 'recommendation'],
            },
          },
        ],
        edges: [
          { source: 'parse', target: 'trends' },
          { source: 'parse', target: 'anomalies' },
          { source: 'trends', target: 'report' },
          { source: 'anomalies', target: 'report' },
        ],
      });

      expect(result.run.status).toBe('completed');
      expect(result.nodeExecs).toHaveLength(4);
      expect(result.finalOutput.report?.report).toBeDefined();
      expect(result.finalOutput.report?.recommendation).toBeDefined();
      console.log('✓ Workflow 2 output:', JSON.stringify(result.finalOutput.report, null, 2));
    }, 120_000);

    // ─────────────────────────────────────────────────────────
    // WORKFLOW 3: Code Review Pipeline (5 nodes)
    //   Describe code → [Check style, Check logic, Check security] → Final review
    // ─────────────────────────────────────────────────────────
    it('Workflow 3: code review pipeline (5-node fan-out/fan-in)', async () => {
      const result = await createAndExecuteWorkflow({
        name: 'Code Review Pipeline',
        input: {
          code: 'function login(user, pass) { return db.query("SELECT * FROM users WHERE name=\'" + user + "\' AND pass=\'" + pass + "\'"); }',
        },
        nodes: [
          {
            nodeId: 'describe',
            type: 'prompt',
            label: 'Code Describer',
            prompt: 'Describe what this code does in 1-2 sentences: {{input.code}}',
            outputSchema: {
              type: 'object',
              properties: {
                description: { type: 'string' },
                language: { type: 'string' },
              },
              required: ['description', 'language'],
            },
          },
          {
            nodeId: 'style',
            type: 'validator',
            label: 'Style Checker',
            prompt:
              'Check code style issues: {{input.code}}. Description: {{describe.description}}. List 1-2 style issues.',
            outputSchema: {
              type: 'object',
              properties: {
                issues: { type: 'array', items: { type: 'string' } },
                pass: { type: 'boolean' },
              },
              required: ['issues', 'pass'],
            },
          },
          {
            nodeId: 'logic',
            type: 'validator',
            label: 'Logic Checker',
            prompt:
              'Check logic issues in: {{input.code}}. Description: {{describe.description}}. List 1-2 logic issues.',
            outputSchema: {
              type: 'object',
              properties: {
                issues: { type: 'array', items: { type: 'string' } },
                pass: { type: 'boolean' },
              },
              required: ['issues', 'pass'],
            },
          },
          {
            nodeId: 'security',
            type: 'validator',
            label: 'Security Checker',
            prompt:
              'Check security vulnerabilities in: {{input.code}}. Description: {{describe.description}}. List 1-2 security issues.',
            outputSchema: {
              type: 'object',
              properties: {
                issues: { type: 'array', items: { type: 'string' } },
                severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
              },
              required: ['issues', 'severity'],
            },
          },
          {
            nodeId: 'review',
            type: 'prompt',
            label: 'Final Review',
            prompt:
              'Combine these code review findings into a final verdict. Style: {{style.issues}} (pass: {{style.pass}}). Logic: {{logic.issues}} (pass: {{logic.pass}}). Security: {{security.issues}} (severity: {{security.severity}}). Give a 1-sentence verdict and overall grade.',
            outputSchema: {
              type: 'object',
              properties: {
                verdict: { type: 'string' },
                grade: { type: 'string', enum: ['A', 'B', 'C', 'D', 'F'] },
              },
              required: ['verdict', 'grade'],
            },
          },
        ],
        edges: [
          { source: 'describe', target: 'style' },
          { source: 'describe', target: 'logic' },
          { source: 'describe', target: 'security' },
          { source: 'style', target: 'review' },
          { source: 'logic', target: 'review' },
          { source: 'security', target: 'review' },
        ],
      });

      expect(result.run.status).toBe('completed');
      expect(result.nodeExecs).toHaveLength(5);
      expect(result.finalOutput.review?.verdict).toBeDefined();
      expect(['A', 'B', 'C', 'D', 'F']).toContain(result.finalOutput.review?.grade);
      // SQL injection should be caught
      expect(result.nodeOutputs.get('security')?.severity).not.toBe('low');
      console.log('✓ Workflow 3 output:', JSON.stringify(result.finalOutput.review, null, 2));
    }, 180_000);

    // ─────────────────────────────────────────────────────────
    // WORKFLOW 4: Translation Pipeline (4 nodes, linear)
    //   Detect language → Translate to Spanish → Back-translate to English → Compare
    // ─────────────────────────────────────────────────────────
    it('Workflow 4: translation round-trip (4-node linear chain)', async () => {
      const result = await createAndExecuteWorkflow({
        name: 'Translation Round-Trip',
        input: { text: 'The quick brown fox jumps over the lazy dog.' },
        nodes: [
          {
            nodeId: 'detect',
            type: 'classifier',
            label: 'Language Detector',
            prompt: 'Detect the language of this text: "{{input.text}}"',
            outputSchema: {
              type: 'object',
              properties: {
                language: { type: 'string', description: 'Detected language code (e.g. en, es)' },
                confidence: { type: 'number', description: 'Confidence 0-1' },
              },
              required: ['language', 'confidence'],
            },
          },
          {
            nodeId: 'translate_es',
            type: 'transform',
            label: 'Translate to Spanish',
            prompt:
              'Translate this {{detect.language}} text to Spanish: "{{input.text}}". Return only the translation.',
            outputSchema: {
              type: 'object',
              properties: {
                translation: { type: 'string', description: 'Spanish translation' },
              },
              required: ['translation'],
            },
          },
          {
            nodeId: 'translate_back',
            type: 'transform',
            label: 'Back-translate to English',
            prompt:
              'Translate this Spanish text back to English: "{{translate_es.translation}}". Return only the translation.',
            outputSchema: {
              type: 'object',
              properties: {
                translation: { type: 'string', description: 'English back-translation' },
              },
              required: ['translation'],
            },
          },
          {
            nodeId: 'compare',
            type: 'prompt',
            label: 'Quality Comparison',
            prompt:
              'Compare the original text "{{input.text}}" with the back-translated text "{{translate_back.translation}}". Rate the translation quality and note any differences.',
            outputSchema: {
              type: 'object',
              properties: {
                quality: { type: 'string', enum: ['excellent', 'good', 'fair', 'poor'] },
                differences: { type: 'string', description: 'Notable differences' },
                preservedMeaning: { type: 'boolean' },
              },
              required: ['quality', 'differences', 'preservedMeaning'],
            },
          },
        ],
        edges: [
          { source: 'detect', target: 'translate_es' },
          { source: 'translate_es', target: 'translate_back' },
          { source: 'translate_back', target: 'compare' },
        ],
      });

      expect(result.run.status).toBe('completed');
      expect(result.nodeExecs).toHaveLength(4);
      expect(result.nodeOutputs.get('detect')?.language).toMatch(/en/i);
      expect(result.nodeOutputs.get('translate_es')?.translation).toBeDefined();
      expect(result.finalOutput.compare?.quality).toBeDefined();
      expect(['excellent', 'good', 'fair', 'poor']).toContain(result.finalOutput.compare?.quality);
      console.log('✓ Workflow 4 output:', JSON.stringify(result.finalOutput.compare, null, 2));
    }, 120_000);

    // ─────────────────────────────────────────────────────────
    // WORKFLOW 5: Product Idea Evaluator (5 nodes, mixed DAG)
    //   Define idea → [Market analysis, Technical feasibility] → Risk assessment → Final score
    // ─────────────────────────────────────────────────────────
    it('Workflow 5: product idea evaluator (5-node mixed DAG)', async () => {
      const result = await createAndExecuteWorkflow({
        name: 'Product Idea Evaluator',
        input: {
          idea: 'AI-powered code review tool that integrates with GitHub and provides real-time feedback',
        },
        nodes: [
          {
            nodeId: 'define',
            type: 'prompt',
            label: 'Idea Definer',
            prompt:
              'Define this product idea concisely: {{input.idea}}. Identify the target audience and core value proposition in 2-3 sentences.',
            outputSchema: {
              type: 'object',
              properties: {
                definition: { type: 'string' },
                targetAudience: { type: 'string' },
                valueProposition: { type: 'string' },
              },
              required: ['definition', 'targetAudience', 'valueProposition'],
            },
          },
          {
            nodeId: 'market',
            type: 'prompt',
            label: 'Market Analyst',
            prompt:
              'Analyze the market for this product. Definition: {{define.definition}}. Target: {{define.targetAudience}}. Estimate market size and competition level.',
            outputSchema: {
              type: 'object',
              properties: {
                marketSize: { type: 'string', enum: ['small', 'medium', 'large'] },
                competition: { type: 'string', enum: ['low', 'medium', 'high'] },
                opportunity: { type: 'string', description: 'Brief opportunity statement' },
              },
              required: ['marketSize', 'competition', 'opportunity'],
            },
          },
          {
            nodeId: 'technical',
            type: 'prompt',
            label: 'Technical Feasibility',
            prompt:
              'Assess technical feasibility of: {{define.definition}}. Value: {{define.valueProposition}}. Consider implementation complexity and available technology.',
            outputSchema: {
              type: 'object',
              properties: {
                feasibility: { type: 'string', enum: ['easy', 'moderate', 'hard', 'very_hard'] },
                challenges: { type: 'array', items: { type: 'string' } },
                timeToMvp: { type: 'string', description: 'Estimated time to MVP' },
              },
              required: ['feasibility', 'challenges', 'timeToMvp'],
            },
          },
          {
            nodeId: 'risk',
            type: 'classifier',
            label: 'Risk Assessor',
            prompt:
              'Assess risks combining: Market (size: {{market.marketSize}}, competition: {{market.competition}}). Technical (feasibility: {{technical.feasibility}}, challenges: {{technical.challenges}}). List top 2 risks.',
            outputSchema: {
              type: 'object',
              properties: {
                riskLevel: { type: 'string', enum: ['low', 'medium', 'high'] },
                topRisks: { type: 'array', items: { type: 'string' } },
              },
              required: ['riskLevel', 'topRisks'],
            },
          },
          {
            nodeId: 'score',
            type: 'prompt',
            label: 'Final Scorer',
            prompt:
              'Score this product idea (1-10). Market: {{market.marketSize}} market, {{market.competition}} competition. Tech: {{technical.feasibility}} feasibility, MVP in {{technical.timeToMvp}}. Risk: {{risk.riskLevel}} ({{risk.topRisks}}). Give score and 1-sentence recommendation.',
            outputSchema: {
              type: 'object',
              properties: {
                score: { type: 'number', description: 'Score 1-10' },
                recommendation: { type: 'string' },
                goNoGo: { type: 'string', enum: ['go', 'no-go', 'pivot'] },
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
      });

      expect(result.run.status).toBe('completed');
      expect(result.nodeExecs).toHaveLength(5);
      expect(result.finalOutput.score?.score).toBeGreaterThanOrEqual(1);
      expect(result.finalOutput.score?.score).toBeLessThanOrEqual(10);
      expect(['go', 'no-go', 'pivot']).toContain(result.finalOutput.score?.goNoGo);
      console.log('✓ Workflow 5 output:', JSON.stringify(result.finalOutput.score, null, 2));
    }, 180_000);

    // ─────────────────────────────────────────────────────────
    // Verify template resolution works across all workflows
    // ─────────────────────────────────────────────────────────
    it('resolveTemplate handles nested object references correctly', () => {
      const outputs = new Map<string, Record<string, unknown>>();
      outputs.set('node1', { items: ['a', 'b', 'c'], count: 3 });

      const result = resolveTemplate('Found {{node1.count}} items: {{node1.items}}', outputs, {});
      expect(result).toContain('3');
      expect(result).toContain('["a","b","c"]');
    });
  },
);
