-- Allow multiple band profiles per user
-- 1) Drop any unique constraint or unique index on band_profiles.userId
-- 2) Ensure a (non-unique) index exists on userId for performance

DO $$
BEGIN
  -- If there is a constraint named band_profiles_userId_key, drop it
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'band_profiles' AND constraint_name = 'band_profiles_userId_key'
  ) THEN
    EXECUTE 'ALTER TABLE band_profiles DROP CONSTRAINT IF EXISTS band_profiles_userId_key';
  END IF;

  -- Drop possible unique index variants
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'band_profiles_userid_key') THEN
    EXECUTE 'DROP INDEX IF EXISTS public.band_profiles_userid_key';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'band_profiles_userId_key') THEN
    EXECUTE 'DROP INDEX IF EXISTS public.band_profiles_userId_key';
  END IF;

  -- Ensure a non-unique index exists for performance
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'band_profiles_userId_idx') THEN
    EXECUTE 'CREATE INDEX band_profiles_userId_idx ON band_profiles ("userId")';
  END IF;
END
$$;
