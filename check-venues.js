const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkVenues() {
  try {
    // Count venues
    const { count, error } = await supabase
      .from('venue_profiles')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error querying venues:', error.message);
      process.exit(1);
    }
    
    console.log(`Total venues in database: ${count}`);
    
    // Now try with the relationship
    console.log('\nTesting relationship query...');
    const { data: venuesWithUsers, error: relError } = await supabase
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
    
    if (relError) {
      console.error('❌ Relationship query error:', relError.message);
      
      // Try without relationship
      console.log('\nTrying without relationship...');
      const { data: venuesNoRel, error: simpleError } = await supabase
        .from('venue_profiles')
        .select('*')
        .limit(5);
      
      if (simpleError) {
        console.error('❌ Simple query also failed:', simpleError.message);
      } else {
        console.log(`✓ Simple query works, got ${venuesNoRel?.length || 0} venues`);
      }
    } else {
      console.log(`✓ Relationship query works, got ${venuesWithUsers?.length || 0} venues`);
      if (venuesWithUsers?.[0]) {
        console.log('Sample venue with users relationship:');
        console.log(JSON.stringify(venuesWithUsers[0], null, 2));
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

checkVenues();
