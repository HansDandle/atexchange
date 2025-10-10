import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface Props { searchParams?: { sort?: string } }

export default async function BandsPage({ searchParams }: Props) {
  const supabase = createClient()
  const sort = (searchParams?.sort || 'recent') as string

  // Fetch public band profiles and owner info. Try a FK join, but fall back to
  // fetching owners separately if the relationship isn't present in the PostgREST schema cache.
  let normalized: any[] = []
  try {
    let query = supabase
      .from('band_profiles')
      .select(`
        id,
        bandName,
        location,
        genre,
        photos,
        user:users!band_profiles_userId (id, email, name),
        createdAt
      `)

    if (sort === 'name') query = query.order('bandName', { ascending: true })
    else if (sort === 'location') query = query.order('location', { ascending: true })
    else query = query.order('createdAt', { ascending: false })

    const { data: bandProfiles, error } = await query

    if (error) throw error

    normalized = (bandProfiles || []).map((b: any) => ({
      ...b,
      user: Array.isArray(b.user) ? b.user[0] ?? null : b.user ?? null,
    }))
  } catch (err: any) {
    // If PostgREST doesn't know the FK relationship in the schema cache,
    // fetch profiles and then fetch users by userId in a separate request.
    if (err.code === 'PGRST200' || (err.details && String(err.details).includes('no matches were found'))) {
      const { data: profiles } = await supabase
        .from('band_profiles')
        .select('id, bandName, location, genre, photos, userId')

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
          <h1 className="text-2xl font-bold text-austin-charcoal">Bands</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort:</label>
            <a href="/bands?sort=recent" className={`px-2 py-1 rounded ${sort==='recent' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700'}`}>Recent</a>
            <a href="/bands?sort=name" className={`px-2 py-1 rounded ${sort==='name' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700'}`}>Name</a>
            <a href="/bands?sort=location" className={`px-2 py-1 rounded ${sort==='location' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700'}`}>Location</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalized.map((b: any) => (
            <article key={b.id} className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-semibold">{b.bandName}</h2>
              <p className="text-sm text-gray-600">{b.location ?? '—'}</p>
              <p className="text-sm mt-2 text-gray-700">{(b.genre || []).slice(0,3).join(', ')}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/bands/${b.id}`} className="text-austin-orange font-medium">View Profile</Link>
                <span className="text-xs text-gray-500">Member: {b.user?.name ?? b.user?.email ?? '—'}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
