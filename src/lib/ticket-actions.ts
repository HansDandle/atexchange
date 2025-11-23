'use server'

import { createClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'

export async function createTicket(
  venueSlotId: string,
  bandId: string,
  quantity: number
) {
  const supabase = createClient()
  
  try {
    // Generate a unique share URL token
    const shareToken = nanoid(12)
    const shareUrl = `/tickets/${shareToken}`

    const { data, error } = await supabase
      .from('tickets')
      .insert({
        venueSlotId,
        bandId,
        quantity,
        shareUrl,
      })
      .select()
      .single()

    if (error) throw error
    return { success: true, ticket: data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getTicketByShareUrl(shareUrl: string) {
  const supabase = createClient()
  
  try {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select(`
        *,
        venueSlot:venue_slots(id, eventDate, eventTitle, startTime, endTime, venueProfile:venue_profiles(venueName, address, city)),
        bandProfile:band_profiles(id, bandName, slug)
      `)
      .eq('shareUrl', shareUrl)
      .single()

    if (error) throw error
    return { success: true, ticket }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function submitRSVP(
  ticketId: string,
  userId: string | null,
  email: string,
  name: string
) {
  const supabase = createClient()
  
  try {
    // Check if ticket has capacity
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('quantity, rsvpCount')
      .eq('id', ticketId)
      .single()

    if (ticketError) throw ticketError
    if (ticket.rsvpCount >= ticket.quantity) {
      return { success: false, error: 'This show is at capacity' }
    }

    // Create RSVP
    const { data, error } = await supabase
      .from('ticket_rsvps')
      .insert({
        ticketId,
        userId: userId || null,
        email,
        name,
      })
      .select()
      .single()

    if (error) throw error

    // Increment rsvpCount
    await supabase
      .from('tickets')
      .update({ rsvpCount: ticket.rsvpCount + 1 })
      .eq('id', ticketId)

    return { success: true, rsvp: data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getTicketRSVPs(ticketId: string) {
  const supabase = createClient()
  
  try {
    const { data: rsvps, error } = await supabase
      .from('ticket_rsvps')
      .select('*')
      .eq('ticketId', ticketId)
      .order('createdAt', { ascending: false })

    if (error) throw error
    return { success: true, rsvps }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
