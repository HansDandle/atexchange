# Supabase Edge Functions (Onboarding)

This project supports moving server logic to Supabase Edge Functions so the frontend can be deployed to Cloudflare Pages while privileged DB operations run in Supabase with service-role credentials.

## Overview
- Client-side onboarding forms upload media to Supabase Storage and then POST profile data to Edge Functions.
- Edge Functions run with the `SUPABASE_SERVICE_ROLE_KEY` and can upsert into tables securely.

## Files added
- `supabase/functions/onboarding-band/index.ts`
- `supabase/functions/onboarding-venue/index.ts`

## Local development
1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Log in: `supabase login`
3. From the repo root, run:

```bash
supabase functions deploy onboarding-band --project-ref your-project-ref --no-verify-jwt
supabase functions deploy onboarding-venue --project-ref your-project-ref --no-verify-jwt
```

(When deploying to Supabase, set the environment variable `SUPABASE_SERVICE_ROLE_KEY` in the function's settings.)

## Notes
- Edge Functions are Deno-based. The example code uses the `@supabase/supabase-js` ESM build and `std/server`.
- Make sure to set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the function's environment.
- The example functions expect the client to send `supabaseId` where possible (or email/name) so the function can associate profiles with existing users.

## Post-deploy
- Update your frontend to call the function URL (provided by Supabase) or proxy via Cloudflare Pages functions if you prefer.
