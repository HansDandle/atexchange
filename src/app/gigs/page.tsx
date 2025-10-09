import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import GigsBrowser from '@/components/GigsBrowser'

export default async function GigsPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Check if user is a band
  const { data: dbUser } = await supabase
    .from('users')
    .select('role')
    .eq('supabaseId', user.id)
    .single()

  if (!dbUser || dbUser.role !== 'BAND') {
    redirect('/dashboard')
  }

  // Fetch available venue slots
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
      status,
      venue_profiles!inner (
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
    .order('eventDate', { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-austin-charcoal">
              Available Gigs
            </h1>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
                Back to Dashboard
              </a>
              <span className="text-sm text-gray-600">
                Welcome, {user.user_metadata?.name || user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <GigsBrowser initialSlots={venueSlots || []} />
      </main>
    </div>
  )
}