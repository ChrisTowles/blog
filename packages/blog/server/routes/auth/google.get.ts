import { log } from 'evlog';

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user: googleUser }) {
    const db = useDrizzle();
    const session = await getUserSession(event);

    let user = await db.query.users.findFirst({
      where: (u, { eq }) => and(eq(u.provider, 'google'), eq(u.providerId, googleUser.sub)),
    });
    if (!user) {
      [user] = await db
        .insert(tables.users)
        .values({
          id: session.id,
          name: googleUser.name || '',
          email: googleUser.email || '',
          avatar: googleUser.picture || '',
          username: googleUser.email?.split('@')[0] || '',
          provider: 'google',
          providerId: googleUser.sub,
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

    // The 02-oauth-redirect middleware stashed the caller's intended
    // landing page in a cookie before bouncing to Google. Google's
    // callback strips our `?redirect=` query, so we read from the
    // cookie instead. Falls back to `/` for direct visits.
    const redirectTo = getCookie(event, 'oauth_redirect') || '/';
    deleteCookie(event, 'oauth_redirect');
    return sendRedirect(event, redirectTo);
  },
  onError(event, error) {
    log.error({ tag: 'auth', message: 'Google OAuth error', error: String(error) });
    return sendRedirect(event, '/login');
  },
});
