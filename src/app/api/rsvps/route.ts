import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { supabaseId } = await request.json()

    if (!supabaseId) {
      return NextResponse.json({ error: 'supabaseId required' }, { status: 400 })
    }

    // Get database user from supabaseId
    const { data: dbUser } = await supabase
      .from('users')
      .select('id')
      .eq('supabaseId', supabaseId)
      .single()

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found', events: [] })
    }

    // Get venue profile
    const { data: venueProfile } = await supabase
      .from('venue_profiles')
      .select('id')
      .eq('userId', dbUser.id)
      .single()

    if (!venueProfile) {
      return NextResponse.json({ error: 'Venue not found', events: [] })
    }

    // Get all venue slots
    const { data: slots } = await supabase
      .from('venue_slots')
      .select('id, eventDate, startTime, eventTitle')
      .eq('venueProfileId', venueProfile.id)
      .order('eventDate', { ascending: false })

    if (!slots || slots.length === 0) {
      return NextResponse.json({ events: [] })
    }

    // For each slot, get tickets and RSVPs
    const eventsWithRsvps = await Promise.all(
      slots.map(async (slot: any) => {
        const { data: tickets } = await supabase
          .from('tickets')
          .select('id, bandId, rsvpCount')
          .eq('venueSlotId', slot.id)

        if (!tickets || tickets.length === 0) {
          return null
        }

        const ticket = tickets[0]

        // Get band info
        let bandName = 'Unknown Band'
        if (ticket.bandId) {
          const { data: band } = await supabase
            .from('band_profiles')
            .select('bandName')
            .eq('id', ticket.bandId)
            .single()
          bandName = band?.bandName || 'Unknown Band'
        }

        // Get RSVPs for this ticket
        const { data: rsvps } = await supabase
          .from('ticket_rsvps')
          .select('id, name, email, createdAt')
          .eq('ticketId', ticket.id)
          .order('createdAt', { ascending: false })

        return {
          id: slot.id,
          eventTitle: slot.eventTitle,
          eventDate: slot.eventDate,
          startTime: slot.startTime,
          bandName,
          rsvpCount: ticket.rsvpCount || 0,
          rsvps: rsvps || []
        }
      })
    )

    return NextResponse.json({ events: eventsWithRsvps.filter(Boolean) })
  } catch (error: any) {
    console.error('RSVP API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
