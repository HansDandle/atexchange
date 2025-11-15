#!/usr/bin/env node

/**
 * Diagnostic script to debug why venues appear locally but not on live site
 * Usage: node diagnose-venues-issue.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
  console.log('🔍 Austin Talent Exchange - Venues Diagnostic Tool\n');
  
  try {
    // Test 1: Check venue_profiles table access (unauthenticated)
    console.log('Test 1: Fetching venues (unauthenticated)...');
    const { data: venues, error: venueError } = await supabase
      .from('venue_profiles')
      .select('id, venueName, city, state')
      .limit(5);
    
    if (venueError) {
      console.error('❌ Error fetching venues:', venueError.message);
      console.error('   Code:', venueError.code);
      console.error('   Details:', venueError.details);
    } else {
      console.log(`✅ Found ${venues?.length || 0} venues (unauthenticated)`);
      if (venues && venues.length > 0) {
        venues.forEach((v, i) => {
          console.log(`   ${i + 1}. ${v.venueName} (${v.city}, ${v.state})`);
        });
      }
    }
    
    // Test 2: Count total venues
    console.log('\nTest 2: Counting total venues...');
    const { count, error: countError } = await supabase
      .from('venue_profiles')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Error counting venues:', countError.message);
    } else {
      console.log(`✅ Total venues in database: ${count}`);
    }
    
    // Test 3: Check RLS policies (by attempting to view users field)
    console.log('\nTest 3: Checking relationship access with user data...');
    const { data: venuesWithUsers, error: relationError } = await supabase
      .from('venue_profiles')
      .select(`
        id,
        venueName,
        userId,
        users:userId (id, email, name)
      `)
      .limit(1);
    
    if (relationError) {
      console.error('❌ Error with relationship query:', relationError.message);
      console.error('   This might indicate RLS or relationship issues');
    } else {
      console.log(`✅ Relationship query successful`);
      if (venuesWithUsers && venuesWithUsers.length > 0) {
        console.log(`   First venue: ${venuesWithUsers[0].venueName}`);
        console.log(`   Has user data: ${venuesWithUsers[0].users ? '✅' : '❌'}`);
      }
    }
    
    // Test 4: Check if table exists and is accessible
    console.log('\nTest 4: Checking schema...');
    const { data: schema, error: schemaError } = await supabase.rpc(
      'get_tables',
      { schema_name: 'public' }
    ).catch(() => ({ data: null, error: { message: 'RPC not available' } }));
    
    if (schemaError) {
      console.warn('⚠️  Could not query schema via RPC (expected in some cases)');
    } else {
      const hasVenueTable = schema?.some(t => t.table_name === 'venue_profiles');
      console.log(`✅ venue_profiles table exists: ${hasVenueTable ? 'Yes' : 'No'}`);
    }
    
    // Test 5: Try admin access if service key available
    console.log('\nTest 5: Checking environment...');
    const hasAnonKey = !!supabaseKey;
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log(`   Anon key present: ${hasAnonKey ? '✅' : '❌'}`);
    console.log(`   Service key present: ${hasServiceKey ? '✅' : '❌'}`);
    
    console.log('\n📊 Summary:');
    console.log('   If Test 1 shows 0 venues but Test 2 shows count > 0:');
    console.log('   → Issue is likely RLS policies blocking SELECT access');
    console.log('   → Apply the RLS policy: "Anyone can view venue profiles" ON venue_profiles');
    console.log('\n   If all tests show errors:');
    console.log('   → Check if venue_profiles table exists in live Supabase project');
    console.log('   → Verify connection string and environment variables');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  }
}

diagnose();
