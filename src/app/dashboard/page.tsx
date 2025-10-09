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

  let recentActivity = []
  let upcomingGigs = []

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

        // Get recent applications for this band
        const { data: applications } = await supabase
          .from('applications')
          .select(`
            id,
            status,
            createdAt,
            proposedFee,
            venue_slots!inner (
              eventDate,
              eventTitle,
              venue_profiles!inner (
                venueName
              )
            )
          `)
          .eq('bandProfileId', bandProfile.id)
          .order('createdAt', { ascending: false })
          .limit(5)

        recentActivity = (applications || []).map((app: any) => ({
          type: 'application',
          status: app.status,
          venueName: app.venue_slots.venue_profiles.venueName,
          eventTitle: app.venue_slots.eventTitle,
          eventDate: app.venue_slots.eventDate,
          createdAt: app.createdAt
        }))

        // Get accepted gigs (upcoming)
        const { data: acceptedGigs } = await supabase
          .from('applications')
          .select(`
            venue_slots!inner (
              eventDate,
              startTime,
              eventTitle,
              venue_profiles!inner (
                venueName,
                address,
                city
              )
            )
          `)
          .eq('bandProfileId', bandProfile.id)
          .eq('status', 'ACCEPTED')
          .gte('venue_slots.eventDate', new Date().toISOString().split('T')[0])
          .order('venue_slots.eventDate', { ascending: true })
          .limit(3)

        upcomingGigs = acceptedGigs || []
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

        // Get recent applications to this venue's slots
        const { data: applications } = await supabase
          .from('applications')
          .select(`
            id,
            status,
            createdAt,
            band_profiles!inner (
              bandName
            ),
            venue_slots!inner (
              eventDate,
              eventTitle
            )
          `)
          .eq('venue_slots.venueProfileId', venueProfile.id)
          .order('createdAt', { ascending: false })
          .limit(5)

        recentActivity = (applications || []).map((app: any) => ({
          type: 'application_received',
          status: app.status,
          bandName: app.band_profiles.bandName,
          eventTitle: app.venue_slots.eventTitle,
          eventDate: app.venue_slots.eventDate,
          createdAt: app.createdAt
        }))

        // Get upcoming booked slots
        const { data: bookedSlots } = await supabase
          .from('venue_slots')
          .select(`
            eventDate,
            startTime,
            eventTitle,
            applications!inner (
              band_profiles!inner (
                bandName
              )
            )
          `)
          .eq('venueProfileId', venueProfile.id)
          .eq('status', 'BOOKED')
          .gte('eventDate', new Date().toISOString().split('T')[0])
          .order('eventDate', { ascending: true })
          .limit(3)

        upcomingGigs = bookedSlots || []
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
                      <a href="/profile/edit">
                        <Button variant="outline" size="lg" className="w-full">
                          Edit Band Profile
                        </Button>
                      </a>
                    </>
                  ) : userRole === 'VENUE' ? (
                    <>
                      <a href="/slots">
                        <Button variant="austin" size="lg" className="w-full">
                          Manage Available Slots
                        </Button>
                      </a>
                      <a href="/profile/edit">
                        <Button variant="outline" size="lg" className="w-full">
                          Edit Venue Profile
                        </Button>
                      </a>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="/messages">
                    <Button variant="outline" className="w-full">
                      Messages
                    </Button>
                  </a>
                  {userRole === 'BAND' && (
                    <a href="/gigs">
                      <Button variant="outline" className="w-full">
                        Find More Gigs
                      </Button>
                    </a>
                  )}
                  {userRole === 'VENUE' && (
                    <a href="/slots">
                      <Button variant="outline" className="w-full">
                        Add More Slots
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Recent Activity</h3>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'ACCEPTED' ? 'bg-green-500' :
                          activity.status === 'REJECTED' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          {activity.type === 'application' ? (
                            <p className="text-sm">
                              <span className="font-medium">Application {activity.status.toLowerCase()}</span> for "{activity.eventTitle}" at {activity.venueName}
                            </p>
                          ) : (
                            <p className="text-sm">
                              <span className="font-medium">New application</span> from {activity.bandName} for "{activity.eventTitle}"
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No recent activity</p>
                )}
              </div>

              {/* Upcoming Gigs */}
              {upcomingGigs.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-austin-charcoal mb-4">
                    {userRole === 'BAND' ? 'Upcoming Gigs' : 'Upcoming Shows'}
                  </h3>
                  <div className="space-y-3">
                    {upcomingGigs.map((gig: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-austin-orange/5 rounded-lg border border-austin-orange/20">
                        <div className="w-2 h-2 bg-austin-orange rounded-full mt-2"></div>
                        <div className="flex-1">
                          {userRole === 'BAND' ? (
                            <p className="text-sm">
                              <span className="font-medium">{gig.venue_slots.eventTitle}</span> at {gig.venue_slots.venue_profiles.venueName}
                            </p>
                          ) : (
                            <p className="text-sm">
                              <span className="font-medium">{gig.eventTitle}</span> with {gig.applications[0]?.band_profiles.bandName}
                            </p>
                          )}
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(userRole === 'BAND' ? gig.venue_slots.eventDate : gig.eventDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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