# ✅ DEPLOYMENT CHECKLIST - Opportunities System

**Date:** October 17, 2025
**Status:** Ready for Production

---

## PRE-DEPLOYMENT

### Database
- [ ] Backup production database
- [ ] Have Supabase SQL Editor open
- [ ] Have migration SQL copied and ready

### Code  
- [ ] All files created successfully
- [ ] All files modified correctly
- [ ] No TypeScript errors (cache issues are normal)
- [ ] Git is clean and ready to push

### Documentation
- [ ] Read `NEXT_ACTIONS.md` 
- [ ] Understand the flow from `SYSTEM_ARCHITECTURE.md`
- [ ] Have `OPPORTUNITIES_GUIDE.md` for reference

---

## STEP-BY-STEP DEPLOYMENT

### **1. APPLY DATABASE MIGRATION** ⚠️ CRITICAL

**Time:** 2 minutes

Go to: https://app.supabase.com → Your Project → SQL Editor

Copy and paste this entire SQL block:

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

**Then:**
- [ ] Click "Run"
- [ ] Watch for success message (no errors)
- [ ] Check applications table has new columns
  - [ ] triviaHostProfileId exists
  - [ ] djProfileId exists
  - [ ] photographerProfileId exists
  - [ ] otherCreativeProfileId exists

**✓ Done?** Continue to Step 2

---

### **2. DEPLOY CODE**

**Time:** 1 minute

In your terminal:

```bash
# Make sure you're on the right branch
git branch
# Should show: * vercel-deploy

# Add all changes
git add -A

# Commit
git commit -m "feat: unified opportunities system for all roles

- Add /opportunities page for trivia hosts, DJs, photographers, other creatives
- Create OpportunitiesBrowser component with role-specific rendering
- Update dashboard navigation and quick actions
- Update Prisma schema to support flexible profile types
- Add database migration for applications table"

# Push
git push origin vercel-deploy
```

**Then:**
- [ ] Check GitHub/Vercel dashboard
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Check for "Build successful" notification
- [ ] Visit your Vercel deployment URL

**✓ Done?** Continue to Step 3

---

### **3. RESTART DEV SERVER** (if testing locally)

**Time:** 30 seconds

```bash
# Press Ctrl+C to stop current dev server

# Clear cache
rm -r node_modules/.cache

# Restart
npm run dev
# or
pnpm dev
```

**Wait for:**
- [ ] "ready - started server on 0.0.0.0:3000"
- [ ] No TypeScript errors in terminal
- [ ] Page loads at http://localhost:3000

**✓ Done?** Continue to Step 4

---

## TESTING (20 Minutes)

### **4. TEST TRIVIA HOST FLOW** (5 minutes)

Go to: http://localhost:3000/signup (or your Vercel URL)

**Sign Up:**
- [ ] Email: `test-trivia@example.com`
- [ ] Password: (secure password)
- [ ] Role: **Trivia Host** 🎯
- [ ] Click "Next"

**Complete Profile:**
- [ ] Host Name: `Test Trivia Host`
- [ ] Specialization: `General Trivia` (or any)
- [ ] Location: `Austin, TX`
- [ ] Experience: `5 years`
- [ ] Rate: `500`
- [ ] Upload a photo
- [ ] Click "Submit"

**Dashboard:**
- [ ] Should see "Welcome back, Test Trivia Host!"
- [ ] Should see button: "Edit Trivia Host Profile"
- [ ] Should see button: "Browse Opportunities"
- [ ] Quick Actions show: [Messages] [Find More Opportunities]

**Click "Browse Opportunities":**
- [ ] URL should be `/opportunities`
- [ ] Title: "Trivia Host Opportunities"
- [ ] Subtitle: "Browse available trivia hosting opportunities at venues"
- [ ] See filters: Search, Genre, City, Date
- [ ] See list of venues (if any exist)

**Filter Test:**
- [ ] Try searching for a venue name
- [ ] Try selecting a city
- [ ] Try selecting a date
- [ ] No errors should appear

**Apply Test:**
- [ ] Click "Apply to Host" button on any venue
- [ ] Modal should open
- [ ] Fill Message: "I'd love to host!"
- [ ] Fill Rate: `600` (optional)
- [ ] Click "Submit Application"
- [ ] Should see success message

**Database Verify:**
- [ ] Open Supabase SQL Editor
- [ ] Run:
  ```sql
  SELECT * FROM applications 
  WHERE "triviaHostProfileId" IS NOT NULL
  ORDER BY "createdAt" DESC LIMIT 1;
  ```
- [ ] Should see your application with:
  - [ ] `triviaHostProfileId` = (some UUID)
  - [ ] `bandProfileId` = NULL
  - [ ] `venueSlotId` = (UUID of venue)
  - [ ] `status` = 'PENDING'
  - [ ] `message` = "I'd love to host!"

**✓ Trivia Host Works!** Continue to Step 5

---

### **5. TEST DJ FLOW** (3 minutes)

Repeat same flow but:
- [ ] Email: `test-dj@example.com`
- [ ] Role: **DJ**
- [ ] Dashboard shows: "Edit DJ Profile" + "Find Gigs"
- [ ] /opportunities shows: "DJ Gigs"
- [ ] Button says: "Apply for Gig"
- [ ] Database shows: `djProfileId` (not NULL), others NULL

**✓ DJ Works!** Continue to Step 6

---

### **6. TEST PHOTOGRAPHER FLOW** (3 minutes)

Repeat same flow but:
- [ ] Email: `test-photo@example.com`
- [ ] Role: **PHOTOGRAPHER**
- [ ] Dashboard shows: "Edit Portfolio" + "Find Photo Opportunities"
- [ ] /opportunities shows: "Photo Opportunities"
- [ ] Button says: "Apply for Event"
- [ ] Database shows: `photographerProfileId` (not NULL), others NULL

**✓ Photographer Works!** Continue to Step 7

---

### **7. TEST OTHER_CREATIVE FLOW** (3 minutes)

Repeat same flow but:
- [ ] Email: `test-creative@example.com`
- [ ] Role: **OTHER_CREATIVE**
- [ ] Dashboard shows: "Edit Profile" + "Find Opportunities"
- [ ] /opportunities shows: "Creative Opportunities"
- [ ] Button says: "Apply for Opportunity"
- [ ] Database shows: `otherCreativeProfileId` (not NULL), others NULL

**✓ Other Creative Works!** Continue to Step 8

---

### **8. VERIFY BAND & VENUE STILL WORK** (3 minutes)

**Test Band:**
- [ ] Create band account
- [ ] Complete profile
- [ ] Dashboard shows "Browse Available Gigs"
- [ ] Click it → goes to `/gigs` (not `/opportunities`)
- [ ] Works like before ✓

**Test Venue:**
- [ ] Create venue account
- [ ] Complete profile
- [ ] Dashboard shows "Manage Available Slots"
- [ ] Click it → goes to `/slots` (not `/opportunities`)
- [ ] Works like before ✓

---

## POST-DEPLOYMENT

### **9. CLEANUP**

- [ ] Delete test accounts (optional)
- [ ] Delete test applications (optional)
- [ ] Or keep them for future testing

### **10. MONITOR**

First 24 hours:
- [ ] Check server logs for errors
- [ ] Verify new applications are being created
- [ ] Check that profile IDs are correct
- [ ] Monitor user feedback

---

## TROUBLESHOOTING

### **Issue: "404 on /opportunities"**

**Solution:**
1. Restart dev server with `npm run dev`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito/private window
4. Check that file exists: `src/app/opportunities/page.tsx`

### **Issue: "Cannot find OpportunitiesBrowser"**

**Solution:**
1. Clear cache: `rm -r node_modules/.cache`
2. Restart: `npm run dev`
3. Verify file exists: `src/components/OpportunitiesBrowser.tsx`
4. Check import path in page.tsx is correct

### **Issue: "Application submission fails"**

**Solution:**
1. Check browser console for error message
2. Verify migration was applied (run migration SQL again)
3. Verify user profile exists:
   ```sql
   SELECT * FROM trivia_host_profiles 
   WHERE userId = '(your-user-id)';
   ```
4. Check network tab for API errors

### **Issue: "Database constraint error"**

**Solution:**
1. This means migration didn't apply correctly
2. Go to Supabase SQL Editor
3. Check existing constraints:
   ```sql
   SELECT constraint_name FROM information_schema.table_constraints 
   WHERE table_name = 'applications';
   ```
4. Re-run the migration SQL

### **Issue: "Wrong role on dashboard"**

**Solution:**
1. Check database: `SELECT * FROM users WHERE email = 'your-email';`
2. Verify role is correct (should be 'TRIVIA_HOST', 'DJ', etc.)
3. Try logging out and back in
4. Check auth token in browser DevTools

---

## ROLLBACK PROCEDURE (If Needed)

If something goes wrong and you need to rollback:

### **Rollback Database:**

```sql
-- Remove constraints
ALTER TABLE applications 
DROP CONSTRAINT IF EXISTS applications_triviahostprofileid_fkey;

ALTER TABLE applications 
DROP CONSTRAINT IF EXISTS applications_djprofileid_fkey;

ALTER TABLE applications 
DROP CONSTRAINT IF EXISTS applications_photographerprofileid_fkey;

ALTER TABLE applications 
DROP CONSTRAINT IF EXISTS applications_othercreativeprofileid_fkey;

-- Remove columns
ALTER TABLE applications
DROP COLUMN IF EXISTS "triviaHostProfileId",
DROP COLUMN IF EXISTS "djProfileId",
DROP COLUMN IF EXISTS "photographerProfileId",
DROP COLUMN IF EXISTS "otherCreativeProfileId";

-- Make bandProfileId required again
ALTER TABLE applications
ALTER COLUMN "bandProfileId" SET NOT NULL;
```

### **Rollback Code:**

```bash
git revert HEAD
git push origin vercel-deploy
```

---

## FINAL CHECKLIST

### Before Going Live:

- [ ] Database migration applied successfully
- [ ] Code deployed to production
- [ ] All 4 new roles tested (Trivia, DJ, Photo, Creative)
- [ ] Band role still works
- [ ] Venue role still works
- [ ] No 404 errors
- [ ] Applications save with correct profile IDs
- [ ] Success messages appear

### First 24 Hours:

- [ ] Monitor server logs
- [ ] Watch for new applications
- [ ] Check user feedback
- [ ] Verify profile IDs in database

### All Good?

🎉 **CONGRATULATIONS! Unified Opportunities System is Live!**

---

## Support

Questions? Check:
1. `NEXT_ACTIONS.md` - Quick start guide
2. `OPPORTUNITIES_GUIDE.md` - Feature details
3. `SYSTEM_ARCHITECTURE.md` - Technical details
4. `UNIFIED_OPPORTUNITIES_COMPLETE.md` - Full summary

---

**Total Deployment Time: ~30 minutes (5 min migration + 1 min deploy + 20 min testing + 4 min buffer)**

**Status: ✅ READY FOR PRODUCTION**
