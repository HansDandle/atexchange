INSERT INTO public.venue_profiles (
  "id", "userId", "venueName", "description", "address", "city", "state", "zipCode", "capacity", "stageSize",
  "genrePrefs", "hasSound", "hasLighting", "hasParking", "phone", "website", "bookingEmail", "payoutType",
  "payoutDetails", "photos", "createdAt", "updatedAt"
) VALUES
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The North Door', NULL,
    '501 Brushy St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Paramount and Stateside Theatres', NULL,
    '713 Congress', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hotel Vegas & The Volstead Lounge', NULL,
    '1502 E 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The 04 Center', NULL,
    '2701 South Lamar Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Haute Spot', NULL,
    '1501 E. New Hope Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Rozco’s Comedy Club', NULL,
    '1805 E. 7th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Radio/East', NULL,
    '3504 Montopolis Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Moody Center', NULL,
    '2001 Robert Dedman Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Moody Amphitheater at Waterloo Park', NULL,
    '1401 Trinity St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brazos Hall', NULL,
    '204 E 4th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Ocean Lab', NULL,
    '3314 Harmon Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Long Center for the Performing Arts', NULL,
    '701 W. Riverside Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Empire Control Room & Garage', NULL,
    '604-606 East 7th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Emo''s', NULL,
    '2015 E. Riverside Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ACL Live at the Moody Theater', NULL,
    '310 W. 2nd Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Barbarella', NULL,
    '615 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cheer Up Charlies', NULL,
    '900 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Historic Scoot Inn', NULL,
    '1308 E. Fourth', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brushy Street Commons', NULL,
    '501 Brushy', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Stubb''s', NULL,
    '801 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'RICHESART GALLERY', NULL,
    '2511 E 6th St Unit A', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Buzz Mill', NULL,
    '1505 Town Creek Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Circuit of the Americas', NULL,
    '9201 Circuit of the Americas Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Swan Dive', NULL,
    '615 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Highball', NULL,
    '1120 S. Lamar Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Alamo Drafthouse South Lamar', NULL,
    '1120 South Lamar', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Continental Club', NULL,
    '1315 S. Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Waterloo Records', NULL,
    '1105 N. Lamar Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Speakeasy', NULL,
    '412 Congress Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bass Concert Hall', NULL,
    '2350 Robert Dedman Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Antone''s', NULL,
    '305 East 5th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Alamo Drafthouse Lakeline', NULL,
    '14028 N US Highway 183, Bldg F', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Alamo Drafthouse Slaughter Lane', NULL,
    '5701 W. Slaughter Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Whitewater Amphitheater', NULL,
    '11860 FM 306', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Mohawk Austin', NULL,
    '912 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Alamo Drafthouse Village', NULL,
    '2700 W Anderson Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Broken Spoke', NULL,
    '3201 S. Lamar', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Flamingo Cantina', NULL,
    '515 E. 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Elysium', NULL,
    '705 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Little Longhorn Saloon', NULL,
    '5434 Burnet Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cactus Cafe', NULL,
    '2247 Guadalupe St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hole in the Wall', NULL,
    '2538 Guadalupe St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Donn''s Depot', NULL,
    '1600 W. 5th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Chess Club', NULL,
    '617 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Saxon Pub', NULL,
    '1320 S Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Maggie Mae''s', NULL,
    '323 E. Sixth', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Jackalope', NULL,
    '404 E. 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Treehouse Park', NULL,
    '7701 Colton-Bluff Springs Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Harry Ransom Center', NULL,
    '300 W 21st St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Delaware Sub Shop', NULL,
    '8105 Mesa Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cedar Park Depot', NULL,
    '401 E. Whitestone, C-100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  );