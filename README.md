# Adams Services, LLC — adamsservicesut.com

Marketing site for Adams Services, LLC, a family-owned landscaping company in
Plain City, Utah. Built with React + TypeScript + Vite.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  data/site.ts        All business info, services, and gallery entries
  components/         Header, Footer, Reveal (scroll animation)
  pages/              Home, Services, Gallery
  assets/gallery/     Project photos
```

### Pages

| Route       | Contents                                                       |
| ----------- | -------------------------------------------------------------- |
| `/`         | Introduction, Services, and About Us sections                    |
| `/services` | Full detail on all eight services, deep-linkable per service     |
| `/gallery`  | Filterable project photos with a lightbox                        |

Header and footer links scroll to the home page sections. From `/services` or
`/gallery` they route home first, then scroll — handled in `Home.tsx` via
router state.

## Editing content

**Almost everything lives in [`src/data/site.ts`](src/data/site.ts).** No
component edits needed for routine updates.

- **Phone, hours, service area, review count** — the `business` object at the top.
- **Services** — the `services` array. Each entry has a `summary` (home page
  card) and a longer `description` plus `includes` bullets (services page).
- **Gallery** — the `galleryItems` array.

### Adding photos

1. Drop the file in `src/assets/gallery/`.
2. Import it at the top of `src/data/site.ts`.
3. Add an entry to `galleryItems` with a `category` and a descriptive `alt`
   (the `alt` text matters for both accessibility and search).

### Service photos

The `image` field on a service is **optional**. The four seasonal services
(snow removal, Christmas lights, gutter cleaning, junk removal) currently have
no `image`, so they render a "Photos coming soon" icon panel instead of
borrowing an unrelated photo. Once real photos exist, import one and set
`image:` on that service — the panel is replaced automatically.

## Brand

Colors are sampled from the company logo and defined as CSS custom properties
in `src/index.css`:

| Token             | Value     | Use                          |
| ----------------- | --------- | ---------------------------- |
| `--forest`        | `#1b4d2e` | Primary — headers, buttons   |
| `--forest-deep`   | `#123520` | Footer, gradient ends        |
| `--leaf`          | `#5cb847` | Accent — icons, highlights   |
| `--charcoal`      | `#231f20` | Headings                     |
| `--white`         | `#ffffff` | Page background              |

Global font is Inter, loaded from Google Fonts in `src/index.css`.

## Deploying

The build output is a static `dist/` folder. Because the site uses client-side
routing, the host must rewrite all paths to `index.html` or `/services` and
`/gallery` will 404 on direct visits or refresh.

- **Netlify** — `public/_redirects` is already set up. Build: `npm run build`,
  publish: `dist`.
- **Vercel** — `vercel.json` is already set up.
- **Apache** — add an `.htaccess` that rewrites unmatched paths to
  `/index.html`.
- **nginx** — `try_files $uri $uri/ /index.html;`

Update the domain in `public/sitemap.xml`, `public/robots.txt`, and the
`canonical`/`og:url` tags in `index.html` if it ever changes.

## Notes for later

- **No backend.** Every call-to-action is a `tel:` link to (801) 921-1032.
  Adding a contact form means adding a form handler (Netlify Forms, Formspree,
  or similar).
- **No email address** is published anywhere, since none was provided. If the
  client wants one shown, add it to `business` in `src/data/site.ts` and
  surface it in the footer.
- **Structured data** for Google is in `index.html` (`LandscapingBusiness`
  schema). The `aggregateRating` there is hardcoded to 5.0 / 19 reviews — it
  should be kept roughly in sync with the real Google listing, and the same
  numbers live in `business` in `src/data/site.ts`.
- **Original uploads** are preserved in `_original_uploads/` and are not part
  of the build.
