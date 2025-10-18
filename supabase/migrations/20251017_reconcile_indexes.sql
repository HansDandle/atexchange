-- Reconcile slug indexes: keep case-insensitive uniqueness on lower(slug), preserve stored case
-- 1) Fix duplicates where lower(slug) collides by appending -<id> to all but the first row
-- 2) Ensure unique index on lower(slug)
-- 3) Drop case-sensitive unique indexes
-- Run after taking a DB snapshot. This migration will convert stored slugs to
-- lowercase (and normalize hyphens), then deterministically fix duplicates by
-- appending -<id> to later rows. This aligns stored canonical slugs with the
-- server-side behavior which now writes lowercase canonical slugs.

DO $$
DECLARE
  rec RECORD;
  base TEXT;
BEGIN
  -- band_profiles: normalize to lowercase and collapse/truncate hyphens
  FOR rec IN SELECT id, slug FROM band_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE band_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;

  -- Then deduplicate (keep lowest id)
  FOR rec IN
    SELECT id FROM (
      SELECT id, row_number() OVER (PARTITION BY slug ORDER BY id) AS rn
      FROM band_profiles
      WHERE slug IS NOT NULL
    ) s WHERE rn > 1
  LOOP
    UPDATE band_profiles SET slug = slug || '-' || id::text WHERE id = rec.id;
  END LOOP;

  -- trivia_host_profiles
  FOR rec IN SELECT id, slug FROM trivia_host_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE trivia_host_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;
  FOR rec IN
    SELECT id FROM (
      SELECT id, row_number() OVER (PARTITION BY slug ORDER BY id) AS rn
      FROM trivia_host_profiles
      WHERE slug IS NOT NULL
    ) s WHERE rn > 1
  LOOP
    UPDATE trivia_host_profiles SET slug = slug || '-' || id::text WHERE id = rec.id;
  END LOOP;

  -- dj_profiles
  FOR rec IN SELECT id, slug FROM dj_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE dj_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;
  FOR rec IN
    SELECT id FROM (
      SELECT id, row_number() OVER (PARTITION BY slug ORDER BY id) AS rn
      FROM dj_profiles
      WHERE slug IS NOT NULL
    ) s WHERE rn > 1
  LOOP
    UPDATE dj_profiles SET slug = slug || '-' || id::text WHERE id = rec.id;
  END LOOP;

  -- photographer_profiles
  FOR rec IN SELECT id, slug FROM photographer_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE photographer_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;
  FOR rec IN
    SELECT id FROM (
      SELECT id, row_number() OVER (PARTITION BY slug ORDER BY id) AS rn
      FROM photographer_profiles
      WHERE slug IS NOT NULL
    ) s WHERE rn > 1
  LOOP
    UPDATE photographer_profiles SET slug = slug || '-' || id::text WHERE id = rec.id;
  END LOOP;

  -- other_creative_profiles
  FOR rec IN SELECT id, slug FROM other_creative_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE other_creative_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;
  FOR rec IN
    SELECT id FROM (
      SELECT id, row_number() OVER (PARTITION BY slug ORDER BY id) AS rn
      FROM other_creative_profiles
      WHERE slug IS NOT NULL
    ) s WHERE rn > 1
  LOOP
    UPDATE other_creative_profiles SET slug = slug || '-' || id::text WHERE id = rec.id;
  END LOOP;
END
$$;

-- Ensure unique index on lower(slug)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'band_profiles_slug_idx') THEN
    CREATE UNIQUE INDEX band_profiles_slug_idx ON band_profiles ((lower(slug)));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'trivia_host_profiles_slug_idx') THEN
    CREATE UNIQUE INDEX trivia_host_profiles_slug_idx ON trivia_host_profiles ((lower(slug)));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'dj_profiles_slug_idx') THEN
    CREATE UNIQUE INDEX dj_profiles_slug_idx ON dj_profiles ((lower(slug)));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'photographer_profiles_slug_idx') THEN
    CREATE UNIQUE INDEX photographer_profiles_slug_idx ON photographer_profiles ((lower(slug)));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'other_creative_profiles_slug_idx') THEN
    CREATE UNIQUE INDEX other_creative_profiles_slug_idx ON other_creative_profiles ((lower(slug)));
  END IF;
END
$$;

-- Drop case-sensitive unique indexes (we'll keep case-insensitive lower(slug) indexes)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'band_profiles_slug_cs_idx') THEN
    EXECUTE 'DROP INDEX band_profiles_slug_cs_idx';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'trivia_host_profiles_slug_cs_idx') THEN
    EXECUTE 'DROP INDEX trivia_host_profiles_slug_cs_idx';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'dj_profiles_slug_cs_idx') THEN
    EXECUTE 'DROP INDEX dj_profiles_slug_cs_idx';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'photographer_profiles_slug_cs_idx') THEN
    EXECUTE 'DROP INDEX photographer_profiles_slug_cs_idx';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'other_creative_profiles_slug_cs_idx') THEN
    EXECUTE 'DROP INDEX other_creative_profiles_slug_cs_idx';
  END IF;
END
$$;
