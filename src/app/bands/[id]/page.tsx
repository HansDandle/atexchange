import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface Props { params: { id: string } }

export default async function BandProfilePage({ params }: Props) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: bandProfiles } = await supabase
    .from('band_profiles')
    .select(`
      *,
      user:users!band_profiles_userId (id, email, name)
    `)
    .eq('id', params.id)

  const band = (bandProfiles || [])[0] ?? null
  if (!band) return redirect('/')

  const owner = Array.isArray(band.user) ? band.user[0] ?? null : band.user ?? null

  const isOwner = user && owner && owner.supabaseId === user.id

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-austin-charcoal">{band.bandName}</h1>
          <div>
            {isOwner && (
              <Link href="/profile/edit" className="text-sm text-austin-orange">Edit Profile</Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6">
          <p className="text-sm text-gray-600">{band.location ?? 'Location not provided'}</p>
          <div className="mt-4">
            <h3 className="font-semibold">About</h3>
            <p className="mt-2">{band.bio ?? 'No bio yet.'}</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Genres</h4>
            <p className="mt-1">{(band.genre || []).join(', ')}</p>
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
