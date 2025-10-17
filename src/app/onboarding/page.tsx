"use client"

import { useEffect, useState } from 'react'
import BandOnboardingForm from '@/components/forms/BandOnboardingForm'
import VenueOnboardingForm from '@/components/forms/VenueOnboardingForm'
import DJOnboardingForm from '@/components/forms/DJOnboardingForm'
import TriviaHostOnboardingForm from '@/components/forms/TriviaHostOnboardingForm'
import PhotographerOnboardingForm from '@/components/forms/PhotographerOnboardingForm'
import OtherCreativeOnboardingForm from '@/components/forms/OtherCreativeOnboardingForm'
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
              {role === 'BAND' 
                ? 'Create your Electronic Press Kit (EPK) and start getting booked!' 
                : role === 'VENUE' 
                ? 'Set up your venue details and start receiving applications from bands!'
                : role === 'DJ'
                ? 'Build your DJ profile and connect with venues and event organizers!'
                : role === 'TRIVIA_HOST'
                ? 'Create your trivia host profile and start hosting events!'
                : role === 'PHOTOGRAPHER'
                ? 'Showcase your photography portfolio and start booking events!'
                : role === 'OTHER_CREATIVE'
                ? 'Build your creative profile and start collaborating!'
                : 'Complete your profile to get started.'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-austin-orange/20">
            <div>
              {role === 'BAND' && <BandOnboardingForm initialData={{ bandName: user?.user_metadata?.name || '' }} />}
              {role === 'VENUE' && <VenueOnboardingForm initialData={{ venueName: user?.user_metadata?.name || '' }} />}
              {role === 'DJ' && <DJOnboardingForm initialData={{ djName: user?.user_metadata?.name || '' }} />}
              {role === 'TRIVIA_HOST' && <TriviaHostOnboardingForm initialData={{ hostName: user?.user_metadata?.name || '' }} />}
              {role === 'PHOTOGRAPHER' && <PhotographerOnboardingForm initialData={{ photographerName: user?.user_metadata?.name || '' }} />}
              {role === 'OTHER_CREATIVE' && <OtherCreativeOnboardingForm initialData={{ creativeName: user?.user_metadata?.name || '' }} />}
              {!role && <div className="text-center p-6 text-gray-600">Please select a profile type to continue.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}