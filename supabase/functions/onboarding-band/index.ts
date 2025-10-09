import { serve } from 'https://deno.land/std@0.201.0/http/server.ts'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Read env vars with fallbacks because the CLI forbids secret names starting with "SUPABASE_"
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || Deno.env.get('PROJECT_URL') || ''
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY') || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Supabase env vars not set: SUPABASE_URL/PROJECT_URL or SERVICE_ROLE_KEY missing')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

serve(async (req: Request) => {
  try {
    const body = await req.json()

    // Expecting fields similar to band_profiles
    const {
      bandName, bio, genre, location, website, spotifyUrl, youtubeUrl,
      instagramUrl, facebookUrl, photos, audioSamples, techRider, minFee, maxFee
    } = body

    // Get user via supabase auth header if provided (recommended: send supabase auth cookie/token)
    // For Edge Functions running with service role, we can accept a supabase user id in the body for upsert
    const supabaseId = body.supabaseId || null

    const payload = {
      bandName,
      bio,
      genre,
      location,
      website,
      spotifyUrl,
      youtubeUrl,
      instagramUrl,
      facebookUrl,
      photos,
      audioSamples,
      techRider,
      minFee,
      maxFee,
      // map other fields as needed
    }

    // If supabaseId is provided, try to find user id
    let userId = null
    if (supabaseId) {
      const { data: users } = await supabase.from('users').select('id').eq('supabaseId', supabaseId).limit(1)
      if (users && users.length > 0) userId = users[0].id
    }

    // If userId is present, upsert band_profiles for that user
    if (userId) {
      const upsertPayload = { ...payload, userId }
      const { error } = await supabase.from('band_profiles').upsert(upsertPayload, { onConflict: 'userId' })
      if (error) throw error
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    // Otherwise, insert a placeholder user (not ideal) - recommend client sends supabaseId
    const { data: newUser, error: userErr } = await supabase.from('users').insert({ email: body.email || null, name: body.name || null, role: 'BAND', supabaseId: supabaseId }).select('id').limit(1)
    if (userErr) throw userErr
    const newUserId = newUser && newUser[0] && newUser[0].id
    if (!newUserId) throw new Error('Failed to create user')

    const { error: bpErr } = await supabase.from('band_profiles').insert({ ...payload, userId: newUserId })
    if (bpErr) throw bpErr

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})
