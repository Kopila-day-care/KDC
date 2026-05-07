# Kopila Day Care & Preschool — Website

A multi-page marketing and booking website for **Kopila Day Care and Preschool**, a licensed home-based day care in Hayward, CA. Built with a *Digital Storybook* design concept — whimsical, hand-crafted, and editorial.

**"Kopila"** means flower bud in Nepali.

---

## Live Site

> To be added after production deployment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| Email | Resend |
| Hosting | Vercel |
| Fonts | Google Fonts (Luckiest Guy, Pacifico, Amatic SC, Plus Jakarta Sans, Raleway, Be Vietnam Pro) |
| Icons | Material Symbols (CDN) |

---

## Project Structure

```
KDC/
├── app/
│   ├── layout.tsx                        # Root layout — fonts, navbar, footer
│   ├── globals.css                       # Tailwind directives + custom tokens
│   ├── page.tsx                          # Home page
│   ├── our-approach/page.tsx             # Approach page (interactive tabs)
│   ├── our-team/page.tsx                 # Team page
│   ├── contact/page.tsx                  # Contact page (bento grid + form)
│   ├── book-a-tour/page.tsx              # Tour booking with calendar
│   ├── gallery/page.tsx                  # Photo gallery
│   ├── testimonials/page.tsx             # Parent testimonials
│   └── api/
│       ├── book-tour/route.ts            # POST — create tour booking
│       ├── contact/route.ts              # POST — contact form submission
│       ├── availability/route.ts         # GET  — available time slots by date
│       ├── bookings/route.ts             # GET  — list bookings (admin)
│       ├── bookings/[id]/route.ts        # PATCH/DELETE — manage booking (admin)
│       ├── gallery/route.ts              # GET/POST — gallery images (admin)
│       ├── gallery/[id]/route.ts         # PATCH/DELETE — gallery image (admin)
│       └── upload/route.ts              # POST — upload image to Supabase Storage (admin)
│
├── app/admin/
│   ├── layout.tsx                        # Admin shell with sidebar nav + auth guard
│   ├── login/page.tsx                    # Admin login (Supabase Auth)
│   ├── page.tsx                          # Admin dashboard
│   ├── bookings/page.tsx                 # Bookings management table
│   └── gallery/page.tsx                  # Gallery management (upload, reorder, delete)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                    # Fixed glassmorphism navbar
│   │   ├── Footer.tsx                    # 4-column footer
│   │   ├── PublicShell.tsx               # Wraps public pages with nav + footer
│   │   └── ContactSection.tsx            # Shared CTA block
│   ├── approach/ApproachTabs.tsx         # Interactive approach tabs
│   ├── book-tour/BookTourForm.tsx        # Multi-step tour booking form
│   ├── contact/ContactForm.tsx           # Contact form
│   ├── gallery/GalleryGrid.tsx           # Public gallery grid
│   ├── testimonials/TestimonialsList.tsx # Testimonials display
│   └── ui/
│       ├── CTAButton.tsx
│       ├── SectionDivider.tsx
│       └── HoursDisplay.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                     # Browser Supabase client (anon key)
│   │   ├── server.ts                     # Server client (service role) + requireAdmin()
│   │   └── types.ts                      # TypeScript interfaces for all DB tables
│   ├── resend.ts                         # Email templates + send functions
│   ├── validators.ts                     # Zod schemas for all form inputs
│   └── utils.ts                          # cn() helper
│
├── middleware.ts                          # Edge auth guard for all /admin/* routes
├── supabase/migrations/001_initial_schema.sql
├── public/images/                        # Staff photos + activity images
├── tailwind.config.ts
├── next.config.js
└── .env.local.example
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, meals, curriculum preview, team, safety, testimonials |
| `/our-approach` | Approach — Fresh Food, Play First, Curriculum, Loving Care tabs |
| `/our-team` | Team — Basanti & Indra profiles |
| `/contact` | Contact — info, hours, Google Map, 360° Street View, contact form |
| `/book-a-tour` | Tour booking with date picker and available time slots |
| `/gallery` | Photo gallery with category filter |
| `/testimonials` | Parent testimonials |
| `/admin` | Admin dashboard (protected) |
| `/admin/bookings` | Manage tour bookings — confirm, cancel, delete |
| `/admin/gallery` | Upload and manage gallery images |

---

## API Routes

### Public

| Method | Route | Description |
|---|---|---|
| POST | `/api/contact` | Submit contact form → saved to `inquiries` table, email sent to owner |
| POST | `/api/book-tour` | Submit tour booking → saved to `bookings`, owner notified |
| GET | `/api/availability?date=YYYY-MM-DD` | Returns available time slots for a given date |

### Admin (requires authenticated session)

| Method | Route | Description |
|---|---|---|
| GET | `/api/bookings` | List all bookings (filterable by status/date) |
| PATCH | `/api/bookings/[id]` | Update booking status (pending/confirmed/cancelled) |
| DELETE | `/api/bookings/[id]` | Delete a booking |
| GET | `/api/gallery` | List gallery images |
| POST | `/api/gallery` | Add a gallery image record |
| PATCH | `/api/gallery/[id]` | Update image metadata |
| DELETE | `/api/gallery/[id]` | Delete image record + file from storage |
| POST | `/api/upload` | Upload image file to Supabase Storage |

---

## Authentication & Security

- **Admin login** — Supabase Auth (email + password)
- **Server-side route protection** — `middleware.ts` runs at the edge on all `/admin/*` routes and redirects unauthenticated users before any page renders
- **API route guards** — `requireAdmin()` in `lib/supabase/server.ts` validates the session cookie on every admin API handler
- **Input validation** — all user inputs validated with Zod schemas including length limits and format checks (date: `YYYY-MM-DD`, time: `HH:MM`)
- **HTML escaping** — all user data escaped before being interpolated into outbound email HTML
- **File upload safety** — file extension derived from validated MIME type, not user-supplied filename; HTTPS-only URL validation on gallery image URLs
- **Secrets** — `.env.local` is gitignored; all credentials managed via environment variables only

---

## Database Schema (Supabase / PostgreSQL)

Ten tables with Row Level Security enabled:

| Table | Purpose |
|---|---|
| `bookings` | Tour booking requests from parents |
| `availability` | Admin-configured bookable time slots (by day of week) |
| `blocked_dates` | Holidays or days marked unavailable |
| `inquiries` | Contact form submissions |
| `testimonials` | Parent testimonials (admin-managed) |
| `team_members` | Staff profiles |
| `blog_posts` | Blog/newsletter posts |
| `gallery_images` | Photo gallery |
| `business_settings` | Editable business info (singleton row) |

Full schema with RLS policies and seed data is in `supabase/migrations/001_initial_schema.sql`.

---

## Local Development

### 1. Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Resend](https://resend.com) account with a verified domain

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

RESEND_API_KEY=your_resend_api_key
OWNER_EMAIL=kopiladcc@yahoo.com

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database setup

Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor. This creates all tables, RLS policies, and seeds default availability slots and team members.

Then create a Supabase Storage bucket named `kopila-images` (set to **public**).

### 4. Admin user

In the Supabase dashboard → Authentication → Users, create an account for Basanti (email + password). This is the only account that can access `/admin`.

### 5. Install and run

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`.

---

## Deployment (Vercel)

1. Connect the GitHub repo to a new Vercel project
2. Add all environment variables from `.env.local` in the Vercel dashboard (Settings → Environment Variables)
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain (e.g. `https://kopilachildcare.com`)
4. Deploy — Vercel auto-deploys on every push to `main`

---

## Design System

See `kopila_storybook/DESIGN.md` for the full visual reference.

**Key colours:**

| Name | Hex |
|---|---|
| Primary (Sage Green) | `#3c674b` |
| Secondary (Warm Brown) | `#835339` |
| Tertiary (Gold) | `#7c5800` |
| Accent (Rose) | `#D28080` |
| Surface | `#faf9f7` |

**Rules:** No sharp corners · Asymmetric layouts · Glassmorphism nav · Tonal depth via surface layering · Dark mode supported via Tailwind class strategy.

---

## Business Info

| | |
|---|---|
| **Name** | Kopila Day Care and Preschool |
| **Owner** | Basanti M. |
| **Phone** | (510) 282-6653 |
| **Email** | kopiladcc@yahoo.com |
| **Address** | 17040 Esteban St, Hayward, CA 94541 |
| **Hours** | Mon–Fri 7:30 AM – 5:30 PM |
| **Established** | August 2014 |
