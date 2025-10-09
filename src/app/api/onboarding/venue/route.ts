import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Deprecated: This Next.js API route is kept for compatibility but will be removed.
  // Please call the Supabase Edge Function instead: /functions/v1/onboarding-venue
  // IMPORTANT: Avoid importing server-only clients (Prisma/Supabase service role) here so
  // the Next.js server bundle stays small for Cloudflare Pages.
  return NextResponse.json({ error: 'Deprecated. Use Supabase Edge Function /functions/v1/onboarding-venue' }, { status: 410 })
}
