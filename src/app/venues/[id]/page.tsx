import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Props { params: { id: string } }

export default async function VenueProfilePage({ params }: Props) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: venueProfiles } = await supabase
    .from('venue_profiles')
    .select(`
      *,
      user:users!venue_profiles_userId (id, email, name)
    `)
    .eq('id', params.id)

  const venue = (venueProfiles || [])[0] ?? null
  if (!venue) return redirect('/')

  const owner = Array.isArray(venue.user) ? venue.user[0] ?? null : venue.user ?? null
  const isOwner = user && owner && owner.supabaseId === user.id

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-austin-charcoal">{venue.venueName}</h1>
          <div>
            {isOwner && (
              <Link href="/profile/edit" className="text-sm text-austin-orange">Edit Venue</Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6">
          <p className="text-sm text-gray-600">{venue.address ?? ''} {venue.city ?? ''} {venue.state ?? ''}</p>
          <div className="mt-4">
            <h3 className="font-semibold">About</h3>
            <p className="mt-2">{venue.description ?? 'No description yet.'}</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Capacity</h4>
            <p className="mt-1">{venue.capacity ?? '—'}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold">Contact</h4>
            <p className="mt-1">{owner?.name ?? owner?.email ?? '—'}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
