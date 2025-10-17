import { createClient } from '@/lib/supabase/server'

function formatMoney(val: number | null | undefined) {
  if (val == null) return null
  // Heuristic: if value looks like cents (>1000) divide by 100
  if (typeof val === 'number') {
    const dollars = val >= 1000 ? (val / 100) : val
    return `$${dollars}`
  }
  return String(val)
}

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const slug = params.slug

  // Search across profile tables for the slug
  const tables = [
    { name: 'band_profiles', type: 'BAND' },
    { name: 'trivia_host_profiles', type: 'TRIVIA_HOST' },
    { name: 'dj_profiles', type: 'DJ' },
    { name: 'photographer_profiles', type: 'PHOTOGRAPHER' },
    { name: 'other_creative_profiles', type: 'OTHER_CREATIVE' }
  ]

  for (const t of tables) {
    const { data, error } = await supabase
      .from(t.name)
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) continue
    if (data) {
      const displayName = data.bandName ?? data.hostName ?? data.djName ?? data.photographerName ?? data.creativeName ?? data.displayName ?? data.name
      const photos: string[] = data.photos ?? data.portfolioPhotos ?? []

      return (
        <div className="min-h-screen bg-gray-50">
          <main className="container mx-auto px-4 py-12">
            <article className="bg-white rounded-lg shadow overflow-hidden">
              {/* Hero */}
              {photos && photos.length > 0 ? (
                <div className="w-full h-64 md:h-96 bg-gray-200">
                  <img src={photos[0]} alt={`${displayName} hero`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-40 bg-gradient-to-r from-austin-light to-austin-warm"></div>
              )}

              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
                  <p className="text-sm text-gray-600 mb-4">{t.type.replace('_', ' ')}</p>

                  {data.bio && <p className="text-gray-800 leading-relaxed mb-4">{data.bio}</p>}

                  {/* Thumbnails */}
                  {photos && photos.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                      {photos.slice(1, 9).map((url: string, idx: number) => (
                        <div key={idx} className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                          <img src={url} alt={`${displayName} ${idx+1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Role-specific details */}
                  <div className="space-y-3">
                    {t.type === 'BAND' && (
                      <>
                        {data.genre && <div><strong>Genres:</strong> {(data.genre || []).join(', ')}</div>}
                        {data.location && <div><strong>Location:</strong> {data.location}</div>}
                        {(data.minFee || data.maxFee) && (
                          <div><strong>Fee Range:</strong> {formatMoney(data.minFee)}{data.minFee && data.maxFee ? ` - ${formatMoney(data.maxFee)}` : ''}</div>
                        )}
                      </>
                    )}

                    {t.type === 'TRIVIA_HOST' && (
                      <>
                        {data.specialization && <div><strong>Specialization:</strong> {data.specialization}</div>}
                        {data.experience && <div><strong>Experience:</strong> {data.experience}</div>}
                        {data.rates && <div><strong>Rate:</strong> {formatMoney(data.rates) ?? data.rates}</div>}
                      </>
                    )}

                    {t.type === 'DJ' && (
                      <>
                        {data.specialization && <div><strong>Specialization:</strong> {(data.specialization || []).join(', ')}</div>}
                        {data.location && <div><strong>Location:</strong> {data.location}</div>}
                        {(data.minFee || data.maxFee) && (
                          <div><strong>Rate:</strong> {formatMoney(data.minFee)}{data.minFee && data.maxFee ? ` - ${formatMoney(data.maxFee)}` : ''}</div>
                        )}
                      </>
                    )}

                    {t.type === 'PHOTOGRAPHER' && (
                      <>
                        {data.specialization && <div><strong>Specialization:</strong> {(data.specialization || []).join(', ')}</div>}
                        {data.location && <div><strong>Location:</strong> {data.location}</div>}
                        {data.rates && <div><strong>Rate:</strong> {formatMoney(data.rates) ?? data.rates}</div>}
                      </>
                    )}

                    {t.type === 'OTHER_CREATIVE' && (
                      <>
                        {data.creativeType && <div><strong>Creative Type:</strong> {data.creativeType}</div>}
                        {data.location && <div><strong>Location:</strong> {data.location}</div>}
                        {data.rates && <div><strong>Rate:</strong> {formatMoney(data.rates) ?? data.rates}</div>}
                      </>
                    )}
                  </div>
                </div>

                <aside className="md:col-span-1">
                  <div className="p-4 bg-gray-50 rounded">
                    {/* Website */}
                    {data.website && (
                      <div className="mb-3">
                        <a href={data.website} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline">Website</a>
                      </div>
                    )}

                    {/* Contact */}
                    {data.bookingEmail && (
                      <div className="mb-3">
                        <a href={`mailto:${data.bookingEmail}`} className="inline-block bg-austin-orange text-white px-4 py-2 rounded">Contact / Book</a>
                      </div>
                    )}

                    {/* Social / external links */}
                    {data.instagram && <div className="text-sm">Instagram: <a href={data.instagram} className="text-austin-orange" target="_blank" rel="noreferrer">{data.instagram}</a></div>}
                    {data.spotify && <div className="text-sm">Spotify: <a href={data.spotify} className="text-austin-orange" target="_blank" rel="noreferrer">{data.spotify}</a></div>}
                  </div>
                </aside>
              </div>
            </article>
          </main>
        </div>
      )
    }
  }

  return <div className="container mx-auto px-4 py-8">Profile not found</div>
}
