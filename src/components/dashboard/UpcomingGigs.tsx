import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UpcomingGigs({ gigs, role }: { gigs: any[]; role: string }) {
  if (!gigs || gigs.length === 0) return null
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-austin-charcoal mb-4">{role === 'BAND' ? 'Confirmed Gigs' : 'Upcoming Shows'}</h3>
      <div className="space-y-3">
        {gigs.map((gig: any, index: number) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-austin-orange/5 rounded-lg border border-austin-orange/20">
            <div className="w-2 h-2 bg-austin-orange rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm"><span className="font-medium">{gig.venue_slots?.eventTitle}</span></p>
              <p className="text-sm text-gray-800 mt-1">at <strong>{gig.venue_slots?.venue_profiles?.venueName}</strong></p>
              <p className="text-xs text-gray-600 mt-1">{gig.venue_slots?.eventDate ? new Date(gig.venue_slots.eventDate).toLocaleDateString() : ''} • {gig.venue_slots?.startTime || 'TBD'}</p>
              <div className="mt-2 text-sm text-gray-700">
                {gig.venue_slots?.venue_profiles?.address && <div>Address: {gig.venue_slots.venue_profiles.address}, {gig.venue_slots.venue_profiles.city}</div>}
                {gig.venue_slots?.venue_profiles?.capacity && <div>Capacity: {gig.venue_slots.venue_profiles.capacity}</div>}
                {gig.venue_slots?.venue_profiles?.bookingEmail && <div>Booking: <a className="text-austin-orange" href={`mailto:${gig.venue_slots.venue_profiles.bookingEmail}`}>{gig.venue_slots.venue_profiles.bookingEmail}</a></div>}
                {gig.venue_slots?.venue_profiles?.website && <div>Website: <a className="text-austin-orange" href={gig.venue_slots.venue_profiles.website} target="_blank" rel="noreferrer">{gig.venue_slots.venue_profiles.website}</a></div>}
              </div>
              {gig.venue_slots?.venue_profiles?.id && <div className="mt-3"><Link href={`/venues/${gig.venue_slots.venue_profiles.id}`}><Button variant="outline" size="sm">View Venue Profile</Button></Link></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
