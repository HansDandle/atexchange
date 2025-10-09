# 🎵 Austin Talent Exchange - Database Setup Guide

## Option 1: Quick Setup with Supabase (Recommended)

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Name it "austin-talent-exchange"
4. Set a strong database password and save it
5. Wait for the project to initialize (2-3 minutes)

### 2. Get Your Credentials
1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon (public) key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`)

### 3. Set Up Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Database URL (from Supabase Settings → Database)
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.your-project-id.supabase.co:5432/postgres"

   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret-key-here
   ```

### 4. Push Database Schema
```bash
# Generate Prisma client
npm run db:generate

# Push the schema to Supabase
npm run db:push

# Seed with sample Austin data
npm run db:seed
```

### 5. Set Up Authentication in Supabase
1. Go to Authentication → Settings in your Supabase dashboard
2. Under "Site URL", add: `http://localhost:3000`
3. Under "Redirect URLs", add: `http://localhost:3000/auth/callback`

---

## Option 2: Local PostgreSQL Setup

### 1. Install PostgreSQL
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **Mac**: Use Homebrew: `brew install postgresql`
- **Linux**: Use your package manager: `sudo apt install postgresql`

### 2. Create Database
```bash
# Start PostgreSQL service
sudo service postgresql start  # Linux
brew services start postgresql  # Mac

# Create database
createdb austin_talent_exchange

# Or using psql:
psql -U postgres
CREATE DATABASE austin_talent_exchange;
\q
```

### 3. Set Environment Variables
```bash
# Edit .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/austin_talent_exchange"
```

### 4. Run Migrations
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

---

## Verify Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test the database connection**:
   - Go to http://localhost:3000
   - Try signing up as a band or venue
   - Complete the onboarding process

3. **Check your database**:
   - In Supabase: Go to Table Editor to see your data
   - Locally: Use `psql` or a GUI like pgAdmin

---

## Troubleshooting

### Common Issues:

**"Can't reach database server"**
- Check your DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify firewall settings

**"Prisma client not found"**
```bash
npm run db:generate
```

**"Authentication errors"**
- Double-check your Supabase keys
- Ensure NEXTAUTH_SECRET is set
- Verify redirect URLs in Supabase dashboard

**Need to reset database?**
```bash
npx prisma db push --force-reset
npm run db:seed
```

---

## Next Steps

Once your database is set up:
1. ✅ Sign up for an account
2. ✅ Complete the onboarding flow  
3. 🚧 Build your band/venue profile
4. 🚧 Browse available gigs
5. 🚧 Start booking!