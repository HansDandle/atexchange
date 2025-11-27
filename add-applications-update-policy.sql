-- Applications: Allow authenticated users to update (venues accepting/rejecting applications)
CREATE POLICY "Allow authenticated users to update applications" 
  ON public.applications FOR UPDATE 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

-- Venue Slots: Allow authenticated users to update (venues changing slot status)
CREATE POLICY "Allow authenticated users to update venue_slots" 
  ON public.venue_slots FOR UPDATE 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

-- Tickets: Allow authenticated users to update (incrementing RSVP count)
CREATE POLICY "Allow authenticated users to update tickets" 
  ON public.tickets FOR UPDATE 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

