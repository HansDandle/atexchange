-- Austin Talent Exchange Database Setup
-- Run this SQL in your Supabase SQL Editor (go to SQL Editor in your Supabase dashboard)

-- Create enum types
CREATE TYPE "UserRole" AS ENUM ('BAND', 'VENUE', 'ADMIN');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE "GigStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'COMPLETED', 'CANCELLED');

-- Create users table
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supabaseId" TEXT UNIQUE
);

-- Create band_profiles table
CREATE TABLE "band_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL UNIQUE,
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
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "band_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create venue_profiles table
CREATE TABLE "venue_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL UNIQUE,
    "venueName" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "capacity" INTEGER,
    "stageSize" TEXT,
    "genrePrefs" TEXT[],
    "hasSound" BOOLEAN NOT NULL DEFAULT false,
    "hasLighting" BOOLEAN NOT NULL DEFAULT false,
    "hasParking" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "website" TEXT,
    "bookingEmail" TEXT,
    "payoutType" TEXT,
    "payoutDetails" TEXT,
    "photos" TEXT[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "venue_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create band_availability table
CREATE TABLE "band_availability" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "bandProfileId" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ NOT NULL,
    "endDate" TIMESTAMPTZ NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "band_availability_bandProfileId_fkey" FOREIGN KEY ("bandProfileId") REFERENCES "band_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create venue_slots table
CREATE TABLE "venue_slots" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "venueProfileId" TEXT NOT NULL,
    "eventDate" TIMESTAMPTZ NOT NULL,
    "startTime" TIMESTAMPTZ NOT NULL,
    "endTime" TIMESTAMPTZ NOT NULL,
    "eventTitle" TEXT,
    "description" TEXT,
    "genrePrefs" TEXT[],
    "minFee" INTEGER,
    "maxFee" INTEGER,
    "status" "GigStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "venue_slots_venueProfileId_fkey" FOREIGN KEY ("venueProfileId") REFERENCES "venue_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create applications table
CREATE TABLE "applications" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "bandProfileId" TEXT NOT NULL,
    "venueProfileId" TEXT NOT NULL,
    "venueSlotId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT,
    "proposedFee" INTEGER,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "applications_bandProfileId_fkey" FOREIGN KEY ("bandProfileId") REFERENCES "band_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "applications_venueProfileId_fkey" FOREIGN KEY ("venueProfileId") REFERENCES "venue_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "applications_venueSlotId_fkey" FOREIGN KEY ("venueSlotId") REFERENCES "venue_slots"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE ("bandProfileId", "venueSlotId")
);

-- Create messages table
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "applicationId" TEXT,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "messages_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX "users_supabaseId_idx" ON "users"("supabaseId");
CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "band_profiles_userId_idx" ON "band_profiles"("userId");
CREATE INDEX "venue_profiles_userId_idx" ON "venue_profiles"("userId");
CREATE INDEX "venue_slots_venueProfileId_idx" ON "venue_slots"("venueProfileId");
CREATE INDEX "venue_slots_status_idx" ON "venue_slots"("status");
CREATE INDEX "applications_bandProfileId_idx" ON "applications"("bandProfileId");
CREATE INDEX "applications_venueSlotId_idx" ON "applications"("venueSlotId");
CREATE INDEX "messages_senderId_idx" ON "messages"("senderId");
CREATE INDEX "messages_receiverId_idx" ON "messages"("receiverId");

-- Enable Row Level Security (RLS)
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "band_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "venue_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "band_availability" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "venue_slots" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "applications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view all profiles" ON "users" FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON "users" FOR UPDATE USING (auth.uid()::text = "supabaseId");

CREATE POLICY "Anyone can view band profiles" ON "band_profiles" FOR SELECT USING (true);
CREATE POLICY "Band owners can manage their profile" ON "band_profiles" FOR ALL USING (
    EXISTS (SELECT 1 FROM "users" WHERE "users"."id" = "band_profiles"."userId" AND "users"."supabaseId" = auth.uid()::text)
);

CREATE POLICY "Anyone can view venue profiles" ON "venue_profiles" FOR SELECT USING (true);
CREATE POLICY "Venue owners can manage their profile" ON "venue_profiles" FOR ALL USING (
    EXISTS (SELECT 1 FROM "users" WHERE "users"."id" = "venue_profiles"."userId" AND "users"."supabaseId" = auth.uid()::text)
);

CREATE POLICY "Anyone can view available venue slots" ON "venue_slots" FOR SELECT USING (true);
CREATE POLICY "Venue owners can manage their slots" ON "venue_slots" FOR ALL USING (
    EXISTS (
        SELECT 1 FROM "venue_profiles" vp 
        JOIN "users" u ON u."id" = vp."userId" 
        WHERE vp."id" = "venue_slots"."venueProfileId" 
        AND u."supabaseId" = auth.uid()::text
    )
);

-- Success message
SELECT 'Austin Talent Exchange database schema created successfully! 🎵' as result;