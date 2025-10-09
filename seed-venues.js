const { createClient } = require('@supabase/supabase-js')

async function seedVenueSlots() {
  const supabaseUrl = 'https://jkylaqqajdjxpvrmuxfr.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreWxhcXFhamRqeHB2cm11eGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5ODc3NjUsImV4cCI6MjA3NTU2Mzc2NX0.guEyAis_t9I9Ul2uWB0FEI7HbH95d0FsE3bGYBfOxLs'

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('🎵 Creating sample venues and venue slots...\n')

  // First, create some venue users and profiles
  const venues = [
    {
      email: 'booking@antones.com',
      name: "Antone's Nightclub",
      venueName: "Antone's Nightclub",
      description: "Austin's home of the blues for over 40 years. Intimate venue with legendary sound.",
      address: "305 E 5th St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      capacity: 400,
      stageSize: "16x12 feet",
      genrePrefs: ["Blues", "Rock", "Soul", "R&B"],
      hasSound: true,
      hasLighting: true,
      hasParking: false,
      phone: "(512) 814-0361",
      website: "https://www.antonesnightclub.com",
      bookingEmail: "booking@antones.com"
    },
    {
      email: 'info@continentalclub.com',
      name: "Continental Club",
      venueName: "Continental Club",
      description: "Historic venue featuring the best in roots music, rockabilly, and Austin classics.",
      address: "1315 S Congress Ave",
      city: "Austin",
      state: "TX",
      zipCode: "78704",
      capacity: 280,
      stageSize: "14x10 feet",
      genrePrefs: ["Country", "Rockabilly", "Blues", "Folk"],
      hasSound: true,
      hasLighting: true,
      hasParking: true,
      phone: "(512) 441-2444",
      website: "https://www.continentalclub.com",
      bookingEmail: "info@continentalclub.com"
    },
    {
      email: 'events@stubbsaustin.com',
      name: "Stubbs Bar-B-Q",
      venueName: "Stubbs Bar-B-Q",
      description: "Outdoor amphitheater and indoor bar featuring BBQ and live music in the heart of Austin.",
      address: "801 Red River St",
      city: "Austin", 
      state: "TX",
      zipCode: "78701",
      capacity: 2200,
      stageSize: "24x16 feet",
      genrePrefs: ["Rock", "Country", "Blues", "Folk", "Alternative"],
      hasSound: true,
      hasLighting: true,
      hasParking: true,
      phone: "(512) 480-8341",
      website: "https://www.stubbsaustin.com",
      bookingEmail: "events@stubbsaustin.com"
    }
  ]

  const venueIds = []

  for (const venue of venues) {
    console.log(`Creating venue: ${venue.name}`)

    // Create user
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        email: venue.email,
        name: venue.name,
        role: 'VENUE',
        supabaseId: `venue_seed_${Date.now()}_${Math.random()}`
      })
      .select('id')
      .single()

    if (userError) {
      console.error('Error creating user:', userError)
      continue
    }

    // Create venue profile
    const { data: venueProfile, error: venueError } = await supabase
      .from('venue_profiles')
      .insert({
        userId: newUser.id,
        venueName: venue.venueName,
        description: venue.description,
        address: venue.address,
        city: venue.city,
        state: venue.state,
        zipCode: venue.zipCode,
        capacity: venue.capacity,
        stageSize: venue.stageSize,
        genrePrefs: venue.genrePrefs,
        hasSound: venue.hasSound,
        hasLighting: venue.hasLighting,
        hasParking: venue.hasParking,
        phone: venue.phone,
        website: venue.website,
        bookingEmail: venue.bookingEmail
      })
      .select('id')
      .single()

    if (venueError) {
      console.error('Error creating venue profile:', venueError)
      continue
    }

    venueIds.push({ id: venueProfile.id, name: venue.name })
    console.log(`✅ Created venue profile: ${venue.name}`)
  }

  // Now create venue slots for each venue
  const today = new Date()
  
  for (const venue of venueIds) {
    console.log(`Creating slots for ${venue.name}`)
    
    for (let i = 1; i <= 8; i++) {
      const slotDate = new Date(today)
      slotDate.setDate(today.getDate() + i * 4) // Every 4 days
      
      const startTime = new Date(slotDate)
      startTime.setHours(20, 0, 0, 0) // 8 PM
      
      const endTime = new Date(slotDate)
      endTime.setHours(23, 30, 0, 0) // 11:30 PM

      const slotTitles = [
        'Friday Night Live',
        'Saturday Showcase', 
        'Blues Night',
        'Local Artist Spotlight',
        'Weekend Warriors',
        'Austin Originals',
        'Open Mic Plus',
        'Prime Time Show'
      ]

      const { error: slotError } = await supabase
        .from('venue_slots')
        .insert({
          venueProfileId: venue.id,
          eventDate: slotDate.toISOString().split('T')[0],
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          eventTitle: slotTitles[i % slotTitles.length],
          description: `Great opportunity to play at ${venue.name}. Looking for energetic performers!`,
          genrePrefs: i % 2 === 0 ? ['Rock', 'Alternative'] : ['Blues', 'Folk'],
          status: 'AVAILABLE'
        })

      if (slotError) {
        console.error('Error creating slot:', slotError)
      }
    }
    
    console.log(`✅ Created 8 slots for ${venue.name}`)
  }

  console.log('\n🎉 Sample venues and slots created successfully!')
}

seedVenueSlots().catch(console.error)