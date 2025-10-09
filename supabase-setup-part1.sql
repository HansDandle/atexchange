-- Austin Talent Exchange Database Setup (Simplified for Supabase)
-- Copy and paste this into your Supabase SQL Editor

-- First, create the enum types
CREATE TYPE "UserRole" AS ENUM ('BAND', 'VENUE', 'ADMIN');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');  
CREATE TYPE "GigStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'COMPLETED', 'CANCELLED');