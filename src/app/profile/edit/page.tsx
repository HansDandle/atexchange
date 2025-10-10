import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BandProfileEditor from '@/components/BandProfileEditor'
import VenueProfileEditor from '@/components/VenueProfileEditor'

export default async function EditProfilePage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get user role and profile
  const { data: dbUser } = await supabase
    .from('users')
    .select('id, role')
    .eq('supabaseId', user.id)
    .single()

  if (!dbUser) {
    redirect('/dashboard')
  }

  if (dbUser.role === 'BAND') {
    const { data: bandProfiles } = await supabase
      .from('band_profiles')
      .select('*')
      .eq('userId', dbUser.id)

    if (!bandProfiles || bandProfiles.length === 0) {
      redirect('/dashboard')
    }

    const firstProfile = (bandProfiles || [])[0]

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-austin-charcoal">
                Edit Band Profile
              </h1>
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
                Back to Dashboard
              </a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* If the user has multiple bands, show a simple selector */}
          {bandProfiles.length > 1 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">Select a band to edit:</p>
              <div className="flex space-x-3 mt-2">
                {bandProfiles.map((p: any) => (
                  <a key={p.id} href={`#/band-${p.id}`} className="px-3 py-1 border rounded">{p.bandName}</a>
                ))}
              </div>
            </div>
          )}

          <BandProfileEditor profile={firstProfile} />
        </main>
      </div>
    )
  }

  if (dbUser.role === 'VENUE') {
    const { data: venueProfile } = await supabase
      .from('venue_profiles')
      .select('*')
      .eq('userId', dbUser.id)
      .single()

    if (!venueProfile) {
      redirect('/dashboard')
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-austin-charcoal">
                Edit Venue Profile
              </h1>
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
                Back to Dashboard
              </a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <VenueProfileEditor profile={venueProfile} />
        </main>
      </div>
    )
  }

  redirect('/dashboard')
}