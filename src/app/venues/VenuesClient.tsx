'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Venue {
  id: string
  venueName: string
  city?: string
  state?: string
  capacity?: number
  photos?: string[]
  user?: {
    id: string
    email?: string
    name?: string
  }
  createdAt?: string
  averageRating: number
  reviews?: Array<{
    body?: string
    rating: number
  }>
}

interface VenuesClientProps {
  venues: Venue[]
  sort: string
}

export default function VenuesClient({ venues, sort }: VenuesClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)

  const filteredVenues = useMemo(() => {
    let result = [...venues]

    // Filter by rating
    if (ratingFilter !== null) {
      result = result.filter(venue => {
        const rating = Math.floor(venue.averageRating)
        return rating === ratingFilter
      })
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(venue => {
        // Search venue name
        if (venue.venueName.toLowerCase().includes(term)) return true
        
        // Search city/state
        const location = `${venue.city || ''} ${venue.state || ''}`.toLowerCase()
        if (location.includes(term)) return true
        
        // Search owner name/email
        if (venue.user?.name?.toLowerCase().includes(term)) return true
        if (venue.user?.email?.toLowerCase().includes(term)) return true
        
        // Search capacity
        if (venue.capacity && venue.capacity.toString().includes(term)) return true
        
        // Search reviews
        if (venue.reviews && venue.reviews.length > 0) {
          return venue.reviews.some(review => 
            review.body?.toLowerCase().includes(term) ||
            review.rating.toString().includes(term)
          )
        }
        
        return false
      })
    }

    return result
  }, [venues, searchTerm, ratingFilter])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort:</label>
              <a href="/venues?sort=recent" className={`px-3 py-1 rounded text-sm font-medium transition ${sort === 'recent' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700 border'}`}>Recent</a>
              <a href="/venues?sort=name" className={`px-3 py-1 rounded text-sm font-medium transition ${sort === 'name' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700 border'}`}>Name</a>
              <a href="/venues?sort=city" className={`px-3 py-1 rounded text-sm font-medium transition ${sort === 'city' ? 'bg-austin-orange text-white' : 'bg-white text-gray-700 border'}`}>City</a>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Rating:</label>
              <button
                onClick={() => setRatingFilter(null)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${ratingFilter === null ? 'bg-austin-orange text-white' : 'bg-white text-gray-700 border'}`}
              >
                All
              </button>
              {[1, 2, 3, 4].map(rating => (
                <button
                  key={rating}
                  onClick={() => setRatingFilter(rating)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${ratingFilter === rating ? 'bg-austin-orange text-white' : 'bg-white text-gray-700 border'}`}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex-1 lg:flex-none lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search venues, reviews, owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                {filteredVenues.length} result{filteredVenues.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {filteredVenues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No venues found matching your search.' : 'No venues available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((v: Venue) => (
              <article key={v.id} className="bg-white rounded shadow hover:shadow-lg transition p-4">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">{v.venueName}</h2>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const noteValue = i + 1
                      const isFilled = v.averageRating >= noteValue
                      const isHalf = !isFilled && v.averageRating > i && v.averageRating < noteValue
                      return (
                        <img
                          key={i}
                          src={isFilled ? '/wholenote.png' : isHalf ? '/halfnote.png' : '/halfnote.png'}
                          alt={isFilled ? 'filled note' : 'empty note'}
                          className="w-5 h-5 opacity-75"
                        />
                      )
                    })}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{v.city ?? ''}{v.state ? `, ${v.state}` : ''}</p>
                <p className="text-sm mt-2 text-gray-700">Capacity: {v.capacity ?? '—'}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link href={`/venues/${v.id}`} className="text-austin-orange font-medium hover:underline">View Profile</Link>
                  <span className="text-xs text-gray-500">Owner: {v.user?.name ?? v.user?.email ?? '—'}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
