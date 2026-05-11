import { log } from 'evlog';

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user: ghUser }) {
    const db = useDrizzle();
    const session = await getUserSession(event);

    let user = await db.query.users.findFirst({
      where: (u, { eq }) => and(eq(u.provider, 'github'), eq(u.providerId, ghUser.id.toString())),
    });
    if (!user) {
      [user] = await db
        .insert(tables.users)
        .values({
          id: session.id,
          name: ghUser.name || '',
          email: ghUser.email || '',
          avatar: ghUser.avatar_url || '',
          username: ghUser.login,
          provider: 'github',
          providerId: ghUser.id.toString(),
        })
        .returning();
    } else {
      // Assign anonymous chats with session id to user
      await db
        .update(tables.chats)
        .set({
          userId: user.id,
        })
        .where(eq(tables.chats.userId, session.id));
    }

    await setUserSession(event, { user });

    // See google.get.ts — the OAuth callback strips our `?redirect=`
    // query, so 02-oauth-redirect middleware stashed it in a cookie
    // before bouncing to GitHub. Read it back here.
    const redirectTo = getCookie(event, 'oauth_redirect') || '/';
    deleteCookie(event, 'oauth_redirect');
    return sendRedirect(event, redirectTo);
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    log.error({ tag: 'auth', message: 'GitHub OAuth error', error: String(error) });
    return sendRedirect(event, '/login');
  },
});
