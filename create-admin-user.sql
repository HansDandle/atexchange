-- Script to create an admin user
-- Run this in your Supabase SQL editor after you've created a regular account

-- First, find your user's supabaseId from the auth system
-- You can get this from your browser's developer tools after logging in
-- or by checking the auth.users table in Supabase

-- Replace 'your-supabase-auth-id-here' with your actual Supabase auth ID
-- Replace 'your-email@example.com' with your actual email

-- Option 1: Create a new admin user (if you want a dedicated admin account)
INSERT INTO users (email, name, role, "supabaseId") 
VALUES ('admin@austintalentexchange.com', 'Admin User', 'ADMIN', 'your-supabase-auth-id-here');

-- Option 2: Update an existing user to be an admin (recommended)
-- First find your user ID:
SELECT * FROM users WHERE email = 'your-email@example.com';

-- Then update the role:
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';

-- Or update by supabaseId if you know it:
UPDATE users 
SET role = 'ADMIN' 
WHERE "supabaseId" = 'your-supabase-auth-id-here';

-- Verify the admin user was created/updated:
SELECT * FROM users WHERE role = 'ADMIN';