import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from '@/components/Header';

// Dynamically load the client-side OpportunitiesBrowser to avoid build-time import issues
const OpportunitiesBrowser: any = dynamic(() => import('../../components/OpportunitiesBrowser'), { ssr: false })

export default async function OpportunitiesPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get user role (try by supabaseId, then fall back to email like dashboard does)
  const { data: dbUser } = await supabase
    .from('users')
    .select('id, role, email')
    .eq('supabaseId', user.id)
    .single()

  let resolvedDbUser = dbUser
  if (!resolvedDbUser) {
    const { data: byEmail } = await supabase
      .from('users')
      .select('id, role, email')
      .eq('email', user.email)
      .single()
    if (byEmail) {
      resolvedDbUser = byEmail
    }
  }

  if (!resolvedDbUser) {
    redirect('/dashboard')
  }

  // Only allow non-BAND, non-VENUE, non-ADMIN roles
  if (!['TRIVIA_HOST', 'DJ', 'PHOTOGRAPHER', 'OTHER_CREATIVE'].includes(resolvedDbUser.role)) {
    redirect('/dashboard')
  }

  // Fetch available venue slots
  // Only return slots that include this role in their talentTypes (venues choose which talent types they want)
  const roleTalent = resolvedDbUser.role // e.g. 'TRIVIA_HOST', 'DJ', 'PHOTOGRAPHER', 'OTHER_CREATIVE'

  const { data: venueSlots } = await supabase
    .from('venue_slots')
    .select(`
      id,
      eventDate,
      startTime,
      endTime,
      eventTitle,
      description,
      genrePrefs,
      talentTypes,
      status,
      venue_profiles:venueProfileId (
        id,
        venueName,
        address,
        city,
        state,
        capacity,
        genrePrefs,
        hasSound,
        hasLighting,
        hasParking,
        photos
      )
    `)
    .eq('status', 'AVAILABLE')
    .gte('eventDate', new Date().toISOString().split('T')[0])
    .contains('talentTypes', [roleTalent])
    .order('eventDate', { ascending: true })

  // Normalize related profile objects: Supabase sometimes returns related rows as arrays
  const normalizedSlots = (venueSlots || []).map((slot: any) => ({
    ...slot,
    venue_profiles: Array.isArray(slot.venue_profiles) ? slot.venue_profiles[0] ?? null : slot.venue_profiles ?? null,
  }))

  // Determine the page title based on role
  const getTitleForRole = (role: string) => {
    switch (role) {
      case 'TRIVIA_HOST':
        return 'Trivia Host Opportunities'
      case 'DJ':
        return 'DJ Gigs'
      case 'PHOTOGRAPHER':
        return 'Photo Opportunities'
      case 'OTHER_CREATIVE':
        return 'Creative Opportunities'
      default:
        return 'Opportunities'
    }
  }

  const getDescriptionForRole = (role: string) => {
    switch (role) {
      case 'TRIVIA_HOST':
        return 'Browse available trivia hosting opportunities at venues'
      case 'DJ':
        return 'Find DJ gigs and performances at venues'
      case 'PHOTOGRAPHER':
        return 'Discover photography opportunities for events'
      case 'OTHER_CREATIVE':
        return 'Explore creative opportunities and collaborations'
      default:
        return 'Browse available opportunities'
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <OpportunitiesBrowser initialSlots={normalizedSlots} userRole={resolvedDbUser.role} />
      </main>
    </>
  )
}
