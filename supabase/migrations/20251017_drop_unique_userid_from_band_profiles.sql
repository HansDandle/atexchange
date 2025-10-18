-- Drop any UNIQUE constraint or UNIQUE index on band_profiles.userId regardless of name
-- This is defensive: it queries the catalog for constraints/indexes that involve the column

DO $$
DECLARE
  c RECORD;
  i RECORD;
BEGIN
  -- Drop UNIQUE constraints on band_profiles.userId
  FOR c IN
    SELECT tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_name = kcu.table_name
    WHERE tc.table_name = 'band_profiles'
      AND kcu.column_name = 'userId'
      AND tc.constraint_type = 'UNIQUE'
  LOOP
    RAISE NOTICE 'Dropping constraint %', c.constraint_name;
    EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT IF EXISTS %I', 'band_profiles', c.constraint_name);
  END LOOP;

  -- Drop UNIQUE indexes that reference userId (in case a unique index was created directly)
  FOR i IN
    SELECT indexname
    FROM pg_indexes
    WHERE tablename = 'band_profiles'
      AND indexdef ILIKE '%("userId")%'
      AND indexdef ILIKE '%UNIQUE%'
  LOOP
    RAISE NOTICE 'Dropping index %', i.indexname;
    EXECUTE format('DROP INDEX IF EXISTS public.%I', i.indexname);
  END LOOP;

  -- Ensure a non-unique index exists for performance
  -- Use a case-insensitive check because PostgreSQL stores relnames in lowercase
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE lower(relname) = lower('band_profiles_userId_idx')) THEN
    EXECUTE 'CREATE INDEX band_profiles_userId_idx ON band_profiles ("userId")';
  END IF;
END
$$;
