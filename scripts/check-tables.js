const { PrismaClient } = require('@prisma/client')

async function run() {
  const prisma = new PrismaClient()
  const tables = [
    'users',
    'band_profiles',
    'venue_profiles',
    'band_availability',
    'venue_slots',
    'applications',
    'messages'
  ]

  try {
    for (const t of tables) {
      try {
        const res = await prisma.$queryRawUnsafe(`SELECT count(*)::int FROM ${t}`)
        // res is array-like depending on driver; stringify for safety
        console.log(`${t}:`, JSON.stringify(res))
      } catch (err) {
        console.log(`${t}: ERROR - likely missing or inaccessible (${err.message.split('\n')[0]})`)
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

run()
