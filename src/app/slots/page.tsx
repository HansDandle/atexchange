import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SlotsManager from '@/components/SlotsManager'

export default async function SlotsPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Check if user is a venue
  const { data: dbUser } = await supabase
    .from('users')
    .select('id, role')
    .eq('supabaseId', user.id)
    .single()

  if (!dbUser || dbUser.role !== 'VENUE') {
    redirect('/dashboard')
  }

  // Get venue profile
  const { data: venueProfile } = await supabase
    .from('venue_profiles')
    .select('*')
    .eq('userId', dbUser.id)
    .single()

  if (!venueProfile) {
    redirect('/dashboard')
  }

  // Fetch existing venue slots
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
      createdAt
    `)
    .eq('venueProfileId', venueProfile.id)
    .order('eventDate', { ascending: true })

  // Fetch applications for this venue's slots
  const { data: applications } = await supabase
    .from('applications')
    .select(`
      id,
      status,
      message,
      proposedFee,
      createdAt,
      venueSlotId,
      band_profiles!inner (
        id,
        bandName,
        genre,
        location,
        minFee,
        maxFee,
        photos
      )
    `)
    .in('venueSlotId', (venueSlots || []).map((slot: any) => slot.id))
    .order('createdAt', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-austin-charcoal">
              Manage Your Venue Slots
            </h1>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
                Back to Dashboard
              </a>
              <span className="text-sm text-gray-600">
                {venueProfile.venueName}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <SlotsManager 
          venueProfile={venueProfile}
          initialSlots={venueSlots || []}
          initialApplications={applications || []}
        />
      </main>
    </div>
  )
}