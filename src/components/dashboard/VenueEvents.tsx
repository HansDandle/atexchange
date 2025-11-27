'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import RSVPModal from '@/components/RSVPModal'

export default function VenueEvents({ events }: { events: any[] }) {
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<any | null>(null)
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Upcoming Events</h3>
        <p className="text-gray-500 text-sm">No upcoming events. <Link href="/slots" className="text-austin-orange hover:underline">Create a new slot</Link></p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Upcoming Events</h3>
      <div className="space-y-4">
        {events.map((event: any) => {
          const eventDate = new Date(event.eventDate)
          const dateStr = eventDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })
          
          // Parse startTime if it's a timestamp
          let timeStr = 'TBD'
          if (event.startTime) {
            const startDate = new Date(event.startTime)
            timeStr = startDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }
          
          const applications = event.applications || []
          const acceptedApps = applications.filter((a: any) => a.status === 'ACCEPTED')
          const pendingApps = applications.filter((a: any) => a.status === 'PENDING')
          const rejectedApps = applications.filter((a: any) => a.status === 'REJECTED')
          
          const tickets = event.tickets || []
          const hasTicket = tickets.length > 0
          const ticketRsvps = tickets.reduce((sum: number, t: any) => sum + (t.rsvpCount || 0), 0)

          return (
            <div key={event.id} className="border rounded-lg p-4 bg-gradient-to-r from-austin-orange/5 to-transparent">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-austin-charcoal">{event.eventTitle}</h4>
                    <span className="text-sm text-gray-500">{dateStr} at {timeStr}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 mb-3">
                    <div className="bg-white rounded p-2">
                      <p className="text-xs text-gray-500">Applications</p>
                      <p className="text-lg font-bold text-austin-charcoal">{applications.length}</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="text-xs text-gray-500">Accepted</p>
                      <p className="text-lg font-bold text-green-600">{acceptedApps.length}</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="text-xs text-gray-500">Pending</p>
                      <p className="text-lg font-bold text-yellow-600">{pendingApps.length}</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="text-xs text-gray-500">RSVPs</p>
                      <p className="text-lg font-bold text-austin-orange">{hasTicket ? ticketRsvps : 0}</p>
                    </div>
                  </div>

                  {/* Accepted Bands */}
                  {acceptedApps.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Confirmed Bands:</p>
                      <div className="flex flex-wrap gap-1">
                        {acceptedApps.map((app: any) => (
                          <span key={app.id} className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {app.bandProfile?.bandName || 'Unknown Band'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pending Applications */}
                  {pendingApps.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Pending Applications:</p>
                      <div className="flex flex-wrap gap-1">
                        {pendingApps.map((app: any) => (
                          <span key={app.id} className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            {app.bandProfile?.bandName || 'Unknown Band'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {pendingApps.length > 0 && (
                    <Link href={`/slots?eventId=${event.id}`}>
                      <Button variant="austin" size="sm" className="whitespace-nowrap">
                        Review Apps
                      </Button>
                    </Link>
                  )}
                  {acceptedApps.length > 0 && !hasTicket && (
                    <button
                      className="px-3 py-2 text-sm font-medium text-white bg-austin-orange rounded hover:bg-austin-orange-dark transition-colors"
                      title="Issue tickets for this event to generate an RSVP link"
                    >
                      Issue Tickets
                    </button>
                  )}
                  {hasTicket && (
                    <button
                      onClick={() => setSelectedEventForRsvp(event)}
                      className="px-3 py-2 text-sm font-medium text-white bg-austin-orange rounded hover:bg-austin-orange-dark transition-colors"
                    >
                      View RSVPs ({ticketRsvps})
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* RSVP Modal */}
      {selectedEventForRsvp && (
        <RSVPModal
          eventId={selectedEventForRsvp.id}
          eventTitle={selectedEventForRsvp.eventTitle}
          eventDate={selectedEventForRsvp.eventDate}
          startTime={selectedEventForRsvp.startTime}
          rsvpCount={selectedEventForRsvp.tickets.reduce((sum: number, t: any) => sum + (t.rsvpCount || 0), 0)}
          isOpen={!!selectedEventForRsvp}
          onClose={() => setSelectedEventForRsvp(null)}
        />
      )}
    </div>
  )
}
