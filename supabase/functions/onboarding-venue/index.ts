import { serve } from 'https://deno.land/std@0.201.0/http/server.ts'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || Deno.env.get('PROJECT_URL') || ''
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY') || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Supabase env vars not set: SUPABASE_URL/PROJECT_URL or SERVICE_ROLE_KEY missing')
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
    console.log('Venue function called with method:', req.method)
    
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
    console.log('Received venue onboarding data:', { 
      venueName: body.venueName, 
      photosCount: body.photos?.length || 0 
    })

    // Validate required fields
    if (!body.venueName) {
      return new Response(JSON.stringify({ error: 'Missing required field: venueName' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get authenticated user from JWT token
    console.log('Creating venue profile for:', body.venueName)
    
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
          name: body.venueName, 
          role: 'VENUE', 
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

    // Create venue profile
    const venueData = {
      userId: userId,
      venueName: body.venueName,
      description: body.description || '',
      address: body.address || '',
      city: body.city || '',
      state: body.state || '',
      zipCode: body.zipCode || '',
      capacity: body.capacity ? parseInt(body.capacity) : null,
      stageSize: body.stageSize || '',
      genrePrefs: body.genrePrefs || [],
      hasSound: body.hasSound || false,
      hasLighting: body.hasLighting || false,
      hasParking: body.hasParking || false,
      phone: body.phone || '',
      website: body.website || '',
      bookingEmail: body.bookingEmail || '',
      payoutType: body.payoutType || '',
      payoutDetails: body.payoutDetails || '',
      photos: body.photos || [],
    }

    const { error: venueError } = await supabase
      .from('venue_profiles')
      .insert(venueData)

    if (venueError) {
      console.error('Venue profile creation error:', venueError)
      throw new Error(`Failed to create venue profile: ${venueError.message}`)
    }

    console.log('Successfully created venue profile for user:', userId)
    return new Response(JSON.stringify({ success: true, userId: userId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Venue onboarding error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
