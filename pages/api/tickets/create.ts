import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { bandId, venueSlotId, quantity } = body

    if (!bandId || !venueSlotId || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (quantity < 1 || quantity > 10000) {
      return NextResponse.json(
        { error: 'Quantity must be between 1 and 10000' },
        { status: 400 }
      )
    }

    // Verify the venue slot belongs to the current user
    const { data: slot, error: slotError } = await supabase
      .from('venue_slots')
      .select('venueProfile:venue_profiles(userId)')
      .eq('id', venueSlotId)
      .single()

    if (slotError || !slot) {
      return NextResponse.json(
        { error: 'Venue slot not found' },
        { status: 404 }
      )
    }

    const venueProfile = Array.isArray(slot.venueProfile) 
      ? slot.venueProfile[0] 
      : slot.venueProfile

    if (venueProfile?.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Check if tickets already exist for this band/slot combo
    const { data: existing } = await supabase
      .from('tickets')
      .select('id')
      .eq('bandId', bandId)
      .eq('venueSlotId', venueSlotId)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Tickets already exist for this band/show' },
        { status: 400 }
      )
    }

    // Generate unique share URL
    const shareToken = nanoid(12)
    const shareUrl = `/tickets/${shareToken}`

    // Create tickets
    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert({
        bandId,
        venueSlotId,
        quantity,
        shareUrl,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, ticket })
  } catch (error: any) {
    console.error('Ticket creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
