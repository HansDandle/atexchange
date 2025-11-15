// This script generates the restofthevenues.sql file from venues.json
// It skips venues already imported in all_venues_import.sql

const fs = require('fs');
const path = require('path');

// Read venues.json
const venuesJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'venues.json'), 'utf8'));

// List of venues already imported in all_venues_import.sql
const alreadyImported = [
  'The North Door',
  'Paramount and Stateside Theatres',
  'Hotel Vegas & The Volstead Lounge',
  'The 04 Center',
  'Haute Spot',
  'Rozco\'s Comedy Club',
  'Radio/East',
  'Moody Center',
  'Moody Amphitheater at Waterloo Park',
  'Brazos Hall',
  'The Ocean Lab',
  'Long Center for the Performing Arts',
  'Empire Control Room & Garage',
  'Cedar Park Depot',
  'Delaware Sub Shop'
];

// Filter out already imported venues
const newVenues = venuesJson.filter(venue => !alreadyImported.includes(venue.name));

console.log(`Total venues: ${venuesJson.length}`);
console.log(`Already imported: ${alreadyImported.length}`);
console.log(`New venues to import: ${newVenues.length}`);

// Generate SQL
let sql = `INSERT INTO public.venue_profiles (
  "id", "userId", "venueName", "description", "address", "city", "state", "zipCode", "capacity", "stageSize",
  "genrePrefs", "hasSound", "hasLighting", "hasParking", "phone", "website", "bookingEmail", "payoutType",
  "payoutDetails", "photos", "createdAt", "updatedAt"
) VALUES\n`;

newVenues.forEach((venue, index) => {
  // Escape single quotes in venue names
  const venueName = venue.name.replace(/'/g, "''");
  const address = venue.address.replace(/'/g, "''");
  
  const isLast = index === newVenues.length - 1;
  const endChar = isLast ? ';' : ',';
  
  sql += `  (\n`;
  sql += `    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '${venueName}', NULL,\n`;
  sql += `    '${address}', 'Austin', 'TX', NULL, NULL, NULL,\n`;
  sql += `    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,\n`;
  sql += `    NULL, NULL, now(), now()\n`;
  sql += `  )${endChar}\n`;
});

// Write to file
fs.writeFileSync(path.join(__dirname, 'restofthevenues.sql'), sql);
console.log(`Generated restofthevenues.sql with ${newVenues.length} venues`);
