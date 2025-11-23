import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketParam: string } }
) {
  try {
    const supabase = createClient()
    const { ticketParam } = params

    // ticketParam can be either a share URL or a ticket ID
    // Try share URL first
    let query = supabase
      .from('tickets')
      .select(`
        *,
        venueSlot:venue_slots(id, eventDate, eventTitle, startTime, endTime, venueProfile:venue_profiles(venueName, address, city)),
        bandProfile:band_profiles(id, bandName, slug)
      `)

    // Check if it looks like a share URL (starts with /)
    if (ticketParam.startsWith('/')) {
      query = query.eq('shareUrl', ticketParam)
    } else {
      // Otherwise treat as ticket ID
      query = query.eq('id', ticketParam)
    }

    const { data: ticket, error } = await query.single()

    if (error || !ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, ticket })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { ticketParam: string } }
) {
  try {
    const supabase = createClient()
    const { ticketParam } = params
    const body = await request.json()
    const { name, email, userId } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Get ticket by share URL or ID
    let ticketQuery = supabase
      .from('tickets')
      .select('id, quantity, rsvpCount')

    if (ticketParam.startsWith('/')) {
      ticketQuery = ticketQuery.eq('shareUrl', ticketParam)
    } else {
      ticketQuery = ticketQuery.eq('id', ticketParam)
    }

    const { data: tickets, error: ticketError } = await ticketQuery

    if (ticketError || !tickets || tickets.length === 0) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }

    const ticket = tickets[0]

    if (ticket.rsvpCount >= ticket.quantity) {
      return NextResponse.json(
        { error: 'This show is at capacity' },
        { status: 400 }
      )
    }

    // Create RSVP
    const { data: rsvp, error: rsvpError } = await supabase
      .from('ticket_rsvps')
      .insert({
        ticketId: ticket.id,
        userId: userId || null,
        email,
        name,
      })
      .select()
      .single()

    if (rsvpError) throw rsvpError

    // Increment rsvpCount
    await supabase
      .from('tickets')
      .update({ rsvpCount: ticket.rsvpCount + 1 })
      .eq('id', ticket.id)

    return NextResponse.json({ success: true, rsvp })
  } catch (error: any) {
    console.error('RSVP error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET_RSVPs(
  request: NextRequest,
  { params }: { params: { ticketParam: string } }
) {
  try {
    const supabase = createClient()
    const { ticketParam } = params

    // Get ticket ID
    let ticketQuery = supabase
      .from('tickets')
      .select('id')

    if (ticketParam.startsWith('/')) {
      ticketQuery = ticketQuery.eq('shareUrl', ticketParam)
    } else {
      ticketQuery = ticketQuery.eq('id', ticketParam)
    }

    const { data: tickets, error: ticketError } = await ticketQuery

    if (ticketError || !tickets || tickets.length === 0) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }

    const ticketId = tickets[0].id

    const { data: rsvps, error } = await supabase
      .from('ticket_rsvps')
      .select('*')
      .eq('ticketId', ticketId)
      .order('createdAt', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, rsvps })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
