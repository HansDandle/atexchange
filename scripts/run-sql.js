const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

async function run() {
  const file = process.argv[2] || 'supabase-setup-part2.sql'
  const filePath = path.resolve(process.cwd(), file)

  if (!fs.existsSync(filePath)) {
    console.error('SQL file not found:', filePath)
    process.exit(1)
  }

  const sql = fs.readFileSync(filePath, 'utf8')

  // Naively split statements on semicolon. Works for simple SQL files without
  // function bodies or dollar-quoted strings. Trim and filter blanks.
  const statements = sql
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(Boolean)

  const prisma = new PrismaClient()
  try {
    console.log('Executing SQL file:', filePath)
    for (const stmt of statements) {
      const safe = stmt.endsWith(';') ? stmt : stmt + ';'
      console.log('Executing statement (truncated):', safe.substring(0, 80).replace(/\n/g, ' '))
      await prisma.$executeRawUnsafe(safe)
    }
    console.log('SQL executed successfully')
  } catch (err) {
    console.error('Error executing SQL:', err)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

run()
