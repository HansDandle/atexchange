export function getOnboardingBandFnUrl() {
  // Always use Supabase Edge Functions directly
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jkylaqqajdjxpvrmuxfr.supabase.co'
  return `${supabaseUrl}/functions/v1/onboarding-band`
}

export function getOnboardingVenueFnUrl() {
  // Always use Supabase Edge Functions directly
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jkylaqqajdjxpvrmuxfr.supabase.co'
  return `${supabaseUrl}/functions/v1/onboarding-venue`
}
