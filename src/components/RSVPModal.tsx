'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface RSVP {
  id: string
  name: string
  email: string
  createdAt: string
}

interface RSVPModalProps {
  eventId: string
  eventTitle: string
  eventDate?: string
  startTime?: string
  isOpen: boolean
  onClose: () => void
  rsvpCount: number
}

export default function RSVPModal({ eventId, eventTitle, eventDate, startTime, isOpen, onClose, rsvpCount }: RSVPModalProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(false)

  // Format event date and time
  let eventDateStr = ''
  let eventTimeStr = ''
  if (eventDate) {
    const date = new Date(eventDate)
    eventDateStr = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  if (startTime) {
    const time = new Date(startTime)
    eventTimeStr = time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  useEffect(() => {
    if (!isOpen) return

    const fetchRSVPs = async () => {
      setLoading(true)
      try {
        // Get ticket for this event
        const { data: tickets } = await supabase
          .from('tickets')
          .select('id')
          .eq('venueSlotId', eventId)
          .single()

        if (!tickets) {
          setRsvps([])
          setLoading(false)
          return
        }

        // Get RSVPs for this ticket
        const { data: rsvpData } = await supabase
          .from('ticket_rsvps')
          .select('id, name, email, createdAt')
          .eq('ticketId', tickets.id)
          .order('createdAt', { ascending: false })

        setRsvps(rsvpData || [])
      } catch (error) {
        console.error('Error fetching RSVPs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRSVPs()
  }, [isOpen, eventId])

  if (!isOpen) return null

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800')
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${eventTitle} - RSVPs</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            p { color: #666; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th { background-color: #f0f0f0; padding: 10px; text-align: left; border-bottom: 2px solid #333; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            tr:hover { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>${eventTitle}</h1>
          <p><strong>Date:</strong> ${eventDateStr}${eventTimeStr ? ` at ${eventTimeStr}` : ''}</p>
          <p><strong>Total RSVPs:</strong> ${rsvpCount}</p>
          <p><strong>Printed:</strong> ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>RSVP Date</th>
              </tr>
            </thead>
            <tbody>
              ${rsvps.map((rsvp, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${rsvp.name}</td>
                  <td>${rsvp.email}</td>
                  <td>${new Date(rsvp.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.print()
  }

  const handleExportCSV = () => {
    const headers = ['#', 'Name', 'Email', 'RSVP Date']
    const rows = rsvps.map((rsvp, idx) => [
      idx + 1,
      rsvp.name,
      rsvp.email,
      new Date(rsvp.createdAt).toLocaleDateString()
    ])

    // Create CSV content
    const csvContent = [
      ['Event:', eventTitle],
      ['Date:', eventDateStr],
      ['Time:', eventTimeStr],
      ['Total RSVPs:', rsvpCount],
      ['Printed:', new Date().toLocaleString()],
      [],
      [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))]
    ]
      .flat()
      .join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${eventTitle}-RSVPs-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-austin-orange to-austin-orange-dark px-6 py-6 text-white flex items-center justify-between print:hidden">
          <div>
            <h2 className="text-2xl font-bold">{eventTitle}</h2>
            <p className="mt-2 text-sm opacity-90">Total RSVPs: <strong>{rsvpCount}</strong></p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white text-austin-orange rounded hover:bg-gray-100 transition-colors font-medium"
            >
              Export CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-austin-orange rounded hover:bg-gray-100 transition-colors font-medium"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : rsvps.length === 0 ? (
            <p className="text-center text-gray-500">No RSVPs yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">RSVP Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp, idx) => (
                    <tr key={rsvp.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{rsvp.name}</td>
                      <td className="px-4 py-3 text-gray-600">{rsvp.email}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          .fixed {
            position: static;
            background: white !important;
          }
          .bg-black {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
