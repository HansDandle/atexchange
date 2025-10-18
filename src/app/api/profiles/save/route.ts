import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import generateSlugPreserveCase, { generateSlugLowerCase } from '@/lib/slug'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createClient()

    const { profileType, profileId, payload } = body
    if (!profileType || !profileId) return NextResponse.json({ error: 'missing profileType/profileId' }, { status: 400 })

    // Generate slug if name provided
    let slug: string | null = null
    if (payload.name || payload.bandName || payload.hostName || payload.djName || payload.photographerName || payload.creativeName) {
      const raw = payload.bandName || payload.name || payload.hostName || payload.djName || payload.photographerName || payload.creativeName || ''
      // Generate and store a lowercase slug so we don't lose capitalization when normalizing
      slug = generateSlugLowerCase(raw)
    }

    const updateData = { ...payload }
    if (slug) updateData.slug = slug

    // Enforce server-side uniqueness: try update directly, and if a slug conflict occurs
    // attempt a bounded check-and-update loop with lightweight retries. We can't run
    // multi-statement DB transactions over the REST client easily here, so this
    // reduces the race window by checking for a candidate before attempting the update
    // and retrying a few times with backoff if conflicts continue to occur.
    const table = `${profileType}`

    const tryDirectUpdate = async () => {
      const { error } = await supabase.from(table).update(updateData).eq('id', profileId)
      return error
    }

    // First attempt: try direct update
    let upErr = await tryDirectUpdate()
    if (!upErr) return NextResponse.json({ ok: true })

    // If there's no slug to work with, return the underlying error
    if (!slug) return NextResponse.json({ error: upErr.message || 'failed to save profile' }, { status: 500 })

    const maxOuterAttempts = 4
    const maxSuffix = 50

    for (let attempt = 1; attempt <= maxOuterAttempts; attempt++) {
      // Try candidate slugs by checking existence first, then attempting update.
      for (let i = 2; i <= maxSuffix; i++) {
        const candidate = `${slug}-${i}`

        // Check whether candidate already exists (count query)
        const { count, error: countErr } = await supabase
          .from(table)
          .select('id', { head: true, count: 'exact' })
          .eq('slug', candidate)

        if (countErr) {
          // If checking failed, skip this candidate and continue
          continue
        }

        if ((count ?? 0) === 0) {
          // Candidate appears free — attempt update
          const { error: tryErr } = await supabase.from(table).update({ ...updateData, slug: candidate }).eq('id', profileId)
          if (!tryErr) return NextResponse.json({ ok: true, slug: candidate })
          // If update failed due to a race/unique violation, continue to next candidate
        }
      }

      // Backoff before next outer attempt
      await new Promise((res) => setTimeout(res, attempt * 150))
    }

    return NextResponse.json({ error: upErr.message || 'failed to save profile after retries' }, { status: 500 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
