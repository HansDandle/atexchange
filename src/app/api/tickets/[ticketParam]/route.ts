import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketParam: string } }
) {
  try {
    const supabase = createClient()
    const { ticketParam } = params

    // ticketParam is the token only, so construct the full shareUrl
    const shareUrl = `/tickets/${ticketParam}`
    console.log('GET /api/tickets - searching for:', { ticketParam, shareUrl })

    // Try to find by shareUrl first - just get basic ticket data first
    let { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('shareUrl', shareUrl)

    console.log('shareUrl search result:', { tickets, error })

    // If not found by shareUrl, try by ID (for direct ticket access)
    if (!tickets || tickets.length === 0) {
      console.log('Not found by shareUrl, trying by ID:', ticketParam)
      const result = await supabase
        .from('tickets')
        .select('*')
        .eq('id', ticketParam)
      
      tickets = result.data
      error = result.error
      console.log('ID search result:', { tickets, error })
    }

    if (error || !tickets || tickets.length === 0) {
      console.error('Ticket not found:', { error, ticketParam, shareUrl })
      return NextResponse.json(
        { error: 'Ticket not found', debug: { ticketParam, shareUrl } },
        { status: 404 }
      )
    }

    const ticket = tickets[0]
    
    // Now fetch the related data separately
    let venueSlot = null
    let bandProfile = null
    
    if (ticket.venueSlotId) {
      const { data: slot } = await supabase
        .from('venue_slots')
        .select('id, eventDate, eventTitle, startTime, endTime, venueProfileId')
        .eq('id', ticket.venueSlotId)
        .single()
      
      if (slot && slot.venueProfileId) {
        const { data: venue } = await supabase
          .from('venue_profiles')
          .select('venueName, address, city')
          .eq('id', slot.venueProfileId)
          .single()
        
        venueSlot = { ...slot, venueProfile: venue }
      } else {
        venueSlot = slot
      }
    }
    
    if (ticket.bandId) {
      const { data: band } = await supabase
        .from('band_profiles')
        .select('id, bandName, slug')
        .eq('id', ticket.bandId)
        .single()
      
      bandProfile = band
    }
    
    const enrichedTicket = {
      ...ticket,
      venueSlot,
      bandProfile
    }
    
    return NextResponse.json({ success: true, ticket: enrichedTicket })
  } catch (error: any) {
    console.error('Ticket GET error:', error)
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
    // ticketParam is the token only, so construct the full shareUrl
    const shareUrl = `/tickets/${ticketParam}`
    
    let { data: tickets, error: ticketError } = await supabase
      .from('tickets')
      .select('id, quantity, rsvpCount')
      .eq('shareUrl', shareUrl)

    // If not found by shareUrl, try by ID
    if (!tickets || tickets.length === 0) {
      const result = await supabase
        .from('tickets')
        .select('id, quantity, rsvpCount')
        .eq('id', ticketParam)
      
      tickets = result.data
      ticketError = result.error
    }

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

    if (rsvpError) {
      console.error('RSVP creation error:', rsvpError)
      return NextResponse.json(
        { error: 'Failed to create RSVP' },
        { status: 400 }
      )
    }

    // Increment RSVP count
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ rsvpCount: ticket.rsvpCount + 1 })
      .eq('id', ticket.id)

    if (updateError) {
      console.error('RSVP count update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update RSVP count' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, rsvp })
  } catch (error: any) {
    console.error('Ticket POST error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
