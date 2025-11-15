-- Migration: Remove UNIQUE constraint on userId in venue_profiles

-- Drop the unique constraint if it exists
ALTER TABLE public.venue_profiles
DROP CONSTRAINT IF EXISTS venue_profiles_userid_key;

-- Optionally, you can add a comment to clarify the change
-- COMMENT ON COLUMN public.venue_profiles."userId" IS 'Removed UNIQUE constraint to allow multiple venues per user.';