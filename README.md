# TEAM International — Solutions site (standalone)

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui (Radix) · Motion · lucide-react.
Design tokens, typography utilities and section patterns are copied from the main site's design system
(`NewTeamIntWebPage/DESIGN_SYSTEM.md`). The navbar and footer mirror `TINavbarNew` and `TIFooter`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /solutions/ai-powered-software-engineering
npm run build      # production build (run this once before deploying)
```

## Deploy to Vercel

1. Push this folder to its own Git repo (GitHub, GitLab or Bitbucket).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Next.js** (auto-detected). No build settings to change.
3. Optional environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` — the deployment URL, e.g. `https://team-solutions.vercel.app`. Used for canonical URLs and JSON-LD.
   - `NEXT_PUBLIC_ALLOW_INDEXING` — leave unset while testing. The site then sends `noindex` and blocks crawlers in `robots.txt`, so it never competes with www.teaminternational.com in Google. Set to `true` only when this becomes the production site.

Or from the terminal: `npm i -g vercel && vercel` inside this folder.

## Structure

```
app/
  layout.tsx                                  fonts (Anybody, Public Sans, Inconsolata), navbar, footer, robots meta
  solutions/ai-powered-software-engineering/  page + metadata + JSON-LD (@graph: WebPage, Breadcrumb, Organization, Service, HowTo, FAQPage)
  robots.ts, sitemap.ts, not-found.tsx
components/
  site/        navbar.tsx, footer.tsx, team-logo.tsx
  ui/          accordion.tsx (shadcn), glow-button.tsx, animated-sequence.tsx
  solutions/ai-powered-software-engineering/  one file per section
content/ai-powered-software-engineering.json  all page copy (edit text here)
lib/solutions.ts                              the 5 solutions; set `live: true` as each page ships
```

## Adding the next solution page

1. Add `content/<slug>.json` with the copy.
2. Add `components/solutions/<slug>/` sections (reuse the existing ones as templates).
3. Add `app/solutions/<slug>/page.tsx` with metadata and JSON-LD.
4. Set `live: true` for it in `lib/solutions.ts` — it then appears in the navbar dropdown, footer and sitemap.

## Notes

- The FAQ accordion uses `forceMount`, so every answer stays in the HTML for search and AI engines even when collapsed.
- The contact section links to the live contact form (`teaminternational.com/en/contact-us`) so leads keep flowing into the existing CRM.
- Items to confirm before launch: proof-bar claims in the hero, the MVP offer, FAQ timelines, and a real case study.
