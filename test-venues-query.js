const { createClient } = require('@supabase/supabase-js');

// Test query to check venue profiles
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testQuery() {
  // First, check if venue_profiles table exists and has data
  const { data: venues, error: venueError } = await supabase
    .from('venue_profiles')
    .select('*')
    .limit(5);
  
  console.log('Raw venue count:', venues?.length || 0);
  console.log('Venue error:', venueError);
  
  // Now try the full query with relationship
  const { data: venuesWithUsers, error: withUsersError } = await supabase
    .from('venue_profiles')
    .select(`
      *,
      users:userId (
        id,
        email,
        name,
        supabaseId
      )
    `)
    .limit(5);
  
  console.log('Venues with users count:', venuesWithUsers?.length || 0);
  console.log('With users error:', withUsersError);
  if (venuesWithUsers && venuesWithUsers[0]) {
    console.log('Sample venue:', JSON.stringify(venuesWithUsers[0], null, 2));
  }
}

testQuery();
