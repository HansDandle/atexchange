-- Part 2: Create the main tables
-- Run this AFTER running part 1

-- Create users table
CREATE TABLE users (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    role "UserRole" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supabaseId" TEXT UNIQUE
);

-- Create band_profiles table
CREATE TABLE band_profiles (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL UNIQUE,
    "bandName" TEXT NOT NULL,
    bio TEXT,
    genre TEXT[],
    location TEXT,
    website TEXT,
    "spotifyUrl" TEXT,
    "youtubeUrl" TEXT,
    "instagramUrl" TEXT,
    "facebookUrl" TEXT,
    photos TEXT[],
    "audioSamples" TEXT[],
    "techRider" TEXT,
    "minFee" INTEGER,
    "maxFee" INTEGER,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT band_profiles_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create venue_profiles table
CREATE TABLE venue_profiles (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL UNIQUE,
    "venueName" TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    capacity INTEGER,
    "stageSize" TEXT,
    "genrePrefs" TEXT[],
    "hasSound" BOOLEAN NOT NULL DEFAULT false,
    "hasLighting" BOOLEAN NOT NULL DEFAULT false,
    "hasParking" BOOLEAN NOT NULL DEFAULT false,
    phone TEXT,
    website TEXT,
    "bookingEmail" TEXT,
    "payoutType" TEXT,
    "payoutDetails" TEXT,
    photos TEXT[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT venue_profiles_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);