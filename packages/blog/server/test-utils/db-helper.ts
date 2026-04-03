import { useDrizzle, tables } from '../utils/drizzle';
import type { LoanApplicationData } from '~~/shared/loan-types';

export const COMPLETE_APPLICATION_DATA: LoanApplicationData = {
  fullName: 'Jane Doe',
  income: 95000,
  employmentType: 'employed',
  employer: 'Acme Corp',
  yearsEmployed: 5,
  creditScoreRange: '740-799',
  monthlyDebt: 1200,
  propertyValue: 450000,
  loanAmount: 360000,
  downPayment: 90000,
  propertyType: 'single-family',
  loanPurpose: 'purchase',
};

export async function cleanupDatabase() {
  const db = useDrizzle();
  await db.delete(tables.loanMessages);
  await db.delete(tables.loanReviews);
  await db.delete(tables.loanApplications);
  await db.delete(tables.messages);
  await db.delete(tables.chats);
  await db.delete(tables.documentChunks);
  await db.delete(tables.documents);
  // Reading tables (order matters for FK constraints)
  await db.delete(tables.readingSessions);
  await db.delete(tables.srsCards);
  await db.delete(tables.childPhonicsProgress);
  await db.delete(tables.stories);
  await db.delete(tables.childProfiles);
  await db.delete(tables.phonicsUnits);
  await db.delete(tables.workflows);
  await db.delete(tables.users);
}

export async function createTestUser(overrides?: Partial<typeof tables.users.$inferInsert>) {
  const db = useDrizzle();
  const [user] = await db
    .insert(tables.users)
    .values({
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'https://example.com/avatar.png',
      username: 'testuser',
      provider: 'github',
      providerId: '12345',
      ...overrides,
    })
    .returning();
  return user!;
}

export async function createTestChat(
  userId: string,
  overrides?: Partial<typeof tables.chats.$inferInsert>,
) {
  const db = useDrizzle();
  const [chat] = await db
    .insert(tables.chats)
    .values({
      title: 'Test Chat',
      userId,
      ...overrides,
    })
    .returning();
  return chat!;
}

export async function createTestMessage(
  chatId: string,
  overrides?: Partial<typeof tables.messages.$inferInsert>,
) {
  const db = useDrizzle();
  const [message] = await db
    .insert(tables.messages)
    .values({
      chatId,
      role: 'user',
      parts: [{ type: 'text', text: 'Test message' }],
      ...overrides,
    })
    .returning();
  return message!;
}

export async function createTestLoanApplication(
  userId: string,
  overrides?: Partial<typeof tables.loanApplications.$inferInsert>,
) {
  const db = useDrizzle();
  const [application] = await db
    .insert(tables.loanApplications)
    .values({
      userId,
      status: 'intake',
      applicationData: {},
      ...overrides,
    })
    .returning();
  return application!;
}

export async function createTestLoanReview(
  applicationId: string,
  overrides?: Partial<typeof tables.loanReviews.$inferInsert>,
) {
  const db = useDrizzle();
  const [review] = await db
    .insert(tables.loanReviews)
    .values({
      applicationId,
      reviewer: 'the-bank',
      decision: 'approved',
      analysis: 'test',
      flags: [],
      ...overrides,
    })
    .returning();
  return review!;
}

export async function createTestLoanMessage(
  applicationId: string,
  overrides?: Partial<typeof tables.loanMessages.$inferInsert>,
) {
  const db = useDrizzle();
  const [message] = await db
    .insert(tables.loanMessages)
    .values({
      applicationId,
      role: 'user',
      parts: [{ type: 'text', text: 'Test' }],
      ...overrides,
    })
    .returning();
  return message!;
}

export async function createTestChild(
  userId: string,
  overrides?: Partial<typeof tables.childProfiles.$inferInsert>,
) {
  const db = useDrizzle();
  const [child] = await db
    .insert(tables.childProfiles)
    .values({
      userId,
      name: 'Test Child',
      birthYear: 2018,
      currentPhase: 1,
      interests: ['dinosaurs'],
      ...overrides,
    })
    .returning();
  return child!;
}

export async function createTestStory(overrides?: Partial<typeof tables.stories.$inferInsert>) {
  const db = useDrizzle();
  const [story] = await db
    .insert(tables.stories)
    .values({
      title: 'Test Story',
      content: {
        pages: [
          {
            words: [
              { text: 'The', decodable: false, pattern: null, sightWord: true },
              { text: 'cat', decodable: true, pattern: 'CVC-short-a', sightWord: false },
              { text: 'sat', decodable: true, pattern: 'CVC-short-a', sightWord: false },
            ],
          },
        ],
      },
      theme: 'animals',
      targetPatterns: ['CVC-short-a'],
      targetWords: ['cat', 'sat'],
      decodabilityScore: 0.67,
      fleschKincaid: 1.0,
      aiGenerated: false,
      ...overrides,
    })
    .returning();
  return story!;
}

export async function createTestSrsCard(
  childId: number,
  overrides?: Partial<typeof tables.srsCards.$inferInsert>,
) {
  const db = useDrizzle();
  const [card] = await db
    .insert(tables.srsCards)
    .values({
      childId,
      cardType: 'phoneme',
      front: 'What sound does "sh" make?',
      back: '/ʃ/ as in "ship"',
      ...overrides,
    })
    .returning();
  return card!;
}

export async function createTestWorkflow(
  userId: string,
  overrides: Partial<{ name: string; description: string }> = {},
) {
  const db = useDrizzle();
  const [workflow] = await db
    .insert(tables.workflows)
    .values({
      name: overrides.name ?? 'Test Workflow',
      description: overrides.description,
      ownerId: userId,
    })
    .returning();
  return workflow!;
}

export async function createTestWorkflowNode(
  workflowId: string,
  nodeId: string,
  overrides: Partial<{ label: string; type: string }> = {},
) {
  const db = useDrizzle();
  const [node] = await db
    .insert(tables.workflowNodes)
    .values({
      workflowId,
      nodeId,
      type: overrides.type ?? 'prompt',
      label: overrides.label ?? 'Test Node',
      prompt: 'What is {{input.query}}?',
      outputSchema:
        '{"type":"object","properties":{"answer":{"type":"string"}},"required":["answer"]}',
      inputMapping: '{}',
    })
    .returning();
  return node!;
}
