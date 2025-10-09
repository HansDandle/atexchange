import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  // Deprecated: This Next.js API route is kept for compatibility but will be removed.
  // Please call the Supabase Edge Function instead: /functions/v1/onboarding-band
  return NextResponse.json({ error: 'Deprecated. Use Supabase Edge Function /functions/v1/onboarding-band' }, { status: 410 })
}
