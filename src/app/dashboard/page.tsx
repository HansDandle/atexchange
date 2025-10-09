import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Check if user has completed their profile
  let hasProfile = false
  let userRole = null
  let profileData = null

  console.log('Dashboard: Looking for user with auth ID:', user.id)

  // Look up user by their Supabase auth ID (now properly linked)
  const { data: dbUser } = await supabase
    .from('users')
    .select('id, role, email')
    .eq('supabaseId', user.id)
    .single()

  console.log('Dashboard: Found database user:', dbUser)

  if (dbUser) {
    userRole = dbUser.role
    
    // Check for profile based on role
    if (userRole === 'BAND') {
      const { data: bandProfile } = await supabase
        .from('band_profiles')
        .select('*')
        .eq('userId', dbUser.id)
        .single()
      
      console.log('Dashboard: Found band profile:', bandProfile)
      
      if (bandProfile) {
        hasProfile = true
        profileData = bandProfile
      }
    } else if (userRole === 'VENUE') {
      const { data: venueProfile } = await supabase
        .from('venue_profiles') 
        .select('*')
        .eq('userId', dbUser.id)
        .single()
      
      console.log('Dashboard: Found venue profile:', venueProfile)
      
      if (venueProfile) {
        hasProfile = true
        profileData = venueProfile
      }
    }
  }
  
  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-austin-charcoal">
              Austin Talent Exchange
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.user_metadata?.name || user.email}
              </span>
              <form action={handleSignOut}>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {hasProfile ? (
            // Show dashboard content for users with completed profiles
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-austin-charcoal mb-4">
                  Welcome back, {profileData?.bandName || profileData?.venueName || user.user_metadata?.name}!
                </h2>
                <p className="text-gray-600 mb-4">
                  {userRole === 'BAND' ? 'Your band profile is complete. Start browsing available gigs!' : 
                   userRole === 'VENUE' ? 'Your venue profile is complete. Start posting available slots!' : 
                   'Your profile is set up and ready to go.'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userRole === 'BAND' ? (
                    <>
                      <a href="/gigs">
                        <Button variant="austin" size="lg" className="w-full">
                          Browse Available Gigs
                        </Button>
                      </a>
                      <Button variant="outline" size="lg" className="w-full">
                        Edit Band Profile
                      </Button>
                    </>
                  ) : userRole === 'VENUE' ? (
                    <>
                      <a href="/slots">
                        <Button variant="austin" size="lg" className="w-full">
                          Manage Available Slots
                        </Button>
                      </a>
                      <Button variant="outline" size="lg" className="w-full">
                        Edit Venue Profile
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Profile Summary Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-austin-charcoal mb-3">Profile Summary</h3>
                {userRole === 'BAND' && profileData && (
                  <div className="space-y-2">
                    <p><strong>Band Name:</strong> {profileData.bandName}</p>
                    <p><strong>Genres:</strong> {profileData.genre?.join(', ') || 'Not specified'}</p>
                    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                    <p><strong>Fee Range:</strong> {
                      profileData.minFee && profileData.maxFee 
                        ? `$${profileData.minFee/100} - $${profileData.maxFee/100}`
                        : 'Negotiable'
                    }</p>
                  </div>
                )}
                {userRole === 'VENUE' && profileData && (
                  <div className="space-y-2">
                    <p><strong>Venue Name:</strong> {profileData.venueName}</p>
                    <p><strong>Location:</strong> {[profileData.city, profileData.state].filter(Boolean).join(', ') || 'Not specified'}</p>
                    <p><strong>Capacity:</strong> {profileData.capacity ? `${profileData.capacity} people` : 'Not specified'}</p>
                    <p><strong>Genre Preferences:</strong> {profileData.genrePrefs?.join(', ') || 'All genres'}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Show onboarding prompt for users without profiles
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h2 className="text-3xl font-bold text-austin-charcoal mb-4">
                Welcome to Your Dashboard!
              </h2>
              <p className="text-gray-600 mb-8">
                Your account has been created successfully. 
                Let&apos;s set up your profile to get started.
              </p>
              
              <div className="space-y-4">
                <Link href="/onboarding">
                  <Button variant="austin" size="lg">
                    Complete Your Profile
                  </Button>
                </Link>
                
                <div className="text-sm text-gray-500">
                  User ID: {user.id}
                  <br />
                  Role: {userRole || user.user_metadata?.role || 'Not set'}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}