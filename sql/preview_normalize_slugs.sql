-- Preview normalization (dry-run) for all profile tables
-- This is read-only and safe to run. It shows the normalized slug (preserves case and collapses hyphens)
-- and lists collisions that would exist after normalization.

-- 1) Normalize preview per-table (example for band_profiles)
SELECT
  id,
  slug AS current_slug,
  regexp_replace(slug, '-+', '-', 'g') AS step1_collapse_hyphens,
  regexp_replace(regexp_replace(slug, '-+', '-', 'g'), '(^-+|-+$)', '', 'g') AS normalized_slug
FROM band_profiles
WHERE slug IS NOT NULL
ORDER BY normalized_slug NULLS LAST, id;

-- 2) Duplicates after normalization (per-table)
WITH normalized AS (
  SELECT
    id,
    slug,
    regexp_replace(regexp_replace(slug, '-+', '-', 'g'), '(^-+|-+$)', '', 'g') AS normalized
  FROM band_profiles
  WHERE slug IS NOT NULL
)
SELECT normalized, array_agg(id) AS ids, count(*) AS cnt
FROM normalized
GROUP BY normalized
HAVING count(*) > 1
ORDER BY cnt DESC;

-- Repeat the two blocks above for each of the other profile tables:
-- dj_profiles, trivia_host_profiles, photographer_profiles, other_creative_profiles

-- Combined view (all tables) showing collisions by table
WITH t AS (
  SELECT 'band_profiles' AS tbl, id, slug FROM band_profiles
  UNION ALL
  SELECT 'dj_profiles', id, slug FROM dj_profiles
  UNION ALL
  SELECT 'trivia_host_profiles', id, slug FROM trivia_host_profiles
  UNION ALL
  SELECT 'photographer_profiles', id, slug FROM photographer_profiles
  UNION ALL
  SELECT 'other_creative_profiles', id, slug FROM other_creative_profiles
)
SELECT tbl, normalized, array_agg(id) AS ids, count(*) AS cnt FROM (
  SELECT tbl, id, slug,
    regexp_replace(regexp_replace(slug, '-+', '-', 'g'), '(^-+|-+$)', '', 'g') AS normalized
  FROM t
  WHERE slug IS NOT NULL
) s
GROUP BY tbl, normalized
HAVING count(*) > 1
ORDER BY tbl, cnt DESC;
