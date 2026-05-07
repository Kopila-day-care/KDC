# Kopila Day Care — Website

Production website for Kopila Day Care and Preschool, live at [kopiladaycare.com](https://kopiladaycare.com).

Built with Next.js 14, Supabase, Resend, and Vercel.

## Local Development

```bash
cp .env.local.example .env.local
# fill in credentials (see CLAUDE.md § Environment Variables)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
vercel --prod
```

## Tests

```bash
npm test
```

## Docs

See [`CLAUDE.md`](./CLAUDE.md) for full architecture, database schema, API reference, security details, and setup steps.
