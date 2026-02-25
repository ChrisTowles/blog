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
