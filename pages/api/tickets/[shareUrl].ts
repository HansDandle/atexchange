import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { shareUrl: string } }
) {
  try {
    const supabase = createClient()
    const { shareUrl } = params

    const { data: ticket, error } = await supabase
      .from('tickets')
      .select(`
        *,
        venueSlot:venue_slots(id, eventDate, eventTitle, startTime, endTime, venueProfile:venue_profiles(venueName, address, city)),
        bandProfile:band_profiles(id, bandName, slug)
      `)
      .eq('shareUrl', `/${shareUrl}`)
      .single()

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
