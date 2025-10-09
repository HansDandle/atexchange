const { createClient } = require('@supabase/supabase-js')

async function checkDatabase() {
  // Use your cloud Supabase credentials
  const supabaseUrl = 'https://jkylaqqajdjxpvrmuxfr.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not found in environment')
    console.log('Make sure you have a .env.local file with your Supabase keys')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('🔍 Checking cloud Supabase database...\n')

  // Check each table
  const tables = ['users', 'band_profiles', 'venue_profiles', 'venue_slots', 'band_availability', 'applications', 'messages']

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .limit(0)

      if (error) {
        console.log(`❌ ${table}: ERROR - ${error.message}`)
      } else {
        console.log(`✅ ${table}: ${count} rows`)
      }
    } catch (err) {
      console.log(`❌ ${table}: ERROR - ${err.message}`)
    }
  }

  // Check specific band profiles if they exist
  console.log('\n📝 Checking band_profiles in detail:')
  try {
    const { data: bands, error } = await supabase
      .from('band_profiles')
      .select('id, bandName, userId')
      .limit(5)

    if (error) {
      console.log('❌ Error fetching band profiles:', error.message)
    } else if (bands && bands.length > 0) {
      console.log('🎸 Found band profiles:')
      bands.forEach(band => {
        console.log(`  - ${band.bandName} (userId: ${band.userId})`)
      })
    } else {
      console.log('ℹ️  No band profiles found')
    }
  } catch (err) {
    console.log('❌ Error:', err.message)
  }

  // Check users table
  console.log('\n👥 Checking users in detail:')
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, supabaseId')
      .limit(5)

    if (error) {
      console.log('❌ Error fetching users:', error.message)
    } else if (users && users.length > 0) {
      console.log('👤 Found users:')
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Role: ${user.role} - SupabaseId: ${user.supabaseId}`)
      })
    } else {
      console.log('ℹ️  No users found')
    }
  } catch (err) {
    console.log('❌ Error:', err.message)
  }
}

checkDatabase().catch(console.error)