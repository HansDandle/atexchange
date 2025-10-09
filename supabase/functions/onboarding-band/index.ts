import { serve } from 'https://deno.land/std@0.201.0/http/server.ts'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Missing environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

serve(async (req: Request) => {
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  try {
    console.log('Function called with method:', req.method)
    console.log('Environment check - URL exists:', !!SUPABASE_URL, 'Service role exists:', !!SUPABASE_SERVICE_ROLE)
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const body = await req.json()
    console.log('Received band onboarding data:', { 
      bandName: body.bandName, 
      bio: body.bio?.substring(0, 50) + '...', 
      photosCount: body.photos?.length || 0, 
      audioCount: body.audioSamples?.length || 0 
    })

    // Validate required fields
    if (!body.bandName || !body.bio) {
      return new Response(JSON.stringify({ error: 'Missing required fields: bandName, bio' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Simple approach: Create a placeholder user and band profile
    console.log('Creating band profile for:', body.bandName)
    
    // Create user first
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({ 
        email: body.email || `${body.bandName.toLowerCase().replace(/\s+/g, '')}@example.com`, 
        name: body.bandName, 
        role: 'BAND', 
        supabaseId: `band_${Date.now()}` 
      })
      .select('id')
      .single()
    
    if (userError) {
      console.error('User creation error:', userError)
      throw new Error(`Failed to create user: ${userError.message}`)
    }

    console.log('User created with ID:', newUser.id)

    // Create band profile
    const bandData = {
      userId: newUser.id,
      bandName: body.bandName,
      bio: body.bio,
      genre: body.genre || [],
      location: body.location || '',
      website: body.website || '',
      spotifyUrl: body.spotifyUrl || '',
      youtubeUrl: body.youtubeUrl || '',
      instagramUrl: body.instagramUrl || '',
      facebookUrl: body.facebookUrl || '',
      photos: body.photos || [],
      audioSamples: body.audioSamples || [],
      techRider: body.techRider || '',
      minFee: body.minFee ? parseInt(body.minFee) : null,
      maxFee: body.maxFee ? parseInt(body.maxFee) : null,
    }

    const { error: bandError } = await supabase
      .from('band_profiles')
      .insert(bandData)

    if (bandError) {
      console.error('Band profile creation error:', bandError)
      throw new Error(`Failed to create band profile: ${bandError.message}`)
    }

    console.log('Successfully created band profile for user:', newUser.id)
    return new Response(JSON.stringify({ success: true, userId: newUser.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Band onboarding error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
