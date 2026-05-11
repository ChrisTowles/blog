-- Add slug column to typing_groups so public URLs use a human-readable handle
-- instead of a numeric primary key. Format: <first-6-of-creator-userId>-<slugified-name>.
-- The integer id stays as the internal foreign-key target.

ALTER TABLE "typing_groups" ADD COLUMN IF NOT EXISTS "slug" varchar(96);

-- Backfill: for each existing group, compute slug from the earliest guardian's
-- userId (first 6 chars) plus the slugified group name. Drizzle quotes the
-- camelCase columns, so reference them as "userId" / "joinedAt".
WITH base AS (
  SELECT
    g.id,
    (
      SELECT LEFT(m."userId", 6) || '-' || LOWER(
        TRIM(
          BOTH '-' FROM REGEXP_REPLACE(g.name, '[^a-zA-Z0-9]+', '-', 'g')
        )
      )
      FROM "typing_group_members" m
      WHERE m."groupId" = g.id
      ORDER BY m."joinedAt" ASC
      LIMIT 1
    ) AS base_slug
  FROM "typing_groups" g
),
dedup AS (
  SELECT
    id,
    base_slug,
    ROW_NUMBER() OVER (PARTITION BY base_slug ORDER BY id) AS rn
  FROM base
)
UPDATE "typing_groups" g
SET slug = CASE
  WHEN d.rn = 1 THEN d.base_slug
  ELSE d.base_slug || '-' || d.rn
END
FROM dedup d
WHERE g.id = d.id AND d.base_slug IS NOT NULL;

-- Safety net for any group that somehow has no guardian member yet.
UPDATE "typing_groups" SET slug = 'group-' || id WHERE slug IS NULL;

ALTER TABLE "typing_groups" ALTER COLUMN "slug" SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'typing_groups_slug_unique'
  ) THEN
    ALTER TABLE "typing_groups" ADD CONSTRAINT "typing_groups_slug_unique" UNIQUE ("slug");
  END IF;
END $$;
