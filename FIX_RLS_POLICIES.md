# 🔐 Fix Supabase Storage RLS Policies

## The Problem
You're getting: `new row violates row-level security policy`

**Why?** Storage buckets need RLS policies to allow authenticated users to upload and read files.

---

## Solution: Add RLS Policies to Each Bucket

### For Each Bucket (trivia_hosts, djs, photographers, other_creatives):

#### Step 1: Go to Bucket Policies
1. Go to **Supabase Dashboard** → **Storage**
2. Click on the bucket name (e.g., `trivia_hosts`)
3. Click the **Policies** tab

#### Step 2: Add INSERT Policy (Allow Uploads)
1. Click **New policy** → **For authenticated users**
2. Choose operation: **INSERT**
3. In the policy editor, set:

```sql
(auth.uid()::text) = (storage.foldername(name))[1]
```

Or simply use: **Allow all authenticated users to upload**

4. Click **Review** → **Save policy**

#### Step 3: Add SELECT Policy (Allow Public Read)
1. Click **New policy** → **For public users**
2. Choose operation: **SELECT**
3. Leave the expression blank (or use `true` for public access)
4. Click **Save policy**

---

## Simpler Approach: Use SQL

Run this in **Supabase SQL Editor** for **EACH BUCKET**:

### For trivia_hosts bucket:
```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'trivia_hosts' AND auth.role() = 'authenticated');

-- Allow public read
CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'trivia_hosts');
```

### For djs bucket:
```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'djs' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'djs');
```

### For photographers bucket:
```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'photographers' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'photographers');
```

### For other_creatives bucket:
```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'other_creatives' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'other_creatives');
```

---

## If Policies Already Exist

If you get an error like "policy already exists", you can DROP and recreate:

```sql
-- Drop old policies
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;

-- Then run the CREATE POLICY commands above
```

---

## Dashboard Method (GUI)

If you prefer the visual approach:

1. Go to **Supabase Dashboard** → **Storage**
2. Click bucket name → **Policies** tab
3. Click **New policy**
4. Select **For authenticated users**
5. Choose **INSERT** operation
6. Set expression: `true` (or leave blank)
7. Click **Save**
8. Repeat for **SELECT** policy with public access

---

## Verify It Worked

After adding policies, test again:
1. Refresh your app
2. Try uploading a photo in the Trivia Host form
3. Should work now! ✅

If still getting errors, try:
```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

---

## Common Issues

**"Bucket not found"**: Make sure bucket name in policy matches exactly (trivia_hosts, djs, photographers, other_creatives)

**"RLS policy violation"**: Make sure the policy conditions are correct

**"Permission denied"**: Usually means the user isn't authenticated - refresh and log in again

---

## Quick Fix (Most Permissive - Test Only)

If you're stuck, temporarily make buckets fully public:

```sql
-- TESTING ONLY - Not for production
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

Then re-enable after testing:
```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

---

**Recommendation**: Use the SQL script approach - it's fastest and most reliable.

Try adding the policies and test again!
