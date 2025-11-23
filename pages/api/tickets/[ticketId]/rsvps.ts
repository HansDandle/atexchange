import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const supabase = createClient()
    const { ticketId } = params
    const body = await request.json()
    const { name, email, userId } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if ticket exists and has capacity
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('quantity, rsvpCount')
      .eq('id', ticketId)
      .single()

    if (ticketError || !ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }

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
        ticketId,
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
      .eq('id', ticketId)

    return NextResponse.json({ success: true, rsvp })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const supabase = createClient()
    const { ticketId } = params

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
