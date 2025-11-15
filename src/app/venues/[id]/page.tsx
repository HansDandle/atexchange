"use client";

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'
import Header from '@/components/Header'
import { useSession } from '@/lib/session-context'
import useSWR from 'swr';

interface Props { params: { id: string } }

export default function VenueProfilePage({ params }: Props) {
  const { user: sessionUser } = useSession();
  const [venue, setVenue] = useState<any>(null);
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: venueProfiles, error: venueError } = await supabase
          .from('venue_profiles')
          .select('*')
          .eq('id', params.id)

        if (venueError) throw venueError
        const venueData = (venueProfiles || [])[0] ?? null
        if (venueData) venueData.user = Array.isArray(venueData.user) ? venueData.user[0] ?? null : venueData.user ?? null
        setVenue(venueData);

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
          setVenue({ ...venueRow, user: owner });
        } else {
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [params.id]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: reviews, mutate } = useSWR(`/api/venues/${params.id}/reviews`, fetcher);

  const handleReviewSubmit = async () => {
    if (!sessionUser) return;
    const response = await fetch(`/api/venues/${params.id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newReview,
        userId: isAnonymous ? null : sessionUser.id,
      }),
    });
    if (response.ok) {
      mutate();
      setNewReview({ rating: 0, text: '' });
      setIsAnonymous(false);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Loading...</div>;

  const owner = venue.user
  const isOwner = sessionUser && owner && owner.supabaseId === sessionUser.id

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/venues" className="text-sm text-gray-600 hover:text-austin-orange">
              ← Back to Browse Venues
            </Link>
            {isOwner && (
              <Link href="/profile/edit" className="text-sm text-austin-orange hover:underline">
                Edit Venue
              </Link>
            )}
          </div>
          <h1 className="text-2xl font-bold text-austin-charcoal">{venue.venueName}</h1>
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
                {sessionUser ? (
                  <>
                    <p className="mt-2 text-sm">{owner?.name ?? owner?.email ?? '—'}</p>
                    {venue.phone && <p className="mt-2 text-sm">Phone: <a className="text-austin-orange" href={`tel:${venue.phone}`}>{venue.phone}</a></p>}
                    {venue.bookingEmail && <p className="mt-2 text-sm">Booking: <a className="text-austin-orange" href={`mailto:${venue.bookingEmail}`}>{venue.bookingEmail}</a></p>}
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">Login to view contact details</p>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-8">
            {/* Claim Venue section */}
            {sessionUser && !isOwner && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-yellow-700">
                  Do you do the booking here?&nbsp;
                  <button
                    // onClick={handleClaim}
                    className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-austin-orange rounded hover:bg-austin-orange-dark focus:outline-none focus:ring-2 focus:ring-austin-orange focus:ring-opacity-50"
                  >
                    Claim your venue
                  </button>
                </p>
              </div>
            )}
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-bold">Reviews</h2>
            {sessionUser ? (
              <>
                <div className="mt-4">
                  <h3 className="font-semibold">Leave a Review</h3>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      className="w-full px-3 py-2 border rounded"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
                    >
                      <option value={0}>Select a rating</option>
                      <option value={0.5}>0.5 ★</option>
                      <option value={1}>1 ★</option>
                      <option value={1.5}>1.5 ★</option>
                      <option value={2}>2 ★</option>
                      <option value={2.5}>2.5 ★</option>
                      <option value={3}>3 ★</option>
                      <option value={3.5}>3.5 ★</option>
                      <option value={4}>4 ★</option>
                    </select>
                  </div>
                  <textarea
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Write your review..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  />
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-700">Post anonymously</label>
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-austin-orange text-white rounded"
                    onClick={handleReviewSubmit}
                  >
                    Submit Review
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold">All Reviews</h3>
                  {reviews?.length > 0 ? (
                    reviews.map((review: any, index: number) => {
                      const renderRatingNotes = (rating: number) => {
                        return Array.from({ length: 4 }).map((_, i) => {
                          const noteValue = i + 1
                          const isFilled = rating >= noteValue
                          const isHalf = rating > i && rating < noteValue
                          return (
                            <img
                              key={i}
                              src={isFilled ? '/wholenote.png' : isHalf ? '/halfnote.png' : '/halfnote.png'}
                              alt={isFilled ? 'filled note' : 'empty note'}
                              className="w-6 h-6 opacity-75"
                            />
                          )
                        })
                      }
                      return (
                        <div key={index} className="mt-4 p-4 border rounded">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {renderRatingNotes(review.rating)}
                              <span className="ml-2 text-sm text-gray-600">({review.rating} ★)</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {review.users?.name || review.users?.email || 'Anonymous'}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">{review.body}</p>
                        </div>
                      )
                    })
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-gray-500">Login to view and leave reviews.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

// Refactor the `VenueProfilePage` to move server-side logic to an API route or Server Component.
// Replace direct Supabase calls with API calls to ensure compatibility with Client Components.
