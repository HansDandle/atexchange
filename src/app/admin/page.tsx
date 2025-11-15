import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default async function AdminPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Check if user is an admin
  const { data: dbUser } = await supabase
    .from('users')
    .select('role')
    .eq('supabaseId', user.id)
    .single()

  if (!dbUser || dbUser.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Fetch all users with their profiles
  const { data: allUsers } = await supabase
    .from('users')
    .select('*')
    .order('createdAt', { ascending: false })

  // Fetch all band profiles
  const { data: bandProfiles } = await supabase
    .from('band_profiles')
    .select(`
      *,
      user:userId (
        id,
        email,
        name,
        role,
        supabaseId
      )
    `)
    .order('createdAt', { ascending: false })

  // Fetch all venue profiles  
  const { data: venueProfiles } = await supabase
    .from('venue_profiles')
    .select('*')
    .order('createdAt', { ascending: false })

  // Fetch users separately and attach to venue profiles
  const { data: usersMap } = await supabase
    .from('users')
    .select('id, email, name, role, supabaseId')
  
  const venueProfilesWithUsers = (venueProfiles || []).map(venue => {
    const user = (usersMap || []).find(u => u.id === venue.userId);
    return {
      ...venue,
      users: user || null
    };
  });

  // Fetch recent applications
  const { data: recentApplications } = await supabase
    .from('applications')
    .select(`
      *,
      band_profiles:bandProfileId (
        bandName,
        users:userId (
          email
        )
      ),
      venue_slots:venueSlotId (
        eventTitle,
        eventDate,
        venue_profiles:venueProfileId (
          venueName,
          users:userId (
            email
          )
        )
      )
    `)
    .order('createdAt', { ascending: false })
    .limit(20)

  // Normalize related objects (ensure single object for FK relations)
  const normalizedApplications = (recentApplications || []).map((app: any) => {
    const band = Array.isArray(app.band_profiles) ? app.band_profiles[0] ?? null : app.band_profiles ?? null
    const venueSlot = Array.isArray(app.venue_slots) ? app.venue_slots[0] ?? null : app.venue_slots ?? null
    return {
      ...app,
      band_profiles: band,
      venue_slots: venueSlot ? ({
        ...venueSlot,
        venue_profiles: Array.isArray(venueSlot.venue_profiles) ? venueSlot.venue_profiles[0] ?? null : venueSlot.venue_profiles ?? null
      }) : null
    }
  })

  // Fetch venue slots
  const { data: venueSlots } = await supabase
    .from('venue_slots')
    .select(`
      *,
      venue_profiles:venueProfileId (
        venueName
      )
    `)
    .order('createdAt', { ascending: false })
    .limit(50)

  const normalizedVenueSlots = (venueSlots || []).map((slot: any) => {
    const venueProfile = Array.isArray(slot.venue_profiles) ? slot.venue_profiles[0] ?? null : slot.venue_profiles ?? null;
    const venueUser = venueProfile ? (usersMap || []).find(u => u.id === venueProfile.userId) : null;
    return {
      ...slot,
      venue_profiles: venueProfile ? {
        ...venueProfile,
        users: venueUser || null
      } : null
    }
  })

  // Fetch messages
  const { data: messages } = await supabase
    .from('messages')
    .select(`
      *,
      sender:senderId (
        email,
        name
      ),
      receiver:receiverId (
        email,
        name
      )
    `)
    .order('createdAt', { ascending: false })
    .limit(50)

  return (
    <AdminDashboard
      allUsers={allUsers || []}
      bandProfiles={bandProfiles || []}
      venueProfiles={venueProfilesWithUsers}
      recentApplications={normalizedApplications}
      venueSlots={normalizedVenueSlots}
      messages={messages || []}
    />
  )
}