import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Header from '@/components/Header'

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
      .ilike('slug', slug)
      .maybeSingle()

    if (error) continue
    if (data) {
      const displayName = data.bandName ?? data.hostName ?? data.djName ?? data.photographerName ?? data.creativeName ?? data.displayName ?? data.name
      const photos: string[] = data.photos ?? data.portfolioPhotos ?? []

      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-austin-orange">
                ← Back Home
              </Link>
            </div>
          </header>
          <main className="container mx-auto px-4 py-12">
            <article className="bg-white rounded-lg shadow overflow-hidden">
              {/* Header with name and type */}
              <div className="p-6 md:p-10 border-b">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{displayName}</h1>
                <p className="text-sm text-gray-600">{t.type.replace('_', ' ')}</p>
              </div>

              {/* Hero */}
              {photos && photos.length > 0 ? (
                <div className="w-full bg-gray-200 flex items-center justify-center max-h-[600px]">
                  <img src={photos[0]} alt={`${displayName} hero`} className="w-full h-auto max-h-[600px] object-contain" style={{ maxWidth: '100%' }} />
                </div>
              ) : (
                <div className="w-full h-80 md:h-[500px] bg-gradient-to-r from-austin-light to-austin-warm"></div>
              )}

              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {data.bio && <p className="text-gray-800 leading-relaxed mb-4">{data.bio}</p>}

                  {/* Thumbnails */}
                  {photos && photos.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                      {photos.slice(1, 9).map((url: string, idx: number) => (
                        <div key={idx} className="w-full bg-gray-100 rounded overflow-hidden relative" style={{ paddingTop: '100%' }}>
                          <img src={url} alt={`${displayName} ${idx + 1}`} className="absolute top-0 left-0 w-full h-full object-cover object-center" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Audio samples for bands */}
                  {t.type === 'BAND' && data.audioSamples && data.audioSamples.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Audio Samples</h3>
                      <div className="space-y-2">
                        {data.audioSamples.map((url: string, idx: number) => (
                          <div key={idx}>
                            <a href={url} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline text-sm">
                              Listen to sample {idx + 1}
                            </a>
                          </div>
                        ))}
                      </div>
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
                        {data.techRider && (
                          <div>
                            <strong>Technical Rider:</strong>
                            <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{data.techRider}</p>
                          </div>
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
                  <div className="p-4 bg-gray-50 rounded space-y-4">
                    {/* Website */}
                    {data.website && (
                      <div>
                        <a href={data.website} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline font-medium">Website</a>
                      </div>
                    )}

                    {/* Social Media Links - Bands */}
                    {t.type === 'BAND' && (
                      <>
                        {data.spotifyUrl && (
                          <div>
                            <a href={data.spotifyUrl} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline">Spotify</a>
                          </div>
                        )}
                        {data.youtubeUrl && (
                          <div>
                            <a href={data.youtubeUrl} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline">YouTube</a>
                          </div>
                        )}
                        {data.instagramUrl && (
                          <div>
                            <a href={data.instagramUrl} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline">Instagram</a>
                          </div>
                        )}
                        {data.facebookUrl && (
                          <div>
                            <a href={data.facebookUrl} target="_blank" rel="noreferrer" className="text-austin-orange hover:underline">Facebook</a>
                          </div>
                        )}
                      </>
                    )}

                    {/* Contact */}
                    {data.bookingEmail && (
                      <div>
                        <a href={`mailto:${data.bookingEmail}`} className="inline-block bg-austin-orange text-white px-4 py-2 rounded hover:bg-austin-charcoal">Contact / Book</a>
                      </div>
                    )}

                    {/* Generic social / external links */}
                    {data.instagram && t.type !== 'BAND' && <div className="text-sm">Instagram: <a href={data.instagram} className="text-austin-orange" target="_blank" rel="noreferrer">{data.instagram}</a></div>}
                    {data.spotify && t.type !== 'BAND' && <div className="text-sm">Spotify: <a href={data.spotify} className="text-austin-orange" target="_blank" rel="noreferrer">{data.spotify}</a></div>}
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
