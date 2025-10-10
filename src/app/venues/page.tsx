import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function VenuesPage() {
  const supabase = createClient()

  const { data: venueProfiles } = await supabase
    .from('venue_profiles')
    .select(`
      id,
      venueName,
      city,
      state,
      capacity,
      photos,
      user:users!venue_profiles_userId (id, email, name)
    `)

  const normalized = (venueProfiles || []).map((v: any) => ({
    ...v,
    user: Array.isArray(v.user) ? v.user[0] ?? null : v.user ?? null,
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-austin-charcoal">Venues</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalized.map((v: any) => (
            <article key={v.id} className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-semibold">{v.venueName}</h2>
              <p className="text-sm text-gray-600">{v.city ?? ''}{v.state ? `, ${v.state}` : ''}</p>
              <p className="text-sm mt-2 text-gray-700">Capacity: {v.capacity ?? '—'}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/venues/${v.id}`} className="text-austin-orange font-medium">View Profile</Link>
                <span className="text-xs text-gray-500">Owner: {v.user?.name ?? v.user?.email ?? '—'}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
