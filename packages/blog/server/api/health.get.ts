import { sql } from 'drizzle-orm';

export default defineEventHandler(async () => {
  await useDrizzle().run(sql`select 1`);

  return { ok: true };
});
