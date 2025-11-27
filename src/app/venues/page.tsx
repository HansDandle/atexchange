import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Header from '@/components/Header'
import VenuesClient from './VenuesClient'

interface Props { searchParams?: { sort?: string } }

export default async function VenuesPage({ searchParams }: Props) {
  const supabase = createClient()
  const sort = (searchParams?.sort || 'recent') as string

  console.log('VenuesPage rendering, sort:', sort);
  
  let normalized: any[] = []
  try {
    console.log('Starting venue fetch...');
    // Fetch venue profiles directly without trying to join users
    const { data: venueProfiles, error } = await supabase
      .from('venue_profiles')
      .select('id, slug, venueName, city, state, capacity, photos, userId, createdAt')
      .order(sort === 'name' ? 'venueName' : sort === 'city' ? 'city' : 'createdAt', { 
        ascending: sort === 'name' || sort === 'city'
      })
    
    console.log('Venues fetched:', venueProfiles?.length, 'error:', error);

    if (error) throw error
    
    // Get all unique user IDs and fetch their data
    const userIds = Array.from(new Set((venueProfiles || []).map(v => v.userId).filter(Boolean)))
    const { data: users, error: usersError } = userIds.length > 0 
      ? await supabase.from('users').select('id, email, name').in('id', userIds)
      : { data: [], error: null }
    
    if (usersError) {
      console.error('Error fetching users:', usersError);
    }
    
    const usersById = (users || []).reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {})
    
    // Fetch ratings for all venues
    console.log('Starting reviews fetch...');
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('id, venue_id, rating, body')
    
    if (reviewError) {
      console.error('Error fetching reviews:', reviewError);
    } else {
      console.log('Reviews fetched:', reviews?.length, 'reviews');
    }
    
    const ratingsByVenue = (reviews || []).reduce((acc: any, r: any) => {
      if (!acc[r.venue_id]) acc[r.venue_id] = { ratings: [], reviews: [] }
      acc[r.venue_id].ratings.push(r.rating)
      acc[r.venue_id].reviews.push({ body: r.body, rating: r.rating })
      return acc
    }, {})
    
    console.log('Ratings by venue:', Object.keys(ratingsByVenue).length, 'venues with ratings');
    
    const getAverageRating = (venueId: string) => {
      const ratings = ratingsByVenue[venueId]?.ratings || []
      if (ratings.length === 0) return 0
      const avg = ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      // Round to nearest 0.5
      return Math.round(avg * 2) / 2
    }
    
    normalized = (venueProfiles || []).map((v: any) => ({
      ...v,
      user: usersById[v.userId] ?? null,
      averageRating: getAverageRating(v.id),
      reviews: ratingsByVenue[v.id]?.reviews || [],
    }))
  } catch (err: any) {
    console.log('Error fetching venues:', err.message);
    // If we get an error, return empty array and let the page show "no venues"
    normalized = []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-austin-charcoal">Venues</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <VenuesClient venues={normalized} sort={sort} />
      </main>
    </div>
  )
}
