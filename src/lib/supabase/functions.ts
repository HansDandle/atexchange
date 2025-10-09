export function getOnboardingBandFnUrl() {
  return process.env.NEXT_PUBLIC_ONBOARDING_BAND_FN || '/api/supabase-fn/onboarding-band'
}

export function getOnboardingVenueFnUrl() {
  return process.env.NEXT_PUBLIC_ONBOARDING_VENUE_FN || '/api/supabase-fn/onboarding-venue'
}
