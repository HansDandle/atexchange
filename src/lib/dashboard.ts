import { createClient } from '@/lib/supabase/server'

export async function resolveDbUser(supabase = createClient(), authUser: any) {
  const { data: bySupabase, error: supabaseErr } = await supabase
    .from('users')
    .select('id, role, email, suspended')
    .eq('supabaseId', authUser.id)
    .maybeSingle()
  if (supabaseErr) console.error(supabaseErr)
  if (bySupabase) return bySupabase

  const { data: byEmail, error: emailErr } = await supabase
    .from('users')
    .select('id, role, email, suspended')
    .eq('email', authUser.email)
    .maybeSingle()
  if (emailErr) console.error(emailErr)
  return byEmail ?? null
}

export async function getProfilesForUser(supabase = createClient(), dbUser: any) {
  if (!dbUser) return { role: null, profiles: [] }
  const role = dbUser.role
  const tableMap: Record<string, { table: string, nameField: string }> = {
    BAND: { table: 'band_profiles', nameField: 'bandName' },
    VENUE: { table: 'venue_profiles', nameField: 'venueName' },
    TRIVIA_HOST: { table: 'trivia_host_profiles', nameField: 'hostName' },
    DJ: { table: 'dj_profiles', nameField: 'djName' },
    PHOTOGRAPHER: { table: 'photographer_profiles', nameField: 'name' },
    OTHER_CREATIVE: { table: 'other_creative_profiles', nameField: 'displayName' }
  }
  const tableInfo = tableMap[role]
  if (!tableInfo) return { role, profiles: [] }
  // Always select id, slug, and the main name field for UI
  const { data, error } = await supabase
    .from(tableInfo.table)
    .select(`*, slug, ${tableInfo.nameField}`)
    .eq('userId', dbUser.id)
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

export async function getVenueUpcomingEvents(supabase = createClient(), venueProfileId: string) {
  const today = new Date().toISOString().split('T')[0]
  
  // First fetch venue slots
  const { data: slots, error: slotsError } = await supabase
    .from('venue_slots')
    .select('id, eventDate, startTime, eventTitle, venueProfileId')
    .eq('venueProfileId', venueProfileId)
    .gte('eventDate', today)
    .order('eventDate', { ascending: true })
    .limit(10)

  if (slotsError) {
    console.error('Error fetching venue slots:', slotsError)
    return []
  }

  if (!slots || slots.length === 0) return []

  // For each slot, fetch applications and tickets separately
  const enrichedSlots = await Promise.all(slots.map(async (slot: any) => {
    const { data: applications } = await supabase
      .from('applications')
      .select('id, status, bandProfileId, proposedFee, band_profiles:bandProfileId(bandName)')
      .eq('venueSlotId', slot.id)

    const { data: tickets } = await supabase
      .from('tickets')
      .select('id, shareUrl, rsvpCount')
      .eq('venueSlotId', slot.id)

    const appsArray = Array.isArray(applications) ? applications : applications ? [applications] : []
    const ticketsArray = Array.isArray(tickets) ? tickets : tickets ? [tickets] : []

    return {
      ...slot,
      applications: appsArray.map((app: any) => ({
        ...app,
        bandProfile: Array.isArray(app.band_profiles) ? app.band_profiles[0] ?? null : app.band_profiles ?? null
      })),
      tickets: ticketsArray
    }
  }))

  return enrichedSlots
}

export async function getVenueRecentActivity(supabase = createClient(), venueProfileId: string) {
  // First get all venue slots for this venue
  const { data: venueSlots } = await supabase
    .from('venue_slots')
    .select('id')
    .eq('venueProfileId', venueProfileId)

  if (!venueSlots || venueSlots.length === 0) return []

  const slotIds = venueSlots.map(s => s.id)

  // Then get applications for those slots
  const { data: applications } = await supabase
    .from('applications')
    .select('id, status, createdAt, bandProfileId, venueSlotId')
    .in('venueSlotId', slotIds)
    .order('createdAt', { ascending: false })
    .limit(5)

  if (!applications || applications.length === 0) return []

  // Enrich with band names and event titles
  const enriched = await Promise.all(applications.map(async (app: any) => {
    const { data: bandProfile } = await supabase
      .from('band_profiles')
      .select('bandName')
      .eq('id', app.bandProfileId)
      .single()

    const { data: venueSlot } = await supabase
      .from('venue_slots')
      .select('eventTitle')
      .eq('id', app.venueSlotId)
      .single()

    return {
      type: 'application',
      status: app.status,
      bandName: bandProfile?.bandName ?? 'Unknown Band',
      eventTitle: venueSlot?.eventTitle ?? 'TBD',
      createdAt: app.createdAt
    }
  }))

  return enriched
}
