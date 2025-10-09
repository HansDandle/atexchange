export function getOnboardingBandFnUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return process.env.NEXT_PUBLIC_ONBOARDING_BAND_FN || `${supabaseUrl}/functions/v1/onboarding-band`
}

export function getOnboardingVenueFnUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return process.env.NEXT_PUBLIC_ONBOARDING_VENUE_FN || `${supabaseUrl}/functions/v1/onboarding-venue`
}
