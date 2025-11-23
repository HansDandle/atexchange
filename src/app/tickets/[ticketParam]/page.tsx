'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function TicketRSVPPage() {
  const params = useParams()
  const ticketParam = params.ticketParam as string
  
  const [ticket, setTicket] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/tickets/${ticketParam}`)
        const data = await res.json()
        
        if (data.ticket) {
          setTicket(data.ticket)
        } else {
          setError('Ticket not found')
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load ticket')
      } finally {
        setLoading(false)
      }
    }

    if (ticketParam) fetchTicket()
  }, [ticketParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to submit RSVP')
        return
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-austin-light to-austin-warm flex items-center justify-center">
        <p className="text-gray-600">Loading ticket...</p>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-austin-light to-austin-warm flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow p-8 text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4">{error || 'Ticket not found'}</p>
          <a href="/" className="text-austin-orange hover:underline">
            Back to home
          </a>
        </div>
      </div>
    )
  }

  const { venueSlot, bandProfile } = ticket
  const spotsRemaining = ticket.quantity - ticket.rsvpCount
  const isFull = spotsRemaining <= 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-austin-light to-austin-warm py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-austin-charcoal mb-2">
            RSVP for {bandProfile.bandName}
          </h1>
          <div className="text-gray-600 space-y-1">
            <p>📍 {venueSlot.venueProfile.venueName}</p>
            <p>{venueSlot.venueProfile.address}, {venueSlot.venueProfile.city}</p>
            <p>📅 {new Date(venueSlot.eventDate).toLocaleDateString()}</p>
            {venueSlot.startTime && (
              <p>🕐 {new Date(venueSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            )}
          </div>

          {/* Capacity */}
          <div className="mt-6 p-4 bg-austin-light rounded">
            <p className="text-sm text-gray-600 mb-2">Spots Remaining</p>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-austin-orange">{Math.max(0, spotsRemaining)}</div>
              <div className="text-sm text-gray-600">out of {ticket.quantity}</div>
            </div>
            {isFull && (
              <p className="mt-2 text-red-600 font-semibold">⚠️ This show is at capacity</p>
            )}
          </div>
        </div>

        {/* RSVP Form */}
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">RSVP Confirmed!</h2>
            <p className="text-green-700 mb-4">
              Thanks for your RSVP, {name}! Check your email at {email} for details.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              You're all set to see {bandProfile.bandName} at {venueSlot.venueProfile.venueName}!
            </p>
            <a href="/" className="text-austin-orange hover:underline">
              Back to home
            </a>
          </div>
        ) : !isFull ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-austin-charcoal mb-6">Secure Your Spot</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                variant="austin"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Confirm RSVP'}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-2xl mb-4">😢</p>
            <h2 className="text-xl font-bold text-yellow-800 mb-2">Show at Capacity</h2>
            <p className="text-yellow-700">
              Unfortunately, this show has reached capacity. Check back later or try another show!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
