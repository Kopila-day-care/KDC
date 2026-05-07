# Kopila Day Care & Preschool

Website for **Kopila Day Care and Preschool** — a licensed home-based day care and preschool in Hayward, CA.

## Stack

- **Next.js 14** (App Router) · **TypeScript** · **Tailwind CSS**
- **Supabase** — PostgreSQL database, Auth, and Storage
- **Resend** — transactional email
- **Vercel** — hosting

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/our-approach` | Philosophy and daily routine |
| `/our-team` | Staff profiles |
| `/contact` | Contact form, hours, and map |
| `/book-a-tour` | Tour booking with availability calendar |
| `/gallery` | Photo gallery |
| `/testimonials` | Parent testimonials |
| `/admin` | Admin portal (bookings + gallery management) |

## Getting Started

```bash
cp .env.local.example .env.local
# fill in Supabase and Resend credentials
npm install
npm run dev
```

Run the schema at `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor before first use.

See the `devbranch` README for full setup instructions, API reference, and deployment guide.

---

**Contact:** (510) 282-6653 · kopiladcc@yahoo.com · 17040 Esteban St, Hayward, CA 94541
