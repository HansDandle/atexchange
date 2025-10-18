import { createClient } from '@/lib/supabase/server'

export async function resolveDbUser(supabase = createClient(), authUser: any) {
  const { data: bySupabase, error: supabaseErr } = await supabase
    .from('users')
    .select('id, role, email')
    .eq('supabaseId', authUser.id)
    .maybeSingle()
  if (supabaseErr) console.error(supabaseErr)
  if (bySupabase) return bySupabase

  const { data: byEmail, error: emailErr } = await supabase
    .from('users')
    .select('id, role, email')
    .eq('email', authUser.email)
    .maybeSingle()
  if (emailErr) console.error(emailErr)
  return byEmail ?? null
}

export async function getProfilesForUser(supabase = createClient(), dbUser: any) {
  if (!dbUser) return { role: null, profiles: [] }
  const role = dbUser.role
  const tableMap: Record<string, string> = {
    BAND: 'band_profiles',
    VENUE: 'venue_profiles',
    TRIVIA_HOST: 'trivia_host_profiles',
    DJ: 'dj_profiles',
    PHOTOGRAPHER: 'photographer_profiles',
    OTHER_CREATIVE: 'other_creative_profiles'
  }
  const table = tableMap[role]
  if (!table) return { role, profiles: [] }
  const { data, error } = await supabase.from(table).select('*').eq('userId', dbUser.id)
  if (error) console.error('getProfilesForUser error', error)
  return { role, profiles: data ?? [] }
}

export async function getBandRecentActivity(supabase = createClient(), bandProfileId: string) {
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
        venue_profiles:venueProfileId ( venueName )
      )
    `)
    .eq('bandProfileId', bandProfileId)
    .order('createdAt', { ascending: false })
    .limit(5)

  return (applications || []).map((app: any) => {
    const vs = Array.isArray(app.venue_slots) ? app.venue_slots[0] ?? null : app.venue_slots ?? null
    const vp = vs ? (Array.isArray(vs.venue_profiles) ? vs.venue_profiles[0] ?? null : vs.venue_profiles ?? null) : null
    return {
      type: 'application',
      status: app.status,
      venueName: vp?.venueName ?? 'Unknown Venue',
      eventTitle: vs?.eventTitle ?? 'TBD',
      eventDate: vs?.eventDate ?? null,
      createdAt: app.createdAt
    }
  })
}

export async function getBandUpcomingGigs(supabase = createClient(), bandProfileId: string) {
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
    .eq('bandProfileId', bandProfileId)
    .eq('status', 'ACCEPTED')
    .gte('venue_slots.eventDate', new Date().toISOString().split('T')[0])
    .order('venue_slots.eventDate', { ascending: true })
    .limit(3)

  return (acceptedGigs || []).map((g: any) => {
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
