# The Charismatic Code

A Next.js App Router site for hosting free PDF lead magnets with ConvertKit (Kit) email delivery. Built with TypeScript and Tailwind CSS, deployable to Vercel in minutes.

---

## How It Works

1. Visitor lands on the homepage → sees all available free guides.
2. They click a guide → land on its dedicated page (`/pdf/[slug]`).
3. They enter their name + email → form POSTs to `/api/subscribe`.
4. The API route calls Kit's API, subscribes the user, and applies a **PDF-specific tag**.
5. Kit detects the tag and fires an automation that emails the correct PDF.
6. The user sees a success message on screen.

**The code handles everything on the website side. Kit handles email delivery via automations (see setup below).**

---

## Quick Start (Local Dev)

```bash
# 1. Clone and install
git clone <your-repo-url>
cd lead-magnet-hub
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Then edit .env.local with your real values (see below)

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in these values:

| Variable                    | Required | Description                              |
| --------------------------- | -------- | ---------------------------------------- |
| `KIT_API_KEY`               | ✅ Yes   | Your Kit v3 API key                      |
| `KIT_API_BASE_URL`          | Optional | Defaults to `https://api.convertkit.com` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Your Instagram profile URL               |
| `NEXT_PUBLIC_YOUTUBE_URL`   | Optional | Your YouTube channel URL                 |
| `NEXT_PUBLIC_SUBSTACK_URL`  | Optional | Your Substack URL                        |
| `NEXT_PUBLIC_SITE_URL`      | Optional | Your production domain                   |

### Finding Your Kit API Key

1. Log in to Kit → click your account name (bottom left) → **Settings**
2. Go to **Developer** → copy your **API Key** (v3)

---

## Adding a New PDF Guide

Open `src/lib/pdfData.ts` and add one object to the `pdfGuides` array:

```ts
{
  slug: "habits",              // URL: /pdf/habits
  title: "The Habits Playbook",
  description: "Build habits that actually stick...",
  tagName: "pdf-habits",       // Kit tag name (you create this in Kit)
  tagId: "1234567",            // Kit tag ID (see below)
  emoji: "🔁",
  accentColor: "emerald",      // Options: rose | amber | sky | emerald | violet
},
```

That's it — the route, page, and form are all generated automatically.

### Finding a Kit Tag ID

1. In Kit, go to **Subscribers** → **Tags** (or **Grow** → **Tags**)
2. Create a tag (e.g. `pdf-habits`) if it doesn't exist
3. Click the tag — the ID is in the URL: `app.kit.com/tags/XXXXXXX`
4. Paste that number as `tagId` in `pdfData.ts`

---

## Kit Automation Setup

The website subscribes users and tags them. **You must set up the email delivery in Kit separately.** Here's how:

### For Each PDF Guide:

1. **Upload your PDF** to Kit or any file host (e.g. Google Drive, Dropbox — get a direct download link)

2. **Create an Automation** in Kit:
   - Go to **Automate** → **Automations** → **New Automation**
   - Choose **Tag is added** as the trigger
   - Select the tag (e.g. `pdf-connect`)
   - Add a **Send Email** action
   - Write the email, paste the PDF download link
   - Publish the automation

3. **Repeat** for each PDF guide.

> **Tip:** You can also use a Kit Sequence instead of an Automation if you want a welcome series after the initial PDF email.

---

## Deploying to Vercel

### First Deploy

```bash
# Option A: Vercel CLI
npm i -g vercel
vercel

# Option B: Push to GitHub, then import at vercel.com/new
```

### Setting Environment Variables on Vercel

1. Go to your project on [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Add each variable from `.env.local.example`:

| Variable                  | Environment                      |
| ------------------------- | -------------------------------- |
| `KIT_API_KEY`             | Production, Preview, Development |
| `KIT_API_BASE_URL`        | Production, Preview, Development |
| `NEXT_PUBLIC_*` variables | Production, Preview, Development |

4. **Redeploy** after adding variables (Settings → Deployments → Redeploy)

### Custom Domain

1. Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain and follow DNS instructions

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Homepage with hero + guide cards
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles + animations
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts        # POST handler → calls Kit API
│   └── pdf/
│       └── [slug]/
│           └── page.tsx        # Dynamic PDF landing page
├── components/
│   ├── GuideCard.tsx           # Card on homepage
│   ├── SubscribeForm.tsx       # Name + email form (client component)
│   └── SocialLinks.tsx         # Instagram, YouTube, Substack links
├── lib/
│   └── pdfData.ts              # ← ADD NEW PDFS HERE
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## Tech Stack

- **Next.js 15** — App Router, Server Components, Route Handlers
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Styling
- **Vercel** — Hosting
- **Kit (ConvertKit)** — Email list + automated delivery

---

## Customisation Tips

- **Fonts**: Change `Playfair_Display` and `DM_Sans` in `app/layout.tsx`
- **Colors**: The `accentColor` in `pdfData.ts` controls per-guide theming
- **Hero copy**: Edit `app/page.tsx`
- **Social links**: Set `NEXT_PUBLIC_*` env vars, or edit `components/SocialLinks.tsx` directly
- **Brand name**: Update `metadata` in `app/layout.tsx`
