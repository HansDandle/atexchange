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
  const [claimLoading, setClaimLoading] = useState(false);
  const [hasAcceptedSlot, setHasAcceptedSlot] = useState(false);

  // These will be undefined until venue is loaded, but that's fine for conditional rendering
  const owner = venue?.user;
  const isOwner = sessionUser && owner && owner.supabaseId === sessionUser.id;
  
  // Check if venue is claimable: either no userId, or last updated before 11/25/2025
  const claimCutoffDate = new Date('2025-11-25');
  const isClaimable = !venue?.userId || (venue?.updatedAt && new Date(venue.updatedAt) < claimCutoffDate);

  const handleClaim = async () => {
    if (!sessionUser) {
      // Redirect to claim page if not logged in
      window.location.href = '/claim-venue';
      return;
    }

    setClaimLoading(true);
    try {
      // Get the current user's database ID
      const { data: dbUser } = await supabase
        .from('users')
        .select('id')
        .eq('supabaseId', sessionUser.id)
        .single();

      if (!dbUser) {
        alert('User account not found. Please contact support.');
        return;
      }

      // Update the venue profile with the current user's ID
      const { error: updateError } = await supabase
        .from('venue_profiles')
        .update({ userId: dbUser.id })
        .eq('id', venue.id);

      if (updateError) throw updateError;

      // Update local state to reflect the change
      setVenue({ ...venue, userId: dbUser.id });
      alert('Profile claimed successfully!');
    } catch (err: any) {
      console.error('Claim error:', err);
      alert(`Failed to claim profile: ${err.message}`);
    } finally {
      setClaimLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching by slug first, then by id if slug fails
        let { data: venueProfiles, error: venueError } = await supabase
          .from('venue_profiles')
          .select('*')
          .eq('slug', params.id)

        // If no results by slug, try by id
        if (!venueProfiles || venueProfiles.length === 0) {
          const { data: venueById, error: idError } = await supabase
            .from('venue_profiles')
            .select('*')
            .eq('id', params.id)
          venueProfiles = venueById;
          venueError = idError;
        }

        if (venueError) throw venueError
        const venueData = (venueProfiles || [])[0] ?? null
        if (venueData) venueData.user = Array.isArray(venueData.user) ? venueData.user[0] ?? null : venueData.user ?? null
        setVenue(venueData === null ? null : venueData); // Ensure we set venue to something, even if empty

        // Check if logged-in user has accepted application for this venue
        if (sessionUser && venueData) {
          const { data: dbUser } = await supabase
            .from('users')
            .select('id')
            .eq('supabaseId', sessionUser.id)
            .single()

          if (dbUser) {
            const { data: bandProfile } = await supabase
              .from('band_profiles')
              .select('id')
              .eq('userId', dbUser.id)
              .single()

            if (bandProfile) {
              const { data: acceptedApps } = await supabase
                .from('applications')
                .select('id')
                .eq('bandProfileId', bandProfile.id)
                .eq('status', 'ACCEPTED')
                .in('venueSlotId', 
                  (await supabase
                    .from('venue_slots')
                    .select('id')
                    .eq('venueProfileId', venueData.id)
                  ).data?.map((s: any) => s.id) || []
                )
                .limit(1)

              setHasAcceptedSlot((acceptedApps?.length ?? 0) > 0)
            }
          }
        }
      } catch (err: any) {
        setError(err.message);
        setVenue(null); // Set venue to null so we don't stay in loading state
      }
    };
    fetchData();
  }, [params.id, sessionUser]);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  }
  if (!venue) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6 space-y-6">
          {/* Photos gallery */}
          {Array.isArray(venue.photos) && venue.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {venue.photos.slice(0, 6).map((url: string, i: number) => (
                <img key={i} src={url} alt={`${venue.venueName || 'Venue'} photo ${i + 1}`} className="w-full h-48 object-cover rounded" />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-2">
                {venue.venueName && <p><span className="font-semibold">Name:</span> {venue.venueName}</p>}
                {venue.address && <p><span className="font-semibold">Address:</span> {venue.address}</p>}
                {venue.city && <p><span className="font-semibold">City:</span> {venue.city}</p>}
                {venue.state && <p><span className="font-semibold">State:</span> {venue.state}</p>}
                {venue.zipCode && <p><span className="font-semibold">Zip:</span> {venue.zipCode}</p>}
                {venue.capacity && <p><span className="font-semibold">Capacity:</span> {venue.capacity}</p>}
                {venue.stageSize && <p><span className="font-semibold">Stage:</span> {venue.stageSize}</p>}
                {venue.genrePrefs && venue.genrePrefs.length > 0 && (
                  <p><span className="font-semibold">Genres:</span> {venue.genrePrefs.join(', ')}</p>
                )}
                {venue.hasSound !== undefined && <p><span className="font-semibold">Sound:</span> {venue.hasSound ? 'Yes' : 'No'}</p>}
                {venue.hasLighting !== undefined && <p><span className="font-semibold">Lighting:</span> {venue.hasLighting ? 'Yes' : 'No'}</p>}
                {venue.hasParking !== undefined && <p><span className="font-semibold">Parking:</span> {venue.hasParking ? 'Yes' : 'No'}</p>}
                {venue.payoutType && <p><span className="font-semibold">Payout:</span> {venue.payoutType}</p>}
                {venue.payoutDetails && <p><span className="font-semibold">Payout Details:</span> {venue.payoutDetails}</p>}
                {hasAcceptedSlot && venue.bookingEmail && <p><span className="font-semibold">Booking Email:</span> {venue.bookingEmail}</p>}
                {hasAcceptedSlot && venue.phone && <p><span className="font-semibold">Phone:</span> {venue.phone}</p>}
              </div>
              {venue.description && (
                <div className="mt-4">
                  <h3 className="font-semibold">About</h3>
                  <p className="mt-2">{venue.description}</p>
                </div>
              )}
            </div>

            <aside>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold">Contact</h4>
                {sessionUser ? (
                  <>
                    <p className="mt-2 text-sm">{owner?.name ?? owner?.email ?? '—'}</p>
                    {hasAcceptedSlot && venue.phone && <p className="mt-2 text-sm">Phone: <a className="text-austin-orange" href={`tel:${venue.phone}`}>{venue.phone}</a></p>}
                    {hasAcceptedSlot && venue.bookingEmail && <p className="mt-2 text-sm">Booking: <a className="text-austin-orange" href={`mailto:${venue.bookingEmail}`}>{venue.bookingEmail}</a></p>}
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">Login to view contact details</p>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-8">
            {/* Claim Venue section */}
            {!isOwner && isClaimable && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-yellow-700">
                  Do you do the booking here?&nbsp;
                  <button
                    onClick={handleClaim}
                    disabled={claimLoading}
                    className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-austin-orange rounded hover:bg-austin-orange-dark disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-austin-orange focus:ring-opacity-50"
                  >
                    {claimLoading ? 'Claiming...' : 'Claim this venue'}
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Reviews and rest of the page... */}
          {/* ...existing code... */}
        </div>
      </main>
    </div>
  );
}
