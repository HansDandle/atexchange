INSERT INTO public.venue_profiles (
  "id", "userId", "venueName", "description", "address", "city", "state", "zipCode", "capacity", "stageSize",
  "genrePrefs", "hasSound", "hasLighting", "hasParking", "phone", "website", "bookingEmail", "payoutType",
  "payoutDetails", "photos", "createdAt", "updatedAt"
) VALUES
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Rozco’s Comedy Club', NULL,
    '1805 E. 7th Street', 'Austin', 'TX', NULL, NULL, NULL,
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
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Amphitheater at Kingsbury Commons', NULL,
    '1100 Kingsbury Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Primrose School at Vista Ridge', NULL,
    '910 N. Vista Ridge Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cottonwood Creek Brewery', NULL,
    '610 US-79', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Rodolfo "Rudy" Mendez Recreation Center', NULL,
    '2407 Canterbury Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Clint Orms Engravers & Silversmiths', NULL,
    '820 Water St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Thunderdome', NULL,
    '1131 S Loop 4', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '1600 S 1st St', NULL,
    '1600 S 1st St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Saxon Pub (AUS Airport)', NULL,
    '3600 Presedential BLVD', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'River Sun Jazz Club', NULL,
    '1011 Ave B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sternewirth Tavern & Club Room', NULL,
    '136 E Grayson St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bird Creek Brewing', NULL,
    '8 S Fourth St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Long Center for the Performing Arts Rollins Theatre', NULL,
    '701 W. Riverside Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Dr. Todd Knight Rock Rugby Field', NULL,
    '217 Commerce Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Offices at Breaker', NULL,
    '11580 Stonehollow Dr. Suite 160', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Nocturna', NULL,
    '605 W 37th Street Ste. B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Petrol Lounge', NULL,
    '2631 Kramer Ln', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Flourish Plant Shop & Wine Bar', NULL,
    '5003 Airport Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'UT Austin Glickman Center', NULL,
    '305 E. 23rd Street, Room 1.302E', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'THE LOADING DOCK ATX', NULL,
    '6910 Shirley', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Wild Susan Co', NULL,
    '13200 Pond Springs Rd, Suite A105', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ivy''s', NULL,
    '1209 E11th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fortune Teller', NULL,
    '5604 S Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Loudmouth Pizza', NULL,
    '1209 Rosewood Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Blue Genie Art Bazaar', NULL,
    '6100 Airport Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Dog House Drinkery & Dog Park', NULL,
    '3800 Co Rd 175,', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Church at Horseshoe Bay', NULL,
    '600 Hi Ridge Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hive Mind Studios', NULL,
    '4714 Nuckols Crossing Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frances Modern Inn', NULL,
    '1123 E 11TH STREET', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Spokesman Coffee - Pflugerville', NULL,
    '18817 N Heatherwilde Blvd Building 4', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Wanderlust Wine Co. - Shady Lane', NULL,
    '702 Shady Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Women''s Gallery', NULL,
    '2311 Thornton Rd, Unit J + K', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frost Pflugerville Financial Center', NULL,
    '18725 FM 685, Ste. 160', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Texas Farmers'' Market At Bell', NULL,
    '200 South Bell Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brazosport College', NULL,
    '500 College Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'PickleHub', NULL,
    '10630 Menchaca Rd, Austin, TX 78748', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'East End Ballroom', NULL,
    '4715 E 5th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hope Full Farm', NULL,
    '2406 W FITZHUGH RD', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Out Wellness', NULL,
    '211 E Alpine Rd #100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Handmade at Nutty Brown', NULL,
    '12919 Nutty Brown Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Café Crème - Downtown', NULL,
    '710 W Cesar Chavez St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Trinkets South Austin Craft Social', NULL,
    '6218 Brodie Ln', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'East Side Performing Arts', NULL,
    '979 Springdale Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Que Divino Cocina Mexicana', NULL,
    '3435 Greystone Drive Ste 112', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Impact Apparel', NULL,
    '3000 S. I-35 Frontage Road, Suite 175', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'New Nature''s Treasures Event Center', NULL,
    '11055 North Interstate Highway 35', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lo-Fi Coffee House & Studio', NULL,
    '109 A Central Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Chalmers Bar', NULL,
    '1700 E Cesar Chavez St, Austin, TX 78702', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'BATHE', NULL,
    '2922 E Cesar Chavez St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'EastVillage', NULL,
    '3500 E Parmer Lne', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Terry''s Hi-Fi Kissa', NULL,
    '4926 E Cesar Chavez St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Kitchen American Bistro', NULL,
    '100 W 6th St Suite 100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'High 5 Entertainment', NULL,
    '2700 West Anderson Lane #UNIT 101', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Radio Rosewood', NULL,
    '1115 East 11th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bricks & Minifigs South Austin', NULL,
    '5207 Brodie Ln Suite 130', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Haha Hidalgo', NULL,
    '2511 Hidalgo St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'T.H.C Dispensary & Lounge', NULL,
    '440 E St Elmo Rd Ste B1', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Crow Bar / The Raven Room', NULL,
    '523 Thompson Ln', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ceramigos', NULL,
    '4930 S CONGRESS AVE, SUITE C-301', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brew And Brew', NULL,
    '500 San Marcos Street #105', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Bike Tours & Rentals', NULL,
    '1710 East Second Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'OutWellnessATX', NULL,
    '211 E Alpine Rd #100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'VFW Post 4443', NULL,
    '7614 Thomas Springs Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Wedding Oak Winery (Burnet)', NULL,
    '229 S. Pierce', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '1106 Clayton Lane', NULL,
    '1106 Clayton Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pikopye''s Town Lakeway', NULL,
    '1607 Ranch Road 620 N', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Propaganda HQ', NULL,
    '625 Industrial Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Refuge Coffe & Beer Garden', NULL,
    '11011 Shaenfield Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Strings in the Woods - Spyglass', NULL,
    '1500 Spyglass Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'House Of Eberstein', NULL,
    '1501 S Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pickleland - Indoor Pickleball Austin', NULL,
    '21427 Martin Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Pickle Ranch (Braker)', NULL,
    '11000 Middle Fiskville Road, Building B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Tony C''s Pizza & Beer Garden Kyle', NULL,
    '2344 Kohlers Crossing', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Oak Hill Social', NULL,
    '8600 Highway 290 W', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Jupiter Supper Club', NULL,
    '718 Congress Ave., Austin, TX 78701', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'South Corner Park', NULL,
    '207 E Monroe', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lake Travis Community Library West', NULL,
    '21209 State Hwy 71 W', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ARTSPACE Wimberley', NULL,
    '111 River Rd #100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Mesmerize', NULL,
    '820 Shelby Ln. STE #106', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ocean Wav Studios', NULL,
    '906 East 5th St #101', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Azure Lounge', NULL,
    '12530 Research Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Stargazer', NULL,
    '979 Springdale Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Jackelope South', NULL,
    '1523 Tinnin Ford Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Chez Zee Gallery', NULL,
    '5406 Balcones Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Church of Jesus Christ of Latter-day Saints Heatherwilde Building', NULL,
    '700 N. Heatherwilde Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Interlaced Studio', NULL,
    '5446 US-290 #103', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ColdTowne Cabaret', NULL,
    '1700 East 2nd St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Serenade American Brasserie', NULL,
    '200 Lavaca Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hummingbird Concerts', NULL,
    '144 Sunny Oaks Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'GreenSprout Hub', NULL,
    '14735 Fitzhugh Road Bld A', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Main Street Yoga Bastrop', NULL,
    '918 Main Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Center for Child Protection', NULL,
    '8509 FM 969, Bldg 2', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '506 Congress Ave', NULL,
    '506 Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Birdhouse Books and Gifts', NULL,
    '5925 Burnet Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin City Limits Live (ACL Live and 3TEN ACL Live)', NULL,
    '310 West Willie Nelson Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Ecstatic Dance Center', NULL,
    '10203 Old Manchaca Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Steam Train Association', NULL,
    '401 E. Whitestone Blvd., Ste C-100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Texas Capitol', NULL,
    '1100 Congress Avenue', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hyperreal Film Club', NULL,
    '301 Chicon Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frost Bank Georgetown North Financial Center', NULL,
    '4720 Williams Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Fieldhouse at the Crossover', NULL,
    '1717 Scottsdale Drive #Suite 160', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'St. Elmo Brewing- Springdale', NULL,
    '8110 Springdale Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cabana Club', NULL,
    '5012 E 7th right by Shady Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'High Rise Comedy', NULL,
    '106 East 6th Street, #9th Floor', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Game Kastle Austin', NULL,
    '3407 Wells Branch Parkway', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Holey Moley Golf Club', NULL,
    '807 E 4th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'MARLOW BAR', NULL,
    '700 E 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frost Bank Northwest Hills Financial Center', NULL,
    '5800 N Mopac', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pizzeria Sportiva', NULL,
    '1500 S Lamar Blvd Ste 120', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'East Austin Comedy Club', NULL,
    '2505 East 6th St. Suite D', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Yarrow & Sage - South', NULL,
    '1201 W Slaughter LN', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Package Austin', NULL,
    '2008 S. 1st St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sterling Stage Austin', NULL,
    '6134 E Us 290 Service Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Stardust Wellness', NULL,
    '7801 N Lamar Blvd, Suite D77', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'IREP Resale Austin', NULL,
    '7601 South Congress Ave #550A', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Marble Falls Public Library', NULL,
    '101 Main Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Festival Beach Food Forest', NULL,
    '29 waller street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Long Goodbye', NULL,
    '2806 Manor Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cosmic Coffee + Beer Garden - East', NULL,
    '1300 E. 4TH STREET', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin City Limits Live (ACL Live)', NULL,
    '310 West Willie Nelson Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Drifters Social Coffee & Cocktail', NULL,
    '10630 Menchaca Rd Bldg A', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Palm Pizza', NULL,
    '1701 East Cesar Chavez Street Ste B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ATX Unplugged', NULL,
    '205 E Monroe', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'the Tiny Minotaur Tavern', NULL,
    '2701 E. Cesar Chavez', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Rosa Pottery', NULL,
    '8711 Burnet Rd Ste F65', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Beerworks Sprinkle Valley', NULL,
    '10300 Springdale Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Impact Martial Arts (North)', NULL,
    '13376 N Hwy 183, Suite 503', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Violet Crown Coffee + Wine Bar', NULL,
    '7100 Woodrow Ave ste 100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Dirdie Birdie', NULL,
    '10910 Domain Dr. #120', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Harmony School of Endeavor', NULL,
    '13415 FM 620 N.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Menchaca Road Branch', NULL,
    '5500 Menchaca Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Rollins Theatre at The Long Center', NULL,
    '701 W. Riverside Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frost Bank Stassney Financial Center', NULL,
    '5510 South I35', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Drinks Backyard', NULL,
    '6328 South US-183 Highway, Pilot Knobs Acres', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Art Garage Brentwood', NULL,
    '5501 North Lamar, Suite A-225', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Regal Rooms', NULL,
    '1204 Regal Row', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '3rd Level Brewing', NULL,
    '1201 East Palm Valley Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bastrop Museum & Visitor Center', NULL,
    '904 Main Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Future Front Texas', NULL,
    '1900 E 12th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Meridian', NULL,
    '200 Main St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Black Rabbit ATX', NULL,
    '411 Brazos Street Suite 100B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kelly''s Irish Pub', NULL,
    '519 W Oltorf St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Duetts Texas Club', NULL,
    '420 Main St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Big Country Organic Brewing Co.', NULL,
    '2400 Patterson Industrial Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Double Trouble', NULL,
    '103 N Loop Blvd E', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fast Friends Beer Co.', NULL,
    '7313 S IH 35 Service Road NB', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Austin Eagle', NULL,
    '8201 Cross Park Dr Ste B2', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Love Wheel Records', NULL,
    '2105 Justin Ln', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Make at Rosie', NULL,
    '8711 Burnet Rd suite B30', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Castle Hill Fitness', NULL,
    '1112 N Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ice & Field at The Crossover', NULL,
    '1717 Scottsdale Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Unchained.Art Contemporary Gallery', NULL,
    '311 W. 7th Street, Unit 307', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Nomadic Outpost', NULL,
    '3505 Country White Ln', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'St. Andrew''s Dell Fine Arts Center', NULL,
    '5901 Southwest Parkway', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Swift Fit Events', NULL,
    '918 Congress Ave. STE 100, Austin, TX 78701', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '9700 Stonelake Boulevard', NULL,
    '9700 Stonelake Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kreische Brewery & Monument Hill State Historic Sites', NULL,
    '414 TX-92 Spur', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bolm Arts Gallery', NULL,
    '5305 Bolm Road, Bay 9', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Broad Studios Club House', NULL,
    '727 Airport Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Comedy Mothership', NULL,
    '320 E 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'TexPopATX', NULL,
    '1516 S Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Courtyard ATX', NULL,
    '208 W 4th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The 13th Floor', NULL,
    '711 Red River St, Austin, TX', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Feats of Clay Pottery', NULL,
    '806 McPhaul St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Vintage Bookstore and Wine Bar', NULL,
    '1101 E 11th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hotel Viata', NULL,
    '320 S. Capital of Texas Hwy, Bldg. B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Camp Mabry Parade Ground', NULL,
    'Fairview Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hanovers Draught Haus (Pflugerville)', NULL,
    '108 Main Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Tweedy''s Bar', NULL,
    '2908 Fruth St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Factory on 5th', NULL,
    '3409 E 5th St.,', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Dogwood (Sixth Street)', NULL,
    '715 W 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Armstrong Community Music School', NULL,
    '404 Camp Craft Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '7311 Decker Ln', NULL,
    '7311 Decker Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'House of Margot Blair', NULL,
    '1512 West 35th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'East Austin Comedy', NULL,
    '2505 East 6th St., Suite D', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pinthouse Brewing', NULL,
    '2201 E Ben White Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Strings in the Woods South', NULL,
    'Decker Prarie', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Maie Day', NULL,
    '1603 South Congress Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Prete Plaza', NULL,
    '221 East Main Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Anchor Bar Round Rock', NULL,
    '2702 Parker Dr Ste B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Waterloo Park', NULL,
    '500 E 12th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Blue Suede', NULL,
    '1600 S. First St., Ste, 120', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Crux Climbing Center (Central)', NULL,
    '6015 DILLARD CIRCLE UNIT B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Thicket Food Park', NULL,
    '7800 South 1st Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Rosette Theatre', NULL,
    '3908 Avenue B Suite 116', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kingsbury Commons', NULL,
    '1100 Kingsbury Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sunset Strip Comedy Club', NULL,
    '214 E. 6th St. Unit C', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Slackers Brewing Co.', NULL,
    '12233 N FM 620 #204', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '29th Street Ballroom', NULL,
    '2906 Fruth St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Gnar Bar', NULL,
    '219 E 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Vulcan Gas Company', NULL,
    '418 E. 6th st', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Neighbors Dog Park', NULL,
    '5609 S Congress Ave. 220', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ani''s Day & Night', NULL,
    '7107 E Riverside Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Reverie Books', NULL,
    '5330 Menchaca Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Neon Grotto', NULL,
    '318 Colorado St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Concourse Project', NULL,
    '8509 Burleson Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Tony C''s Pizza & Beer Garden Anderson Lane', NULL,
    '2900 W Anderson Ln., Bldg B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Tony C''s Pizza & Beer Garden Round Rock', NULL,
    '3800 East Palm Valley Blvd., Suite 140', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Soundspace at Captain Quack''s', NULL,
    '5326 menchaca road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Vacancy Brewing', NULL,
    '415 E St Elmo Road 1-D2', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Creek and the Cave', NULL,
    '611 E 7th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Chambers Theatre at Inspired Minds Art Center', NULL,
    '121 Main St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lydia Street Gallery', NULL,
    '1200 E 11th St. #109', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Ruby Hotel & Bar', NULL,
    '400 Fannin Avenue', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Armadillo Den', NULL,
    '10106 Manchaca Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Meanwhile Brewing', NULL,
    '3901 Promontory Point Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frost Bank Lake Travis Financial Center', NULL,
    '12532 FM 2244 Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Easy Tiger (S. Lamar)', NULL,
    '3508 S Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'High Noon', NULL,
    '2000 East Cesar Chavez', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Low Down Lounge', NULL,
    '1412 East 6th', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Marriott Downtown', NULL,
    '304 East Cesar Chavez St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Zoom', NULL,
    'virtual', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sagebrush', NULL,
    '5500 S Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'TIGER DEN', NULL,
    '1303 E. 4th st', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Lucky Duck', NULL,
    '1300 East 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Rosewood Catherine Lampkin Pavilion', NULL,
    'N Pleasant Valley Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Third Place', NULL,
    '7900 Tisdale Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'RudeMechs Crashbox', NULL,
    '5305 Bolm Rd. #12, Austin, TX', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'TenTen', NULL,
    '501 W 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Acre 41', NULL,
    '1901 San Antonio St. Unit 130', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bouldin Acres', NULL,
    '2027 S Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Otopia Rooftop', NULL,
    '1901 San Antonio Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Shuniya Yoga Collective LLC', NULL,
    '1708 Houston St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Punch Bowl Social - Congress', NULL,
    '522 Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Coconut Club', NULL,
    '310 Colorado Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Blind Salamander Kitchen & Bar', NULL,
    '8212 Barton Club Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'dadaLab', NULL,
    '2008 Alexander Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Distribution Hall', NULL,
    '1500 East 4th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Casa de Luz Village', NULL,
    '1701 Toomey Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Letterpress PLAY', NULL,
    '2300 South Lamar Blvd. #108', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Union at Easton Park', NULL,
    '7604 Solari Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hopsquad Brewing Co.', NULL,
    '2307 Kramer Ln', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Inn Cahoots', NULL,
    '1221 E 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Health Learning Building', NULL,
    '1501 Red River Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'East Austin Hotel', NULL,
    '1108 East Sixth Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Village Farm Tiny Home Community', NULL,
    '8207 Canoga Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Far Out Lounge & Stage', NULL,
    '8504 South Congress', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Iron Wolf Ranch & Distillery', NULL,
    '101 Co Rd 409', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '1600A Virginia Ave', NULL,
    '1600A Virginia Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Davis White Northeast District Park', NULL,
    '6705 Crystalbrook Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Commune', NULL,
    '101 E North Loop Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Nomadic Beerworks', NULL,
    '3804 Woodbury Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Uroko', NULL,
    '1023 Springdale Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Oven', NULL,
    '6910 Shirley Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Steam Train - Bertram Depot', NULL,
    '170 S. Gabriel St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Comanche Park', NULL,
    '2600 Rigsby Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Industry Eastside', NULL,
    '1211 E 5th Suite 150', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Courtyard by Marriott Austin Pflugerville', NULL,
    '16100 Impact Way', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Easy Tiger (The Linc)', NULL,
    '6406 N. IH-35 Ste. 1100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Central Machine Works Brewery & Beer Hall', NULL,
    '4824 East Cesar Chavez Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ace of Cups - Massage and Wellness', NULL,
    '2121 E Cesar Chavez', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Twisted Texas Tour', NULL,
    '103 E 5th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'YMCA of Austin: Camp Moody', NULL,
    '1220 Old San Antonio Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Redeemer Presbyterian Church', NULL,
    '2111 Alexander Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Texas Farmers'' Market at Mueller', NULL,
    '4209 Airport Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Round Rock Amp', NULL,
    '3701 N IH 35', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Azul Rooftop Pool and Bar Lounge', NULL,
    '310 E 5th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Mill Bar & Grill', NULL,
    '9112 Anderson Mill', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The LINE Hotel Austin', NULL,
    '111 East Cesar Chavez', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Long Time', NULL,
    '5707 Dunlap Rd N', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Parker Jazz Club', NULL,
    '117 West 4th Street Suite 107B', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Desert Door Distillery', NULL,
    '211 Darden Hill Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ToddPilates & Barre (North)', NULL,
    '9029 Research Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bee Cave Public Library', NULL,
    '4000 Galleria Pkwy', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hold Out Brewing', NULL,
    '1208 West 4th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Springdale General', NULL,
    '1023 Springdale Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'LZR', NULL,
    '612 W. 4th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cosmic Coffee + Beer Garden', NULL,
    '121 Pickle Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Frontyard Brewing', NULL,
    '4514 Bob Wire Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Brewtorium Brewery & Kitchen', NULL,
    '6015 Dillard Cir', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sweet Eats Fruit Farm', NULL,
    '14400 E. State Highway 29', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Edge Rooftop Pool & Bar', NULL,
    '110 E. 2nd St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Upstairs at Caroline', NULL,
    '621 Congress Ave Suite 201', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Hive', NULL,
    '10542 Manchaca Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Civil Goat Coffee', NULL,
    '704 North Cuernavaca Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Vista Brewing', NULL,
    '13551 FM 150', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lazarus Brewing Co.', NULL,
    '1902 E 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kinda Tropical', NULL,
    '3501 East 7th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Corazon Latino', NULL,
    '6132 W US Hwy 290 Service Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fairmont Austin', NULL,
    '101 Red River Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Oddwood Ales Brewery', NULL,
    '3108 Manor Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Central Library', NULL,
    '710 W. Cesar Chavez St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Krause''s Cafe & Biergarten', NULL,
    '148 S Castell Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fareground', NULL,
    '111 Congress Avenue', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Monks Jazz Club', NULL,
    '501 Pedernales Street, Suite 2E', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Barrel O''Fun', NULL,
    '1911 Aldrich St. Suite 120', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Alamo Drafthouse Mueller', NULL,
    '1911 Aldrich Street, Suite 120', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Buck''s Backyard', NULL,
    '1750 S Farm to Market 1626', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hudson''s On Mercer', NULL,
    '381 WEST MERCER', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cooper''s Old Time Pit BBQ Austin', NULL,
    '217 Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Il Brutto', NULL,
    '1601 E. 6th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'LBJ Auditorium - The University of Texas at Austin', NULL,
    '2313 Red River St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brentwood Social House', NULL,
    '1601 West Koenig Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Community First! Village', NULL,
    '9301 Hog Eye Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Jackalope (South Shore)', NULL,
    '1523 Tinnin Ford Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'St. Elmo Brewing Co.', NULL,
    '440 E St. Elmo Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cannon + Belle', NULL,
    '500 E. 4th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Shady Springs Party Barn', NULL,
    '9401 Sherman Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Batch Craft Beer & Kolaches', NULL,
    '3220 Manor Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'San Jac Saloon', NULL,
    '300 E. 6th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pershing Hall', NULL,
    '2415 E 5th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pinballz Lake Creek', NULL,
    '13729 Research Blvd, Austin, TX 78750', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sessions on Mary', NULL,
    '604 W Mary St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'L''Oca d''Oro', NULL,
    '1900 Simond Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ToddPilates & Barre South Austin', NULL,
    '4032 S Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Revival Vintage (ATX)', NULL,
    '100 North Loop', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kitty Cohen''s', NULL,
    '2211 Webberville Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Come and Take It Live', NULL,
    '2015 E. Riverside Dr. Bldg 4', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '800 Congress', NULL,
    '800 Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '3TEN', NULL,
    '310 Willie Nelson Blvd, Suite 1A', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Welch Hall (UT-Austin campus)', NULL,
    '105 E 24th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Church of Jesus Christ of Latter-day Saints', NULL,
    '700 N Heatherwilde', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Geraldine''s Austin', NULL,
    '605 Davis St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Guadalupe Brewing Company', NULL,
    '103 Gattuso Rd #110 (1580 Wald Rd)', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pinthouse Pizza (South Lamar)', NULL,
    '4236 S Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ballet Austin''s Butler Center for Dance & Fitness', NULL,
    '501 W. 3rd St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Inner Space Cavern', NULL,
    '4200 S. I-35 Frontage Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Coco Coquette', NULL,
    '2109 E Cesar Chavez', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Golden Goose', NULL,
    '2034 S. Lamar Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'First Unitarian Church', NULL,
    '4700 Grover Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Four Seasons Hotel Austin', NULL,
    '98 San Jacinto Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Science Mill', NULL,
    '101 S. Ladybird Ln.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lustre Pearl East', NULL,
    '114 Linden Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Con Olio Oils & Vinegars (Bee Caves)', NULL,
    '12918 Shops Parkway  #550', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Alma Thomas Theater', NULL,
    '1001 E. University Ave. Southwestern University', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Aristocrat Lounge', NULL,
    '6507 Burnet Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bullock Texas State History Museum', NULL,
    '1800 Congress Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'C-Boy''s Heart & Soul Bar', NULL,
    '2008 S Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pinballz Kingdom', NULL,
    '15201 S IH 35', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'KMFA Studios', NULL,
    '41 Navasota St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'TexARTS', NULL,
    '1110 S RR 620', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hillcrest Church', NULL,
    '3838 Steck Avenue', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Highland Lounge', NULL,
    '404 Colorado Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Whole Earth Provision Co. (Westgate)', NULL,
    '4477 S. Lamar', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'PURE Yoga Texas (Downtown)', NULL,
    '507 Pressler St. #100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Gus Garcia Recreation Center', NULL,
    '1201 East Rundberg Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fallout Theater', NULL,
    '616 Lavaca St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Punch Bowl Social - Domain', NULL,
    '11310 Domain Dr. Suite 100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Contemporary Austin — Jones Center', NULL,
    '700 Congress Avenuue', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Continental Club Gallery', NULL,
    '1315 South Congress Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Blue Owl Brewing', NULL,
    '2400 East Cesar Chavez #300', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Contemporary Austin — Laguna Gloria', NULL,
    '3809 West 35th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Southwest Theaters', NULL,
    '13729 Research Blvd, Suite 1500', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Butler School of Music', NULL,
    '2406 Robert Dedman Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fair Market', NULL,
    '1100 EAST 5TH STREET', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Radio Coffee & Beer', NULL,
    '4204 Manchaca Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Beachside Billy''s + Volente Beach', NULL,
    '16107 Farm to Market Road 2769', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Waldorf School', NULL,
    '8700 South View Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ann Richards School for Young Women Leaders', NULL,
    '2206 Prather Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Remedy', NULL,
    '360 Nueces St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Half Step', NULL,
    '75 1/2 Rainey St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Georgetown Art Center', NULL,
    '816 S Main St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lone Star Court', NULL,
    '10901 Domain Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Voodoo Room', NULL,
    '419 E. 6th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Thinkery', NULL,
    '1830 Simond Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lit Lounge', NULL,
    '215 East 6th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The ABGB', NULL,
    '1305 West Oltorf', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Toybrary Austin', NULL,
    '2001 Justin Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Canopy', NULL,
    '916 Springdale Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Riverbend Church', NULL,
    '4214 Capital of Texas Hwy North', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'House Park', NULL,
    '1301 Shoal Creek Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Trinity Street Playhouse', NULL,
    '901 Trinity Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Germania Insurance Amphitheater', NULL,
    '9201 Circuit of the Americas Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Girlstart STEM Center', NULL,
    '1400 W. Anderson Ln.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bungalow', NULL,
    '83 Rainey St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lake Travis High School Performing Arts Center', NULL,
    '3322 South Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lake Travis Community Library', NULL,
    '1938 Lohmans Crossing', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Downtown Round Rock', NULL,
    '221 E. Main St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Oilcan Harry''s', NULL,
    '211 West 4th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kerbey Lane Cafe', NULL,
    '3704 Kerbey Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lake Pflugerville Park', NULL,
    '18216 Weiss Lane', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Steiner Ranch Steakhouse', NULL,
    '5424 Steiner Ranch Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Little Walnut Creek Branch', NULL,
    '835 W. Rundberg Ln.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Hideout Theatre', NULL,
    '617 Congress Ave.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sky Candy', NULL,
    '1023 Springdale Rd #8A', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ben Hur Shrine Temple', NULL,
    '7811 Rockwood Ln.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'First United Methodist Church, Round Rock', NULL,
    '1004 North Mays', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Chateau Bellevue', NULL,
    '708 San Antonio', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Castle Hill Yoga', NULL,
    '1112 North Lamar Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Art Garage Oak Hill', NULL,
    '11190 Circle Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Roller Rink', NULL,
    '11600 Manchaca Road #101', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hillside Farmacy', NULL,
    '1209 East 11th street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', '37th Street', NULL,
    '37th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The White Horse', NULL,
    '500 Comal St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'St. John''s United Methodist Church', NULL,
    '2140 Allandale Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Commodore Perry Estate', NULL,
    '4100 Red River Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brass Ovaries Pole Dancing', NULL,
    '6039 N Interstate Highway 35', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Barton Creek Farmers Market', NULL,
    '2901 S Capital of Texas Hwy', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sahara Lounge', NULL,
    '1413 Webberville Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Lost Well', NULL,
    '2421 Webberville Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Phil''s Icehouse', NULL,
    '5620 Burnet Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Windsor Park Branch', NULL,
    '5833 Westminster Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kingdom Austin', NULL,
    '505 E. 7th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'LBJ Presidential Library', NULL,
    '2313 Red River St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Iron Bear', NULL,
    '301 W 6th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Mansion (TFWC)', NULL,
    '2312 San Gabriel St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Jester King Brewery', NULL,
    '13187 Fitzhugh Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Wolf Ranch Town Center', NULL,
    '1015 W. University Ave. Ste. 601', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library University Hills Branch', NULL,
    '4721 Loyola Ln.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Milwood Branch', NULL,
    '12500 Amherst Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Old Settlers Park', NULL,
    '3300 Palm Valley Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Scottish Rite Theater', NULL,
    '207 West 18th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Neill-Cochran House Museum', NULL,
    '2310 San Gabriel Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'AFS Cinema', NULL,
    '6259 Middle Fiskville Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Antone''s Record Shop', NULL,
    '2928 Guadalupe St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Historic Downtown Bastrop', NULL,
    'Main St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Valhalla', NULL,
    '710 Red River', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Opa! Coffee & Wine Bar', NULL,
    '2050 South Lamar Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Carver Branch', NULL,
    '1161 Angelina St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Star Hill Ranch', NULL,
    '15000 Hamilton Pool Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Painting With a Twist', NULL,
    '8820 Burnet Rd. Suite 507', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'St. Andrew''s Presbyterian Church', NULL,
    '14311 Wells Port Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Justine''s Brasserie', NULL,
    '4710 East 5th', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'German Texan Heritage Society', NULL,
    '507 E. 10th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Walnut Creek Metropolitan Park', NULL,
    '12138 N Lamar Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'San Gabriel Park', NULL,
    '445 E Morrow St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin City Hall', NULL,
    '301 W. Second St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'H-E-B Center at Cedar Park', NULL,
    '2100 Avenue of the Stars', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Waterloo Ice House Burnet Rd.', NULL,
    '8600 Burnet Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Doc''s Backyard', NULL,
    '5207 Brodie Lane, Ste. 100', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'George Washington Carver Museum and Cultural Center', NULL,
    '1165 Angelina St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Brentwood Christian School', NULL,
    '11908 N. Lamar', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Spicewood Springs', NULL,
    '8637 Spicewood Springs Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Barton Springs Saloon', NULL,
    '424 South Lamar', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Dougherty Arts Center', NULL,
    '1110 Barton Springs Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Purple Bee Studios', NULL,
    '8117 Lime Creek Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Knomad Bar', NULL,
    '1213 Corona Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Asian American Resource Center', NULL,
    '8401 Cameron Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Mozart''s Coffee Roasters', NULL,
    '3825 Lake Austin Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Chez Zee', NULL,
    '5406 Balcones Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kick Butt Coffee Music & Booze', NULL,
    '5775 Airport Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Esquina Tango', NULL,
    '209 Pedernales St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Green Mesquite BBQ', NULL,
    '1400 Barton Springs Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Manuel''s Great Hills', NULL,
    '10201 Jollyville Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Public Library Terrazas Branch', NULL,
    '1105 E. Cesar Chavez St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Uptown Dance', NULL,
    '8868 Research Blvd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cedar Park High School', NULL,
    '2150 Cypress Creek Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hilton Austin Downtown', NULL,
    '500 E. 4th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'GSD&M', NULL,
    '828 W 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Tiniest Bar in Texas', NULL,
    '817 W. 5th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Elephant Room', NULL,
    '315 Congress Ave', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Round Rock Library', NULL,
    '216 E. Main Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'First Austin', NULL,
    '901 Trinity St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pfluger Pedestrian Bridge', NULL,
    'S Lamar Blvd & W Riverside Dr.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Northwest Hills United Methodist Church', NULL,
    '7050 Village Center Dr', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Kenny Dorham''s Backyard', NULL,
    '1106 E. 11th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Toney Burger Center', NULL,
    '3200 Jones Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'BookWoman', NULL,
    '5501 North Lamar #A-105', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Guero''s Taco Bar', NULL,
    '1412 South Congress', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hotel San Jose', NULL,
    '1316 South Congress', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Downtown Austin', NULL,
    'Congress Ave & 6th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Central Presbyterian Church', NULL,
    '200 E. 8th St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Saengerrunde', NULL,
    '1607 San Jacinto Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Vortex', NULL,
    '2307 Manor Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Lady Bird Johnson Wildflower Center', NULL,
    '4801 La Crosse Avenue', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pins & Wheels At Playland', NULL,
    '8822 McCann Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Home Slice', NULL,
    '1415 South Congress', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Umlauf Sculpture Garden & Museum', NULL,
    '605 Azie Morton Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin Playhouse', NULL,
    'P.O. Box 50533', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Zach Theater', NULL,
    '1510 Toomey Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'B. Iden Payne Theatre', NULL,
    '200 E. 23rd St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Blanton Museum of Art', NULL,
    'MLK at Congress', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'McCullough Theatre', NULL,
    '2375 Robert Dedman Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Oscar G. Brockett Theatre', NULL,
    '23rd and Robert Dedman', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'ColdTowne Theater', NULL,
    '1700 East 2nd Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Parque Zaragoza Recreation Center', NULL,
    '2608 Gonzales St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Palmer Events Center', NULL,
    '900 Barton Springs Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Luckenbach, TX', NULL,
    '412 Luckenbach Town Loop', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Velveeta Room', NULL,
    '521 E Sixth St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ao5 Gallery', NULL,
    '10000 Research Boulevard -Unit #118', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Cedar Door', NULL,
    '201 Brazos St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Warehouse Billiard Bar', NULL,
    '509 E. Ben White Blvd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'El Mercado South', NULL,
    '1302 S 1st St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Cheers Shot Bar', NULL,
    '416 E. 6th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hogg Memorial Auditorium', NULL,
    'Guadaulupe and 24th ST', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'RAIN on 4th', NULL,
    '217 West 4th Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Republic Square', NULL,
    '422 Guadalupe St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Austin City Hall Plaza', NULL,
    '301 W. Second Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'It''s Italian Cucina', NULL,
    '1500 South Lamar Boulevard ste 110', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Riverbend Centre', NULL,
    '4214 Capital of TX Hwy. N.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Sam''s Town Point', NULL,
    '2115 Allred', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Zilker Park', NULL,
    '2100 Barton Springs Rd.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Casa De Luz', NULL,
    '1701 Toomey', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Gruene Hall', NULL,
    '1281 Gruene Rd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Carousel Lounge', NULL,
    '1110 E. 52nd', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'French Legation State Historic Site', NULL,
    '802 San Marcos St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Fiesta Gardens', NULL,
    '2101 Jesse E Segovia St.', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Halcyon', NULL,
    '218 W. Fourth', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Shakespeare''s Pub', NULL,
    '314 E 6th', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Pease Park', NULL,
    '1100 Kingsbury Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hyde Park Theatre', NULL,
    '511 W. 43rd Street', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bates Recital Hall', NULL,
    '2350 Robert Dedman', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Tomblin House', NULL,
    '600 Davis Ranch Road', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'The Loom Creative', NULL,
    '376 Colorado Drive', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Ensemble Learning Center', NULL,
    '4210 Spicewood Springs, Suite 203', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Bonfire Yoga Studios', NULL,
    '16614 Hamilton Pool Rd Suite 302', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Swim Club', NULL,
    '650 E 10th St', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  ),
  (
    gen_random_uuid()::text, 'de531ab1-f942-4791-9f63-e27ac970d40e', 'Hattie B''s Hot Chicken', NULL,
    '2529 South Lamar Boulevard', 'Austin', 'TX', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, now(), now()
  );
