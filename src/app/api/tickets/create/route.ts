import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Simple ID generator - replace nanoid
function generateShareToken(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

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

    // Get the user's database ID from their supabaseId
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('supabaseId', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 401 }
      )
    }

    const userId = userData.id

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
    const { data: slots, error: slotError } = await supabase
      .from('venue_slots')
      .select('id, venueProfileId')
      .eq('id', venueSlotId)

    if (slotError || !slots || slots.length === 0) {
      return NextResponse.json(
        { error: 'Venue slot not found' },
        { status: 404 }
      )
    }

    const slot = slots[0]
    
    // Get the venue profile to verify ownership
    const { data: venueProfiles, error: venueError } = await supabase
      .from('venue_profiles')
      .select('userId')
      .eq('id', slot.venueProfileId)

    if (venueError || !venueProfiles || venueProfiles.length === 0) {
      return NextResponse.json(
        { error: 'Venue profile not found' },
        { status: 404 }
      )
    }

    const venueProfile = venueProfiles[0]
    
    // Verify the user owns this venue
    if (venueProfile.userId !== userId) {
      console.error('Authorization failed:', { userId, venueUserId: venueProfile.userId, slotId: slot.id, bandId })
      return NextResponse.json(
        { error: 'Unauthorized - you do not own this venue' },
        { status: 403 }
      )
    }

    // Check if tickets already exist for this band/slot combo
    const { data: existing } = await supabase
      .from('tickets')
      .select('id')
      .eq('bandId', bandId)
      .eq('venueSlotId', venueSlotId)

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Tickets already exist for this band/show' },
        { status: 400 }
      )
    }

    // Generate unique share URL
    const shareToken = generateShareToken(12)
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
