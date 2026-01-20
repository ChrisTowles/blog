# Server Routes (Nitro) - Complete Guide

Comprehensive guide to Nitro server routes, API endpoints, and server-side patterns in Nuxt 4.

## Table of Contents

- [File-Based Routing](#file-based-routing)
- [Event Handlers](#event-handlers)
- [Request Utilities](#request-utilities)
- [Response Utilities](#response-utilities)
- [Database Integration](#database-integration)
- [Authentication Patterns](#authentication-patterns)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [WebSocket Support](#websocket-support)

## File-Based Routing

### Route Structure

```
server/
├── api/                      # API routes (/api/*)
│   ├── auth/
│   │   ├── login.post.ts     → POST /api/auth/login
│   │   ├── logout.post.ts    → POST /api/auth/logout
│   │   └── session.get.ts    → GET /api/auth/session
│   ├── users/
│   │   ├── index.get.ts      → GET /api/users
│   │   ├── index.post.ts     → POST /api/users
│   │   ├── [id].get.ts       → GET /api/users/:id
│   │   ├── [id].patch.ts     → PATCH /api/users/:id
│   │   └── [id].delete.ts    → DELETE /api/users/:id
│   └── health.get.ts         → GET /api/health
│
├── routes/                   # Non-API routes
│   ├── rss.xml.ts            → GET /rss.xml
│   └── sitemap.xml.ts        → GET /sitemap.xml
│
├── middleware/               # Server middleware
│   ├── auth.ts
│   └── cors.ts
│
├── plugins/                  # Nitro plugins
│   └── database.ts
│
└── utils/                    # Server utilities
    ├── db.ts
    └── auth.ts
```

### HTTP Method Suffixes

```typescript
// GET
users.get.ts; // or users/index.get.ts

// POST
users.post.ts; // or users/index.post.ts

// PATCH
users / [id].patch.ts;

// PUT
users / [id].put.ts;

// DELETE
users / [id].delete.ts;

// No suffix = handles all methods
users.ts;
```

### Dynamic Routes

```typescript
// File: server/api/users/[id].get.ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  return { id };
});
// GET /api/users/123 → { id: '123' }

// File: server/api/posts/[category]/[slug].get.ts
export default defineEventHandler((event) => {
  const category = getRouterParam(event, 'category');
  const slug = getRouterParam(event, 'slug');
  return { category, slug };
});
// GET /api/posts/tech/my-post → { category: 'tech', slug: 'my-post' }
```

### Catch-All Routes

```typescript
// File: server/api/proxy/[...path].ts
export default defineEventHandler((event) => {
  const path = getRouterParam(event, 'path');
  return { path };
});
// GET /api/proxy/users/123/posts → { path: 'users/123/posts' }
```

## Event Handlers

### Basic Handler

```typescript
export default defineEventHandler((event) => {
  return {
    message: 'Hello World',
    timestamp: new Date().toISOString(),
  };
});
```

### Async Handler

```typescript
export default defineEventHandler(async (event) => {
  const users = await db.users.findMany();

  return {
    data: users,
    count: users.length,
  };
});
```

### Typed Handler

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

export default defineEventHandler(async (event): Promise<User[]> => {
  const users = await db.users.findMany();
  return users;
});
```

## Request Utilities

### getRouterParam

```typescript
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const params = getRouterParams(event); // All params

  return { id, params };
});
```

### getQuery

```typescript
export default defineEventHandler((event) => {
  const query = getQuery(event); // ?page=1&limit=10

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  return { page, limit };
});
```

### readBody

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return { received: body };
});

// With type safety
interface CreateUserBody {
  name: string;
  email: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserBody>(event);
  // body is typed!
});
```

### getHeader(s)

```typescript
export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization');
  const headers = getHeaders(event);

  return { auth, headers };
});
```

### getCookie / parseCookies

```typescript
export default defineEventHandler((event) => {
  const sessionId = getCookie(event, 'sessionId');
  const cookies = parseCookies(event);

  return { sessionId, cookies };
});
```

### getMethod

```typescript
export default defineEventHandler((event) => {
  const method = getMethod(event);
  // 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', etc.

  if (method === 'POST') {
    // Handle POST
  }
});
```

### getRequestURL

```typescript
export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  return {
    path: url.pathname,
    search: url.search,
    host: url.host,
  };
});
```

## Response Utilities

### setResponseStatus

```typescript
export default defineEventHandler((event) => {
  setResponseStatus(event, 201);
  return { message: 'Created' };
});
```

### setHeader(s)

```typescript
export default defineEventHandler((event) => {
  setHeader(event, 'X-Custom-Header', 'value');

  setHeaders(event, {
    'X-Custom-Header': 'value',
    'X-Another-Header': 'another',
  });

  return { message: 'Headers set' };
});
```

### setCookie / deleteCookie

```typescript
export default defineEventHandler((event) => {
  setCookie(event, 'sessionId', '123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return { message: 'Cookie set' };
});

export default defineEventHandler((event) => {
  deleteCookie(event, 'sessionId');
  return { message: 'Cookie deleted' };
});
```

### sendRedirect

```typescript
export default defineEventHandler((event) => {
  return sendRedirect(event, '/login', 302);
});
```

### sendStream

```typescript
import { createReadStream } from 'fs';

export default defineEventHandler((event) => {
  const stream = createReadStream('./large-file.pdf');
  return sendStream(event, stream);
});
```

## Database Integration

### D1 with Drizzle ORM

```typescript
// server/utils/db.ts
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../database/schema';

export const useDB = (event: H3Event) => {
  const { cloudflare } = event.context;

  if (!cloudflare?.env?.DB) {
    throw createError({
      statusCode: 500,
      message: 'Database not configured',
    });
  }

  return drizzle(cloudflare.env.DB, { schema });
};

// server/api/users/index.get.ts
import { users } from '~/server/database/schema';

export default defineEventHandler(async (event) => {
  const db = useDB(event);
  const allUsers = await db.select().from(users);
  return allUsers;
});

// server/api/users/[id].get.ts
import { eq } from 'drizzle-orm';
import { users } from '~/server/database/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDB(event);

  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    });
  }

  return user;
});
```

## Authentication Patterns

### Session-Based Auth

```typescript
// server/utils/session.ts
import { nanoid } from 'nanoid';

interface Session {
  userId: string;
  createdAt: number;
  expiresAt: number;
}

export const createSession = async (event: H3Event, userId: string): Promise<string> => {
  const sessionId = nanoid();
  const session: Session = {
    userId,
    createdAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };

  // Store in KV
  const { cloudflare } = event.context;
  await cloudflare.env.KV.put(`session:${sessionId}`, JSON.stringify(session), {
    expirationTtl: 60 * 60 * 24 * 7,
  });

  setCookie(event, 'sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return sessionId;
};

export const getSession = async (event: H3Event): Promise<Session | null> => {
  const sessionId = getCookie(event, 'sessionId');
  if (!sessionId) return null;

  const { cloudflare } = event.context;
  const session = await cloudflare.env.KV.get(`session:${sessionId}`, 'json');

  if (!session || session.expiresAt < Date.now()) {
    return null;
  }

  return session;
};

export const deleteSession = async (event: H3Event): Promise<void> => {
  const sessionId = getCookie(event, 'sessionId');

  if (sessionId) {
    const { cloudflare } = event.context;
    await cloudflare.env.KV.delete(`session:${sessionId}`);
    deleteCookie(event, 'sessionId');
  }
};
```

### Require Auth Utility

```typescript
// server/utils/requireAuth.ts
export const requireAuth = async (event: H3Event) => {
  const session = await getSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required',
    });
  }

  const db = useDB(event);
  const user = await db.users.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'User not found',
    });
  }

  event.context.user = user;
  return user;
};

// Usage in protected routes
export default defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  return { user };
});
```

## Middleware

### Server Middleware

```typescript
// server/middleware/cors.ts
export default defineEventHandler((event) => {
  setHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  if (getMethod(event) === 'OPTIONS') {
    setResponseStatus(event, 204);
    return '';
  }
});

// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;

  // Skip auth for public routes
  if (path.startsWith('/api/public/')) {
    return;
  }

  const session = await getSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required',
    });
  }

  event.context.session = session;
});
```

## Error Handling

### Creating Errors

```typescript
export default defineEventHandler((event) => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    message: 'Resource not found',
    data: { resource: 'user', id: '123' },
  });
});
```

### Structured Error Handling

```typescript
export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const user = await db.users.findUnique({ where: { id } });

    if (!user) {
      throw createError({
        statusCode: 404,
        message: `User with ID ${id} not found`,
      });
    }

    return user;
  } catch (error) {
    if (error.statusCode) {
      throw error; // Re-throw HTTP errors
    }

    console.error('Unexpected error:', error);

    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});
```

## Validation

### Zod Validation

```typescript
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(10),
  published: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = CreatePostSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Validation failed',
      data: result.error.flatten(),
    });
  }

  const post = await db.posts.create({
    data: result.data,
  });

  return post;
});
```

## WebSocket Support

### Enable WebSockets

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    experimental: {
      websocket: true,
    },
  },
});
```

### WebSocket Route

```typescript
// server/api/ws.ts
export default defineWebSocketHandler({
  open(peer) {
    console.log('Client connected:', peer.id);
    peer.send({ type: 'connected', message: 'Welcome!' });
  },

  message(peer, message) {
    console.log('Received:', message);

    // Echo back
    peer.send({ type: 'echo', data: message });

    // Broadcast to all
    peer.publish('chat', message);
  },

  close(peer) {
    console.log('Client disconnected:', peer.id);
  },

  error(peer, error) {
    console.error('WebSocket error:', error);
  },
});
```

## Best Practices

1. **Use file-based routing** for clear structure
2. **Add method suffixes** (.get, .post, etc.)
3. **Validate all inputs** with Zod or similar
4. **Handle errors gracefully** with proper status codes
5. **Use TypeScript** for type safety
6. **Secure sensitive routes** with auth middleware
7. **Return consistent response formats**
8. **Log errors** for debugging
9. **Use database transactions** for data integrity
10. **Cache responses** when appropriate

## Common Pitfalls

- Missing validation
- Not handling errors
- Exposing sensitive data
- Missing authentication
- Not using TypeScript
- Inconsistent response formats
- Missing CORS headers
- Not cleaning up resources

---

**Last Updated**: 2025-11-09
