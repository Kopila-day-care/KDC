# Kopila Day Care (KDC) - Website


## Project Overview

A multi-page website for Kopila Day Care, a boutique day care and preschool in Hayward, CA.
Built with a "Digital Storybook" design concept — whimsical, hand-crafted, editorial feel.
"Kopila" means flower bud — the logo uses a flower bud icon (Material Symbols `local_florist`).

Built with **Next.js 14 (App Router)**. Frontend, backend API routes, and admin portal are all live.


## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client)                          │
│                                                                     │
│  ┌───────────┐ ┌───────────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐ │
│  │   Home    │ │ Approach  │ │   Team   │ │ Contact │ │Book Tour│ │
│  │  page.tsx │ │ page.tsx  │ │ page.tsx │ │page.tsx │ │page.tsx │ │
│  └─────┬─────┘ └─────┬─────┘ └────┬─────┘ └────┬────┘ └────┬────┘ │
│        └──────────────┴────────┬───┴────────────┴───────────┘      │
│              ┌─────────────────┴─────────────────┐                 │
│              │     Shared Layout (layout.tsx)     │                 │
│              │  ┌──────────┐    ┌─────────────┐  │                 │
│              │  │  Navbar  │    │   Footer    │  │                 │
│              │  └──────────┘    └─────────────┘  │                 │
│              └───────────────────────────────────┘                 │
└────────────────────────────┬────────────────────────────────────────┘
                             │ fetch() / form submit
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Vercel)                          │
│                                                                     │
│  middleware.ts — protects /admin/* via Supabase session check       │
│                                                                     │
│  app/api/                                                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐               │
│  │ /api/contact │ │/api/book-tour│ │/api/availabil│               │
│  │  POST        │ │  POST        │ │  GET         │               │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘               │
│         │                │                │                        │
│  ┌──────┴────────────────┴────────────────┴───────┐               │
│  │        Zod Validation (lib/validators.ts)       │               │
│  └──────┬────────────────┬────────────────────────┘               │
│         ▼                ▼                                         │
│  ┌─────────────┐  ┌─────────────┐                                 │
│  │  Supabase   │  │   Resend    │                                 │
│  │  Client     │  │   Client    │                                 │
│  │ (lib/)      │  │ (lib/)      │                                 │
│  └──────┬──────┘  └──────┬──────┘                                 │
└─────────┼────────────────┼─────────────────────────────────────────┘
          ▼                ▼
┌──────────────────┐ ┌──────────────────┐
│    SUPABASE      │ │     RESEND       │
│  PostgreSQL DB   │ │  Transactional   │
│  Auth (admin)    │ │  Email Service   │
│  Storage (imgs)  │ │                  │
└──────────────────┘ └──────────────────┘
```


## Business Details

- **Business Name:** Kopila Day Care and Preschool
- **Owner/Director:** Basanti M.
- **Co-Caregiver:** Indra (Basanti's husband)
- **Phone:** (510) 282-6653
- **Email:** kopiladcc@yahoo.com
- **Address:** 17040 Esteban St, Hayward, CA 94541
- **Hours:** Mon–Fri 7:30 AM – 5:30 PM | Sat–Sun Closed
- **Established:** August 2014
- **Domain:** kopiladaycare.com


## Tech Stack

### Frontend
- Next.js 14+ (App Router) with React
- Tailwind CSS (installed via npm, single tailwind.config.ts)
- Google Fonts — Luckiest Guy, Amatic SC, Pacifico, Be Vietnam Pro, Plus Jakarta Sans, Raleway
- Material Symbols — Icon font via CDN

### Backend
- **Next.js API Routes** (`app/api/`) — all backend logic, fully implemented
- **Supabase** — PostgreSQL database + auth + storage
- **Resend** — transactional email (booking confirmations, contact form forwarding)
- **Vercel** — hosting (production: kdc-seven.vercel.app → kopiladaycare.com)

### Testing
- **Vitest** — 242-test security test suite in `tests/security/`
- Run with `npm test`


## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://oguvjtcvonnjvbechkjq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Resend (email)
RESEND_API_KEY=...

# Business email (where contact form + booking notifications go)
OWNER_EMAIL=...

# App
NEXT_PUBLIC_SITE_URL=https://kopiladaycare.com
```

All vars are set in Vercel for both `production` and `preview` environments.
Local values live in `.env.local` (gitignored).


## Current Status

### Pages — All Built

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Live | Hero, meals, curriculum, team preview, testimonials |
| `/our-approach` | ✅ Live | Interactive tabs, daily routine, lunch menu |
| `/our-team` | ✅ Live | Basanti & Indra profile cards |
| `/contact` | ✅ Live | Bento grid, map embed, Street View, contact form |
| `/book-a-tour` | ✅ Live | Calendar picker, availability API integration |
| `/gallery` | ⚠️ Placeholder | Page exists, needs real photos |
| `/testimonials` | ⚠️ Placeholder | Page exists, needs real testimonials |
| `/admin` | ✅ Live | Protected by middleware + Supabase auth |
| `/admin/login` | ✅ Live | Email + password login |
| `/admin/bookings` | ✅ Live | View/confirm/cancel/delete bookings |
| `/admin/gallery` | ✅ Live | Upload/manage gallery images |

### API Routes — All Implemented

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/contact` | POST | Public | Saves inquiry, emails owner |
| `/api/book-tour` | POST | Public | Saves booking, emails parent + owner |
| `/api/availability` | GET | Public | Returns available slots for a date |
| `/api/bookings` | GET | Admin | List all bookings |
| `/api/bookings/[id]` | PATCH/DELETE | Admin | Update/delete booking |
| `/api/gallery` | GET/POST | GET public, POST admin | List/add gallery images |
| `/api/gallery/[id]` | PATCH/DELETE | Admin | Update/delete gallery image |
| `/api/upload` | POST | Admin | Upload image to Supabase Storage |


## Project Structure

```
KDC/
├── app/
│   ├── layout.tsx                    # Root layout (shared nav + footer + fonts)
│   ├── globals.css                   # Tailwind directives + custom styles
│   ├── page.tsx                      # Home page
│   ├── our-approach/page.tsx
│   ├── our-team/page.tsx
│   ├── contact/page.tsx
│   ├── book-a-tour/page.tsx
│   ├── gallery/page.tsx              # Placeholder
│   ├── testimonials/page.tsx         # Placeholder
│   ├── admin/
│   │   ├── layout.tsx                # Admin sidebar layout
│   │   ├── page.tsx                  # Dashboard (stats + links)
│   │   ├── login/page.tsx
│   │   ├── bookings/page.tsx
│   │   └── gallery/page.tsx
│   └── api/
│       ├── contact/route.ts
│       ├── book-tour/route.ts
│       ├── availability/route.ts
│       ├── bookings/route.ts
│       ├── bookings/[id]/route.ts
│       ├── gallery/route.ts
│       ├── gallery/[id]/route.ts
│       └── upload/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Fixed glassmorphism nav, flower bud logo
│   │   ├── Footer.tsx
│   │   ├── ContactSection.tsx        # Shared "Ready to Visit?" CTA block
│   │   └── PublicShell.tsx
│   ├── approach/ApproachTabs.tsx
│   ├── book-tour/BookTourForm.tsx
│   ├── contact/ContactForm.tsx
│   ├── gallery/GalleryGrid.tsx
│   ├── testimonials/TestimonialsList.tsx
│   └── ui/
│       ├── CTAButton.tsx
│       ├── SectionDivider.tsx
│       └── HoursDisplay.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client (anon key)
│   │   ├── server.ts                 # Server client (service role) + requireAdmin()
│   │   └── types.ts                  # TypeScript types for all DB tables
│   ├── resend.ts                     # Email client + HTML-escaped templates
│   ├── validators.ts                 # Zod schemas: bookTourSchema, contactSchema
│   └── utils.ts
├── middleware.ts                     # Edge auth guard for /admin/*
├── tests/security/
│   ├── validators.test.ts            # Zod schema tests (length, format, injection)
│   ├── escaping.test.ts              # esc() HTML escaping + resend.ts source scan
│   ├── api-auth.test.ts              # Admin routes return 401 without session
│   ├── input-handling.test.ts        # MIME map, URL validation, allowlists
│   ├── env.test.ts                   # Env var safety checks
│   └── secrets.test.ts               # No hardcoded secrets in source
├── public/images/                    # Real photos (basanti.jpg, indra.jpg, Play*.webp/jpg)
├── supabase/migrations/
│   └── 001_initial_schema.sql        # Full DB schema with RLS + seed data
├── kopila_storybook/DESIGN.md        # Design system reference
├── vitest.config.ts
├── tsconfig.json
├── tsconfig.test.json
├── tailwind.config.ts
├── next.config.js
├── middleware.ts
├── .env.local                        # Local secrets (gitignored)
├── .env.local.example
├── CLAUDE.md
└── package.json
```


## Security Architecture

### Input Validation (`lib/validators.ts`)
- `bookTourSchema` — length limits (name ≤100, email ≤254, phone ≤20, notes ≤1000), YYYY-MM-DD date regex, HH:MM time regex
- `contactSchema` — length limits (name ≤100, address ≤200, subject ≤100, message ≤5000)
- All schemas reject empty strings on required fields

### HTML Escaping (`lib/resend.ts`)
- `esc()` helper escapes `& < > " '` before any user data enters email HTML
- All 11 user-controlled fields are wrapped in `esc()` — verified by escaping.test.ts

### Admin Auth (two layers)
- `middleware.ts` — edge function using `@supabase/ssr` `getAll`/`setAll` cookie API; redirects to `/admin/login` on missing session or any error
- `requireAdmin()` in `lib/supabase/server.ts` — called at the top of every admin API route handler; returns 401 if no valid session

### File Upload (`app/api/upload/route.ts`)
- Extension derived from MIME type only (never from user filename)
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`

### Gallery URL Validation (`app/api/gallery/route.ts`)
- Image URLs must start with `https://` before DB insert


## Design System

See `kopila_storybook/DESIGN.md` for full visual design details.

Key colors:
- Primary (Sage Green): `#3c674b`
- Secondary (Warm Brown): `#835339`
- Tertiary (Gold): `#7c5800`
- Accent (Rose): `#D28080`
- Surfaces: cream/off-white (`#faf9f7` – `#e3e2e0`)

Design rules:
- No sharp corners (min border-radius: 0.5rem)
- Asymmetrical layouts with overlapping geometries
- Tonal depth via surface layering, not traditional shadows
- Glassmorphism on nav bars
- Dark mode supported via Tailwind class strategy


## DATABASE SCHEMA (Supabase / PostgreSQL)

Run this in the Supabase SQL Editor to set up the database:

```sql
-- ============================================
-- Kopila Day Care Database Schema
-- ============================================

-- 1. BOOKINGS — Tour booking requests from parents
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. AVAILABILITY — Defines which time slots are bookable
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  max_bookings INTEGER DEFAULT 1
);

-- 3. BLOCKED_DATES — Holidays or days the owner marks unavailable
CREATE TABLE blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT
);

-- 4. INQUIRIES — Contact form submissions
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TESTIMONIALS — Parent testimonials (admin-managed)
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  quote_short TEXT NOT NULL,
  quote_full TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TEAM_MEMBERS — Staff profiles (admin-managed)
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. BLOG_POSTS — Weekly blog / newsletter posts (admin-managed)
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. GALLERY_IMAGES — Photo gallery (admin-managed)
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT DEFAULT 'general'
    CHECK (category IN ('general', 'outdoor', 'indoor', 'meals', 'activities')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. MAILING_LIST — Email signups (schema only, UI removed)
CREATE TABLE mailing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 10. BUSINESS_SETTINGS — Editable business info (singleton)
CREATE TABLE business_settings (
  id INTEGER DEFAULT 1 PRIMARY KEY CHECK (id = 1),
  business_name TEXT DEFAULT 'Kopila Day Care and Preschool',
  phone TEXT DEFAULT '(510) 282-6653',
  email TEXT DEFAULT 'kopiladcc@yahoo.com',
  address_street TEXT DEFAULT '17040 Esteban St',
  address_city TEXT DEFAULT 'Hayward',
  address_state TEXT DEFAULT 'CA',
  address_zip TEXT DEFAULT '94541',
  hours_json JSONB DEFAULT '{
    "monday": {"open": "7:30 AM", "close": "5:30 PM"},
    "tuesday": {"open": "7:30 AM", "close": "5:30 PM"},
    "wednesday": {"open": "7:30 AM", "close": "5:30 PM"},
    "thursday": {"open": "7:30 AM", "close": "5:30 PM"},
    "friday": {"open": "7:30 AM", "close": "5:30 PM"},
    "saturday": null,
    "sunday": null
  }',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=17040+Esteban+St+Hayward+CA+94541',
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO business_settings (id) VALUES (1);

-- Default availability: Mon-Fri, 30-min tour slots 9AM-4PM
INSERT INTO availability (day_of_week, start_time, end_time) VALUES
  (1, '09:00', '09:30'), (1, '09:30', '10:00'), (1, '10:00', '10:30'),
  (1, '10:30', '11:00'), (1, '14:00', '14:30'), (1, '14:30', '15:00'),
  (1, '15:00', '15:30'), (1, '15:30', '16:00'),
  (2, '09:00', '09:30'), (2, '09:30', '10:00'), (2, '10:00', '10:30'),
  (2, '10:30', '11:00'), (2, '14:00', '14:30'), (2, '14:30', '15:00'),
  (2, '15:00', '15:30'), (2, '15:30', '16:00'),
  (3, '09:00', '09:30'), (3, '09:30', '10:00'), (3, '10:00', '10:30'),
  (3, '10:30', '11:00'), (3, '14:00', '14:30'), (3, '14:30', '15:00'),
  (3, '15:00', '15:30'), (3, '15:30', '16:00'),
  (4, '09:00', '09:30'), (4, '09:30', '10:00'), (4, '10:00', '10:30'),
  (4, '10:30', '11:00'), (4, '14:00', '14:30'), (4, '14:30', '15:00'),
  (4, '15:00', '15:30'), (4, '15:30', '16:00'),
  (5, '09:00', '09:30'), (5, '09:30', '10:00'), (5, '10:00', '10:30'),
  (5, '10:30', '11:00'), (5, '14:00', '14:30'), (5, '14:30', '15:00'),
  (5, '15:00', '15:30'), (5, '15:30', '16:00');

INSERT INTO team_members (name, role, bio, sort_order) VALUES
  ('Basanti M.', 'Owner + Lead Teacher',
   'With over 15 years of experience including work with children with special needs, Basanti (Ms. B) forms natural bonds with every child. Her warmth, patience, and dedication to early childhood development make Kopila feel like a second home.',
   1),
  ('Indra', 'Co-Caregiver & Chef',
   'A warm, steady presence, Indra prepares healthy home-cooked meals daily — breakfast and lunch — and helps create a nurturing, family-like atmosphere where both children and parents feel welcomed and cared for.',
   2);

-- Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can read business settings" ON business_settings FOR SELECT USING (true);
CREATE POLICY "Public can read availability" ON availability FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read blocked dates" ON blocked_dates FOR SELECT USING (true);

-- Public write (form submissions)
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert mailing list" ON mailing_list FOR INSERT WITH CHECK (true);

-- Service role bypasses RLS — no extra policies needed
```


## Deployment

- **Platform:** Vercel (project: `kdc`, team: `arajmaharjans-projects`)
- **Production URL:** kdc-seven.vercel.app → kopiladaycare.com (DNS propagating)
- **Branch:** `main` only — single branch, single Supabase DB
- **Deploy command:** `vercel --prod`

### DNS (Squarespace → Vercel)
Two A records required in Squarespace DNS settings:

| Type | Host | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| A | `www` | `76.76.21.21` |


## DEVELOPMENT RULES

1. **Preserve all existing Tailwind classes and visual design exactly as-is.** The frontend design is final. Do not change colors, spacing, fonts, layouts, or any visual element unless asked.

2. **Branding:** The business name is "Kopila Day Care" (not "Childcare"). Kopila means flower bud. Logo icon is `local_florist` (filled).

3. **Images:** Real photos are in `public/images/`. Some AI placeholder images remain in the approach tabs — replace as real photos become available.

4. **Forms:** Contact form POSTs to `/api/contact`. Book a Tour form POSTs to `/api/book-tour`.

5. **Mailing list:** UI removed. The DB table exists but there is no frontend signup form or API route for it.

6. **Admin auth:** Always call `requireAdmin(request)` as the first line in every admin API route. The middleware provides page-level protection; `requireAdmin()` provides data-level protection.

7. **Never commit `.env.local`** — it contains live Supabase and Resend credentials.


## SETUP STEPS (for a new developer)

1. Create Supabase project at supabase.com
2. Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor
3. Create a Supabase Storage bucket called `kopila-images` (set to public)
4. Create admin user in Supabase Auth → Authentication → Users (email + password for Basanti)
5. Copy `.env.local.example` to `.env.local` and fill in all values
6. `npm install`
7. `npm run dev` (runs on localhost:3000)
8. `npm test` to run the security test suite


## DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "react-dom": "^18.3",
    "@supabase/supabase-js": "^2.45",
    "@supabase/ssr": "^0.5",
    "resend": "^4.0",
    "zod": "^3.23",
    "date-fns": "^3.6"
  },
  "devDependencies": {
    "typescript": "^5.5",
    "@types/react": "^18.3",
    "@types/node": "^20",
    "tailwindcss": "^3.4",
    "postcss": "^8.4",
    "autoprefixer": "^10.4",
    "vitest": "^2.0",
    "@vitest/coverage-v8": "^2.0"
  }
}
```
