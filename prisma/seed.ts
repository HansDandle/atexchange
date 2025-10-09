import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'

const prisma = new PrismaClient()

// Define the UserRole enum locally since it's generated
enum UserRole {
  BAND = 'BAND',
  VENUE = 'VENUE',
  ADMIN = 'ADMIN'
}

async function main() {
  console.log('🌱 Seeding database with Austin venues and bands...')

  // Create sample venues
  const venues = [
    {
      email: 'booking@antones.net',
      name: "Antone's Nightclub",
      role: UserRole.VENUE,
      venueData: {
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
        bookingEmail: "booking@antones.net",
        payoutType: "Negotiable",
        payoutDetails: "Varies by show type and draw"
      }
    },
    {
      email: 'info@stubbsaustin.com',
      name: "Stubbs Bar-B-Q",
      role: UserRole.VENUE,
      venueData: {
        venueName: "Stubbs Bar-B-Q",
        description: "Legendary BBQ joint with outdoor amphitheater and indoor bar. Great for all music styles.",
        address: "801 Red River St",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        capacity: 2200,
        stageSize: "Large outdoor amphitheater",
        genrePrefs: ["All Genres"],
        hasSound: true,
        hasLighting: true,
        hasParking: true,
        phone: "(512) 480-8341",
        website: "https://www.stubbsaustin.com",
        bookingEmail: "info@stubbsaustin.com",
        payoutType: "Flat Fee",
        payoutDetails: "Fee varies by venue area (indoor/outdoor) and event size"
      }
    },
    {
      email: 'booking@saxonpub.com',
      name: "Saxon Pub",
      role: UserRole.VENUE,
      venueData: {
        venueName: "Saxon Pub",
        description: "Austin's premier songwriter venue. Intimate listening room perfect for acoustic and indie artists.",
        address: "1320 S Lamar Blvd",
        city: "Austin",
        state: "TX",
        zipCode: "78704",
        capacity: 120,
        stageSize: "Small intimate stage",
        genrePrefs: ["Folk", "Country", "Indie", "Singer-Songwriter"],
        hasSound: true,
        hasLighting: false,
        hasParking: true,
        phone: "(512) 448-2552",
        website: "https://www.saxonpub.com",
        bookingEmail: "booking@saxonpub.com",
        payoutType: "Door Split",
        payoutDetails: "70/30 split after $50 house fee"
      }
    },
    {
      email: 'events@cheerbars.com',
      name: "Cheer Up Charlies",
      role: UserRole.VENUE,
      venueData: {
        venueName: "Cheer Up Charlies",
        description: "Multi-room venue with indoor/outdoor spaces. Great for indie, electronic, and experimental acts.",
        address: "900 Red River St",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        capacity: 300,
        stageSize: "Multiple stages available",
        genrePrefs: ["Indie", "Electronic", "Alternative", "Experimental"],
        hasSound: true,
        hasLighting: true,
        hasParking: false,
        phone: "(512) 953-2140",
        website: "https://www.cheerupcharlies.com",
        bookingEmail: "events@cheerbars.com",
        payoutType: "Percentage of Bar Sales",
        payoutDetails: "Varies by event and bar performance"
      }
    },
    {
      email: 'booking@mohawkaustin.com',
      name: "Mohawk",
      role: UserRole.VENUE,
      venueData: {
        venueName: "Mohawk",
        description: "Rooftop venue with amazing city views. Perfect for indie rock, punk, and alternative bands.",
        address: "912 Red River St",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        capacity: 300,
        stageSize: "Outdoor rooftop stage",
        genrePrefs: ["Indie", "Punk", "Alternative", "Rock"],
        hasSound: true,
        hasLighting: true,
        hasParking: false,
        website: "https://www.mohawkaustin.com",
        bookingEmail: "booking@mohawkaustin.com",
        payoutType: "Flat Fee",
        payoutDetails: "Standard fee for most shows, higher for special events"
      }
    }
  ]

  // Create sample bands
  const bands = [
    {
      email: 'contact@thebrokenpromises.com',
      name: 'The Broken Promises',
      role: UserRole.BAND,
      bandData: {
        bandName: 'The Broken Promises',
        bio: 'Austin-based indie rock quartet known for emotional lyrics and soaring melodies. Drawing influences from The National and Arcade Fire, we create anthemic songs that resonate with audiences.',
        genre: ['Indie', 'Alternative', 'Rock'],
        location: 'Austin, TX',
        website: 'https://www.thebrokenpromises.com',
        spotifyUrl: 'https://open.spotify.com/artist/example1',
        youtubeUrl: 'https://youtube.com/thebrokenpromises',
        instagramUrl: 'https://instagram.com/thebrokenpromises',
        techRider: 'Full backline preferred, 4 vocal mics, monitor mix',
        minFee: 30000, // $300
        maxFee: 80000  // $800
      }
    },
    {
      email: 'booking@lonestarcowboys.com',
      name: 'Lone Star Cowboys',
      role: UserRole.BAND,
      bandData: {
        bandName: 'Lone Star Cowboys',
        bio: 'Traditional country band with a modern twist. We play classic honky-tonk, outlaw country, and original songs about Texas life. Perfect for dance halls and country venues.',
        genre: ['Country', 'Folk'],
        location: 'Austin, TX',
        website: 'https://www.lonestarcowboys.com',
        spotifyUrl: 'https://open.spotify.com/artist/example2',
        instagramUrl: 'https://instagram.com/lonestarcowboys',
        facebookUrl: 'https://facebook.com/lonestarcowboys',
        techRider: 'Basic PA system, 3 vocal mics, we bring our own instruments',
        minFee: 25000, // $250
        maxFee: 60000  // $600
      }
    },
    {
      email: 'info@electricsoulrevue.com',
      name: 'Electric Soul Revue',
      role: UserRole.BAND,
      bandData: {
        bandName: 'Electric Soul Revue',
        bio: '8-piece soul and R&B band bringing the heat with horn section, backup singers, and tight rhythm section. We get crowds moving with classic soul covers and original funk.',
        genre: ['Soul', 'R&B', 'Funk'],
        location: 'Austin, TX',
        spotifyUrl: 'https://open.spotify.com/artist/example3',
        youtubeUrl: 'https://youtube.com/electricsoulrevue',
        techRider: '8 channels needed, horn mics, full monitor system, large stage preferred',
        minFee: 50000, // $500
        maxFee: 150000 // $1500
      }
    },
    {
      email: 'contact@austinbluesexpress.com',
      name: 'Austin Blues Express',
      role: UserRole.BAND,
      bandData: {
        bandName: 'Austin Blues Express',
        bio: 'Traditional blues trio keeping the Austin blues tradition alive. Featuring slide guitar, harmonica, and deep vocals that honor the legends while bringing our own style.',
        genre: ['Blues', 'Rock'],
        location: 'Austin, TX',
        website: 'https://www.austinbluesexpress.com',
        techRider: 'Blues harp mic setup, guitar and bass amps provided preferred',
        minFee: 20000, // $200
        maxFee: 50000  // $500
      }
    },
    {
      email: 'mgmt@neonwilderness.band',
      name: 'Neon Wilderness',
      role: UserRole.BAND,
      bandData: {
        bandName: 'Neon Wilderness',
        bio: 'Electronic-infused indie pop with dreamy synths and catchy hooks. Our sound blends nostalgic 80s elements with modern production and introspective lyrics.',
        genre: ['Electronic', 'Pop', 'Indie'],
        location: 'Austin, TX',
        spotifyUrl: 'https://open.spotify.com/artist/example5',
        youtubeUrl: 'https://youtube.com/neonwilderness',
        instagramUrl: 'https://instagram.com/neonwilderness',
        techRider: 'Synthesizer setup, laptop/interface support, colored stage lighting preferred',
        minFee: 35000, // $350
        maxFee: 90000  // $900
      }
    }
  ]

  // Create users and profiles
  for (const venue of venues) {
    console.log(`Creating venue: ${venue.name}`)
    
    const user = await prisma.user.create({
      data: {
        email: venue.email,
        name: venue.name,
        role: venue.role,
        supabaseId: createHash('md5').update(venue.email).digest('hex'), // Temporary ID
      },
    })

    await prisma.venueProfile.create({
      data: {
        userId: user.id,
        ...venue.venueData,
      },
    })

    // Create some sample available slots for each venue
    const today = new Date()
    for (let i = 1; i <= 5; i++) {
      const eventDate = new Date(today)
      eventDate.setDate(today.getDate() + i * 7) // Weekly slots
      
      const startTime = new Date(eventDate)
      startTime.setHours(20, 0, 0, 0) // 8 PM
      
      const endTime = new Date(eventDate)
      endTime.setHours(23, 30, 0, 0) // 11:30 PM
      
      await prisma.venueSlot.create({
        data: {
          venueProfileId: (await prisma.venueProfile.findUnique({ 
            where: { userId: user.id } 
          }))!.id,
          eventDate,
          startTime,
          endTime,
          eventTitle: `${venue.name} Live Music`,
          description: 'Looking for talented local acts',
          genrePrefs: venue.venueData.genrePrefs,
          status: 'AVAILABLE',
        },
      })
    }
  }

  for (const band of bands) {
    console.log(`Creating band: ${band.name}`)
    
    const user = await prisma.user.create({
      data: {
        email: band.email,
        name: band.name,
        role: band.role,
        supabaseId: createHash('md5').update(band.email).digest('hex'), // Temporary ID
      },
    })

    await prisma.bandProfile.create({
      data: {
        userId: user.id,
        ...band.bandData,
      },
    })

    // Create availability for bands
    const today = new Date()
    for (let i = 0; i < 10; i++) {
      const startDate = new Date(today)
      startDate.setDate(today.getDate() + i * 3) // Every 3 days
      
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 1) // Available for next day too
      
      await prisma.bandAvailability.create({
        data: {
          bandProfileId: (await prisma.bandProfile.findUnique({ 
            where: { userId: user.id } 
          }))!.id,
          startDate,
          endDate,
          notes: 'Available for evening shows',
        },
      })
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${venues.length} venues and ${bands.length} bands`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })