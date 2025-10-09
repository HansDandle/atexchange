import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jkylaqqajdjxpvrmuxfr.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreWxhcXFhamRqeHB2cm11eGZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTk4Nzc2NSwiZXhwIjoyMDc1NTYzNzY1fQ.aM2r1QNk10jJMTOpmckbnbysp0AMKRCzT8ftslt6I44'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testConnection() {
  console.log('🧪 Testing Supabase connection...')
  
  // Try to query existing tables
  const { data: tables, error: tablesError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
  
  if (tablesError) {
    console.error('❌ Error querying tables:', tablesError.message)
  } else {
    console.log('✅ Current tables:', tables.map(t => t.table_name))
  }
  
  // Try to check if users table exists
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('count')
    .limit(1)
  
  if (usersError) {
    console.log('❌ Users table does not exist:', usersError.message)
    console.log('\n📋 Manual setup required:')
    console.log('1. Go to https://supabase.com/dashboard/project/jkylaqqajdjxpvrmuxfr/sql')
    console.log('2. Copy and paste the contents of recreate-schema.sql')
    console.log('3. Click "Run" to create the tables')
  } else {
    console.log('✅ Users table exists!')
  }
}

testConnection()