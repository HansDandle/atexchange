import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface Props { searchParams?: { sort?: string } }

export default async function VenuesPage({ searchParams }: Props) {
  const supabase = createClient()
  const sort = (searchParams?.sort || 'recent') as string

  let normalized: any[] = []
  try {
    let query = supabase
      .from('venue_profiles')
      .select(`
        id,
        venueName,
        city,
        state,
        capacity,
        photos,
        user:users!venue_profiles_userId (id, email, name),
        createdAt
      `)

    if (sort === 'name') query = query.order('venueName', { ascending: true })
    else if (sort === 'city') query = query.order('city', { ascending: true })
    else query = query.order('createdAt', { ascending: false })

    const { data: venueProfiles, error } = await query

    if (error) throw error
    normalized = (venueProfiles || []).map((v: any) => ({
      ...v,
      user: Array.isArray(v.user) ? v.user[0] ?? null : v.user ?? null,
    }))
  } catch (err: any) {
    if (err.code === 'PGRST200' || (err.details && String(err.details).includes('no matches were found'))) {
      const { data: profiles } = await supabase
        .from('venue_profiles')
        .select('id, venueName, city, state, capacity, photos, userId')

      const ids = Array.from(new Set((profiles || []).map((p: any) => p.userId).filter(Boolean)))
      const { data: users } = ids.length > 0 ? await supabase
        .from('users')
        .select('id, email, name')
        .in('id', ids) : { data: [] }

      const usersById = (users || []).reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {})
      normalized = (profiles || []).map((p: any) => ({
        ...p,
        user: usersById[p.userId] ?? null,
      }))
    } else {
      throw err
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-austin-charcoal">Venues</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort:</label>
            <a href="/venues?sort=recent" className={`px-2 py-1 rounded ${sort==='recent' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700'}`}>Recent</a>
            <a href="/venues?sort=name" className={`px-2 py-1 rounded ${sort==='name' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700'}`}>Name</a>
            <a href="/venues?sort=city" className={`px-2 py-1 rounded ${sort==='city' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700'}`}>City</a>
          </div>
        </div>

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
