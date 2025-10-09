-- Part 3: Create remaining tables
-- Run this AFTER running parts 1 and 2

-- Create band_availability table
CREATE TABLE band_availability (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "bandProfileId" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ NOT NULL,
    "endDate" TIMESTAMPTZ NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT band_availability_bandProfileId_fkey FOREIGN KEY ("bandProfileId") REFERENCES band_profiles(id) ON DELETE CASCADE
);

-- Create venue_slots table
CREATE TABLE venue_slots (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "venueProfileId" TEXT NOT NULL,
    "eventDate" TIMESTAMPTZ NOT NULL,
    "startTime" TIMESTAMPTZ NOT NULL,
    "endTime" TIMESTAMPTZ NOT NULL,
    "eventTitle" TEXT,
    description TEXT,
    "genrePrefs" TEXT[],
    "minFee" INTEGER,
    "maxFee" INTEGER,
    status "GigStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT venue_slots_venueProfileId_fkey FOREIGN KEY ("venueProfileId") REFERENCES venue_profiles(id) ON DELETE CASCADE
);

-- Create applications table
CREATE TABLE applications (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "bandProfileId" TEXT NOT NULL,
    "venueProfileId" TEXT NOT NULL,
    "venueSlotId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    message TEXT,
    "proposedFee" INTEGER,
    status "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT applications_bandProfileId_fkey FOREIGN KEY ("bandProfileId") REFERENCES band_profiles(id) ON DELETE CASCADE,
    CONSTRAINT applications_venueProfileId_fkey FOREIGN KEY ("venueProfileId") REFERENCES venue_profiles(id) ON DELETE CASCADE,
    CONSTRAINT applications_venueSlotId_fkey FOREIGN KEY ("venueSlotId") REFERENCES venue_slots(id) ON DELETE CASCADE,
    CONSTRAINT applications_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE ("bandProfileId", "venueSlotId")
);

-- Create messages table  
CREATE TABLE messages (
    id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "applicationId" TEXT,
    content TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT messages_senderId_fkey FOREIGN KEY ("senderId") REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT messages_receiverId_fkey FOREIGN KEY ("receiverId") REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT messages_applicationId_fkey FOREIGN KEY ("applicationId") REFERENCES applications(id) ON DELETE CASCADE
);