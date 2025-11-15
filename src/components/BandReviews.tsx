'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useSession } from '@/lib/session-context'
import useSWR from 'swr'

interface BandReviewsProps {
  bandId: string
}

export default function BandReviews({ bandId }: BandReviewsProps) {
  const { user: sessionUser } = useSession()
  const [newReview, setNewReview] = useState({ rating: 0, text: '' })
  const [isAnonymous, setIsAnonymous] = useState(false)

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data: reviews, mutate } = useSWR(`/api/bands/${bandId}/reviews`, fetcher)

  const handleReviewSubmit = async () => {
    if (!sessionUser) return
    if (newReview.rating === 0) {
      alert('Please select a rating')
      return
    }

    const response = await fetch(`/api/bands/${bandId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newReview,
        userId: isAnonymous ? null : sessionUser.id,
      }),
    })

    if (response.ok) {
      mutate()
      setNewReview({ rating: 0, text: '' })
      setIsAnonymous(false)
      alert('Review submitted!')
    } else {
      alert('Failed to submit review')
    }
  }

  const averageRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Reviews & Ratings</h3>

      {/* Average rating */}
      {averageRating && (
        <div className="mb-6 p-4 bg-white rounded border">
          <p className="text-sm text-gray-600">Average Rating</p>
          <p className="text-3xl font-bold text-austin-orange">{averageRating} / 5</p>
          <p className="text-sm text-gray-600">({reviews?.length || 0} review{reviews?.length !== 1 ? 's' : ''})</p>
        </div>
      )}

      {/* Add review form (for logged in users) */}
      {sessionUser ? (
        <div className="mb-8 p-4 bg-white rounded border">
          <h4 className="font-semibold mb-4">Leave a Review</h4>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`text-3xl ${newReview.rating >= star ? 'text-austin-orange' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Review (optional)</label>
            <Textarea
              placeholder="Share your experience..."
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span className="text-sm">Post anonymously</span>
            </label>
          </div>

          <Button onClick={handleReviewSubmit} variant="austin">
            Submit Review
          </Button>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mb-8">Sign in to leave a review</p>
      )}

      {/* Display reviews */}
      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div key={review.id} className="p-4 bg-white rounded border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{review.users?.name || 'Anonymous'}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={review.rating >= star ? 'text-austin-orange' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
              {review.body && <p className="text-gray-700 text-sm">{review.body}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  )
}
