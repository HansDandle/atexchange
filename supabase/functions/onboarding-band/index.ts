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

    // Get authenticated user from JWT token
    console.log('Creating band profile for:', body.bandName)
    
    // Get user from auth header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: authUser, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !authUser.user) {
      console.error('Auth error:', authError)
      return new Response(JSON.stringify({ error: 'Invalid authentication token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Authenticated user:', authUser.user.email)

    // Check if user already exists in our database
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('supabaseId', authUser.user.id)
      .single()

    let userId
    if (existingUser) {
      console.log('Using existing user:', existingUser.id)
      userId = existingUser.id
    } else {
      // Create new user record linked to auth user
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({ 
          email: authUser.user.email, 
          name: body.bandName, 
          role: 'BAND', 
          supabaseId: authUser.user.id 
        })
        .select('id')
        .single()
      
      if (userError) {
        console.error('User creation error:', userError)
        throw new Error(`Failed to create user: ${userError.message}`)
      }
      
      console.log('User created with ID:', newUser.id)
      userId = newUser.id
    }

    // Create band profile
    const bandData = {
      userId: userId,
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

    // Attempt insert; allow multiple band profiles per user
    const { data: insertedData, error: bandError } = await supabase
      .from('band_profiles')
      .insert(bandData)
      .select('id')

    if (bandError) {
      console.error('Band profile creation error:', bandError)
      return new Response(JSON.stringify({ error: `Failed to create band profile: ${bandError.message}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Successfully created band profile for user:', userId)
    return new Response(JSON.stringify({ success: true, userId: userId }), {
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
