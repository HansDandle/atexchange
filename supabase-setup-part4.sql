-- Part 4: Add indexes and RLS policies
-- Run this AFTER running parts 1, 2, and 3

-- Create indexes for better performance
CREATE INDEX users_supabaseId_idx ON users("supabaseId");
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX band_profiles_userId_idx ON band_profiles("userId");
CREATE INDEX venue_profiles_userId_idx ON venue_profiles("userId");
CREATE INDEX venue_slots_venueProfileId_idx ON venue_slots("venueProfileId");
CREATE INDEX venue_slots_status_idx ON venue_slots(status);
CREATE INDEX applications_bandProfileId_idx ON applications("bandProfileId");
CREATE INDEX applications_venueSlotId_idx ON applications("venueSlotId");
CREATE INDEX messages_senderId_idx ON messages("senderId");
CREATE INDEX messages_receiverId_idx ON messages("receiverId");

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE band_profiles ENABLE ROW LEVEL SECURITY;  
ALTER TABLE venue_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE band_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = "supabaseId");

CREATE POLICY "Anyone can view band profiles" ON band_profiles FOR SELECT USING (true);
CREATE POLICY "Band owners manage profile" ON band_profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = band_profiles."userId" AND users."supabaseId" = auth.uid()::text)
);

CREATE POLICY "Anyone can view venue profiles" ON venue_profiles FOR SELECT USING (true);
CREATE POLICY "Venue owners manage profile" ON venue_profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = venue_profiles."userId" AND users."supabaseId" = auth.uid()::text)
);

CREATE POLICY "Anyone can view venue slots" ON venue_slots FOR SELECT USING (true);
CREATE POLICY "Venue owners manage slots" ON venue_slots FOR ALL USING (
    EXISTS (
        SELECT 1 FROM venue_profiles vp 
        JOIN users u ON u.id = vp."userId" 
        WHERE vp.id = venue_slots."venueProfileId" 
        AND u."supabaseId" = auth.uid()::text
    )
);