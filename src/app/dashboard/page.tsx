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

  // If we didn't find a user by supabaseId (older records), try matching by email
  let resolvedDbUser = dbUser
  if (!resolvedDbUser) {
    const { data: byEmail } = await supabase
      .from('users')
      .select('id, role, email')
      .eq('email', user.email)
      .single()
    if (byEmail) {
      console.log('Dashboard: Found database user by email fallback:', byEmail)
      resolvedDbUser = byEmail
    }
  }

  let recentActivity: any[] = []
  let upcomingGigs: any[] = []
  let bandProfiles: any[] = []

  if (resolvedDbUser) {
    userRole = resolvedDbUser.role
    
    // Check for profile based on role
    if (userRole === 'BAND') {
      // Fetch all band profiles for this user (support multiple bands)
      const { data } = await supabase
        .from('band_profiles')
        .select('*')
        .eq('userId', resolvedDbUser.id)

      bandProfiles = data || []
      const bandProfile = (bandProfiles && bandProfiles[0]) || null

      console.log('Dashboard: Found band profiles:', bandProfiles)

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
            venue_slots:venueSlotId (
              eventDate,
              eventTitle,
              venue_profiles:venueProfileId (
                venueName
              )
            )
          `)
          .eq('bandProfileId', bandProfile.id)
          .order('createdAt', { ascending: false })
          .limit(5)

        recentActivity = (applications || []).map((app: any) => {
          const vs = Array.isArray(app.venue_slots) ? app.venue_slots[0] ?? null : app.venue_slots ?? null
          const vp = vs ? (Array.isArray(vs.venue_profiles) ? vs.venue_profiles[0] ?? null : vs.venue_profiles ?? null) : null
          return ({
            type: 'application',
            status: app.status,
            venueName: vp?.venueName ?? 'Unknown Venue',
            eventTitle: vs?.eventTitle ?? 'TBD',
            eventDate: vs?.eventDate ?? null,
            createdAt: app.createdAt
          })
        })

        // Get accepted gigs (upcoming)
        const { data: acceptedGigs } = await supabase
          .from('applications')
          .select(`
            venue_slots:venueSlotId (
              eventDate,
              startTime,
              eventTitle,
              venue_profiles:venueProfileId (
                id,
                venueName,
                address,
                city,
                bookingEmail,
                capacity,
                website
              )
            )
          `)
          .eq('bandProfileId', bandProfile.id)
          .eq('status', 'ACCEPTED')
          .gte('venue_slots.eventDate', new Date().toISOString().split('T')[0])
          .order('venue_slots.eventDate', { ascending: true })
          .limit(3)

        // Normalize accepted gigs
        upcomingGigs = (acceptedGigs || []).map((g: any) => {
          const vs = Array.isArray(g.venue_slots) ? g.venue_slots[0] ?? null : g.venue_slots ?? null
          const normalizedVs = vs ? ({
            ...vs,
            venue_profiles: Array.isArray(vs.venue_profiles) ? vs.venue_profiles[0] ?? null : vs.venue_profiles ?? null
          }) : null
          return {
            ...g,
            venue_slots: normalizedVs
          }
        })
      }
    } else if (userRole === 'VENUE') {
      // Debugging: Confirm user role and venue profile
      console.log('User Role:', userRole);
      if (userRole === 'VENUE') {
        console.log('Fetching venue profile...');
        const { data: venueProfile } = await supabase
          .from('venue_profiles')
          .select('*')
          .eq('userId', resolvedDbUser.id)
          .single();

        console.log('Venue Profile:', venueProfile);

        if (venueProfile) {
          hasProfile = true;
          profileData = venueProfile;

          // Fetch recent applications for the venue's slots
          const { data: applications } = await supabase
            .from('applications')
            .select(`
              id,
              status,
              createdAt,
              proposedFee,
              band_profiles:bandProfileId (
                bandName
              ),
              venue_slots:venueSlotId (
                eventDate,
                eventTitle
              )
            `)
            .eq('venue_slots.venueProfileId', venueProfile.id)
            .order('createdAt', { ascending: false })
            .limit(5);

          console.log('Venue Recent Activity - Applications:', applications);

          // Map applications to recent activity format
          recentActivity = (applications || []).map((app: any) => {
            const venueSlot = app.venue_slots || {}; // Default to an empty object if null
            const bandProfile = app.band_profiles || {}; // Default to an empty object if null
            console.log('Mapping Application:', {
              status: app.status,
              bandName: bandProfile.bandName,
              eventTitle: venueSlot.eventTitle,
              eventDate: venueSlot.eventDate,
              createdAt: app.createdAt,
            });
            return {
              type: 'application',
              status: app.status,
              bandName: bandProfile.bandName || 'Unknown Band',
              eventTitle: venueSlot.eventTitle || 'TBD',
              eventDate: venueSlot.eventDate || null,
              createdAt: app.createdAt,
            };
          });
        }
      }
    } else if (userRole === 'TRIVIA_HOST') {
      const { data: triviaProfile } = await supabase
        .from('trivia_host_profiles')
        .select('*')
        .eq('userId', resolvedDbUser.id)
        .single()

      if (triviaProfile) {
        hasProfile = true
        profileData = triviaProfile
        console.log('Dashboard: Found trivia host profile:', triviaProfile)
      }
    } else if (userRole === 'DJ') {
      const { data: djProfile } = await supabase
        .from('dj_profiles')
        .select('*')
        .eq('userId', resolvedDbUser.id)
        .single()

      if (djProfile) {
        hasProfile = true
        profileData = djProfile
        console.log('Dashboard: Found DJ profile:', djProfile)
      }
    } else if (userRole === 'PHOTOGRAPHER') {
      const { data: photographerProfile } = await supabase
        .from('photographer_profiles')
        .select('*')
        .eq('userId', resolvedDbUser.id)
        .single()

      if (photographerProfile) {
        hasProfile = true
        profileData = photographerProfile
        console.log('Dashboard: Found photographer profile:', photographerProfile)
      }
    } else if (userRole === 'OTHER_CREATIVE') {
      const { data: otherCreativeProfile } = await supabase
        .from('other_creative_profiles')
        .select('*')
        .eq('userId', resolvedDbUser.id)
        .single()

      if (otherCreativeProfile) {
        hasProfile = true
        profileData = otherCreativeProfile
        console.log('Dashboard: Found other creative profile:', otherCreativeProfile)
      }
    }
  }
  
  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  // Filter recentActivity based on userRole
  const filteredActivity = recentActivity.filter((activity: any) => {
    if (userRole === 'BAND') {
      return activity.bandId === user.id; // Ensure activity is related to the current band
    } else if (userRole === 'VENUE') {
      return activity.type === 'application'; // Include all applications for the venue
    }
    return false;
  });

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
              {userRole === 'ADMIN' && (
                <Link href="/admin">
                  <Button variant="austin" size="sm">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              {userRole === 'BAND' && (
                <Link href="/onboarding?role=band">
                  <Button variant="outline" size="sm">Create New Band</Button>
                </Link>
              )}
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
                  Welcome back, {profileData?.bandName || profileData?.venueName || profileData?.hostName || profileData?.djName || profileData?.photographerName || profileData?.creativeName || user.user_metadata?.name}!
                </h2>
                <p className="text-gray-600 mb-4">
                  {userRole === 'BAND' ? 'Your band profile is complete. Start browsing available gigs!' : 
                   userRole === 'VENUE' ? 'Your venue profile is complete. Start posting available slots!' :
                   userRole === 'TRIVIA_HOST' ? 'Your trivia host profile is set up! Browse available venues and events.' :
                   userRole === 'DJ' ? 'Your DJ profile is ready! Start looking for gigs and events.' :
                   userRole === 'PHOTOGRAPHER' ? 'Your photographer portfolio is live! Find your next photo opportunity.' :
                   userRole === 'OTHER_CREATIVE' ? 'Your profile is complete. Discover amazing opportunities!' :
                   userRole === 'ADMIN' ? 'Welcome to the admin dashboard. Manage users, profiles, and platform data.' :
                   'Your profile is set up and ready to go.'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userRole === 'BAND' ? (
                    <>
                      <Link href="/gigs">
                        <Button variant="austin" size="lg" className="w-full">
                          Browse Available Gigs
                        </Button>
                      </Link>
                      <Link href="/profile/edit">
                        <Button variant="outline" size="lg" className="w-full">
                          Edit Band Profile
                        </Button>
                      </Link>
                      <Link href={profileData?.slug ? `/profiles/${profileData.slug}` : '/profile/edit'}>
                        <Button variant="ghost" size="lg" className="w-full">
                          View My Profile
                        </Button>
                      </Link>
                    </>
                  ) : userRole === 'VENUE' ? (
                    <>
                      <Link href="/slots">
                        <Button variant="austin" size="lg" className="w-full">
                          Manage Available Slots
                        </Button>
                      </Link>
                      <Link href="/profile/edit">
                        <Button variant="outline" size="lg" className="w-full">
                          Edit Venue Profile
                        </Button>
                      </Link>
                      <Link href={profileData?.id ? `/venues/${profileData.id}` : '/profile/edit'}>
                        <Button variant="ghost" size="lg" className="w-full">
                          View My Profile
                        </Button>
                      </Link>
                    </>
                  ) : userRole === 'TRIVIA_HOST' ? (
                    <>
                      <Link href="/profile/edit">
                        <Button variant="austin" size="lg" className="w-full">
                          Edit Trivia Host Profile
                        </Button>
                      </Link>
                      <Link href="/opportunities">
                        <Button variant="outline" size="lg" className="w-full">
                          Browse Opportunities
                        </Button>
                      </Link>
                      <Link href={profileData?.slug ? `/profiles/${profileData.slug}` : '/profile/edit'}>
                        <Button variant="ghost" size="lg" className="w-full">
                          View My Profile
                        </Button>
                      </Link>
                    </>
                  ) : userRole === 'DJ' ? (
                    <>
                      <Link href="/profile/edit">
                        <Button variant="austin" size="lg" className="w-full">
                          Edit DJ Profile
                        </Button>
                      </Link>
                      <Link href="/opportunities">
                        <Button variant="outline" size="lg" className="w-full">
                          Find Gigs
                        </Button>
                      </Link>
                      <Link href={profileData?.slug ? `/profiles/${profileData.slug}` : '/profile/edit'}>
                        <Button variant="ghost" size="lg" className="w-full">
                          View My Profile
                        </Button>
                      </Link>
                    </>
                  ) : userRole === 'PHOTOGRAPHER' ? (
                    <>
                      <Link href="/profile/edit">
                        <Button variant="austin" size="lg" className="w-full">
                          Edit Portfolio
                        </Button>
                      </Link>
                      <Link href="/opportunities">
                        <Button variant="outline" size="lg" className="w-full">
                          Find Photo Opportunities
                        </Button>
                      </Link>
                      <Link href={profileData?.slug ? `/profiles/${profileData.slug}` : '/profile/edit'}>
                        <Button variant="ghost" size="lg" className="w-full">
                          View My Profile
                        </Button>
                      </Link>
                    </>
                  ) : userRole === 'OTHER_CREATIVE' ? (
                    <>
                      <Link href="/profile/edit">
                        <Button variant="austin" size="lg" className="w-full">
                          Edit Profile
                        </Button>
                      </Link>
                      <Link href="/opportunities">
                        <Button variant="outline" size="lg" className="w-full">
                          Find Opportunities
                        </Button>
                      </Link>
                      <Link href={profileData?.slug ? `/profiles/${profileData.slug}` : '/profile/edit'}>
                        <Button variant="ghost" size="lg" className="w-full">
                          View My Profile
                        </Button>
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link href="/messages">
                    <Button variant="outline" className="w-full">
                      Messages
                    </Button>
                  </Link>
                  {userRole === 'VENUE' && (
                    <Link href="/slots">
                      <Button variant="outline" className="w-full">
                        Add More Slots
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Recent Activity</h3>
                {filteredActivity.length > 0 ? (
                  <div className="space-y-3">
                    {filteredActivity.map((activity: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'ACCEPTED' ? 'bg-green-500' :
                          activity.status === 'REJECTED' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">Application {activity.status.toLowerCase()}</span> from 
                            <a href={`/bands/${activity.bandId}`} className="text-austin-orange hover:underline">{activity.bandName}</a> for slot "{activity.eventTitle}"
                          </p>
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
                        {userRole === 'BAND' ? 'Confirmed Gigs' : 'Upcoming Shows'}
                  </h3>
                  <div className="space-y-3">
                    {upcomingGigs.map((gig: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-austin-orange/5 rounded-lg border border-austin-orange/20">
                        <div className="w-2 h-2 bg-austin-orange rounded-full mt-2"></div>
                        <div className="flex-1">
                              {userRole === 'BAND' ? (
                                <>
                                  <p className="text-sm">
                                    <span className="font-medium">{gig.venue_slots.eventTitle}</span>
                                  </p>
                                  <p className="text-sm text-gray-800 mt-1">at <strong>{gig.venue_slots.venue_profiles.venueName}</strong></p>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {new Date(gig.venue_slots.eventDate).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })} • {gig.venue_slots.startTime || 'TBD'}
                                  </p>

                                  <div className="mt-2 text-sm text-gray-700">
                                    {gig.venue_slots.venue_profiles.address && (
                                      <div>Address: {gig.venue_slots.venue_profiles.address}, {gig.venue_slots.venue_profiles.city}</div>
                                    )}
                                    {gig.venue_slots.venue_profiles.capacity && (
                                      <div>Capacity: {gig.venue_slots.venue_profiles.capacity}</div>
                                    )}
                                    {gig.venue_slots.venue_profiles.bookingEmail && (
                                      <div>Booking: <a className="text-austin-orange" href={`mailto:${gig.venue_slots.venue_profiles.bookingEmail}`}>{gig.venue_slots.venue_profiles.bookingEmail}</a></div>
                                    )}
                                    {gig.venue_slots.venue_profiles.website && (
                                      <div>Website: <a className="text-austin-orange" href={gig.venue_slots.venue_profiles.website} target="_blank" rel="noreferrer">{gig.venue_slots.venue_profiles.website}</a></div>
                                    )}
                                  </div>

                                  {gig.venue_slots?.venue_profiles?.id && (
                                    <div className="mt-3">
                                      <Link href={`/venues/${gig.venue_slots.venue_profiles.id}`}>
                                        <Button variant="outline" size="sm">View Venue Profile</Button>
                                      </Link>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <p className="text-sm">
                                  <span className="font-medium">{gig.eventTitle}</span> with {gig.applications[0]?.band_profiles.bandName}
                                </p>
                              )}
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
                    <p><strong>Primary Band:</strong> {profileData.bandName}</p>
                    <p><strong>Genres:</strong> {profileData.genre?.join(', ') || 'Not specified'}</p>
                    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                    <p><strong>Fee Range:</strong> {
                      profileData.minFee && profileData.maxFee 
                        ? `$${profileData.minFee/100} - $${profileData.maxFee/100}`
                        : 'Negotiable'
                    }</p>
                    {/* If user has multiple bands, list them */}
                    {Array.isArray(bandProfiles) && bandProfiles.length > 1 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium">Your Bands:</p>
                        <ul className="list-disc list-inside text-sm">
                          {bandProfiles.map((b: any) => (
                            <li key={b.id}>{b.bandName}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                {userRole === 'TRIVIA_HOST' && profileData && (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {profileData.hostName}</p>
                    <p><strong>Specialization:</strong> {profileData.specialization || 'General trivia'}</p>
                    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                    <p><strong>Experience:</strong> {profileData.experience || 'Not specified'}</p>
                    <p><strong>Rate:</strong> {profileData.rates ? `$${profileData.rates}/event` : 'Negotiable'}</p>
                  </div>
                )}
                {userRole === 'DJ' && profileData && (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {profileData.djName}</p>
                    <p><strong>Specialization:</strong> {profileData.specialization?.join(', ') || 'General DJ services'}</p>
                    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                    <p><strong>Experience:</strong> {profileData.experience || 'Not specified'}</p>
                    <p><strong>Rate Range:</strong> {
                      profileData.minFee && profileData.maxFee 
                        ? `$${profileData.minFee} - $${profileData.maxFee}`
                        : 'Negotiable'
                    }</p>
                  </div>
                )}
                {userRole === 'PHOTOGRAPHER' && profileData && (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {profileData.photographerName}</p>
                    <p><strong>Specialization:</strong> {profileData.specialization?.join(', ') || 'General photography'}</p>
                    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                    <p><strong>Experience:</strong> {profileData.experience || 'Not specified'}</p>
                    <p><strong>Rate:</strong> {profileData.rates ? `$${profileData.rates}/session` : 'Negotiable'}</p>
                  </div>
                )}
                {userRole === 'OTHER_CREATIVE' && profileData && (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {profileData.creativeName}</p>
                    <p><strong>Creative Type:</strong> {profileData.creativeType || 'Unspecified'}</p>
                    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                    <p><strong>Experience:</strong> {profileData.experience || 'Not specified'}</p>
                    <p><strong>Rate:</strong> {profileData.rates ? `$${profileData.rates}/project` : 'Negotiable'}</p>
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