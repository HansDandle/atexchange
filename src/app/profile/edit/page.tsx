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
    const { data: bandProfile } = await supabase
      .from('band_profiles')
      .select('*')
      .eq('userId', dbUser.id)
      .single()

    if (!bandProfile) {
      redirect('/dashboard')
    }

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
          <BandProfileEditor profile={bandProfile} />
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