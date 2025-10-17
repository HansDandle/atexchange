# ⚡ Next Actions - Opportunities System

## 1. Apply Database Migration ⚠️ CRITICAL

Run this SQL in your Supabase SQL editor:

```sql
-- Add new columns for profile types
ALTER TABLE applications
ADD COLUMN "triviaHostProfileId" TEXT,
ADD COLUMN "djProfileId" TEXT,
ADD COLUMN "photographerProfileId" TEXT,
ADD COLUMN "otherCreativeProfileId" TEXT;

-- Add foreign key constraints
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

-- Make bandProfileId nullable
ALTER TABLE applications
ALTER COLUMN "bandProfileId" DROP NOT NULL;
```

**⏱️ Estimated time: 2 minutes**

---

## 2. Restart Dev Server

```bash
# If running:
# Press Ctrl+C in terminal

# Clear cache and restart
npm run dev
# or
pnpm dev
```

**⏱️ Estimated time: 30 seconds**

---

## 3. Test with Trivia Host Account

1. Go to `http://localhost:3000/signup`
2. Sign up with:
   - Email: `trivia@test.com`
   - Password: (any password)
   - Role: **Trivia Host** 🎯
3. Click "Next"
4. Complete onboarding form:
   - Host Name: `Test Trivia Master`
   - Specialization: `General Trivia`
   - Location: `Austin`
   - Experience: `5 years`
   - Rate: `500`
5. Upload a photo
6. Submit form
7. Should redirect to dashboard

**✅ Expected: Dashboard shows "Welcome, Test Trivia Master"**

---

## 4. Test Dashboard Navigation

On the dashboard:
- ✅ Look for two main buttons:
  - "Edit Trivia Host Profile" (austin color)
  - "Browse Opportunities" (outline style)
- ✅ Click "Browse Opportunities"
- ✅ Should go to `/opportunities`
- ✅ Page should show "Trivia Host Opportunities"

**Expected:** No 404 errors, page loads

---

## 5. Test Opportunities Page

On the opportunities page:
- ✅ Verify you see "Trivia Host Opportunities" title
- ✅ Verify you see venue slots (if any exist)
- ✅ Try searching for a venue
- ✅ Try filtering by city
- ✅ Try filtering by date

**Expected:** No errors, filters work

---

## 6. Test Application Submission

1. Click "Apply to Host" button on any opportunity
2. Fill in form:
   - Message: `I'd love to host trivia at your venue!`
   - Proposed Rate: `500` (optional)
3. Click "Submit Application"

**Expected:** Success message appears

---

## 7. Verify Database

Go to Supabase dashboard:
1. Click "SQL Editor"
2. Run query:
   ```sql
   SELECT * FROM applications 
   WHERE "triviaHostProfileId" IS NOT NULL 
   ORDER BY "createdAt" DESC 
   LIMIT 1;
   ```

**Expected:** See your application with:
- ✅ `triviaHostProfileId` = (some ID)
- ✅ `bandProfileId` = NULL
- ✅ `venueSlotId` = (some ID)
- ✅ `status` = 'PENDING'
- ✅ `message` = 'I'd love to host trivia at your venue!'

---

## 8. Test DJ Role (Quick)

1. Create new account: `dj@test.com` → Role: DJ
2. Complete DJ onboarding
3. Dashboard should show "Find Gigs" button
4. Click it → should go to `/opportunities`
5. Page should show "DJ Gigs"

**Expected:** Everything works for DJ too

---

## 9. Test Photographer Role (Quick)

1. Create new account: `photo@test.com` → Role: PHOTOGRAPHER
2. Complete photographer onboarding
3. Dashboard should show "Find Photo Opportunities" button
4. Click it → should go to `/opportunities`
5. Page should show "Photo Opportunities"

**Expected:** Everything works for photographers too

---

## 10. Test Other Creative Role (Quick)

1. Create new account: `creative@test.com` → Role: OTHER_CREATIVE
2. Complete other creative onboarding
3. Dashboard should show "Find Opportunities" button
4. Click it → should go to `/opportunities`
5. Page should show "Creative Opportunities"

**Expected:** Everything works for other creatives too

---

## If Something Goes Wrong

### Opportunities page not found (404)
- **Solution:** Make sure dev server was restarted
- **Check:** `src/app/opportunities/page.tsx` exists
- **Check:** No TypeScript errors in terminal

### OpportunitiesBrowser not found
- **Solution:** Clear node_modules cache
  ```bash
  rm -r node_modules/.cache
  npm run dev
  ```

### Application submission fails
- **Solution:** Check browser console for error message
- **Check:** Did you apply the migration to the database?
- **Check:** Does your profile exist? (not just auth user)

### Wrong button labels showing
- **Solution:** Check your user role in the database
  ```sql
  SELECT id, email, role FROM users WHERE email = 'your-email@example.com';
  ```

---

## Summary

| Item | Status | Time |
|------|--------|------|
| Apply migration | ⚠️ REQUIRED | 2 min |
| Restart dev server | ⚠️ REQUIRED | 1 min |
| Test Trivia Host | ✅ RECOMMENDED | 5 min |
| Test DJ | ✅ RECOMMENDED | 3 min |
| Test Photographer | ✅ RECOMMENDED | 3 min |
| Test Other Creative | ✅ RECOMMENDED | 3 min |
| **Total** | | **20 min** |

---

**Questions?** Check `OPPORTUNITIES_GUIDE.md` for detailed explanation of how everything works.
