-- Add slug columns and unique indexes to profile tables
DO $$
BEGIN
  -- band_profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'band_profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE band_profiles ADD COLUMN slug TEXT;
  END IF;

  -- trivia_host_profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trivia_host_profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE trivia_host_profiles ADD COLUMN slug TEXT;
  END IF;

  -- dj_profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dj_profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE dj_profiles ADD COLUMN slug TEXT;
  END IF;

  -- photographer_profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'photographer_profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE photographer_profiles ADD COLUMN slug TEXT;
  END IF;

  -- other_creative_profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'other_creative_profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE other_creative_profiles ADD COLUMN slug TEXT;
  END IF;
END
$$;

-- Create unique indexes on lower(slug) to ensure case-insensitive uniqueness per table
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

-- Backfill slugs from existing names where null
DO $$
DECLARE
  r RECORD;
  function_slug TEXT;
BEGIN
  -- band_profiles
  FOR r IN SELECT id, "bandName" FROM band_profiles WHERE "slug" IS NULL OR "slug" = '' LOOP
    function_slug := lower(regexp_replace(trim(r."bandName"), '[^a-z0-9]+', '-', 'g'));
    UPDATE band_profiles SET "slug" = function_slug WHERE id = r.id;
  END LOOP;

  -- trivia hosts
  FOR r IN SELECT id, "hostName" FROM trivia_host_profiles WHERE "slug" IS NULL OR "slug" = '' LOOP
    function_slug := lower(regexp_replace(trim(r."hostName"), '[^a-z0-9]+', '-', 'g'));
    UPDATE trivia_host_profiles SET "slug" = function_slug WHERE id = r.id;
  END LOOP;

  -- djs
  FOR r IN SELECT id, "djName" FROM dj_profiles WHERE "slug" IS NULL OR "slug" = '' LOOP
    function_slug := lower(regexp_replace(trim(r."djName"), '[^a-z0-9]+', '-', 'g'));
    UPDATE dj_profiles SET "slug" = function_slug WHERE id = r.id;
  END LOOP;

  -- photographers
  FOR r IN SELECT id, "photographerName" FROM photographer_profiles WHERE "slug" IS NULL OR "slug" = '' LOOP
    function_slug := lower(regexp_replace(trim(r."photographerName"), '[^a-z0-9]+', '-', 'g'));
    UPDATE photographer_profiles SET "slug" = function_slug WHERE id = r.id;
  END LOOP;

  -- other creatives
  FOR r IN SELECT id, "creativeName" FROM other_creative_profiles WHERE "slug" IS NULL OR "slug" = '' LOOP
    function_slug := lower(regexp_replace(trim(r."creativeName"), '[^a-z0-9]+', '-', 'g'));
    UPDATE other_creative_profiles SET "slug" = function_slug WHERE id = r.id;
  END LOOP;
END
$$;
