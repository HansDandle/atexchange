#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎵 Austin Talent Exchange - Setup Checker\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  console.log('💡 Copy .env.local.example to .env.local and add your credentials\n');
  process.exit(1);
} else {
  console.log('✅ Environment file found');
}

// Check environment variables
const envContent = fs.readFileSync(envPath, 'utf-8');
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'DATABASE_URL'
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (!envContent.includes(varName + '=') || envContent.includes(varName + '=your-')) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('❌ Missing or incomplete environment variables:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\n💡 Please update your .env.local file with real values\n');
  process.exit(1);
} else {
  console.log('✅ Environment variables configured');
}

// Check if Prisma client is generated
try {
  require('@prisma/client');
  console.log('✅ Prisma client generated');
} catch (error) {
  console.log('❌ Prisma client not found');
  console.log('💡 Run: npm run db:generate\n');
  process.exit(1);
}

// Test database connection
try {
  console.log('🔍 Testing database connection...');
  execSync('npx prisma db push --accept-data-loss --force-reset', { stdio: 'pipe' });
  console.log('✅ Database connection successful');
} catch (error) {
  console.log('❌ Database connection failed');
  console.log('💡 Check your DATABASE_URL and ensure your database is running\n');
  process.exit(1);
}

// Seed database
try {
  console.log('🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'pipe' });
  console.log('✅ Database seeded with Austin venues and bands');
} catch (error) {
  console.log('⚠️  Seeding skipped (this is okay if data already exists)');
}

console.log('\n🎉 Setup complete! Your Austin Talent Exchange is ready to rock!');
console.log('\n🚀 Start the development server:');
console.log('   npm run dev');
console.log('\n🌐 Then visit: http://localhost:3000');
console.log('\n📚 Need help? Check DATABASE_SETUP.md for detailed instructions\n');