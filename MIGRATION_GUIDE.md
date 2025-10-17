# Database Migration Guide: New Role Integration

## Overview
This guide explains how to safely integrate new user roles (Trivia Host, DJ, Photographer, Other Creative) into the Austin Talent Exchange database without losing existing data.

## What's Changed
The following new profile models have been added to `prisma/schema.prisma`:
- **TriviaHostProfile** - For hosting trivia events
- **DJProfile** - For DJs offering their services
- **PhotographerProfile** - For photographers
- **OtherCreativeProfile** - For other creative professionals

The `User` model has been updated with one-to-one relationships to these new profiles.

## Non-Destructive Migration Strategy

### Step 1: Review Schema Changes
The migration file contains **ONLY** new tables and relationships. No existing tables or data will be modified.

### Step 2: Generate the Migration
When you're ready, run:
```bash
$env:DATABASE_URL='postgresql://postgres.jkylaqqajdjxpvrmuxfr:SXSW2003Antone%27s@aws-1-us-east-2.pooler.supabase.com:5432/postgres'
npx prisma migrate dev --name add_new_role_profiles
```

This will:
1. Create the four new profile tables in the database
2. Create the necessary foreign keys
3. Add indexes for optimal performance
4. **NOT** modify any existing data

### Step 3: Regenerate Prisma Client
After the migration is applied:
```bash
npx prisma generate
```

### Step 4: Seed Sample Data (Optional)
The `prisma/seed.ts` file has been updated to create sample users and profiles for the new roles:
```bash
npm run db:seed
```

This will add:
- DJ profile
- Trivia Host profile
- Photographer profile
- Other Creative profile

With realistic sample data for testing.

## Database Schema

### TriviaHostProfile
```sql
CREATE TABLE "trivia_host_profiles" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  userId TEXT UNIQUE NOT NULL,
  hostName TEXT NOT NULL,
  bio TEXT,
  specialization TEXT,
  experience TEXT,
  photos TEXT[],
  website TEXT,
  phone TEXT,
  location TEXT,
  rates INTEGER,
  createdAt TIMESTAMPTZ(6) DEFAULT NOW(),
  updatedAt TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### DJProfile
```sql
CREATE TABLE "dj_profiles" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  userId TEXT UNIQUE NOT NULL,
  djName TEXT NOT NULL,
  bio TEXT,
  specialization TEXT[],
  experience TEXT,
  photos TEXT[],
  website TEXT,
  mixCloudUrl TEXT,
  spotifyUrl TEXT,
  soundCloudUrl TEXT,
  instagramUrl TEXT,
  phone TEXT,
  location TEXT,
  minFee INTEGER,
  maxFee INTEGER,
  equipment TEXT,
  createdAt TIMESTAMPTZ(6) DEFAULT NOW(),
  updatedAt TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### PhotographerProfile
```sql
CREATE TABLE "photographer_profiles" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  userId TEXT UNIQUE NOT NULL,
  photographerName TEXT NOT NULL,
  bio TEXT,
  specialization TEXT[],
  experience TEXT,
  portfolioPhotos TEXT[],
  website TEXT,
  instagramUrl TEXT,
  phone TEXT,
  location TEXT,
  rates INTEGER,
  createdAt TIMESTAMPTZ(6) DEFAULT NOW(),
  updatedAt TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### OtherCreativeProfile
```sql
CREATE TABLE "other_creative_profiles" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  userId TEXT UNIQUE NOT NULL,
  creativeName TEXT NOT NULL,
  bio TEXT,
  creativeType TEXT,
  specialization TEXT,
  experience TEXT,
  portfolio TEXT[],
  website TEXT,
  phone TEXT,
  location TEXT,
  rates INTEGER,
  createdAt TIMESTAMPTZ(6) DEFAULT NOW(),
  updatedAt TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## Key Features

### ✅ Non-Destructive
- No existing tables are modified
- No existing data is deleted
- Backward compatible with existing application code

### ✅ Safe Foreign Keys
- All foreign keys reference `users.id` with `ON DELETE CASCADE`
- If a user is deleted, their profile is automatically deleted
- No orphaned records will exist

### ✅ Flexible Design
- Each profile has role-specific fields
- Photos/portfolio arrays support multiple media files
- Pricing fields (minFee, maxFee, rates) for service-based roles
- Specialization fields allow for detailed categorization

### ✅ Indexed for Performance
- `userId` column is unique-indexed in each profile table
- Ensures fast lookups by user

## Rollback Plan

If you need to rollback this migration:

```bash
npx prisma migrate resolve --rolled-back add_new_role_profiles
```

This will mark the migration as rolled back without actually deleting the tables. To physically remove the tables, you would need to:

1. Create a new migration to drop the tables
2. Apply that migration

## Frontend Integration Next Steps

Once the migration is applied, you'll need to:

1. **Update Signup Flow** - Add options for new roles during signup
2. **Create Profile Forms** - Build forms for each role type
3. **Add Dashboard Pages** - Create profile management pages for each role
4. **Update Navigation** - Show role-specific menu items

See `TODO.md` for specific frontend tasks.

## Testing Checklist

- [ ] Migration applies without errors
- [ ] Prisma client generates successfully
- [ ] Seed script creates sample profiles
- [ ] Can query new profiles via Prisma
- [ ] Existing users/bands/venues still work
- [ ] Frontend signup accepts new roles
- [ ] Can create and save profiles for new roles
- [ ] Dashboard shows role-specific information

## Support

If you encounter any issues:
1. Check database connectivity
2. Verify DATABASE_URL is set correctly
3. Ensure Supabase project is running
4. Check Supabase dashboard for any schema issues
