# System Architecture Diagrams

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         NEW USER SIGNS UP                           │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
              [BAND]        [VENUE]    [NON-BAND ROLES]
              (Existing)    (Existing)  (NEW SYSTEM)
                    │             │             │
                    ▼             ▼             ▼
            Complete           Complete      Complete
            Band Profile    Venue Profile   Role Profile
                    │             │             │
                    ▼             ▼             ▼
         Dashboard/Gigs   Dashboard/Slots  Dashboard
              │                   │             │
              ▼                   ▼             ▼
        Browse Gigs     Manage Slots    Browse Opportunities
              │                   │             │
              ▼                   ▼             ▼
            /gigs              /slots      /opportunities
```

## Dashboard Navigation Paths

```
DASHBOARD
│
├─ BAND
│  ├─ [Browse Available Gigs] ──→ /gigs ──→ GigsBrowser
│  │
│  └─ Quick Actions
│     └─ [Find More Opportunities] ──→ /gigs
│
├─ VENUE
│  ├─ [Manage Available Slots] ──→ /slots
│  │
│  └─ Quick Actions
│     └─ [Add More Slots] ──→ /slots
│
└─ TRIVIA_HOST / DJ / PHOTOGRAPHER / OTHER_CREATIVE
   ├─ [Edit Profile] ──→ /profile/edit
   │
   ├─ [Browse Opportunities] ──→ /opportunities ──→ OpportunitiesBrowser
   │                           (Role-specific title)
   │
   └─ Quick Actions
      └─ [Find More Opportunities] ──→ /opportunities
```

## Opportunities Page Flow

```
┌──────────────────────────────────────────────────────┐
│             /opportunities Page (Server)             │
├──────────────────────────────────────────────────────┤
│                                                      │
│  1. Check auth (redirect if not logged in)          │
│  2. Get user role from database                      │
│  3. Validate role is one of:                         │
│     - TRIVIA_HOST                                    │
│     - DJ                                             │
│     - PHOTOGRAPHER                                   │
│     - OTHER_CREATIVE                                 │
│  4. Fetch venue slots from database                  │
│  5. Normalize data                                   │
│  6. Pass to OpportunitiesBrowser client component    │
│                                                      │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│        OpportunitiesBrowser (Client Component)       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  RENDER UI:                                          │
│  ┌──────────────────────────────────────────────┐   │
│  │ Trivia Host Opportunities                    │   │
│  │ (or DJ Gigs, Photo Opportunities, etc)      │   │
│  ├──────────────────────────────────────────────┤   │
│  │ FILTERS                                      │   │
│  │ [Search_____] [Genre ▼] [City ▼] [Date ▬]  │   │
│  ├──────────────────────────────────────────────┤   │
│  │ 12 Available Opportunities                   │   │
│  │                                              │   │
│  │ [Venue 1] Event Name                        │   │
│  │ • Date: Friday, Oct 18, 2025                │   │
│  │ • Location: Austin, TX                      │   │
│  │                      [Apply to Host]        │   │
│  │                                              │   │
│  │ [Venue 2] Event Name                        │   │
│  │ • Date: Saturday, Oct 19, 2025              │   │
│  │ • Location: Austin, TX                      │   │
│  │                      [Apply to Host]        │   │
│  │                                              │   │
│  │ ... (more results)                           │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  INTERACTIONS:                                       │
│  • User types in search ──→ Filter results          │
│  • User selects genre ──→ Filter results            │
│  • User clicks date ──→ Filter results              │
│  • User clicks [Apply to Host] ──→ Show Modal       │
│                                                      │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
                  [Show Modal]
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
    [Submit]                        [Cancel]
        │                               │
        ▼                               ▼
  Create Application            Close Modal
  in Database
        │
        ▼
  Show Success Message
```

## Application Submission Flow

```
USER CLICKS [Apply to Host]
│
▼
MODAL APPEARS
├─ Message textarea
├─ Proposed Fee input
├─ [Cancel] button
└─ [Submit Application] button
│
▼
USER FILLS FORM
├─ Message: "I'd love to host at your venue!"
└─ Fee: 500 (optional)
│
▼
USER CLICKS [Submit Application]
│
▼ (Client-side)
GET USER DATA
│
├─ Get current user from auth ──→ supabase.auth.getUser()
│
├─ Get database user
│  └─ Select from users WHERE supabaseId = auth.id
│
├─ Get profile by role
│  ├─ If TRIVIA_HOST ──→ trivia_host_profiles
│  ├─ If DJ ──→ dj_profiles
│  ├─ If PHOTOGRAPHER ──→ photographer_profiles
│  └─ If OTHER_CREATIVE ──→ other_creative_profiles
│
└─ Profile ID = [role]ProfileId
│
▼ (Server-side Database)
INSERT INTO applications
├─ id: UUID
├─ [role]ProfileId: (their profile ID)
├─ venueSlotId: (the slot they applied for)
├─ message: (their message)
├─ proposedFee: (optional)
├─ status: 'PENDING'
├─ createdAt: NOW()
└─ updatedAt: NOW()
│
▼
SHOW SUCCESS MESSAGE
│
▼
CLOSE MODAL
│
▼
REFRESH/RETURN TO LIST
```

## Role-Specific Mappings

```
┌─────────────────────┬──────────────────────┬──────────────────┬─────────────────┐
│ ROLE                │ Profile Table        │ Profile ID Field │ Button Label    │
├─────────────────────┼──────────────────────┼──────────────────┼─────────────────┤
│ BAND                │ band_profiles        │ bandProfileId    │ Apply for Gig   │
│ TRIVIA_HOST         │ trivia_host_profiles │ triviaHostId     │ Apply to Host   │
│ DJ                  │ dj_profiles          │ djProfileId      │ Apply for Gig   │
│ PHOTOGRAPHER        │ photographer_profiles│ photographerId   │ Apply for Event │
│ OTHER_CREATIVE      │ other_creative_prf   │ otherCreativeId  │ Apply for Opp.  │
│ VENUE               │ venue_profiles       │ (none)           │ (N/A - different│
│                     │                      │                  │  flow)          │
└─────────────────────┴──────────────────────┴──────────────────┴─────────────────┘
```

## Database Schema (Applications Table)

```
applications
├─ id (UUID, PRIMARY KEY)
│
├─ Profile Type Fields (ONE filled per application)
│  ├─ bandProfileId (TEXT, FOREIGN KEY → band_profiles.id)
│  ├─ triviaHostProfileId (TEXT, FOREIGN KEY → trivia_host_profiles.id)
│  ├─ djProfileId (TEXT, FOREIGN KEY → dj_profiles.id)
│  ├─ photographerProfileId (TEXT, FOREIGN KEY → photographer_profiles.id)
│  └─ otherCreativeProfileId (TEXT, FOREIGN KEY → other_creative_profiles.id)
│
├─ Venue Reference
│  └─ venueSlotId (TEXT, FOREIGN KEY → venue_slots.id) [REQUIRED]
│
├─ Application Details
│  ├─ message (TEXT, optional)
│  ├─ proposedFee (INT, optional, in cents)
│  └─ status (ENUM: PENDING | ACCEPTED | REJECTED)
│
└─ Timestamps
   ├─ createdAt (TIMESTAMPTZ)
   └─ updatedAt (TIMESTAMPTZ)

NOTE: Exactly ONE of the profile ID fields should be populated per row
```

## File Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx ──── Main dashboard (modified)
│   │                       └── Shows role-specific buttons
│   │                       └── "Browse Opportunities" for trivia/dj/photo/creative
│   │                       └── "Browse Gigs" for bands
│   │                       └── "Manage Slots" for venues
│   │
│   ├── gigs/
│   │   └── page.tsx ──── BAND-only gigs page (unchanged)
│   │                       └── Uses GigsBrowser component
│   │
│   ├── opportunities/ ──── NEW
│   │   └── page.tsx ──── New unified opportunities page (server)
│   │                       └── Checks role eligibility
│   │                       └── Fetches venue slots
│   │                       └── Renders OpportunitiesBrowser
│   │
│   ├── slots/
│   │   └── page.tsx ──── VENUE-only slots page (unchanged)
│   │
│   └── ...
│
└── components/
    ├── GigsBrowser.tsx ──── BAND opportunities (unchanged)
    │                         └── Only bands can use
    │
    ├── OpportunitiesBrowser.tsx ──── NEW
    │                                  └── All non-band roles
    │                                  └── Role-specific rendering
    │                                  └── Flexible application submission
    │
    └── ...

prisma/
├── schema.prisma ────── (modified)
│                         └── Application model now supports all roles
│
└── migrations/
    └── (run your own)

supabase/
└── migrations/
    └── 20251017_add_profile_types_to_applications.sql ──── NEW
                                                             └── Adds columns to applications table
```

## Before & After: User Experience

### BEFORE (Problem)
```
Trivia Host signs up
    ▼
Dashboard (/dashboard)
    ▼
[Browse Opportunities] button clicks
    ▼
404 or Goes to /gigs (wrong page)
    ▼
❌ Confusion - can't apply for opportunities
```

### AFTER (Fixed)
```
Trivia Host signs up
    ▼
Dashboard (/dashboard)
    ▼
[Browse Opportunities] button clicks
    ▼
/opportunities page
    ▼
Shows "Trivia Host Opportunities"
    ▼
Can filter venues
    ▼
Can apply with [Apply to Host] button
    ▼
Application saved with triviaHostProfileId
    ▼
✅ Works perfectly
```

## Performance Considerations

```
OPPORTUNITIES PAGE LOAD:
1. Check auth (cache: browser)
2. Query user (cache: session)
3. Query venue_slots (cache: 1 minute?)
   └─ ~1-100 venue slots
   └─ Each slot includes venue_profiles normalization
4. Render page
5. Send to client

TIME ESTIMATE: 500ms - 2s
  - Network latency: 100-500ms
  - Database queries: 100-300ms
  - Rendering: 50-100ms
```

---

**This diagram should help visualize how the entire system works together!**
