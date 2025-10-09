"use client"

import { useEffect, useState } from 'react'
import BandOnboardingForm from '@/components/forms/BandOnboardingForm'
import VenueOnboardingForm from '@/components/forms/VenueOnboardingForm'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function OnboardingPageClient() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (!mounted) return
      if (error || !user) {
        router.push('/login')
        return
      }
      setUser(user)
      setRole(user.user_metadata?.role || null)
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-austin-light via-white to-austin-warm">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-austin-charcoal mb-4">Let's Set Up Your Profile</h1>
            <p className="text-gray-600">
              {role === 'BAND' ? 'Create your Electronic Press Kit (EPK) and start getting booked!' : role === 'VENUE' ? 'Set up your venue details and start receiving applications from bands!' : 'Complete your profile to get started.'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-austin-orange/20">
            <div>
              {role === 'BAND' && <BandOnboardingForm />}
              {role === 'VENUE' && <VenueOnboardingForm />}
              {!role && <div className="text-center p-6">Please contact support for assistance.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}