// Union type for all possible profile shapes
type Profile = {
  id: string;
  bandName?: string;
  venueName?: string;
  hostName?: string;
  djName?: string;
  name?: string;
  displayName?: string;
};
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { resolveDbUser, getProfilesForUser, getBandRecentActivity, getBandUpcomingGigs, getVenueUpcomingEvents, getVenueRecentActivity } from '@/lib/dashboard'
import ProfileSummary from '@/components/dashboard/ProfileSummary'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentActivity from '@/components/dashboard/RecentActivity'
import UpcomingGigs from '@/components/dashboard/UpcomingGigs'
import VenueEvents from '@/components/dashboard/VenueEvents'
import BandSelector from '@/components/dashboard/BandSelector'
import Header from '@/components/Header';

export default async function DashboardPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const resolvedDbUser = await resolveDbUser(supabase, user)
  if (!resolvedDbUser) return redirect('/onboarding')

  // Check if user is suspended
  if (resolvedDbUser.suspended) {
    redirect('/suspended')
  }

  const { role, profiles } = await getProfilesForUser(supabase, resolvedDbUser)
  // Support multiple profiles per user. If bandId provided in query, pick that profile.
  // Type guard to exclude ParserError and ensure only valid profile objects
  function isValidProfile(p: any): p is Profile {
    return p && typeof p === 'object' && 'id' in p && !('issues' in p) && !('message' in p) && !('expected' in p);
  }
  const rawProfiles: any[] = Array.isArray(profiles) ? profiles : profiles ? [profiles] : [];
  const profilesArray = rawProfiles.filter(isValidProfile) as unknown as Profile[];
  const requestedBandId = typeof searchParams?.bandId === 'string' ? searchParams?.bandId : undefined
  const profile: Profile | null = requestedBandId ? profilesArray.find(p => String(p.id) === requestedBandId) ?? profilesArray[0] ?? null : profilesArray[0] ?? null

  let recentActivity: any[] = []
  let upcomingGigs: any[] = []
  let venueEvents: any[] = []
  if (profile) {
    if (role === 'BAND') {
      recentActivity = await getBandRecentActivity(supabase, profile.id)
      upcomingGigs = await getBandUpcomingGigs(supabase, profile.id)
    } else if (role === 'VENUE') {
      recentActivity = await getVenueRecentActivity(supabase, profile.id)
      venueEvents = await getVenueUpcomingEvents(supabase, profile.id)
    }
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {profile ? (
            <>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-austin-charcoal mb-4">Welcome back, {
                  role === 'BAND' && 'bandName' in profile ? profile.bandName :
                  role === 'VENUE' && 'venueName' in profile ? profile.venueName :
                  role === 'TRIVIA_HOST' && 'hostName' in profile ? profile.hostName :
                  role === 'DJ' && 'djName' in profile ? profile.djName :
                  role === 'PHOTOGRAPHER' && 'name' in profile ? profile.name :
                  role === 'OTHER_CREATIVE' && 'displayName' in profile ? profile.displayName :
                  user.user_metadata?.name
                }!</h2>
                <p className="text-gray-600 mb-4">{role === 'BAND' ? 'Your band profile is complete. Start browsing available gigs!' : role === 'VENUE' ? 'Your venue profile is complete. Start posting available slots!' : 'Your profile is ready.'}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <QuickActions role={role} profile={profile} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <RecentActivity items={recentActivity} />
                {role === 'BAND' && <UpcomingGigs gigs={upcomingGigs} role={role} />}
                {role === 'VENUE' && <VenueEvents events={venueEvents} />}
                <ProfileSummary profile={profile} role={role} />
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h2 className="text-3xl font-bold text-austin-charcoal mb-4">Welcome to Your Dashboard!</h2>
              <p className="text-gray-600 mb-8">Your account has been created successfully. Let&apos;s set up your profile to get started.</p>

              <div className="space-y-4">
                <Link href="/onboarding"><Button variant="austin" size="lg">Complete Your Profile</Button></Link>
                <div className="text-sm text-gray-500">User ID: {user.id}<br/>Role: {role ?? user.user_metadata?.role ?? 'Not set'}</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}