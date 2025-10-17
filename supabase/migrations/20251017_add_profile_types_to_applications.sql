-- Add support for new profile types in applications table
-- Add columns if they don't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'triviaHostProfileId'
  ) THEN
    ALTER TABLE applications ADD COLUMN "triviaHostProfileId" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'djProfileId'
  ) THEN
    ALTER TABLE applications ADD COLUMN "djProfileId" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'photographerProfileId'
  ) THEN
    ALTER TABLE applications ADD COLUMN "photographerProfileId" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'otherCreativeProfileId'
  ) THEN
    ALTER TABLE applications ADD COLUMN "otherCreativeProfileId" TEXT;
  END IF;
END
$$;

-- Add foreign key constraints for new profile types
-- Add constraints only if they don't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'applications_triviahostprofileid_fkey'
  ) THEN
    EXECUTE 'ALTER TABLE applications ADD CONSTRAINT applications_triviahostprofileid_fkey FOREIGN KEY ("triviaHostProfileId") REFERENCES trivia_host_profiles(id) ON DELETE CASCADE';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'applications_djprofileid_fkey'
  ) THEN
    EXECUTE 'ALTER TABLE applications ADD CONSTRAINT applications_djprofileid_fkey FOREIGN KEY ("djProfileId") REFERENCES dj_profiles(id) ON DELETE CASCADE';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'applications_photographerprofileid_fkey'
  ) THEN
    EXECUTE 'ALTER TABLE applications ADD CONSTRAINT applications_photographerprofileid_fkey FOREIGN KEY ("photographerProfileId") REFERENCES photographer_profiles(id) ON DELETE CASCADE';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'applications_othercreativeprofileid_fkey'
  ) THEN
    EXECUTE 'ALTER TABLE applications ADD CONSTRAINT applications_othercreativeprofileid_fkey FOREIGN KEY ("otherCreativeProfileId") REFERENCES other_creative_profiles(id) ON DELETE CASCADE';
  END IF;
END
$$;

-- Make bandProfileId nullable for consistency
ALTER TABLE applications
ALTER COLUMN "bandProfileId" DROP NOT NULL;
