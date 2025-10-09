# Austin Talent Exchange

A web application connecting Austin bands and venues for live gigs.

## 🎵 Features

- **For Bands**: Create EPK profiles, set availability, apply to venue gigs
- **For Venues**: Manage event calendar, review band applications, book talent
- **Real-time messaging** between bands and venues
- **Austin-focused** local music community platform

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Prisma, PostgreSQL
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Vercel (planned)

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Supabase account

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd austin-talent-exchange
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `DATABASE_URL`: PostgreSQL connection string

3. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample Austin data
   npm run db:seed
   ```

4. **Development server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── globals.css     # Global styles with Austin theme
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   ├── login/          # Authentication pages
│   ├── signup/
│   ├── dashboard/      # User dashboard
│   └── onboarding/     # Profile setup
├── components/
│   ├── ui/             # Reusable UI components
│   └── forms/          # Form components
├── lib/
│   ├── prisma.ts       # Database client
│   ├── supabase/       # Supabase configuration
│   └── utils.ts        # Utility functions
prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Sample data
```

## 🎨 Design System

The app uses an Austin-themed color palette:
- **Austin Orange**: `#FF6B35` (primary brand color)
- **Austin Red**: `#D32F2F` (accent color)
- **Austin Charcoal**: `#2C3E50` (text color)
- **Warm Orange**: `#FFA726` (secondary)
- **Light Cream**: `#FFF3E0` (background)

## 📊 Database Schema

Key entities:
- **Users**: Authentication and role management
- **BandProfiles**: EPK data, availability, pricing
- **VenueProfiles**: Location, capacity, preferences  
- **VenueSlots**: Available time slots for booking
- **Applications**: Band applications to venue slots
- **Messages**: Communication between users

## 🚦 Current Status

- ✅ Project setup and configuration
- ✅ Authentication system with Supabase
- ✅ Database schema design
- ✅ Basic UI components and Austin theming
- ✅ User registration and onboarding flow
- 🚧 Profile management (in progress)
- 📅 Calendar dashboard (planned)
- 📅 Gig application system (planned)
- 📅 Messaging system (planned)

## 🌟 Getting Started

1. **Sign up** at `/signup` and choose Band or Venue
2. **Complete onboarding** to set up your profile
3. **Browse available gigs** (bands) or **post time slots** (venues)
4. **Apply and connect** with the Austin music community!

## 📝 API Routes

- `/api/auth/*` - Supabase authentication
- `/api/profiles/*` - User profile management  
- `/api/gigs/*` - Venue slot and application management
- `/api/messages/*` - Direct messaging

## 🚀 Deployment

Configured for Vercel deployment:
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy to `app.austintalentexchange.com`

## 🤝 Contributing

This is an open-source project for the Austin music community. Contributions welcome!

---

Built with ❤️ for the Austin music scene 🎸