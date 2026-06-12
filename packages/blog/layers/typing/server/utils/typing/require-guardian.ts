/**
 * `requireGuardian(event, target)` — guardian-only auth helper.
 *
 * Validates:
 *   1. There is a logged-in session (otherwise 401).
 *   2. The session user is a guardian of the target group (or the group
 *      that owns the target learner).
 *
 * Returns `{ userId, groupId }` on success, throws an HTTP error otherwise.
 *
 * Public typing routes (lessons list, anonymous progress writes to
 * localStorage) bypass this helper entirely.
 */
import type { H3Event } from 'h3';
import { isGuardianOfGroup, isGuardianOfLearner, findLearnerById } from './groups';

export type RequireGuardianTarget =
  | { groupId: number; learnerId?: undefined }
  | { learnerId: number; groupId?: undefined };

export async function requireGuardian(
  event: H3Event,
  target: RequireGuardianTarget,
): Promise<{ userId: string; groupId: number }> {
  const session = await getUserSession(event);
  const userId = session.user?.id;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in required' });
  }

  if (target.groupId !== undefined) {
    const ok = await isGuardianOfGroup(userId, target.groupId);
    if (!ok) {
      throw createError({ statusCode: 403, statusMessage: 'Not a guardian of this group' });
    }
    return { userId, groupId: target.groupId };
  }

  if (target.learnerId !== undefined) {
    const ok = await isGuardianOfLearner(userId, target.learnerId);
    if (!ok) {
      throw createError({ statusCode: 403, statusMessage: 'Not a guardian of this learner' });
    }
    const learner = await findLearnerById(target.learnerId);
    if (!learner) {
      throw createError({ statusCode: 404, statusMessage: 'Learner not found' });
    }
    return { userId, groupId: learner.groupId };
  }

  throw createError({ statusCode: 400, statusMessage: 'Missing groupId or learnerId' });
}
