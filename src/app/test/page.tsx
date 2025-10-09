'use client'

import { getOnboardingBandFnUrl, getOnboardingVenueFnUrl } from '@/lib/supabase/functions'

export default function TestPage() {
  const bandUrl = getOnboardingBandFnUrl()
  const venueUrl = getOnboardingVenueFnUrl()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Function URL Test</h1>
      <div className="space-y-2">
        <p><strong>Band Function URL:</strong> {bandUrl}</p>
        <p><strong>Venue Function URL:</strong> {venueUrl}</p>
        <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      </div>
    </div>
  )
}