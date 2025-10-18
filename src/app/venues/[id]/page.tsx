import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Props { params: { id: string } }

export default async function VenueProfilePage({ params }: Props) {
  const supabase = createClient()

  let user = null
  try {
    const res = await supabase.auth.getUser()
    user = res?.data?.user ?? null
  } catch (e) {
    user = null
  }

  let venue: any = null
  try {
    const { data: venueProfiles, error } = await supabase
      .from('venue_profiles')
      .select(`
        *,
        user:users!venue_profiles_userId (id, email, name, supabaseId)
      `)
      .eq('id', params.id)

    if (error) throw error
    venue = (venueProfiles || [])[0] ?? null
    if (venue) venue.user = Array.isArray(venue.user) ? venue.user[0] ?? null : venue.user ?? null
  } catch (err: any) {
    if (err.code === 'PGRST200' || (err.details && String(err.details).includes('no matches were found'))) {
      const { data: venueRow } = await supabase
        .from('venue_profiles')
        .select('*')
        .eq('id', params.id)
        .single()
      if (!venueRow) return redirect('/')
      let owner = null
      if (venueRow.userId) {
        const { data: userRow } = await supabase
          .from('users')
          .select('id, email, name, supabaseId')
          .eq('id', venueRow.userId)
          .single()
        owner = userRow ?? null
      }
      venue = { ...venueRow, user: owner }
    } else {
      throw err
    }
  }

  if (!venue) return redirect('/')

  const owner = venue.user
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
        <div className="bg-white rounded shadow p-6 space-y-6">
          {/* Photos gallery */}
          {Array.isArray(venue.photos) && venue.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {venue.photos.slice(0, 6).map((url: string, i: number) => (
                <img key={i} src={url} alt={`${venue.venueName} photo ${i + 1}`} className="w-full h-48 object-cover rounded" />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">{[venue.address, venue.city, venue.state, venue.zipCode].filter(Boolean).join(', ')}</p>

              <div className="mt-4">
                <h3 className="font-semibold">About</h3>
                <p className="mt-2">{venue.description ?? 'No description yet.'}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Capacity</h4>
                  <p className="mt-1">{venue.capacity ?? '—'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Stage</h4>
                  <p className="mt-1">{venue.stageSize ?? '—'}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Genres</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(venue.genrePrefs || []).map((g: string, idx: number) => (
                    <span key={idx} className="text-sm bg-gray-100 px-2 py-1 rounded">{g}</span>
                  ))}
                  {(!venue.genrePrefs || venue.genrePrefs.length === 0) && <span className="text-sm text-gray-500">Not specified</span>}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Amenities</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`text-sm px-2 py-1 rounded ${venue.hasSound ? 'bg-austin-orange text-white' : 'bg-gray-100'}`}>Sound</span>
                  <span className={`text-sm px-2 py-1 rounded ${venue.hasLighting ? 'bg-austin-orange text-white' : 'bg-gray-100'}`}>Lighting</span>
                  <span className={`text-sm px-2 py-1 rounded ${venue.hasParking ? 'bg-austin-orange text-white' : 'bg-gray-100'}`}>Parking</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">Payout</h4>
                <p className="mt-1">{venue.payoutType ?? '—'}</p>
                {venue.payoutDetails && <p className="mt-1 text-sm text-gray-700">{venue.payoutDetails}</p>}
              </div>
            </div>

            <aside>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold">Contact</h4>
                <p className="mt-2 text-sm">{owner?.name ?? owner?.email ?? '—'}</p>
                {venue.phone && <p className="mt-2 text-sm">Phone: <a className="text-austin-orange" href={`tel:${venue.phone}`}>{venue.phone}</a></p>}
                {venue.bookingEmail && <p className="mt-2 text-sm">Booking: <a className="text-austin-orange" href={`mailto:${venue.bookingEmail}`}>{venue.bookingEmail}</a></p>}
                {venue.website && <p className="mt-2 text-sm">Website: <a className="text-austin-orange" href={venue.website} target="_blank" rel="noreferrer">{venue.website}</a></p>}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
