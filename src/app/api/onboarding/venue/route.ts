import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    if (!body.venueName || !body.address) return NextResponse.json({ error: 'venueName and address required' }, { status: 400 })

    const created = await prisma.venueProfile.upsert({
      where: { userId: user.id },
      update: {
        venueName: body.venueName,
        description: body.description ?? null,
        address: body.address,
        city: body.city ?? 'Austin',
        state: body.state ?? 'TX',
        zipCode: body.zipCode ?? '',
        latitude: body.latitude ?? null,
        longitude: body.longitude ?? null,
        capacity: body.capacity ?? null,
        stageSize: body.stageSize ?? null,
        genrePrefs: body.genrePrefs ?? [],
        hasSound: !!body.hasSound,
        hasLighting: !!body.hasLighting,
        hasParking: !!body.hasParking,
        phone: body.phone ?? null,
        website: body.website ?? null,
        bookingEmail: body.bookingEmail ?? null,
        payoutType: body.payoutType ?? null,
        payoutDetails: body.payoutDetails ?? null,
        photos: body.photos ?? [],
      },
      create: {
        userId: user.id,
        venueName: body.venueName,
        description: body.description ?? null,
        address: body.address,
        city: body.city ?? 'Austin',
        state: body.state ?? 'TX',
        zipCode: body.zipCode ?? '',
        latitude: body.latitude ?? null,
        longitude: body.longitude ?? null,
        capacity: body.capacity ?? null,
        stageSize: body.stageSize ?? null,
        genrePrefs: body.genrePrefs ?? [],
        hasSound: !!body.hasSound,
        hasLighting: !!body.hasLighting,
        hasParking: !!body.hasParking,
        phone: body.phone ?? null,
        website: body.website ?? null,
        bookingEmail: body.bookingEmail ?? null,
        payoutType: body.payoutType ?? null,
        payoutDetails: body.payoutDetails ?? null,
        photos: body.photos ?? [],
      }
    })

    return NextResponse.json({ ok: true, profile: created })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
