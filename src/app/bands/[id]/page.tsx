import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'

const BandGallery = dynamic(() => import('@/components/BandGallery'), { ssr: false })

interface Props { params: { id: string } }

export default async function BandProfilePage({ params }: Props) {
  const supabase = createClient()

  let user = null
  try {
    const res = await supabase.auth.getUser()
    user = res?.data?.user ?? null
  } catch (e) {
    // Ignore auth errors on public pages (dev refresh tokens etc.)
    user = null
  }

  let band: any = null
  try {
    const { data: bandProfiles, error } = await supabase
      .from('band_profiles')
      .select(`
        *,
        user:users!band_profiles_userId (id, email, name, supabaseId)
      `)
      .eq('id', params.id)

    if (error) throw error
    band = (bandProfiles || [])[0] ?? null
    if (band) band.user = Array.isArray(band.user) ? band.user[0] ?? null : band.user ?? null
  } catch (err: any) {
    if (err.code === 'PGRST200' || (err.details && String(err.details).includes('no matches were found'))) {
      const { data: bandRow } = await supabase
        .from('band_profiles')
        .select('*')
        .eq('id', params.id)
        .single()
      if (!bandRow) return redirect('/')
      let owner = null
      if (bandRow.userId) {
        const { data: userRow } = await supabase
          .from('users')
          .select('id, email, name, supabaseId')
          .eq('id', bandRow.userId)
          .single()
        owner = userRow ?? null
      }
      band = { ...bandRow, user: owner }
    } else {
      throw err
    }
  }

  if (!band) return redirect('/')

  const owner = band.user

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
          <div className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <BandGallery photos={(band.photos || []).slice(0,5)} />

            <div>
              <p className="text-sm text-gray-600">{band.location ?? 'Location not provided'}</p>
              <h3 className="text-2xl font-semibold mt-2">About</h3>
              <p className="mt-2 text-gray-800">{band.bio ?? 'No bio yet.'}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {(band.genre || []).map((g: string, i: number) => (
                <span key={i} className="inline-block bg-austin-orange/10 text-austin-orange px-3 py-1 rounded-full text-sm">{g}</span>
              ))}
            </div>

            <div>
              <h4 className="font-semibold">Technical Rider</h4>
              <p className="mt-2 text-gray-700">{band.techRider ?? 'No technical rider provided.'}</p>
            </div>

            <div>
              <h4 className="font-semibold">Audio Samples</h4>
              {band.audioSamples && band.audioSamples.length > 0 ? (
                <ul className="space-y-2 mt-2">
                  {band.audioSamples.map((a: string, i: number) => (
                    <li key={i}><a href={a} className="text-austin-orange" target="_blank" rel="noreferrer">Listen sample {i+1}</a></li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-600">No audio samples provided.</p>
              )}
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Photos</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {(band.photos || []).slice(0,4).map((p: string, idx: number) => (
                    <img key={idx} src={p} className="w-full h-20 object-cover rounded" alt={`photo-${idx+1}`} />
                  ))}
                  {(!band.photos || band.photos.length === 0) && (
                    <p className="text-gray-600">No photos yet.</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Website & Socials</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex flex-col gap-2">
                    {band.website && (
                      <a href={band.website} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm" className="w-full justify-start">Website</Button>
                      </a>
                    )}
                    {band.spotifyUrl && (
                      <a href={band.spotifyUrl} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="sm" className="w-full justify-start">Spotify</Button>
                      </a>
                    )}
                    {band.youtubeUrl && (
                      <a href={band.youtubeUrl} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="sm" className="w-full justify-start">YouTube</Button>
                      </a>
                    )}
                    {band.instagramUrl && (
                      <a href={band.instagramUrl} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="sm" className="w-full justify-start">Instagram</Button>
                      </a>
                    )}
                    {band.facebookUrl && (
                      <a href={band.facebookUrl} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="sm" className="w-full justify-start">Facebook</Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Fee Range</h4>
                <p className="mt-1">{band.minFee || band.maxFee ? `$${(band.minFee||0)/100} - $${(band.maxFee||0)/100}` : 'Not specified'}</p>
              </div>

              <div>
                <h4 className="font-semibold">Contact</h4>
                <p className="mt-1">{owner?.name ?? owner?.email ?? '\u2014'}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
