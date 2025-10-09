import BandOnboardingForm from '@/components/forms/BandOnboardingForm'
import VenueOnboardingForm from '@/components/forms/VenueOnboardingForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function OnboardingPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  const userRole = user.user_metadata?.role

  return (
    <div className="min-h-screen bg-gradient-to-br from-austin-light via-white to-austin-warm">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-austin-charcoal mb-4">
              Let&apos;s Set Up Your Profile
            </h1>
            <p className="text-gray-600">
              {userRole === 'BAND' 
                ? "Create your Electronic Press Kit (EPK) and start getting booked!"
                : userRole === 'VENUE'
                ? "Set up your venue details and start receiving applications from bands!"
                : "Complete your profile to get started with Austin Talent Exchange."
              }
            </p>
          </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-austin-orange/20">
              <div>
                {userRole === 'BAND' && (
                  <BandOnboardingForm onComplete={async (data: any) => {
                    const res = await fetch('/api/onboarding/band', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    })
                    if (res.ok) {
                      window.location.href = '/dashboard'
                    } else {
                      alert('Failed to save profile')
                    }
                  }} />
                )}

                {userRole === 'VENUE' && (
                  <VenueOnboardingForm onComplete={async (data: any) => {
                    const res = await fetch('/api/onboarding/venue', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    })
                    if (res.ok) {
                      window.location.href = '/dashboard'
                    } else {
                      alert('Failed to save profile')
                    }
                  }} />
                )}

                {!userRole && (
                  <div className="text-center p-6">Please contact support for assistance.</div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}