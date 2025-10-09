-- Recreate essential tables for Austin Talent Exchange

-- Create enum types
CREATE TYPE "UserRole" AS ENUM ('BAND', 'VENUE');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
CREATE TYPE "SlotStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'CANCELLED');

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT,
  "role" "UserRole" NOT NULL,
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "supabaseId" TEXT UNIQUE
);

CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "users_supabaseid_idx" ON "users"("supabaseId");

-- Create band_profiles table
CREATE TABLE IF NOT EXISTS "band_profiles" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT UNIQUE NOT NULL,
  "bandName" TEXT NOT NULL,
  "bio" TEXT,
  "genre" TEXT[],
  "location" TEXT,
  "website" TEXT,
  "spotifyUrl" TEXT,
  "youtubeUrl" TEXT,
  "instagramUrl" TEXT,
  "facebookUrl" TEXT,
  "photos" TEXT[],
  "audioSamples" TEXT[],
  "techRider" TEXT,
  "minFee" INTEGER,
  "maxFee" INTEGER,
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create venue_profiles table
CREATE TABLE IF NOT EXISTS "venue_profiles" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT UNIQUE NOT NULL,
  "venueName" TEXT NOT NULL,
  "description" TEXT,
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "zipCode" TEXT,
  "capacity" INTEGER,
  "stageSize" TEXT,
  "genrePrefs" TEXT[],
  "hasSound" BOOLEAN DEFAULT false,
  "hasLighting" BOOLEAN DEFAULT false,
  "hasParking" BOOLEAN DEFAULT false,
  "phone" TEXT,
  "website" TEXT,
  "bookingEmail" TEXT,
  "payoutType" TEXT,
  "payoutDetails" TEXT,
  "photos" TEXT[],
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create venue_slots table
CREATE TABLE IF NOT EXISTS "venue_slots" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "venueProfileId" TEXT NOT NULL,
  "eventDate" DATE NOT NULL,
  "startTime" TIMESTAMPTZ(6),
  "endTime" TIMESTAMPTZ(6),
  "eventTitle" TEXT,
  "description" TEXT,
  "genrePrefs" TEXT[],
  "status" "SlotStatus" DEFAULT 'AVAILABLE',
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY ("venueProfileId") REFERENCES "venue_profiles"("id") ON DELETE CASCADE
);

-- Create band_availability table
CREATE TABLE IF NOT EXISTS "band_availability" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "bandProfileId" TEXT NOT NULL,
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY ("bandProfileId") REFERENCES "band_profiles"("id") ON DELETE CASCADE
);

-- Create applications table
CREATE TABLE IF NOT EXISTS "applications" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "bandProfileId" TEXT NOT NULL,
  "venueSlotId" TEXT NOT NULL,
  "status" "ApplicationStatus" DEFAULT 'PENDING',
  "message" TEXT,
  "proposedFee" INTEGER,
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY ("bandProfileId") REFERENCES "band_profiles"("id") ON DELETE CASCADE,
  FOREIGN KEY ("venueSlotId") REFERENCES "venue_slots"("id") ON DELETE CASCADE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS "messages" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "senderId" TEXT NOT NULL,
  "receiverId" TEXT NOT NULL,
  "applicationId" TEXT,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ(6) DEFAULT NOW(),
  FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE
);