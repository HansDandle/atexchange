import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function BandsPage() {
  const supabase = createClient()

  // Fetch public band profiles with their owner user (may be null)
  const { data: bandProfiles } = await supabase
    .from('band_profiles')
    .select(`
      id,
      bandName,
      location,
      genre,
      photos,
      user:users!band_profiles_userId (id, email, name)
    `)

  const normalized = (bandProfiles || []).map((b: any) => ({
    ...b,
    user: Array.isArray(b.user) ? b.user[0] ?? null : b.user ?? null,
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-austin-charcoal">Bands</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
