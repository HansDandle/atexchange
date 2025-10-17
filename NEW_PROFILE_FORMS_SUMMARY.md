# New Role Onboarding Forms - Implementation Summary

## Overview

Four new onboarding forms have been created for the new talent types (DJ, Trivia Host, Photographer, Other Creative). These forms follow the same multi-step pattern as the existing Band and Venue forms.

## Files Created

### 1. DJ Onboarding Form (`src/components/forms/DJOnboardingForm.tsx`)

**Purpose**: Enables DJs to create a complete profile with music preferences, social media links, and equipment details.

**Features**:
- 4-step form process
- Step 1: Basic info (DJ name, bio, experience, location)
- Step 2: Genre specialization selector (17+ genres including House, Techno, Hip-Hop, etc.)
- Step 3: Social media & links (MixCloud, Spotify, SoundCloud, Instagram, website, phone)
- Step 4: Pricing & equipment (min/max fees, equipment details, photo uploads)
- File uploads to Supabase `djs` bucket

**Database Integration**:
- Saves to `dj_profiles` table
- Creates one-to-one relationship with User model
- Stores: djName, bio, specialization[], experience, photos[], website, social URLs, phone, location, minFee, maxFee, equipment

**Form Validation**:
- Step 1: Name and bio required
- Step 2: At least one genre must be selected
- Steps 3-4: All fields optional (encouraged but not required)

### 2. Trivia Host Onboarding Form (`src/components/forms/TriviaHostOnboardingForm.tsx`)

**Purpose**: Enables trivia hosts to create a profile with their hosting specialty and event details.

**Features**:
- 3-step form process
- Step 1: Basic info (host name, bio, specialization, experience)
- Step 2: Contact info (location, phone, website)
- Step 3: Pricing & photos (rates description, photo uploads)
- File uploads to Supabase `trivia_hosts` bucket

**Database Integration**:
- Saves to `trivia_host_profiles` table
- Stores: hostName, bio, specialization, experience, location, website, phone, rates, photos[]

### 3. Photographer Onboarding Form (`src/components/forms/PhotographerOnboardingForm.tsx`)

**Purpose**: Enables photographers to showcase their portfolio and services.

**Features**:
- 4-step form process
- Step 1: Basic info (photographer name, bio, experience)
- Step 2: Specialization selector (13+ types: Weddings, Events, Portraits, Product, etc.)
- Step 3: Contact info (location, phone, website, Instagram)
- Step 4: Pricing & portfolio (rates description, portfolio photo uploads)
- File uploads to Supabase `photographers` bucket

**Database Integration**:
- Saves to `photographer_profiles` table
- Stores: photographerName, bio, specialization[], experience, portfolioPhotos[], website, instagramUrl, phone, location, rates

### 4. Other Creative Onboarding Form (`src/components/forms/OtherCreativeOnboardingForm.tsx`)

**Purpose**: Flexible form for artists, comedians, magicians, painters, and other creative professionals.

**Features**:
- 3-step form process
- Step 1: Creative type (comedian, poet, magician, artist, painter, etc.), name, bio, specialization, experience
- Step 2: Contact info (location, phone, website)
- Step 3: Pricing & portfolio (rates description, portfolio file uploads)
- File uploads to Supabase `other_creatives` bucket
- Supports any file type (not just images)

**Database Integration**:
- Saves to `other_creative_profiles` table
- Stores: creativeName, bio, creativeType, specialization, experience, portfolio[], website, phone, location, rates

## Updated Files

### `src/app/onboarding/page.tsx`

**Changes**:
- Added imports for 4 new form components
- Enhanced role-specific welcome message with appropriate descriptions for each role type
- Updated conditional rendering to display the correct form based on user role:
  - `BAND` → BandOnboardingForm
  - `VENUE` → VenueOnboardingForm
  - `DJ` → DJOnboardingForm
  - `TRIVIA_HOST` → TriviaHostOnboardingForm
  - `PHOTOGRAPHER` → PhotographerOnboardingForm
  - `OTHER_CREATIVE` → OtherCreativeOnboardingForm
- Updated no-role message to "Please select a profile type to continue."

## Key Features Across All Forms

### 1. Multi-Step Process
- Progress bar showing completion percentage
- Previous/Next navigation buttons
- Step-by-step validation (can't proceed to next step until current step is complete)

### 2. File Uploads
- Integrates with Supabase Storage
- Each form uploads to its dedicated bucket
- Generates public URLs for uploaded files
- Displays uploaded images/files in the form

### 3. Form Submission
- Saves profile data to appropriate database table
- Updates user metadata with role (if not already set)
- Redirects to `/dashboard` on success
- Shows error messages on failure

### 4. User Experience
- Austin Talent Exchange branding (colors: austin-orange, austin-charcoal)
- Responsive design with tailwind CSS
- Loading states during upload and submission
- Disabled buttons during operations
- Empty field validation per step

## Database Integration

All new forms integrate with the existing Prisma schema:
- `dj_profiles` table with one-to-one relationship from User
- `trivia_host_profiles` table with one-to-one relationship from User
- `photographer_profiles` table with one-to-one relationship from User
- `other_creative_profiles` table with one-to-one relationship from User

**Foreign Key Setup**:
- Each profile has `userId @unique` field
- CASCADE delete: deleting a user cascades to delete their profile
- createdAt and updatedAt timestamps on all profiles

## Required Setup

### 1. Supabase Storage Buckets

The following public buckets must be created in Supabase:
- `djs` - For DJ photos
- `trivia_hosts` - For trivia host photos
- `photographers` - For photographer portfolio images
- `other_creatives` - For other creative portfolio files

**See SUPABASE_STORAGE_SETUP.md for detailed instructions.**

### 2. Environment Variables

Ensure your `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=postgresql://...
```

## Testing Checklist

- [ ] User can sign up with DJ role
- [ ] DJ onboarding form displays correctly and validates
- [ ] DJ can select multiple genres
- [ ] DJ can upload photos and they appear in form
- [ ] DJ profile saves to database successfully
- [ ] User can sign up with Trivia Host role
- [ ] Trivia Host form displays and works correctly
- [ ] Trivia Host profile saves successfully
- [ ] User can sign up with Photographer role
- [ ] Photographer form displays and works correctly
- [ ] Photographer can upload portfolio images
- [ ] Photographer profile saves successfully
- [ ] User can sign up with Other Creative role
- [ ] Other Creative form displays and works correctly
- [ ] Other Creative can upload various file types
- [ ] Other Creative profile saves successfully
- [ ] All redirects to `/dashboard` after profile completion
- [ ] Database shows new profile records with correct structure

## Next Steps

1. **Create Supabase Storage buckets** (see SUPABASE_STORAGE_SETUP.md)
2. **Test each onboarding flow** with a new user account
3. **Create dashboard pages** for each role type to view/edit profiles
4. **Add role-specific features** to dashboards (e.g., DJ can view their bookings)
5. **Build search/discovery** features so venues can find DJs, photographers, etc.
6. **Add profile editing** pages for users to update their information

## Common Issues & Solutions

**Issue**: "Failed to save profile" error
- **Solution**: Check that user is authenticated and has valid session

**Issue**: Photos don't upload
- **Solution**: Verify Supabase storage buckets are created and public. Check browser console for errors.

**Issue**: Form fields don't persist between pages
- **Solution**: This is expected - form state is local to the component. Users start fresh each page load (or implement local storage if needed)

**Issue**: Role not updating in onboarding page
- **Solution**: Ensure user is selecting role during signup before reaching onboarding page

## Code Quality Notes

- All components follow the same pattern for consistency
- Error handling includes user-friendly messages
- Loading states prevent double-submissions
- File upload progress is shown to user
- Tailwind CSS for responsive, consistent styling
- TypeScript for type safety
