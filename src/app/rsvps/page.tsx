'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Header from '@/components/Header'

interface EventRSVPs {
  id?: string
  eventTitle: string
  eventDate: string
  startTime: string
  bandName: string
  rsvpCount: number
  rsvps: Array<{
    id: string
    name: string
    email: string
    createdAt: string
  }>
}

export default function RSVPsPage() {
  const [events, setEvents] = useState<EventRSVPs[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        // Get current auth session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user?.id) {
          console.log('No auth session')
          setLoading(false)
          return
        }

        console.log('Auth user:', session.user.id)

        // Call server action to fetch RSVPs with auth user ID
        const response = await fetch('/api/rsvps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ supabaseId: session.user.id })
        })

        const data = await response.json()
        
        if (data.error) {
          console.error('Error fetching RSVPs:', data.error)
          setLoading(false)
          return
        }

        console.log('RSVPs fetched:', data.events?.length || 0)
        setEvents(data.events || [])
      } catch (error) {
        console.error('Error fetching RSVPs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRSVPs()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 print:hidden">
            <div>
              <h1 className="text-3xl font-bold text-austin-charcoal">RSVP Lists</h1>
              <p className="text-gray-600 mt-2">View and print RSVPs for your events</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-austin-orange text-white rounded hover:bg-austin-orange-dark transition-colors"
              >
                Print
              </button>
              <Link href="/dashboard">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Back to Dashboard
                </button>
              </Link>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No events with RSVPs yet</p>
              <Link href="/slots">
                <button className="text-austin-orange hover:underline">
                  Create events →
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event, idx) => {
                const eventDate = new Date(event.eventDate)
                const dateStr = eventDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
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

                return (
                  <div key={idx} id={`event-${event.id}`} className="bg-white rounded-lg shadow overflow-hidden scroll-mt-24">
                    {/* Event Header */}
                    <div className="bg-gradient-to-r from-austin-orange to-austin-orange-dark px-6 py-6 text-white">
                      <h2 className="text-2xl font-bold">{event.eventTitle}</h2>
                      <div className="mt-3 space-y-1 text-sm opacity-90">
                        <p>{dateStr} at {timeStr}</p>
                        <p>Performing: <strong>{event.bandName}</strong></p>
                        <p>Total RSVPs: <strong>{event.rsvpCount}</strong></p>
                      </div>
                    </div>

                    {/* RSVPs Table */}
                    <div className="overflow-x-auto">
                      {event.rsvps.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          No RSVPs yet
                        </div>
                      ) : (
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 border-b">
                            <tr>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">#</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">RSVP Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {event.rsvps.map((rsvp, rsvpIdx) => (
                              <tr key={rsvp.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3 text-gray-700">{rsvpIdx + 1}</td>
                                <td className="px-6 py-3 font-medium text-gray-900">{rsvp.name}</td>
                                <td className="px-6 py-3 text-gray-600">{rsvp.email}</td>
                                <td className="px-6 py-3 text-gray-600">
                                  {new Date(rsvp.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\:hidden {
            display: none;
          }
          table {
            page-break-inside: avoid;
          }
          .bg-white {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
