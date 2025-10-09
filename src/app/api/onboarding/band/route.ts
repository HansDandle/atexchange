import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    // Minimal server-side validation
    if (!body.bandName) return NextResponse.json({ error: 'bandName is required' }, { status: 400 })

    // Upsert: create or update band profile linked to this user
    const created = await prisma.bandProfile.upsert({
      where: { userId: user.id },
      update: {
        bandName: body.bandName,
        bio: body.bio ?? null,
        genre: body.genre ?? [],
        location: body.location ?? null,
        website: body.website ?? null,
        spotifyUrl: body.spotifyUrl ?? null,
        youtubeUrl: body.youtubeUrl ?? null,
        instagramUrl: body.instagramUrl ?? null,
        facebookUrl: body.facebookUrl ?? null,
        techRider: body.techRider ?? null,
        minFee: body.minFee ?? null,
        maxFee: body.maxFee ?? null,
        photos: body.photos ?? [],
        audioSamples: body.audioSamples ?? [],
      },
      create: {
        userId: user.id,
        bandName: body.bandName,
        bio: body.bio ?? null,
        genre: body.genre ?? [],
        location: body.location ?? null,
        website: body.website ?? null,
        spotifyUrl: body.spotifyUrl ?? null,
        youtubeUrl: body.youtubeUrl ?? null,
        instagramUrl: body.instagramUrl ?? null,
        facebookUrl: body.facebookUrl ?? null,
        techRider: body.techRider ?? null,
        minFee: body.minFee ?? null,
        maxFee: body.maxFee ?? null,
        photos: body.photos ?? [],
        audioSamples: body.audioSamples ?? [],
      }
    })

    return NextResponse.json({ ok: true, profile: created })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
