# Research: Docker Compose Worktree-Friendly Setup

## Goal
Configure docker-compose to work with git worktrees, allowing multiple instances to run simultaneously without container name/port conflicts.

---

## Codebase Context

### Current docker-compose.yml
```yaml
services:
  postgres:
    image: pgvector/pgvector:pg17
    container_name: blog-postgres  # PROBLEM: hardcoded
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"  # PROBLEM: hardcoded port
    volumes:
      - postgres_data:/var/lib/postgresql/data  # PROBLEM: shared volume

volumes:
  postgres_data:
```

### Issues
1. **Hardcoded container name** - `blog-postgres` will conflict across worktrees
2. **Fixed port** - 5432 can only be used by one instance
3. **Shared volume name** - All worktrees share same data

---

## Expert Recommendations

### 1. COMPOSE_PROJECT_NAME Pattern (Recommended)

From [Oliver Davies](https://www.oliverdavies.uk/daily/2022/08/12/git-worktrees-docker-compose):

> Include the worktree name as a suffix - something like `my-project-main` or `my-project-staging` - and keep these stored in an `.env` file in each worktree's directory. As each worktree now has unique container names, I can have multiple instances running at the same time.

From [Docker Docs - Pre-defined Variables](https://docs.docker.com/compose/how-tos/environment-variables/envvars/):
> `COMPOSE_PROJECT_NAME` sets the project name. This value is prepended along with the service name to the container's name on startup.

### 2. Dynamic Port Mapping

From [Servers for Hackers](https://serversforhackers.com/c/div-variables-in-docker-compose):
> You can use variables like `${DB_PORT}:3306` in port mappings. Docker Compose will read a `.env` file and import variables.

From [Docker Docs - Interpolation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/):
> Use default values: `ports: - "127.0.0.1:${WEB_PORT:-80}:80"` sets up a service using environment variables with fallback defaults.

### 3. Volume Naming with Project Name

Docker automatically prefixes volumes with `COMPOSE_PROJECT_NAME`:
- Main worktree: `blog-main_postgres_data`
- Feature branch: `blog-feature-xyz_postgres_data`

Or explicitly name: `${COMPOSE_PROJECT_NAME}_postgres_data`

### 4. Remove container_name Directive

From [KubeBlogs](https://www.kubeblogs.com/how-to-avoid-issues-with-docker-compose-due-to-same-folder-names-project-isolation-best-practices/):
> Explicitly setting a unique project name in docker-compose.yml is the most reliable approach. Remove hardcoded `container_name` to let Compose auto-generate.

---

## Recommended Approach

### Option A: Minimal Changes (Simplest)

**docker-compose.yml changes:**
```yaml
services:
  postgres:
    image: pgvector/pgvector:pg17
    # Remove container_name - let COMPOSE_PROJECT_NAME handle it
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**.env additions:**
```env
# Unique per worktree - auto-prefixes containers and volumes
COMPOSE_PROJECT_NAME=blog-main

# Unique port per worktree (main=5432, worktree1=5433, etc.)
POSTGRES_PORT=5432
```

**DATABASE_URL update:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:${POSTGRES_PORT:-5432}/postgres
```

### Option B: Automatic Worktree Detection (Advanced)

Create a script that auto-detects worktree name:

```bash
# scripts/get-worktree-name.sh
basename "$(git rev-parse --show-toplevel)"
```

Or in `.envrc` (if using direnv):
```bash
export COMPOSE_PROJECT_NAME="blog-$(basename $(pwd))"
export POSTGRES_PORT=$((5432 + $(echo $(basename $(pwd)) | cksum | cut -d' ' -f1) % 100))
```

### Option C: Port Slot System

Define port ranges per worktree type:
- main: 5432
- feature branches: 5433-5440
- hotfix branches: 5441-5450

---

## Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| Option A | Simple, explicit, no magic | Manual .env setup per worktree |
| Option B | Automatic, DRY | Requires direnv or wrapper script |
| Option C | Organized, predictable | More complex to manage |

---

## My Recommendation

**Go with Option A** - explicit `.env` per worktree:

1. Simple to understand and debug
2. Works with existing tooling
3. Each worktree is fully isolated
4. DATABASE_URL stays in sync via variable interpolation

The `.env` file is already gitignored, so each worktree naturally has its own config.
