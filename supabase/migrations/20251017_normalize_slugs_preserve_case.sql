-- Normalize existing slugs to lowercase and collapse consecutive hyphens.
-- This keeps stored canonical slugs consistent with server-side behavior.

DO $$
DECLARE
  rec RECORD;
  base TEXT;
BEGIN
  -- band_profiles
  FOR rec IN SELECT id, slug FROM band_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE band_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;

  -- trivia_host_profiles
  FOR rec IN SELECT id, slug FROM trivia_host_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE trivia_host_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;

  -- dj_profiles
  FOR rec IN SELECT id, slug FROM dj_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE dj_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;

  -- photographer_profiles
  FOR rec IN SELECT id, slug FROM photographer_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE photographer_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;

  -- other_creative_profiles
  FOR rec IN SELECT id, slug FROM other_creative_profiles WHERE slug IS NOT NULL LOOP
    base := lower(regexp_replace(rec.slug, '-+', '-', 'g'));
    base := regexp_replace(base, '(^-+|-+$)', '', 'g');
    IF base IS DISTINCT FROM rec.slug THEN
      UPDATE other_creative_profiles SET slug = base WHERE id = rec.id;
    END IF;
  END LOOP;
END
$$;
