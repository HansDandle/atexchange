-- Enable RLS on all public tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trivia_host_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dj_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photographer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.other_creative_profiles ENABLE ROW LEVEL SECURITY;

-- Profile tables: Allow ANYONE (anon + authenticated) to READ, but only backend (service role) can UPDATE/DELETE
CREATE POLICY "Allow anyone to read band_profiles" 
  ON public.band_profiles FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow anyone to read venue_profiles" 
  ON public.venue_profiles FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow anyone to read trivia_host_profiles" 
  ON public.trivia_host_profiles FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow anyone to read dj_profiles" 
  ON public.dj_profiles FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow anyone to read photographer_profiles" 
  ON public.photographer_profiles FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow anyone to read other_creative_profiles" 
  ON public.other_creative_profiles FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Slots & availability: Allow anyone to read
CREATE POLICY "Allow anyone to read venue_slots" 
  ON public.venue_slots FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow anyone to read band_availability" 
  ON public.band_availability FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Applications: Allow authenticated users to read
CREATE POLICY "Allow authenticated users to read applications" 
  ON public.applications FOR SELECT 
  TO authenticated 
  USING (true);

-- Messages: Only allow users to read their own messages
CREATE POLICY "Allow users to read their own messages" 
  ON public.messages FOR SELECT 
  TO authenticated 
  USING (
    auth.uid()::text = (
      SELECT "supabaseId" FROM public.users WHERE id = messages."senderId"
    )
    OR auth.uid()::text = (
      SELECT "supabaseId" FROM public.users WHERE id = messages."receiverId"
    )
  );

-- Users table: Allow authenticated users to read public user info
CREATE POLICY "Allow authenticated users to read public user info" 
  ON public.users FOR SELECT 
  TO authenticated 
  USING (true);

-- Block direct client-side modifications (all UPDATE/DELETE operations)
-- These will be rejected unless using service role (backend only)
CREATE POLICY "Block direct updates - use backend API" 
  ON public.band_profiles FOR UPDATE 
  TO anon, authenticated 
  USING (false);

CREATE POLICY "Block direct updates - use backend API" 
  ON public.venue_profiles FOR UPDATE 
  TO anon, authenticated 
  USING (false);

CREATE POLICY "Block direct deletes - use backend API" 
  ON public.band_profiles FOR DELETE 
  TO anon, authenticated 
  USING (false);

CREATE POLICY "Block direct deletes - use backend API" 
  ON public.venue_profiles FOR DELETE 
  TO anon, authenticated 
  USING (false);

CREATE POLICY "Block direct updates - use backend API" 
  ON public.users FOR UPDATE 
  TO anon, authenticated 
  USING (false);

CREATE POLICY "Block direct deletes - use backend API" 
  ON public.users FOR DELETE 
  TO anon, authenticated 
  USING (false);
