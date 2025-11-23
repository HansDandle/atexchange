'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface IssueTicketsProps {
  applicationId: string
  bandId: string
  venueSlotId: string
  bandName: string
  onSuccess?: () => void
}

export default function IssueTicketsModal({
  applicationId,
  bandId,
  venueSlotId,
  bandName,
  onSuccess,
}: IssueTicketsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(50)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ticketLink, setTicketLink] = useState<string | null>(null)

  const handleIssueTickets = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/tickets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bandId,
          venueSlotId,
          quantity: parseInt(quantity.toString()),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create tickets')
        return
      }

      // Generate the shareable link
      const shareLink = `${window.location.origin}${data.ticket.shareUrl}`
      setTicketLink(shareLink)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (ticketLink) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h2 className="text-2xl font-bold text-austin-charcoal mb-4">
            🎫 Tickets Created!
          </h2>
          <p className="text-gray-600 mb-4">
            {quantity} tickets issued for {bandName}. Share this link with the band:
          </p>

          <div className="bg-gray-50 rounded p-3 mb-4">
            <p className="text-xs text-gray-600 mb-2">Shareable Link:</p>
            <input
              type="text"
              value={ticketLink}
              readOnly
              className="w-full px-2 py-2 text-sm font-mono bg-white border border-gray-300 rounded"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(ticketLink)
              }}
              variant="outline"
              className="flex-1"
            >
              Copy Link
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false)
                setTicketLink(null)
              }}
              variant="austin"
              className="flex-1"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="text-austin-orange"
      >
        🎫 Issue Tickets
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-austin-charcoal mb-4">
              Issue Tickets for {bandName}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Tickets
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-transparent"
              />
              <p className="text-xs text-gray-600 mt-1">
                The band can share a link to sell/distribute these tickets
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleIssueTickets}
                variant="austin"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Issue Tickets'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
