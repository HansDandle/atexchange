const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables manually since we can't use dotenv
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importVenues() {
  // Read the SQL file
  const sqlPath = path.join(__dirname, 'restofthevenues.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
  
  // Count the number of INSERT statements
  const insertCount = (sqlContent.match(/INSERT INTO/g) || []).length;
  console.log(`Found ${insertCount} INSERT statements to execute`);
  
  try {
    // Execute the SQL
    const { error } = await supabase.rpc('exec', { sql: sqlContent });
    
    if (error) {
      console.error('Error executing SQL:', error);
      process.exit(1);
    }
    
    console.log(`✅ Successfully imported ${insertCount} venues!`);
    
    // Verify the import
    const { data: venues, error: countError } = await supabase
      .from('venue_profiles')
      .select('id', { count: 'exact' });
    
    if (countError) {
      console.error('Error counting venues:', countError);
    } else {
      console.log(`Total venues in database: ${venues?.length || 0}`);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

importVenues();
