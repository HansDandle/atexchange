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
      users:userId (
        id,
        email,
        name,
        supabaseId
      )
    `)
    .order('createdAt', { ascending: false })

  // Fetch all venue profiles  
  const { data: venueProfiles } = await supabase
    .from('venue_profiles')
    .select(`
      *,
      users:userId (
        id,
        email,
        name,
        supabaseId
      )
    `)
    .order('createdAt', { ascending: false })

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

  // Fetch venue slots
  const { data: venueSlots } = await supabase
    .from('venue_slots')
    .select(`
      *,
      venue_profiles:venueProfileId (
        venueName,
        users:userId (
          email
        )
      )
    `)
    .order('createdAt', { ascending: false })
    .limit(50)

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
      venueProfiles={venueProfiles || []}
      recentApplications={recentApplications || []}
      venueSlots={venueSlots || []}
      messages={messages || []}
    />
  )
}