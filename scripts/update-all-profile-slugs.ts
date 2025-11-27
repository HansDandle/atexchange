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
  // Trivia Host Profiles
  const hosts = await prisma.triviaHostProfile.findMany()
  for (const host of hosts) {
    const newSlug = generateSlugLowerCase(host.hostName || '')
    if (host.slug !== newSlug) {
      await prisma.triviaHostProfile.update({ where: { id: host.id }, data: { slug: newSlug } })
      console.log(`Updated trivia host: ${host.hostName} -> ${newSlug}`)
    }
  }
  // DJ Profiles
  const djs = await prisma.djProfile.findMany()
  for (const dj of djs) {
    const newSlug = generateSlugLowerCase(dj.djName || '')
    if (dj.slug !== newSlug) {
      await prisma.djProfile.update({ where: { id: dj.id }, data: { slug: newSlug } })
      console.log(`Updated DJ: ${dj.djName} -> ${newSlug}`)
    }
  }
  // Photographer Profiles
  const photogs = await prisma.photographerProfile.findMany()
  for (const photog of photogs) {
    const newSlug = generateSlugLowerCase(photog.name || '')
    if (photog.slug !== newSlug) {
      await prisma.photographerProfile.update({ where: { id: photog.id }, data: { slug: newSlug } })
      console.log(`Updated photographer: ${photog.name} -> ${newSlug}`)
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
