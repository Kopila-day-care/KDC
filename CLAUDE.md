# Kopila Day Care (KDC) - Website


## Project Overview

A multi-page website for Kopila Day Care, a boutique day care and preschool in Hayward, CA.
Built with a "Digital Storybook" design concept — whimsical, hand-crafted, editorial feel.
"Kopila" means flower bud — the logo uses a flower bud icon (Material Symbols `local_florist`).

Converted from static HTML/Tailwind to **Next.js 14 (App Router)**. Frontend pages are live.
Backend (Supabase + Resend) is scaffolded but not yet connected.


## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client)                          │
│                                                                     │
│  ┌───────────┐ ┌───────────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐ │
│  │   Home    │ │ Approach  │ │   Team   │ │ Contact │ │Book Tour│ │
│  │  page.tsx │ │ page.tsx  │ │ page.tsx │ │page.tsx │ │page.tsx │ │
│  └─────┬─────┘ └─────┬─────┘ └────┬─────┘ └────┬────┘ └────┬────┘ │
│        │              │            │            │           │      │
│        └──────────────┴────────┬───┴────────────┴───────────┘      │
│                                │                                    │
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
│  app/api/                                                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐               │
│  │ /api/contact │ │/api/book-tour│ │/api/availabil│               │
│  │  POST        │ │  POST        │ │  GET         │               │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘               │
│         │                │                │                        │
│  ┌──────┴────────────────┴────────────────┴───────┐               │
│  │        Zod Validation (lib/validators.ts)       │               │
│  └──────┬────────────────┬────────────────────────┘               │
│         │                │                                         │
│         ▼                ▼                                         │
│  ┌─────────────┐  ┌─────────────┐                                 │
│  │  Supabase   │  │   Resend    │                                 │
│  │  Client     │  │   Client    │                                 │
│  │ (lib/)      │  │ (lib/)      │                                 │
│  └──────┬──────┘  └──────┬──────┘                                 │
└─────────┼────────────────┼─────────────────────────────────────────┘
          │                │
          ▼                ▼
┌──────────────────┐ ┌──────────────────┐
│    SUPABASE      │ │     RESEND       │
│                  │ │                  │
│ ┌──────────────┐ │ │  Transactional   │
│ │  PostgreSQL  │ │ │  Email Service   │
│ │  Database    │ │ │                  │
│ │  (10 tables) │ │ │ • Booking conf.  │
│ ├──────────────┤ │ │ • Owner notif.   │
│ │  Auth        │ │ │ • Contact notif. │
│ │  (admin)     │ │ │                  │
│ ├──────────────┤ │ └──────────────────┘
│ │  Storage     │ │
│ │  (images)    │ │
│ └──────────────┘ │
└──────────────────┘

┌─────────────────────────────────────────┐
│           EXTERNAL SERVICES             │
│                                         │
│  Google Fonts (CDN) ── Typography       │
│  Material Symbols (CDN) ── Icons        │
│  Google Maps Embed ── Map + Street View │
└─────────────────────────────────────────┘
```


## Business Details

- **Business Name:** Kopila Day Care and Preschool
- **Owner/Director:** Basanti M.
- **Co-Caregiver:** Indra (Basanti's husband)
- **Phone:** (510) 282-6653
- **Address:** 17040 Esteban St, Hayward, CA 94541
- **Hours:** Mon–Fri 7:30 AM – 5:30 PM | Sat–Sun Closed
- **Established:** August 2014


## Tech Stack

### Frontend (Preserve As-Is)
- Next.js 14+ (App Router) with React
- Tailwind CSS (installed via npm, single tailwind.config.ts)
- Google Fonts — Luckiest Guy, Amatic SC, Pacifico, Be Vietnam Pro, Plus Jakarta Sans, Raleway
- Material Symbols — Icon font via CDN

### Backend (New)
- **Next.js API Routes** (`app/api/`) — all backend logic
- **Supabase** — PostgreSQL database + auth + storage
- **Resend** — transactional email (booking confirmations, contact form forwarding)
- **Vercel** — hosting and deployment

### Environment Variables Required
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend (email)
RESEND_API_KEY=your_resend_api_key

# Business email (where contact form + booking notifications go)
OWNER_EMAIL=basanti_email@example.com

# App
NEXT_PUBLIC_SITE_URL=https://kopilachildcare.com
```


## Current Status

### Pages Completed (frontend)
- `/` — Home page (hero, meals, curriculum, team preview, space, safety, testimonials)
- `/our-approach` — Approach page (interactive tabs: Fresh Food, Play First, Curriculum, Loving Care; daily routine; lunch menu; learn through play; curriculum bento grid)
- `/our-team` — Team page (Basanti & Indra profile cards, shared philosophy, CTA)
- `/contact` — Contact page (bento grid: contact info, hours, Google Map embed, 360° Street View, contact form with POST /api/contact)

### Pages Not Yet Built
- `/book-a-tour` — Tour booking with calendar picker
- `/testimonials` — Parent testimonials
- `/gallery` — Photo gallery (placeholder)
- `/blog` — Blog (placeholder)
- `/admin/*` — Admin portal (gallery uploads + booking management only)
- API routes — Directory structure exists, implementations not yet built

### Nav Structure
Home | Approach | Team | Gallery | Testimonials | Contact Us | Book a Tour!


## Project Structure
```
KDC/
├── app/
│   ├── layout.tsx                    # Root layout (shared nav + footer + fonts)
│   ├── globals.css                   # Tailwind directives + custom styles
│   ├── page.tsx                      # Home page
│   ├── our-approach/page.tsx         # Approach page
│   ├── our-team/page.tsx             # Team page
│   ├── contact/page.tsx              # Contact page
│   └── api/                          # API route directories (scaffolded, not implemented)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Fixed glassmorphism nav, flower bud logo
│   │   ├── Footer.tsx                # 4-column footer
│   │   └── ContactSection.tsx        # Shared "Ready to Visit?" CTA block
│   ├── approach/
│   │   └── ApproachTabs.tsx          # Interactive tabbed content (Fresh Food, Play First, Curriculum, Loving Care)
│   ├── contact/
│   │   └── ContactForm.tsx           # Contact form with loading/success/error states
│   ├── ui/
│   │   ├── CTAButton.tsx
│   │   ├── SectionDivider.tsx
│   │   └── HoursDisplay.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client
│   │   ├── server.ts                 # Server Supabase client (service role)
│   │   └── types.ts                  # TypeScript types for all DB tables
│   ├── resend.ts                     # Email client + templates
│   ├── validators.ts                 # Zod schemas (booking, contact, mailing list)
│   └── utils.ts                      # Shared utilities
├── public/images/                    # Real photos (basanti.jpg, indra.jpg, Play*.webp/jpg, etc.)
├── supabase/migrations/
│   └── 001_initial_schema.sql        # Full database schema with RLS + seed data
├── kopila_storybook/DESIGN.md        # Design system reference
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.local.example
├── CLAUDE.md
└── package.json
```


## Design System

See kopila_storybook/DESIGN.md for full visual design details.

Key colors:
- Primary (Sage Green): #3c674b
- Secondary (Warm Brown): #835339
- Tertiary (Gold): #7c5800
- Accent (Rose): #D28080
- Surfaces: cream/off-white (#faf9f7 – #e3e2e0)

Design rules:
- No sharp corners (min border-radius: 0.5rem)
- Asymmetrical layouts with overlapping geometries
- Tonal depth via surface layering, not traditional shadows
- Glassmorphism on nav bars
- Dark mode supported via Tailwind class strategy


---


## DATABASE SCHEMA (Supabase / PostgreSQL)

Create this schema in Supabase SQL Editor or as a migration file:
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
  booking_time TEXT NOT NULL,           -- e.g. "10:00 AM"
  notes TEXT,                           -- optional message from parent
  status TEXT DEFAULT 'pending'         -- pending | confirmed | cancelled
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. AVAILABILITY — Defines which time slots are bookable
-- Admin sets these; the calendar picker queries them
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL          -- 0=Sun, 1=Mon, ... 6=Sat
    CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TEXT NOT NULL,             -- e.g. "09:00"
  end_time TEXT NOT NULL,               -- e.g. "09:30"
  is_active BOOLEAN DEFAULT true,
  max_bookings INTEGER DEFAULT 1        -- how many tours per slot
);

-- 3. BLOCKED_DATES — Holidays or days the owner marks unavailable
CREATE TABLE blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT                           -- e.g. "Holiday", "Vacation"
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
  quote_short TEXT NOT NULL,            -- Short highlight for homepage carousel
  quote_full TEXT,                      -- Full testimonial for detail view
  rating INTEGER DEFAULT 5
    CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN DEFAULT false,    -- Show on homepage?
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TEAM_MEMBERS — Staff profiles (admin-managed)
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,                   -- e.g. "Owner + Lead Teacher"
  bio TEXT NOT NULL,
  photo_url TEXT,                       -- URL from Supabase Storage
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. BLOG_POSTS — Weekly blog / newsletter posts (admin-managed)
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,                         -- Short preview text
  content TEXT NOT NULL,                -- Full post body (HTML or Markdown)
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. GALLERY_IMAGES — Photo gallery (admin-managed)
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,              -- URL from Supabase Storage
  alt_text TEXT,
  category TEXT DEFAULT 'general'       -- general | outdoor | indoor | meals | activities
    CHECK (category IN ('general', 'outdoor', 'indoor', 'meals', 'activities')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. MAILING_LIST — Email signups
CREATE TABLE mailing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 10. BUSINESS_SETTINGS — Editable business info (singleton)
CREATE TABLE business_settings (
  id INTEGER DEFAULT 1 PRIMARY KEY CHECK (id = 1),  -- Only one row ever
  business_name TEXT DEFAULT 'Kopila Day Care and Preschool',
  phone TEXT DEFAULT '(510) 282-6653',
  email TEXT DEFAULT '',
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

-- Insert default business settings row
INSERT INTO business_settings (id) VALUES (1);

-- Default availability: Mon-Fri, 30-min tour slots from 9AM-4PM
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

-- Default team members
INSERT INTO team_members (name, role, bio, sort_order) VALUES
  ('Basanti M.', 'Owner + Lead Teacher',
   'With over 15 years of experience including work with children with special needs, Basanti (Ms. B) forms natural bonds with every child. Her warmth, patience, and dedication to early childhood development make Kopila feel like a second home.',
   1),
  ('Indra', 'Co-Caregiver & Chef',
   'A warm, steady presence, Indra prepares healthy home-cooked meals daily — breakfast and lunch — and helps create a nurturing, family-like atmosphere where both children and parents feel welcomed and cared for.',
   2);

-- Row Level Security (RLS)
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

-- Public read access for front-facing content
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can read business settings" ON business_settings FOR SELECT USING (true);
CREATE POLICY "Public can read availability" ON availability FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read blocked dates" ON blocked_dates FOR SELECT USING (true);

-- Public write access for submissions
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert mailing list" ON mailing_list FOR INSERT WITH CHECK (true);

-- Service role (admin API routes) gets full access via SUPABASE_SERVICE_ROLE_KEY
-- No additional policies needed — service role bypasses RLS
```


## API ROUTES SPECIFICATION

### Public Routes (no auth required)

**POST /api/book-tour**
- Body: `{ parent_name, email, phone, booking_date, booking_time, notes? }`
- Validates with Zod: email format, date is not in past, time slot is available
- Checks: date not in blocked_dates, slot not fully booked, day_of_week has availability
- Inserts into `bookings` table with status "pending"
- Sends two emails via Resend:
  - Confirmation to parent: "Thank you for booking a tour at Kopila Day Care..."
  - Notification to owner (OWNER_EMAIL): "New tour booking from [name] on [date] at [time]"
- Returns: `{ success: true, booking_id }`

**GET /api/availability?date=2026-04-15**
- Takes a date param
- Returns available time slots for that date:
  - Gets day_of_week from date
  - Queries `availability` for that day where is_active=true
  - Removes slots already at max_bookings from `bookings` table
  - Checks date is not in `blocked_dates`
- Returns: `{ date, slots: [{ start_time, end_time, available: true }] }`

**POST /api/contact**
- Body: `{ name, email, phone?, address?, subject?, message }`
- Validates with Zod
- Inserts into `inquiries` table
- Sends email via Resend to OWNER_EMAIL with inquiry details
- Returns: `{ success: true }`

**POST /api/mailing-list**
- Body: `{ email, name? }`
- Upserts into `mailing_list` (ignore if already exists)
- Returns: `{ success: true }`

**GET /api/testimonials**
- Returns all testimonials, ordered by sort_order
- Optional `?featured=true` to get only homepage testimonials

**GET /api/team**
- Returns all active team members, ordered by sort_order

**GET /api/blog**
- Returns published blog posts, ordered by published_at desc
- Optional `?limit=5` for homepage preview

**GET /api/blog/[id]**
- Returns single blog post by id or slug

**GET /api/gallery**
- Returns all gallery images, ordered by sort_order
- Optional `?category=outdoor` to filter

**GET /api/settings**
- Returns business_settings (hours, address, phone, etc.)


### Admin Routes (require Supabase auth — service role key used server-side)

All admin routes check for a valid session cookie/token. Use Supabase Auth with email+password login for the admin user.

**Bookings**
**GET /api/bookings** — List all bookings (filterable by status, date range)
**PATCH /api/bookings/[id]** — Update booking status (confirm/cancel)
**DELETE /api/bookings/[id]** — Delete a booking

**Gallery**
**POST /api/gallery** — Add gallery image (upload via /api/upload first)
**DELETE /api/gallery/[id]** — Remove gallery image
**POST /api/upload** — Upload image to Supabase Storage, returns public URL


## EMAIL TEMPLATES (Resend)

### Booking Confirmation (to parent)
Subject: "Your Tour at Kopila Day Care is Booked!"
Body: Warm, branded email confirming date, time, address with Google Maps link, what to expect, contact number to reschedule.

### Booking Notification (to owner)
Subject: "New Tour Booking — [Parent Name] on [Date]"
Body: All booking details + link to admin dashboard.

### Contact Form Notification (to owner)
Subject: "New Inquiry from [Name] — [Subject]"
Body: Full inquiry details + link to admin dashboard.


## ADMIN PORTAL

Minimal admin portal at `/admin`. Protected by Supabase Auth (email + password login).
Scope: **Gallery uploads** and **Booking management** only.

### Dashboard Home (`/admin`)
- Quick stats: upcoming bookings this week, total gallery images
- Links to Bookings and Gallery sections

### Bookings (`/admin/bookings`)
- Table: date, time, parent name, email, phone, status, actions
- Filter by: upcoming, past, pending, confirmed, cancelled
- Actions: confirm, cancel, delete

### Gallery (`/admin/gallery`)
- Grid of uploaded images
- Upload new (drag-and-drop zone), set category, set alt text, delete
- Drag-to-reorder


## DEVELOPMENT RULES

1. **Preserve all existing Tailwind classes and visual design exactly as-is.** The frontend design is final. Do not change colors, spacing, fonts, layouts, or any visual element unless asked.

2. **Branding:** The business name is "Kopila Day Care" (not "Childcare"). Kopila means flower bud. Logo icon is `local_florist` (filled).

3. **Original HTML files have been removed.** The conversion is done — do not reference the old static HTML directories.

4. **Images:** Real photos are in `public/images/`. Some AI placeholder images from Google remain in the approach tabs and other sections — replace as real photos become available.

5. **Forms:** Contact form is wired to POST `/api/contact`. Book a Tour form and mailing list signup still need API route implementations.

6. **Google Maps:** Contact page uses a real Google Maps embed + 360° Street View iframe for 17040 Esteban St, Hayward, CA 94541.


## DEPENDENCIES (package.json)
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
    "autoprefixer": "^10.4"
  }
}
```


## SETUP STEPS (for developer)

1. Create Supabase project at supabase.com (free tier)
2. Run the SQL schema (from DATABASE SCHEMA section above) in Supabase SQL Editor
3. Create a Supabase Storage bucket called `kopila-images` (public)
4. Create a Resend account at resend.com, verify your domain, get API key
5. Create admin user in Supabase Auth (email + password for Basanti)
6. Copy `.env.local.example` to `.env.local` and fill in all values
7. `npm install`
8. `npm run dev`
9. Deploy to Vercel: connect GitHub repo, add env vars in Vercel dashboard


## DEVELOPMENT NOTES

- All backend logic lives in `/api/` routes — no separate server needed
- Supabase client in `lib/supabase/client.ts` (browser) uses the anon key
- Supabase client in `lib/supabase/server.ts` (API routes) uses the service role key to bypass RLS
- Form validation happens both client-side (UX) and server-side (security) using shared Zod schemas in `lib/validators.ts`
- All email sends are async and should not block the API response — use try/catch and log failures
- The admin dashboard is a separate layout with its own nav sidebar, distinct from the public site design