import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BandProfileEditor from '@/components/BandProfileEditor'
import VenueProfileEditor from '@/components/VenueProfileEditor'
import TriviaHostProfileEditor from '@/components/TriviaHostProfileEditor'
import DJProfileEditor from '@/components/DJProfileEditor'
import PhotographerProfileEditor from '@/components/PhotographerProfileEditor'
import OtherCreativeProfileEditor from '@/components/OtherCreativeProfileEditor'
import PublicProfileLink from '@/components/PublicProfileLink'
import Header from '@/components/Header'

export default async function EditProfilePage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get user role and profile (try supabaseId first, then fall back to email)
  let dbUser: any = null

  const supabaseIdLookup = await supabase
    .from('users')
    .select('id, role, email')
    .eq('supabaseId', user.id)
    .maybeSingle()

  if (supabaseIdLookup.error) {
    // keep trying with email fallback
  }
  dbUser = supabaseIdLookup.data ?? null

  if (!dbUser) {
    const emailLookup = await supabase
      .from('users')
      .select('id, role, email')
      .eq('email', user.email)
      .maybeSingle()

    if (emailLookup.error) {
      redirect('/dashboard')
    }

    dbUser = emailLookup.data ?? null
  }

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
        <Header />
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
            <PublicProfileLink profile={firstProfile} role={'BAND'} />
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
        <Header />
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
            <PublicProfileLink profile={venueProfile} role={'VENUE'} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <VenueProfileEditor profile={venueProfile} />
        </main>
      </div>
    )
  }

  // TRIVIA_HOST: render trivia host profile editor
  if (dbUser.role === 'TRIVIA_HOST') {
    const { data: triviaProfile } = await supabase
      .from('trivia_host_profiles')
      .select('*')
      .eq('userId', dbUser.id)
      .single()

    if (!triviaProfile) {
      redirect('/dashboard')
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-austin-charcoal">Edit Trivia Host Profile</h1>
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">Back to Dashboard</a>
            </div>
            <PublicProfileLink profile={triviaProfile} role={'TRIVIA_HOST'} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <TriviaHostProfileEditor profile={triviaProfile} />
        </main>
      </div>
    )
  }

  if (dbUser.role === 'DJ') {
    const { data: djProfile } = await supabase
      .from('dj_profiles')
      .select('*')
      .eq('userId', dbUser.id)
      .single()

    if (!djProfile) {
      redirect('/dashboard')
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-austin-charcoal">Edit DJ Profile</h1>
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">Back to Dashboard</a>
            </div>
            <PublicProfileLink profile={djProfile} role={'DJ'} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <DJProfileEditor profile={djProfile} />
        </main>
      </div>
    )
  }

  if (dbUser.role === 'PHOTOGRAPHER') {
    const { data: photographerProfile } = await supabase
      .from('photographer_profiles')
      .select('*')
      .eq('userId', dbUser.id)
      .single()

    if (!photographerProfile) {
      redirect('/dashboard')
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-austin-charcoal">Edit Photographer Profile</h1>
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">Back to Dashboard</a>
            </div>
            <PublicProfileLink profile={photographerProfile} role={'PHOTOGRAPHER'} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <PhotographerProfileEditor profile={photographerProfile} />
        </main>
      </div>
    )
  }

  if (dbUser.role === 'OTHER_CREATIVE') {
    const { data: otherProfile } = await supabase
      .from('other_creative_profiles')
      .select('*')
      .eq('userId', dbUser.id)
      .single()

    if (!otherProfile) {
      redirect('/dashboard')
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-austin-charcoal">Edit Profile</h1>
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">Back to Dashboard</a>
            </div>
            <PublicProfileLink profile={otherProfile} role={'OTHER_CREATIVE'} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <OtherCreativeProfileEditor profile={otherProfile} />
        </main>
      </div>
    )
  }

  redirect('/dashboard')
}