# SK PULP & FIBRE — website

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Motion (menu + form transitions).

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Before going live

| What | Where |
| --- | --- |
| Phones, WhatsApp, email | Set in `src/config/site.ts` → `contact` (`NEXT_PUBLIC_CONTACT_*` in `.env.local` can override) |
| **Site URL** for SEO / share previews / sitemap | `.env.local` → `NEXT_PUBLIC_SITE_URL` (a production build warns if it is missing; Vercel deployments fall back to the project domain) |
| Product specs (dimensions, GSM, moisture, packaging, MOQ) | `src/config/site.ts` → `product.specs`. Only enter verified values; empty ones show as "shared on enquiry" |
| Founding year, postal address | `src/config/site.ts` → `company` |
| Logo | Source: `images videos/logo-source.webp` → `npm run media:logo` (removes the baked-in checkerboard) |
| Portrait (About Us + company section) | `portraitPhoto` in `src/config/media.ts` |
| Privacy policy review | `src/app/privacy/page.tsx` |

## Media

Source files live in `images videos/`: the factory film `process.MP4`, the photos, the client logos, and the supplied hero, About Us and portrait images. `npm run media` rebuilds `public/media/`, `public/logos/` and `public/reports/`. It overwrites files and never deletes any, so images you add by hand are safe.

- **Factory film:** tone-mapped from iPhone HDR to standard colour for the "Watch Our Process" player, with a still from each scene for the process steps.
- **RAW (DNG) photos:** converted to 1600px and 800px JPGs, with high-resolution detail crops.
- **Supplied images** (`SUPPLIED` in the script): `hero-source.webp`, `about-source.webp` and `portrait-source.webp`.
- **Test report:** the scanned page is extracted for the on-page preview.

To add photos, list them in `PHOTOS` in `scripts/process-media.mjs` and register them in `src/config/media.ts`. The portrait used in About Us and the company section is set once, in `portraitPhoto` in `src/config/media.ts`; set it to `null` to show the logo instead.

**Replacing an image:** files in `public/media/` are cached by browsers for 7 days on the live site. Save a replacement under a **new file name** (and update `src/config/media.ts`), or visitors may keep seeing the old one.

## Company content

Capacity, clients, the virgin-pulp claim and the CPPRI results all live in `src/config/site.ts` (`company`, `clients`, `testReport`, `product`). Edit them there and every section updates.

## Structure

```
src/config/site.ts        company facts, contact, nav, product info
src/config/media.ts       media registry, process stages copy
src/components/*          Nav, Hero, Intro (About), Products, Process (steps + ProcessVideo),
                          Quality (test report), Gallery, Clients, WhyUs (+ IndiaMap), Leadership,
                          Contact (call / WhatsApp / email cards)
scripts/process-media.mjs ffmpeg media pipeline
```

India map: [@svg-maps/india](https://github.com/VictorCazanave/svg-maps) (CC BY 4.0, credited on the Privacy page: the licence requires attribution, so keep it).
