# Michael Jones — Personal Site & CV

Source for [michaeljones.michaeljones-personal-website.workers.dev](https://michaeljones.michaeljones-personal-website.workers.dev) — an interactive, terminal/ASCII-themed personal CV site, plus a client-facing "Solutions" area for booking work.

The actual website lives in [`site/`](site) as a self-contained Next.js app. Everything else at the repo root ([`Logos/`](Logos), [`diagram/`](diagram), the CV zips/screenshots) is raw source material used to build the site — gitignored where it's just working material, kept where it's the canonical asset.

## What's on the site

- **Home (`/`)** — hero with a rotating ASCII/glitch video background and a randomized mouse-trail effect that pops up real project screenshots as you move the cursor; professional experience, flagship projects (Gravity, Nkanda, Alcove, Kit-Bin), GTM/technical-analyst case studies, client builds, a technical skills grid, and an interactive CLI-style "explore" terminal you can type/click commands into.
- **Solutions (`/solutions`)** — a client-facing page presenting five bookable offerings (free discovery call, 6-week website build, AI opportunity audit, product development, digital systems audit), each illustrated with a custom diagram (desktop/mobile variants swapped automatically).
- **Book (`/book`)** — a booking form, pre-filled per offering via a `?service=` query param, that writes submissions into Supabase. The Free Discovery Call offering instead opens a Cal.com floating booking popup directly.

## Project structure

```
site/
├── app/
│   ├── page.js            # Home page (all sections + interactive components)
│   ├── layout.js          # Root layout, global CSS, mounts CalEmbed site-wide
│   ├── styles.css          # All site styling (single global stylesheet)
│   ├── nav-fix.css         # Small nav-specific override
│   ├── CalEmbed.js         # Client component that boots the Cal.com embed script
│   ├── solutions/page.js   # /solutions — client offerings + diagrams
│   └── book/page.js        # /book — booking form, Supabase insert
├── lib/
│   └── supabaseClient.js   # Supabase client, built from NEXT_PUBLIC_* env vars
├── public/
│   ├── projects/            # Screenshots used in the hero mouse-trail effect
│   ├── solutions/           # Desktop/mobile diagrams for each offering
│   ├── logos/                # Company/project logo badges
│   └── *.mp4, *.png          # Hero background videos + poster
├── next.config.mjs         # output: 'export' — fully static site
└── wrangler.toml           # Cloudflare Workers static-assets deploy config
```

## Tech stack

- **Next.js 14** (App Router), statically exported (`output: 'export'`) — no server runtime, just a static site
- **React 18**
- **Supabase** (`@supabase/supabase-js`) — client-side only, using the publishable/anon key; booking form submissions insert into a `bookings` table protected by a Row Level Security policy that allows inserts only (no reads/updates/deletes) for the anon role
- **Cal.com** (`@calcom/embed-react`) — floating booking popup for the free discovery call
- **Deployed on Cloudflare** as a Worker serving static assets (`wrangler deploy`, root directory `site`, build command `npm run build`, output directory `out`)

## Running locally

```bash
cd site
npm install
npm run build
npx serve out -l 3000
```

(`next start` doesn't apply here since the site is a static export — use `next dev` for local development with hot reload instead of the build+serve flow above.)

### Environment variables

Two are needed for the booking form to work, both safe to expose client-side (baked into the static bundle at build time):

```
NEXT_PUBLIC_SUPABASE_URL=<your Supabase project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your Supabase publishable/anon key>
```

Set locally in `site/.env.local` (gitignored), and in Cloudflare's **build-time** environment variables (not the "Runtime variables and secrets" panel — that's for Worker request-time code, which this project doesn't have). The Supabase **secret** key is never used anywhere in this project; there's no backend to use it, and it must never be added to any env var panel here.

## Notes for future work

- The booking form's Supabase table (`bookings`) and its insert-only RLS policy need to be created once via the Supabase SQL editor — see the project's setup notes for the exact SQL.
- Cal.com's floating button assumes an event exists at `michael-jones-zxe6yc/free-discovery-call`.
- Large media (hero videos, project screenshots, logos) is tracked via Git LFS — see [`.gitattributes`](.gitattributes).
