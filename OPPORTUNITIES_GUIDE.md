# How the New Unified Opportunities System Works

## Overview
Instead of creating separate dashboard pages for each role (Trivia Hosts, DJs, Photographers, Other Creatives), we now have:
- **Single unified opportunities page** at `/opportunities` for all non-band, non-venue roles
- **Role-specific content** that shows what matters for each role
- **Same dashboard** for all roles (except Venues which remain separate)

## Architecture

### Pages
- `/app/opportunities/page.tsx` - Server-side page that:
  - Checks user authentication
  - Verifies user role is eligible (TRIVIA_HOST, DJ, PHOTOGRAPHER, OTHER_CREATIVE)
  - Fetches available venue slots
  - Displays role-specific title and description
  - Renders the OpportunitiesBrowser component

### Components
- `OpportunitiesBrowser.tsx` - Client-side component that:
  - Displays filterable list of opportunities
  - Shows search, genre, city, and date filters
  - Handles application submission
  - Shows modal for composing applications
  - Uses role-specific button labels and field mapping

### Database
- `applications` table now has flexible profile ID fields:
  - `bandProfileId` (nullable, for bands)
  - `triviaHostProfileId` (for trivia hosts)
  - `djProfileId` (for DJs)
  - `photographerProfileId` (for photographers)
  - `otherCreativeProfileId` (for other creatives)

## The User Journey

### For Trivia Hosts
1. Sign up as TRIVIA_HOST
2. Complete trivia host profile
3. Go to dashboard → sees "Edit Trivia Host Profile" + "Browse Opportunities" buttons
4. Clicks "Browse Opportunities" → goes to `/opportunities`
5. Sees page title: "Trivia Host Opportunities"
6. Browses venue slots, can filter by city/genre/date
7. Clicks "Apply to Host" on a slot
8. Submits application with message and optional rate
9. Application stored with `triviaHostProfileId` + `venueSlotId`

### For DJs
1. Sign up as DJ
2. Complete DJ profile
3. Go to dashboard → sees "Edit DJ Profile" + "Find Gigs" buttons
4. Clicks "Find Gigs" → goes to `/opportunities`
5. Sees page title: "DJ Gigs"
6. Browses venue slots, can filter by city/genre/date
7. Clicks "Apply for Gig" on a slot
8. Submits application with message and optional rate
9. Application stored with `djProfileId` + `venueSlotId`

### For Photographers
1. Sign up as PHOTOGRAPHER
2. Complete photographer profile
3. Go to dashboard → sees "Edit Portfolio" + "Find Photo Opportunities" buttons
4. Clicks "Find Photo Opportunities" → goes to `/opportunities`
5. Sees page title: "Photo Opportunities"
6. Browses venue slots, can filter by city/genre/date
7. Clicks "Apply for Event" on a slot
8. Submits application with message and optional rate
9. Application stored with `photographerProfileId` + `venueSlotId`

### For Other Creatives
1. Sign up as OTHER_CREATIVE
2. Complete creative profile
3. Go to dashboard → sees "Edit Profile" + "Find Opportunities" buttons
4. Clicks "Find Opportunities" → goes to `/opportunities`
5. Sees page title: "Creative Opportunities"
6. Browses venue slots, can filter by city/genre/date
7. Clicks "Apply for Opportunity" on a slot
8. Submits application with message and optional rate
9. Application stored with `otherCreativeProfileId` + `venueSlotId`

## Key Features

### Filters
- **Search**: Venue name, event title, description
- **Genre**: Filter by music genre (if applicable)
- **City**: Filter by venue location
- **Date**: Filter by event date

### Application Form
- **Message**: Custom note to the venue (required field)
- **Proposed Fee**: Optional - leave blank to negotiate later
- The app automatically:
  - Gets the user's profile ID based on their role
  - Stores with correct foreign key
  - Sets status to PENDING

### Role-Specific UI
Each role sees:
- Custom page title
- Custom page description
- Custom button label
- Custom search placeholder
- All the same filtering and browsing

## Database Migration Required

Before this works, you need to apply this SQL to your Supabase project:

```sql
ALTER TABLE applications
ADD COLUMN "triviaHostProfileId" TEXT,
ADD COLUMN "djProfileId" TEXT,
ADD COLUMN "photographerProfileId" TEXT,
ADD COLUMN "otherCreativeProfileId" TEXT;

ALTER TABLE applications
ADD CONSTRAINT applications_triviahostprofileid_fkey 
  FOREIGN KEY ("triviaHostProfileId") REFERENCES trivia_host_profiles(id) ON DELETE CASCADE;

ALTER TABLE applications
ADD CONSTRAINT applications_djprofileid_fkey 
  FOREIGN KEY ("djProfileId") REFERENCES dj_profiles(id) ON DELETE CASCADE;

ALTER TABLE applications
ADD CONSTRAINT applications_photographerprofileid_fkey 
  FOREIGN KEY ("photographerProfileId") REFERENCES photographer_profiles(id) ON DELETE CASCADE;

ALTER TABLE applications
ADD CONSTRAINT applications_othercreativeprofileid_fkey 
  FOREIGN KEY ("otherCreativeProfileId") REFERENCES other_creative_profiles(id) ON DELETE CASCADE;

ALTER TABLE applications
ALTER COLUMN "bandProfileId" DROP NOT NULL;
```

## Testing Steps

1. **Create a test Trivia Host account**
   - Sign up, select TRIVIA_HOST role
   - Complete onboarding with all required fields
   - Check that you're redirected to dashboard

2. **Test the opportunities page**
   - Dashboard should show buttons
   - Click "Browse Opportunities"
   - Should see trivia host opportunities page
   - Try filtering by city/genre/date

3. **Test application submission**
   - Click "Apply to Host" button
   - Fill in message (required)
   - Optionally add a rate
   - Click Submit
   - Should see success message

4. **Verify database**
   - Check the applications table
   - Should see entry with:
     - `triviaHostProfileId` populated
     - `bandProfileId` NULL
     - Other profile IDs NULL
     - `venueSlotId` set
     - `status` = 'PENDING'

5. **Repeat for DJ, Photographer, Other Creative**
   - Same process, different role
   - Verify correct profile ID is used each time

## Troubleshooting

**Application submission fails:**
- Check browser console for errors
- Verify user profile exists (not just auth user, but actual profile record)
- Check that migration was applied to database

**Page shows "No opportunities found":**
- Verify venue slots exist and are AVAILABLE
- Check that slot eventDate is >= today
- Try removing all filters

**Wrong page title shows:**
- Check user's role in database
- Verify auth token is current
- Try logging out and back in

## Files Changed

- ✅ `src/app/opportunities/page.tsx` - NEW
- ✅ `src/components/OpportunitiesBrowser.tsx` - NEW
- ✅ `src/app/dashboard/page.tsx` - MODIFIED (quick actions)
- ✅ `prisma/schema.prisma` - MODIFIED (Application model)
- ✅ `supabase/migrations/20251017_add_profile_types_to_applications.sql` - NEW
