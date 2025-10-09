import { serve } from 'https://deno.land/std@0.201.0/http/server.ts'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || Deno.env.get('PROJECT_URL') || ''
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY') || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Supabase env vars not set: SUPABASE_URL/PROJECT_URL or SERVICE_ROLE_KEY missing')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

serve(async (req: Request) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const body = await req.json()

    const {
      venueName, description, address, city, state, zipCode, latitude, longitude,
      capacity, stageSize, genrePrefs, hasSound, hasLighting, hasParking, phone,
      website, bookingEmail, payoutType, payoutDetails, photos
    } = body

    const supabaseId = body.supabaseId || null

    let userId = null
    if (supabaseId) {
      const { data: users } = await supabase.from('users').select('id').eq('supabaseId', supabaseId).limit(1)
      if (users && users.length > 0) userId = users[0].id
    }

    if (userId) {
      const upsertPayload = { ...body, userId }
      const { error } = await supabase.from('venue_profiles').upsert(upsertPayload, { onConflict: 'userId' })
      if (error) throw error
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    const { data: newUser, error: userErr } = await supabase.from('users').insert({ email: body.email || null, name: body.name || null, role: 'VENUE', supabaseId: supabaseId }).select('id').limit(1)
    if (userErr) throw userErr
    const newUserId = newUser && newUser[0] && newUser[0].id
    if (!newUserId) throw new Error('Failed to create user')

    const { error: vpErr } = await supabase.from('venue_profiles').insert({ ...body, userId: newUserId })
    if (vpErr) throw vpErr

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
})
