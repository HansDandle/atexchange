# 🚨 Quick Fix: Create Supabase Storage Buckets NOW

## The Problem
You're getting: `StorageApiError: Bucket not found`

**Why?** The 4 storage buckets don't exist yet in Supabase.

## The Solution
Create the 4 public buckets. Takes ~5 minutes.

---

## Step-by-Step Instructions

### Step 1: Go to Supabase Dashboard
1. Open https://app.supabase.com
2. Select your "AustinTalentExchange" project
3. Click **Storage** in the left sidebar

### Step 2: Create First Bucket (trivia_hosts)
1. Click **Create a new bucket**
2. In the dialog:
   - **Bucket name**: `trivia_hosts`
   - Toggle **Public bucket** ON ✓
   - Click **Create bucket**

### Step 3: Create Second Bucket (djs)
1. Click **Create a new bucket**
2. In the dialog:
   - **Bucket name**: `djs`
   - Toggle **Public bucket** ON ✓
   - Click **Create bucket**

### Step 4: Create Third Bucket (photographers)
1. Click **Create a new bucket**
2. In the dialog:
   - **Bucket name**: `photographers`
   - Toggle **Public bucket** ON ✓
   - Click **Create bucket**

### Step 5: Create Fourth Bucket (other_creatives)
1. Click **Create a new bucket**
2. In the dialog:
   - **Bucket name**: `other_creatives`
   - Toggle **Public bucket** ON ✓
   - Click **Create bucket**

---

## Verify It Worked

After creating all 4 buckets, you should see them in your Storage section:
```
✓ trivia_hosts
✓ djs
✓ photographers
✓ other_creatives
```

---

## Test It Now

After creating the buckets:

1. **Refresh your dev app** (or it might auto-refresh)
2. **Try filling out the Trivia Host form again**
3. **Upload photos in Step 3**
4. **Complete the form**
5. **Should work now!** ✓

---

## If It Still Doesn't Work

Check:
1. ✓ Bucket names are **exactly** as listed above (lowercase, underscores)
2. ✓ All buckets are marked as **PUBLIC**
3. ✓ You're on the correct Supabase project
4. ✓ Refresh the dev server (it might need to reconnect)

---

## What Your Buckets Should Look Like

In Supabase Storage, you should see:

```
📦 trivia_hosts (public)
📦 djs (public)
📦 photographers (public)
📦 other_creatives (public)
```

Each with a PUBLIC policy allowing reads.

---

## Why We Need These Buckets

Each form uploads files to its bucket:
- **TriviaHostOnboardingForm** → `trivia_hosts` bucket
- **DJOnboardingForm** → `djs` bucket
- **PhotographerOnboardingForm** → `photographers` bucket
- **OtherCreativeOnboardingForm** → `other_creatives` bucket

Without the buckets, you get: **"Bucket not found"** error

---

## Next Step

✅ Create the 4 buckets
✅ Test the forms again
✅ All should work!

---

**Estimated Time**: 5 minutes

**Then you can test all 4 profile forms!**
