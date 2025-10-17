# Supabase Storage Setup for New Profiles

The new onboarding forms for DJ, Trivia Host, Photographer, and Other Creative profiles require dedicated Supabase storage buckets for file uploads.

## Required Storage Buckets

You need to create the following public storage buckets in your Supabase project:

1. **djs** - For DJ profile photos and media
2. **trivia_hosts** - For trivia host profile photos
3. **photographers** - For photographer portfolio images
4. **other_creatives** - For other creative profile files

## Steps to Create Buckets in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket** for each of the above bucket names
4. When creating each bucket:
   - **Name**: Use the exact name from the list above
   - **Public bucket**: ✅ Toggle ON (so images are publicly accessible)
   - **File size limit**: Optional, set based on your needs

### Example Configuration

- Bucket Name: `djs`
- Public: Yes
- Allowed file types: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` (images primarily)

Repeat for each bucket:
- `trivia_hosts`
- `photographers`
- `other_creatives`

## Bucket Policies

Each bucket should have a public policy to allow reads. Supabase typically sets these by default for public buckets, but verify:

1. Select each bucket
2. Go to **Policies**
3. Ensure there's a policy allowing `SELECT` (read) for authenticated users
4. The upload is handled by authenticated users, so write policies should be restrictive (only owner can write)

## Form Implementation Details

- **DJ Form** (`DJOnboardingForm.tsx`):
  - Uploads to: `djs` bucket
  - Field: `photos` array
  - Max files: Multiple images supported

- **Trivia Host Form** (`TriviaHostOnboardingForm.tsx`):
  - Uploads to: `trivia_hosts` bucket
  - Field: `photos` array
  - Max files: Multiple images supported

- **Photographer Form** (`PhotographerOnboardingForm.tsx`):
  - Uploads to: `photographers` bucket
  - Field: `portfolioPhotos` array
  - Max files: Multiple images supported

- **Other Creative Form** (`OtherCreativeOnboardingForm.tsx`):
  - Uploads to: `other_creatives` bucket
  - Field: `portfolio` array
  - Max files: Multiple files supported (accepts any file type)

## Testing the Setup

After creating the buckets:

1. Test the DJ onboarding form by:
   - Signing up as a new DJ user
   - Completing the onboarding form
   - Uploading photos in Step 4
   - Verify photos appear in the `djs` bucket in Supabase Storage

2. Repeat for other profile types

## Troubleshooting

**"Failed to upload"** error:
- Check that the bucket exists and is public
- Verify you're authenticated (session token is valid)
- Check Supabase logs for detailed error messages

**Images not displaying**:
- Ensure bucket is marked as public
- Check that the public URL format is correct
- Verify file permissions in bucket policies

**Upload succeeds but no file appears**:
- Check bucket storage in Supabase console
- Verify CORS settings allow uploads from your domain
- Check browser console for JavaScript errors
