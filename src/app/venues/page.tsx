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
    let query = supabase
      .from('venue_profiles')
      .select(`
        id,
        venueName,
        city,
        state,
        capacity,
        photos,
        user:users!venue_profiles_userId (id, email, name),
        createdAt
      `)

    if (sort === 'name') query = query.order('venueName', { ascending: true })
    else if (sort === 'city') query = query.order('city', { ascending: true })
    else query = query.order('createdAt', { ascending: false })

    const { data: venueProfiles, error } = await query
    console.log('Venues fetched:', venueProfiles?.length, 'error:', error);

    if (error) throw error
    
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
      user: Array.isArray(v.user) ? v.user[0] ?? null : v.user ?? null,
      averageRating: getAverageRating(v.id),
      reviews: ratingsByVenue[v.id]?.reviews || [],
    }))
  } catch (err: any) {
    console.log('Error in try block, using fallback:', err.message);
    if (err.code === 'PGRST200' || (err.details && String(err.details).includes('no matches were found'))) {
      const { data: profiles } = await supabase
        .from('venue_profiles')
        .select('id, venueName, city, state, capacity, photos, userId')

      const ids = Array.from(new Set((profiles || []).map((p: any) => p.userId).filter(Boolean)))
      const { data: users } = ids.length > 0 ? await supabase
        .from('users')
        .select('id, email, name')
        .in('id', ids) : { data: [] }

      const usersById = (users || []).reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {})
      
      // Fetch reviews for ratings
      const { data: reviews } = await supabase
        .from('reviews')
        .select('id, venue_id, rating, body')
      
      const ratingsByVenue = (reviews || []).reduce((acc: any, r: any) => {
        if (!acc[r.venue_id]) acc[r.venue_id] = { ratings: [], reviews: [] }
        acc[r.venue_id].ratings.push(r.rating)
        acc[r.venue_id].reviews.push({ body: r.body, rating: r.rating })
        return acc
      }, {})
      
      const getAverageRating = (venueId: string) => {
        const ratings = ratingsByVenue[venueId]?.ratings || []
        if (ratings.length === 0) return 0
        const avg = ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
        return Math.round(avg * 2) / 2
      }
      
      normalized = (profiles || []).map((p: any) => ({
        ...p,
        user: usersById[p.userId] ?? null,
        averageRating: getAverageRating(p.id),
        reviews: ratingsByVenue[p.id]?.reviews || [],
      }))
    } else {
      throw err
    }
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
