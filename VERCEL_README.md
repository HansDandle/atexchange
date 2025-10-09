Deploying to Vercel

This branch is prepared for Vercel deployments.

- Build command: npm run vercel:build
- Output: Vercel will detect Next.js automatically.

Environment variables required:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_ONBOARDING_BAND_FN
- NEXT_PUBLIC_ONBOARDING_VENUE_FN

Do not add your SUPABASE service role key to Vercel; keep it only in Supabase Edge Function secrets.
