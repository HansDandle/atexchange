# New Role Integration - Complete Checklist

## ✅ Backend Setup Complete

### Schema Changes
- [x] Added TriviaHostProfile model
- [x] Added DJProfile model
- [x] Added PhotographerProfile model
- [x] Added OtherCreativeProfile model
- [x] Updated User model with profile relationships
- [x] Added proper foreign keys and indexes
- [x] All changes are non-destructive (new tables only)

### Seed Data
- [x] Updated prisma/seed.ts to create sample users for new roles
- [x] Added realistic profile data for each role
- [x] Fixed UserRole enum references (OTHER_CREATIVE)

### Documentation
- [x] Created MIGRATION_GUIDE.md with detailed instructions
- [x] Created IMPLEMENTATION_SUMMARY.md with overview
- [x] Documented database schema for each profile type
- [x] Provided rollback procedures

## ⏭️ Next Steps: Frontend Integration

### 1. Update Signup Page
**File:** `src/app/signup/page.tsx`

Tasks:
- [ ] Add new role options to role selector
  - [ ] DJ
  - [ ] Trivia Host
  - [ ] Photographer
  - [ ] Other Creative
- [ ] Update form validation to accept new roles
- [ ] Route users to correct onboarding flow

### 2. Create Profile Creation Pages

**Files to create/update:**
- [ ] `src/app/onboarding/dj/page.tsx` - DJ profile creation
- [ ] `src/app/onboarding/trivia-host/page.tsx` - Trivia Host profile creation
- [ ] `src/app/onboarding/photographer/page.tsx` - Photographer profile creation
- [ ] `src/app/onboarding/other-creative/page.tsx` - Other Creative profile creation

Each should include:
- [ ] Profile name/title field
- [ ] Bio/description
- [ ] Photos/portfolio upload
- [ ] Specialization tags
- [ ] Experience/background
- [ ] Location
- [ ] Contact info (phone, website, social media)
- [ ] Pricing (where applicable)

### 3. Create Dashboard Pages

**Files to create/update:**
- [ ] `src/app/dashboard/profile/dj/page.tsx` - DJ profile view/edit
- [ ] `src/app/dashboard/profile/trivia-host/page.tsx` - Trivia Host profile view/edit
- [ ] `src/app/dashboard/profile/photographer/page.tsx` - Photographer profile view/edit
- [ ] `src/app/dashboard/profile/creative/page.tsx` - Other Creative profile view/edit

Each should include:
- [ ] View profile information
- [ ] Edit profile information
- [ ] Upload/manage photos/portfolio
- [ ] View applications/bookings
- [ ] Set availability
- [ ] Manage pricing/rates

### 4. Update Navigation

**File:** `src/components/Navigation.tsx` or similar

- [ ] Show role-specific menu items based on user.role
- [ ] Hide Band/Venue specific items for new roles
- [ ] Show new role-specific menu items

### 5. Create API Routes

**Files to create:**
- [ ] `src/app/api/profiles/dj/[id]/route.ts` - DJ profile API
- [ ] `src/app/api/profiles/trivia-host/[id]/route.ts` - Trivia Host profile API
- [ ] `src/app/api/profiles/photographer/[id]/route.ts` - Photographer profile API
- [ ] `src/app/api/profiles/other-creative/[id]/route.ts` - Other Creative profile API

Each should support:
- [ ] GET - Fetch profile
- [ ] POST - Create profile
- [ ] PUT - Update profile
- [ ] DELETE - Delete profile

### 6. Update Application System

**Files to update:**
- [ ] Consider if new roles can apply to venue slots
- [ ] Update application logic if needed
- [ ] Add filters/search for new role types

### 7. Testing

- [ ] Test database migration
- [ ] Test signup with new roles
- [ ] Test profile creation for each role
- [ ] Test profile editing
- [ ] Test dashboard functionality
- [ ] Test photo/portfolio uploads
- [ ] Verify existing Band/Venue functionality still works
- [ ] Test on mobile devices

## Database Migration Command

When you're ready to apply the schema changes to your Supabase database:

```powershell
$env:DATABASE_URL='postgresql://postgres.jkylaqqajdjxpvrmuxfr:SXSW2003Antone%27s@aws-1-us-east-2.pooler.supabase.com:5432/postgres'
npx prisma migrate dev --name add_new_role_profiles
```

Then regenerate the Prisma client:

```bash
npx prisma generate
```

Optionally, seed sample data:

```bash
npm run db:seed
```

## Helpful Resources

- **Prisma Docs:** https://www.prisma.io/docs/
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **React Hook Form:** For building profile forms
- **Zod:** For form validation

## Questions or Issues?

Refer to:
- `MIGRATION_GUIDE.md` - Database migration instructions
- `IMPLEMENTATION_SUMMARY.md` - Overview of changes
- `prisma/schema.prisma` - Current schema definition
- `prisma/seed.ts` - Sample data structure

---

**Status:** Backend preparation complete ✅  
**Next Focus:** Frontend integration  
**Estimated Time for Frontend:** 2-3 days depending on complexity
