// Script to update all profile slugs to the new format (no hyphens)
import { PrismaClient } from '@prisma/client'
import { generateSlugLowerCase } from '../src/lib/slug'

const prisma = new PrismaClient()

async function updateSlugs() {
  // Band Profiles
  const bands = await prisma.bandProfile.findMany()
  for (const band of bands) {
    const newSlug = generateSlugLowerCase(band.bandName || '')
    if (band.slug !== newSlug) {
      await prisma.bandProfile.update({ where: { id: band.id }, data: { slug: newSlug } })
      console.log(`Updated band: ${band.bandName} -> ${newSlug}`)
    }
  }
  // Venue Profiles
  const venues = await prisma.venueProfile.findMany()
  for (const venue of venues) {
    const newSlug = generateSlugLowerCase(venue.venueName || '')
    if (venue.slug !== newSlug) {
      await prisma.venueProfile.update({ where: { id: venue.id }, data: { slug: newSlug } })
      console.log(`Updated venue: ${venue.venueName} -> ${newSlug}`)
    }
  }
  // Other Creative Profiles
  const creatives = await prisma.otherCreativeProfile.findMany()
  for (const creative of creatives) {
    const newSlug = generateSlugLowerCase(creative.displayName || '')
    if (creative.slug !== newSlug) {
      await prisma.otherCreativeProfile.update({ where: { id: creative.id }, data: { slug: newSlug } })
      console.log(`Updated creative: ${creative.displayName} -> ${newSlug}`)
    }
  }
}

updateSlugs().then(() => {
  console.log('All slugs updated!')
  process.exit(0)
}).catch((err) => {
  console.error('Error updating slugs:', err)
  process.exit(1)
})
