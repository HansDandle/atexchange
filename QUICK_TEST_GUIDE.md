# Quick Test Guide for New Profile Forms

## Before You Start

1. Ensure you have the Supabase storage buckets created (if testing file uploads):
   - `djs`
   - `trivia_hosts`
   - `photographers`
   - `other_creatives`

2. Make sure your local development environment is running:
   ```bash
   npm run dev
   ```

## Test DJ Form

1. **Access**: Go to signup at `/auth/signup`
2. **Create Account**: 
   - Email: `test-dj@example.com`
   - Password: Any password
   - Role: **Select "DJ"**
3. **After Signup**: Should redirect to `/onboarding`
4. **Test Step 1** (Basic Info):
   - Fill in DJ Name: "Test DJ"
   - Fill in Bio: "Testing the DJ form"
   - Fill in Experience: "5 years"
   - Fill in Location: "Austin, TX"
   - Click "Next" - should enable button
5. **Test Step 2** (Genres):
   - Select 2-3 genres (e.g., House, Techno, Electronic)
   - Click "Next"
6. **Test Step 3** (Social Media):
   - Leave blank or fill in optional fields
   - Click "Next"
7. **Test Step 4** (Pricing & Photos):
   - Fill in Min Fee: "150"
   - Fill in Max Fee: "500"
   - Fill in Equipment: "Own equipment"
   - **Optional**: Click file input to upload photo
   - Click "Complete Profile"
8. **Verify**:
   - Should redirect to `/dashboard`
   - Go to Supabase Dashboard → SQL Editor
   - Run: `SELECT * FROM dj_profiles;` - should see your test profile
   - Check `djs` bucket in Storage - photo should be there if you uploaded

## Test Trivia Host Form

1. **Access**: `/auth/signup`
2. **Create Account**:
   - Email: `test-trivia@example.com`
   - Role: **Select "Trivia Host"**
3. **Test Form** (3 steps):
   - Step 1: Fill host name, bio, specialization, experience
   - Step 2: Fill location, phone, website
   - Step 3: Fill rates, upload photos
   - Submit
4. **Verify**:
   - Check `trivia_host_profiles` table
   - Check `trivia_hosts` bucket in storage

## Test Photographer Form

1. **Access**: `/auth/signup`
2. **Create Account**:
   - Email: `test-photo@example.com`
   - Role: **Select "Photographer"**
3. **Test Form** (4 steps):
   - Step 1: Fill photographer name, bio, experience
   - Step 2: Select 2-3 specializations
   - Step 3: Fill contact info
   - Step 4: Fill rates, upload portfolio photos
   - Submit
4. **Verify**:
   - Check `photographer_profiles` table
   - Check `photographers` bucket in storage

## Test Other Creative Form

1. **Access**: `/auth/signup`
2. **Create Account**:
   - Email: `test-creative@example.com`
   - Role: **Select "Other Creative"**
3. **Test Form** (3 steps):
   - Step 1: Fill creative name, creative type, bio, etc.
   - Step 2: Fill contact info
   - Step 3: Fill rates, upload portfolio files
   - Submit
4. **Verify**:
   - Check `other_creative_profiles` table
   - Check `other_creatives` bucket in storage

## Validation Tests

### Required Fields Per Step

**DJ Form**:
- Step 1: DJ Name and Bio required, others optional
- Step 2: At least 1 genre must be selected
- Steps 3-4: All optional

**Trivia Host Form**:
- Step 1: Host Name and Bio required
- Steps 2-3: All optional

**Photographer Form**:
- Step 1: Photographer Name and Bio required
- Step 2: At least 1 specialization required
- Steps 3-4: All optional

**Other Creative Form**:
- Step 1: Name, Creative Type, and Bio required
- Steps 2-3: All optional

### Test Validation

1. On each form, try clicking "Next" without filling required fields
   - Button should be disabled if required fields are empty
2. Fill required fields
   - Button should become enabled
3. Try "Previous" to go back
   - Should preserve your entries
4. Go back "Next"
   - All fields should still have your values

## File Upload Tests

1. **DJ Photos**:
   - Step 4, click file input
   - Select image file (jpg, png, etc.)
   - Should see preview of image
   - File should upload to `djs` bucket

2. **Photographer Portfolio**:
   - Step 4, click portfolio file input
   - Select multiple images
   - Should see grid of previews
   - Files should upload to `photographers` bucket

3. **Other Creative Portfolio**:
   - Step 3, click portfolio file input
   - Can upload any file type (not just images)
   - Should see list of uploaded files
   - Files should upload to `other_creatives` bucket

## Error Handling Tests

1. **Try incomplete form submission**:
   - Fill only required fields on Step 1
   - Skip optional fields
   - Submit - should work fine
   - Profile should have null/empty for optional fields

2. **Check network error handling**:
   - Fill form completely
   - Disconnect internet
   - Try to submit
   - Should show error message like "Failed to save profile"

3. **Check upload failure handling**:
   - Try uploading invalid file type (if form is strict)
   - Should show error message

## Database Verification

After each test, verify data in Supabase:

```sql
-- Check DJ profiles
SELECT * FROM dj_profiles;

-- Check Trivia Host profiles
SELECT * FROM trivia_host_profiles;

-- Check Photographer profiles
SELECT * FROM photographer_profiles;

-- Check Other Creative profiles
SELECT * FROM other_creative_profiles;

-- Check users have correct role
SELECT email, role FROM users WHERE email LIKE '%test-%';
```

## Manual Inspection Checklist

After submitting each form:

- [ ] Profile appears in database
- [ ] userId matches the logged-in user
- [ ] All filled fields are stored correctly
- [ ] Optional fields are null when empty
- [ ] createdAt and updatedAt timestamps are set
- [ ] Uploaded files are in the correct storage bucket
- [ ] Files have correct public URLs
- [ ] Redirect to `/dashboard` happens
- [ ] No JavaScript errors in browser console

## Rollback Instructions

If something goes wrong during testing:

1. **Delete test profiles**:
   ```sql
   DELETE FROM dj_profiles WHERE userId IN (SELECT id FROM users WHERE email LIKE '%test-%');
   DELETE FROM trivia_host_profiles WHERE userId IN (SELECT id FROM users WHERE email LIKE '%test-%');
   DELETE FROM photographer_profiles WHERE userId IN (SELECT id FROM users WHERE email LIKE '%test-%');
   DELETE FROM other_creative_profiles WHERE userId IN (SELECT id FROM users WHERE email LIKE '%test-%');
   DELETE FROM users WHERE email LIKE '%test-%';
   ```

2. **Delete test files from storage**:
   - Go to Supabase Dashboard → Storage
   - Select bucket (e.g., `djs`)
   - Delete test files

3. **Restart development server**:
   ```bash
   npm run dev
   ```

## Success Criteria

✅ All four forms create profiles successfully
✅ Database tables have correct data
✅ File uploads go to correct storage buckets
✅ Form validation works as expected
✅ Redirect to dashboard works
✅ No console errors or warnings
✅ Forms handle errors gracefully

Once all tests pass, the feature is ready for deployment!
