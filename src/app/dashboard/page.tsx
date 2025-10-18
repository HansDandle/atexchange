import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { resolveDbUser, getProfilesForUser, getBandRecentActivity, getBandUpcomingGigs } from '@/lib/dashboard'
import ProfileSummary from '@/components/dashboard/ProfileSummary'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentActivity from '@/components/dashboard/RecentActivity'
import UpcomingGigs from '@/components/dashboard/UpcomingGigs'
import BandSelector from '@/components/dashboard/BandSelector'

export default async function DashboardPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const resolvedDbUser = await resolveDbUser(supabase, user)
  if (!resolvedDbUser) return redirect('/onboarding')

  const { role, profiles } = await getProfilesForUser(supabase, resolvedDbUser)
  // Support multiple profiles per user. If bandId provided in query, pick that profile.
  const profilesArray = Array.isArray(profiles) ? profiles : profiles ? [profiles] : []
  const requestedBandId = typeof searchParams?.bandId === 'string' ? searchParams?.bandId : undefined
  const profile = requestedBandId ? profilesArray.find(p => String(p.id) === requestedBandId) ?? profilesArray[0] ?? null : profilesArray[0] ?? null

  let recentActivity: any[] = []
  let upcomingGigs: any[] = []
  if (role === 'BAND' && profile?.id) {
    recentActivity = await getBandRecentActivity(supabase, profile.id)
    upcomingGigs = await getBandUpcomingGigs(supabase, profile.id)
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-austin-charcoal">Austin Talent Exchange</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.user_metadata?.name || user.email}</span>
              {/* If multiple band profiles, show selector */}
              {role === 'BAND' && profilesArray.length > 1 && (
                <BandSelector profiles={profilesArray} selectedId={profile?.id} />
              )}
              {role === 'ADMIN' && <Link href="/admin"><Button variant="austin" size="sm">Admin Dashboard</Button></Link>}
              {role === 'BAND' && <Link href="/onboarding?role=band"><Button variant="outline" size="sm">Create New Band</Button></Link>}
              <form action={handleSignOut}><Button variant="outline" size="sm">Sign Out</Button></form>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {profile ? (
            <>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-austin-charcoal mb-4">Welcome back, {profile.bandName ?? profile.venueName ?? profile.hostName ?? profile.djName ?? profile.photographerName ?? profile.creativeName ?? user.user_metadata?.name}!</h2>
                <p className="text-gray-600 mb-4">{role === 'BAND' ? 'Your band profile is complete. Start browsing available gigs!' : role === 'VENUE' ? 'Your venue profile is complete. Start posting available slots!' : 'Your profile is ready.'}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <QuickActions role={role} profile={profile} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <RecentActivity items={recentActivity} />
                <UpcomingGigs gigs={upcomingGigs} role={role} />
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
    </div>
  )
}